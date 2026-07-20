'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAT_CRISIS_LINES, CHAT_LIMIT, SPEECH_LANGS } from '@/lib/constants';
import { classify, CRISIS_SPOKEN, isCrisis, pickResponse } from '@/lib/chatEngine';
import { useI18n } from '@/lib/i18n/I18nProvider';
import type { ChatMessage } from '@/lib/types';
import { useAppState } from './providers/AppStateProvider';
import { useModal } from './providers/ModalProvider';
import { useToast } from './providers/ToastProvider';

export default function Chat() {
  const { t, lang } = useI18n();
  const { chatsLeft, consumeChat } = useAppState();
  const { openUpgrade } = useModal();
  const { toast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 'greet', role: 'ai', text: t('chat.greet') },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [ttsOn, setTtsOn] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(true);
  const [recOn, setRecOn] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const recRef = useRef<any>(null);
  const ttsOnRef = useRef(false);
  const chatsLeftRef = useRef(chatsLeft);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    chatsLeftRef.current = chatsLeft;
  }, [chatsLeft]);
  useEffect(() => {
    ttsOnRef.current = ttsOn;
  }, [ttsOn]);

  const nextId = () => `m${++idRef.current}`;

  // Reset the greeting to the active language (also clears conversation, as in
  // the original) whenever the language changes.
  useEffect(() => {
    setMessages([{ id: 'greet', role: 'ai', text: t('chat.greet') }]);
  }, [lang, t]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const speak = useCallback(
    (text: string) => {
      if (!ttsOnRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const clean = text.replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, '');
        const u = new SpeechSynthesisUtterance(clean);
        u.lang = SPEECH_LANGS[lang] || 'en-US';
        u.rate = 0.95;
        u.pitch = 1.05;
        window.speechSynthesis.speak(u);
      } catch {
        /* ignore */
      }
    },
    [lang],
  );

  const respond = useCallback(
    async (userText: string) => {
      // Crisis is handled entirely on the client: instant helplines, never sent
      // to the model.
      if (isCrisis(userText)) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages((m) => [...m, { id: nextId(), role: 'ai', text: '', kind: 'crisis' }]);
          speak(CRISIS_SPOKEN);
        }, 500);
        return;
      }

      setTyping(true);
      const history = messagesRef.current
        .filter((m) => !m.kind && m.text)
        .slice(-8)
        .map((m) => ({ role: m.role, text: m.text }));
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userText, lang, history }),
        });
        const data = (await res.json()) as { reply?: string };
        setTyping(false);
        if (res.ok && data.reply) {
          setMessages((m) => [...m, { id: nextId(), role: 'ai', text: data.reply! }]);
          speak(data.reply);
          return;
        }
        throw new Error('bad response');
      } catch {
        // Graceful fallback to the local rule-based engine (offline / API down).
        setTyping(false);
        const reply = pickResponse(classify(userText));
        setMessages((m) => [...m, { id: nextId(), role: 'ai', text: reply }]);
        speak(reply);
      }
    },
    [lang, speak],
  );

  const sendText = useCallback(
    (raw: string) => {
      const v = raw.trim();
      if (!v) return;
      const crisis = isCrisis(v);
      if (!crisis && chatsLeftRef.current <= 0) {
        setMessages((m) => [
          ...m,
          { id: nextId(), role: 'me', text: v },
          { id: nextId(), role: 'ai', text: t('chat.limit', { limit: CHAT_LIMIT }), kind: 'limit' },
        ]);
        setInput('');
        return;
      }
      setMessages((m) => [...m, { id: nextId(), role: 'me', text: v }]);
      setInput('');
      if (!crisis) {
        const remaining = consumeChat();
        chatsLeftRef.current = remaining;
        if (remaining === 3) toast(t('toast.threeLeft'));
      }
      respond(v);
    },
    [consumeChat, respond, t, toast],
  );

  const toggleTts = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setTtsSupported(false);
      return;
    }
    setTtsOn((v) => {
      const next = !v;
      if (!next) window.speechSynthesis.cancel();
      return next;
    });
  };

  const onMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setMessages((m) => [...m, { id: nextId(), role: 'ai', text: t('chat.voiceUnsupported') }]);
      return;
    }
    if (recOn) {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      const rec = new SR();
      rec.lang = SPEECH_LANGS[lang] || 'en-US';
      rec.interimResults = false;
      rec.onstart = () => setRecOn(true);
      rec.onend = () => setRecOn(false);
      rec.onerror = () => setRecOn(false);
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript as string;
        setInput(transcript);
        sendText(transcript);
      };
      recRef.current = rec;
      rec.start();
    } catch {
      setMessages((m) => [...m, { id: nextId(), role: 'ai', text: t('chat.micError') }]);
    }
  };

  const feats = [
    { ico: '🎙️', k: 'chat.feat1' },
    { ico: '🔊', k: 'chat.feat2' },
    { ico: '🌐', k: 'chat.feat3' },
    { ico: '🚨', k: 'chat.feat4' },
  ];
  const chips = [
    { say: t('chat.chip1.say'), label: t('chat.chip1.label') },
    { say: t('chat.chip2.say'), label: t('chat.chip2.label') },
    { say: t('chat.chip3.say'), label: t('chat.chip3.label') },
    { say: t('chat.chip4.say'), label: t('chat.chip4.label') },
  ];

  const ttsLabel = !ttsSupported ? t('chat.ttsUnsupported') : ttsOn ? t('chat.reading') : t('chat.readAloud');

  return (
    <section id="chat">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">{t('chat.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('chat.headingHtml') }} />
          <p className="lede" style={{ marginTop: 16 }}>
            {t('chat.lede')}
          </p>
        </div>
        <div className="split">
          <div className="chat-feats rv">
            {feats.map((f) => (
              <div className="chat-feat" key={f.k}>
                <div className="ico">{f.ico}</div>
                <div>
                  <b>{t(`${f.k}.title`)}</b>
                  <p>{t(`${f.k}.body`)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="panel rv" id="chatPanel">
            <div className="chat">
              <div className="chat-head">
                <div className="chat-ava">🌿</div>
                <div className="who">
                  <b>{t('chat.companion')}</b>
                  <small>{t('chat.online')}</small>
                </div>
                <div className="chat-head-actions">
                  <span className="left-chip">
                    {chatsLeft === Infinity ? t('chat.leftChipPro') : t('chat.leftChip', { n: chatsLeft })}
                  </span>
                  <button className={`tts-toggle${ttsOn ? ' on' : ''}`} onClick={toggleTts}>
                    {ttsLabel}
                  </button>
                </div>
              </div>

              <div className="chat-log" ref={logRef} aria-live="polite">
                {messages.map((m) => {
                  if (m.kind === 'crisis') {
                    return (
                      <div className="msg ai crisis" key={m.id}>
                        {t('chat.crisisIntro')}
                        {CHAT_CRISIS_LINES.map((line) => (
                          <div key={line.href + line.label}>
                            <a href={line.href}>
                              <span className="iso">{line.code}</span> {line.label}: {line.num}
                            </a>
                          </div>
                        ))}
                        <div style={{ marginTop: 8 }}>{t('chat.crisisOutro')}</div>
                      </div>
                    );
                  }
                  if (m.kind === 'limit') {
                    return (
                      <div className="msg ai" key={m.id}>
                        {m.text}
                        <button
                          onClick={openUpgrade}
                          style={{
                            display: 'block',
                            marginTop: 10,
                            padding: '9px 18px',
                            borderRadius: 99,
                            background: 'linear-gradient(115deg,#6EE7D8,#A78BFA)',
                            color: '#06121A',
                            fontWeight: 600,
                            fontSize: '.85rem',
                          }}
                        >
                          {t('chat.limitUpgrade')}
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div className={`msg ${m.role}`} key={m.id}>
                      {m.text}
                    </div>
                  );
                })}
                {typing && (
                  <div className="msg ai typing">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
              </div>

              <div className="chips">
                {chips.map((c) => (
                  <button className="chip" key={c.say} onClick={() => sendText(c.say)}>
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="chat-in">
                <input
                  dir="auto"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendText(input);
                    }
                  }}
                  placeholder={t('chat.placeholder')}
                  autoComplete="off"
                  maxLength={600}
                  enterKeyHint="send"
                  inputMode="text"
                />
                <button className={`icobtn mic${recOn ? ' rec' : ''}`} aria-label={t('chat.micAria')} onClick={onMic}>
                  🎙️
                </button>
                <button className="icobtn send" aria-label={t('chat.sendAria')} onClick={() => sendText(input)}>
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
