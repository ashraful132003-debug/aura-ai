import { NextResponse } from 'next/server';
import { CRISIS_SPOKEN, isCrisis } from '@/lib/chatEngine';

// Server-side chat endpoint, wired to Groq (OpenAI-compatible chat completions).
// The API key is read from the server-only env var `GROQ` (see .env) and never
// reaches the browser. Crisis messages are short-circuited here too (defense in
// depth) and never sent to the model.

export const runtime = 'nodejs';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ar: 'Arabic',
  ur: 'Urdu',
  es: 'Spanish',
  fr: 'French',
};

function systemPrompt(lang: string): string {
  const language = LANG_NAMES[lang] || 'English';
  return [
    'You are Aura, a warm, compassionate mental-wellness companion.',
    'Your role is emotional support: listen without judgment, validate feelings, and offer gentle, practical coping ideas (breathing, grounding, sleep hygiene, reframing, mood awareness).',
    'Stay strictly within mental wellness and emotional support. If asked about unrelated or general-knowledge topics, kindly redirect to how the person is feeling.',
    'You are NOT a therapist or doctor: never diagnose, never prescribe medication, and gently encourage professional help when a situation sounds serious.',
    'If someone expresses intent to harm themselves or others, respond with calm care and urge them to contact a local crisis line or emergency services immediately.',
    'Keep replies short and human: 2–5 sentences, gentle and specific, not preachy. Use at most one soft emoji, and only when it fits.',
    `Always reply ONLY in ${language}.`,
  ].join(' ');
}

interface InMsg {
  role: 'me' | 'ai';
  text: string;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const b = body as { message?: unknown; lang?: unknown; history?: unknown };
  const message = typeof b.message === 'string' ? b.message : '';
  const lang = typeof b.lang === 'string' ? b.lang : 'en';
  const history: InMsg[] = Array.isArray(b.history)
    ? (b.history as unknown[]).filter(
        (m): m is InMsg =>
          !!m &&
          typeof (m as InMsg).text === 'string' &&
          ((m as InMsg).role === 'me' || (m as InMsg).role === 'ai'),
      )
    : [];

  if (!message.trim()) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  // Safety: crisis never goes to the model.
  if (isCrisis(message)) {
    return NextResponse.json({ reply: CRISIS_SPOKEN, crisis: true });
  }

  const key = process.env.GROQ || process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'GROQ key not configured on the server' }, { status: 500 });
  }

  const messages = [
    { role: 'system', content: systemPrompt(lang) },
    ...history.slice(-8).map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text })),
    { role: 'user', content: message },
  ];

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ model: MODEL, messages, temperature: 0.7, max_tokens: 400 }),
    });
    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: 'groq_error', status: res.status, detail: detail.slice(0, 400) },
        { status: 502 },
      );
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json({ error: 'empty_reply' }, { status: 502 });
    }
    return NextResponse.json({ reply, crisis: false });
  } catch {
    return NextResponse.json({ error: 'network_error' }, { status: 502 });
  }
}
