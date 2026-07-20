// Rule-based chat engine. This is intentionally NOT a real LLM — it is a
// keyword/regex matcher over pre-written empathetic responses, with crisis
// detection checked first. Responses are English-first; the response bank is
// structured by category so localized pools can be dropped in later.

export type Category =
  | 'overwhelm'
  | 'sleep'
  | 'anxious'
  | 'focus'
  | 'sad'
  | 'grateful'
  | 'stress'
  | 'angry'
  | 'greet'
  | 'fallback';

export const CRISIS_KEYWORDS = [
  'suicide',
  'kill myself',
  'end my life',
  'want to die',
  'wanna die',
  'self harm',
  'self-harm',
  'hurt myself',
  'no reason to live',
  'end it all',
  'khudkushi',
  'خودکشی',
  'आत्महत्या',
  'suicidio',
];

export function isCrisis(text: string): boolean {
  const low = text.toLowerCase();
  return CRISIS_KEYWORDS.some((k) => low.indexOf(k) > -1);
}

/** Classify a non-crisis message into a response category. */
export function classify(text: string): Category {
  const low = text.toLowerCase();
  if (/overwhelm|too much|burn(t|ed)? ?out|can'?t cope/.test(low)) return 'overwhelm';
  if (/sleep|insomnia|awake|tired at night|can'?t rest/.test(low)) return 'sleep';
  if (/anxi|panic|nervous|worry|worried|scared|afraid/.test(low)) return 'anxious';
  if (/focus|concentrat|distract|procrastinat/.test(low)) return 'focus';
  if (/sad|depress|lonely|alone|cry|empty|hopeless|down/.test(low)) return 'sad';
  if (/grateful|thank|blessed|alhamdulillah|shukr/.test(low)) return 'grateful';
  if (/stress|pressure|deadline|exam/.test(low)) return 'stress';
  if (/angry|furious|frustrat|annoyed|mad/.test(low)) return 'angry';
  if (/^(hi|hey|hello|salaam|assalam|namaste|hola|bonjour|yo)\b/.test(low)) return 'greet';
  return 'fallback';
}

export const RESPONSES: Record<Category, string[]> = {
  overwhelm: [
    "That sounds like a lot to carry, and it makes complete sense that you feel overwhelmed. Let's shrink it down together: what is the *one* smallest thing on your mind right now? Just one — we'll start there. 🌿",
    'Feeling overwhelmed usually means you care deeply about many things at once. Try this with me: name three things you can see around you right now. It gently anchors your mind back to the present.',
  ],
  sleep: [
    "Struggling to sleep is exhausting in itself. A calm wind-down helps: dim your screen, and try the 4-7-8 breathing pattern in the Breathing section below — it's designed to trigger natural drowsiness. 😴",
    "When sleep won't come, chasing it makes it worse. Instead, try releasing tension: unclench your jaw, drop your shoulders, and take one long slow exhale. Want me to guide you to the sleep breathing exercise?",
  ],
  anxious: [
    'Anxiety can feel like a storm inside, but storms pass. Right now, try one slow breath with me — in for 4, hold for 4, out for 4. Your body listens to your breath before it listens to your thoughts. 💙',
    "Thank you for naming it — that's already a brave step. Anxiety often shrinks when we ground ourselves: feel your feet on the floor, notice the temperature of the air. You're safe in this moment.",
  ],
  focus: [
    'When focus slips, the kindest fix is structure: pick one task, set a 15-minute window, and silence everything else. The Focus Breathing pattern (4-4-8) below also sharpens alertness beautifully. 🧠',
    'Scattered focus is often a tired mind asking for rhythm. Try a short focused-breathing session, then work in one small sprint. Small wins rebuild momentum fast.',
  ],
  sad: [
    "I'm sorry you're feeling this heaviness. You don't have to explain or justify it — sadness deserves space too. I'm here, and I'm listening. Would you like to talk about what's weighing on you, or would a calming soundscape help right now? 💜",
    "That sounds painful, and I want you to know your feelings are completely valid. Sometimes just being heard helps a little. What's been the hardest part of today?",
  ],
  grateful: [
    "That's beautiful. 🌸 Gratitude is one of the strongest anchors for wellbeing — savor it for a moment. What's one small thing that made you feel this way today?",
    'I love that. Holding onto grateful moments actually trains the mind toward calm. Thank you for sharing it with me.',
  ],
  stress: [
    "Stress is your body trying to protect you — but it doesn't have to run the show. Let's release a little of it: drop your shoulders, unclench your hands, and take one long exhale. Better? Even 1% counts. 🍃",
    "That pressure sounds real. One thing that helps: separate what's in your control from what isn't, and give your energy only to the first list. Want to talk through what's on yours?",
  ],
  angry: [
    'Anger is valid — it usually guards something that matters to you. Before acting on it, try one slow breath and name what feels unfair. Naming it takes away half its heat. 🔥→🍃',
  ],
  greet: [
    "It's good to see you. 🌿 This is your space — no judgment, no pressure. How are you feeling right now?",
    "Hello, friend. I'm here and listening. What's on your mind today?",
  ],
  fallback: [
    "Thank you for sharing that with me. I'm listening — tell me more about how that's been making you feel. 🌿",
    'I hear you. That sounds important. What do you think is sitting underneath that feeling?',
    "I'm here with you. Sometimes putting things into words is the first step to lightening them. What else is on your mind?",
  ],
};

export function pickResponse(cat: Category): string {
  const pool = RESPONSES[cat];
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Spoken TTS version of the crisis reply (the on-screen version renders links). */
export const CRISIS_SPOKEN =
  "I'm really glad you told me, and I'm concerned about you. You deserve support from a real person right now. Please reach out to a free, confidential helpline. In India, Vandrevala: +91 9999 666 555, or KIRAN: 1800 599 0019. In the US, call or text 988. In the UK, Samaritans: 116 123. You are not alone, and this feeling can pass. Would you like to try a slow breathing exercise together while you reach out?";
