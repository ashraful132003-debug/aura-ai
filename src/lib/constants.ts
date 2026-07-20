// Non-prose data constants (structure, numbers, emoji). Translatable prose lives
// in the i18n dictionaries; long-form English content arrays live here for now.

import type { MoodName } from './types';

export const CHAT_LIMIT = 12;

export interface MoodDef {
  key: MoodName;
  emoji: string;
  /** clarity value 0–100 */
  value: number;
}

export const MOODS: MoodDef[] = [
  { key: 'calm', emoji: '😊', value: 90 },
  { key: 'stressed', emoji: '😰', value: 45 },
  { key: 'focused', emoji: '🧠', value: 85 },
  { key: 'tired', emoji: '😴', value: 55 },
  { key: 'sad', emoji: '😢', value: 40 },
  { key: 'grateful', emoji: '🤲', value: 95 },
];

export const MOOD_META: Record<MoodName, { emoji: string; label: string }> = {
  calm: { emoji: '😊', label: 'Calm' },
  stressed: { emoji: '😰', label: 'Stressed' },
  focused: { emoji: '🧠', label: 'Focused' },
  tired: { emoji: '😴', label: 'Tired' },
  sad: { emoji: '😢', label: 'Sad' },
  grateful: { emoji: '🤲', label: 'Grateful' },
};

export interface BreathPattern {
  key: string;
  /** [inhale, hold, exhale, hold] in seconds; 0 means skipped */
  seq: [number, number, number, number];
}

export const BREATH_PATTERNS: BreathPattern[] = [
  { key: 'box', seq: [4, 4, 4, 4] },
  { key: 'focus', seq: [4, 4, 8, 0] },
  { key: 'sleep', seq: [4, 7, 8, 0] },
];

export const BREATH_PHASE_NAMES = ['Inhale', 'Hold', 'Exhale', 'Hold'];

export interface HelplineRegion {
  flag: string;
  name: string;
  entries: { label: string; num: string; href: string }[];
}

export const HELPLINES: HelplineRegion[] = [
  {
    flag: '🇮🇳',
    name: 'India',
    entries: [
      { label: 'Vandrevala Foundation', num: '+91 9999 666 555', href: 'tel:+919999666555' },
      { label: 'KIRAN Helpline', num: '1800-599-0019', href: 'tel:18005990019' },
    ],
  },
  {
    flag: '🇺🇸',
    name: 'United States',
    entries: [
      { label: 'Suicide & Crisis Lifeline', num: 'Call/text 988', href: 'tel:988' },
      { label: 'Crisis Text Line', num: 'Text HOME · 741741', href: 'sms:741741' },
    ],
  },
  {
    flag: '🇬🇧',
    name: 'United Kingdom',
    entries: [
      { label: 'Samaritans UK', num: '116 123', href: 'tel:116123' },
      { label: 'NHS Mental Health', num: '111', href: 'tel:111' },
    ],
  },
  {
    flag: '🇨🇦',
    name: 'Canada',
    entries: [{ label: 'Suicide Crisis Helpline', num: 'Call/text 988', href: 'tel:988' }],
  },
];

/** Crisis helplines surfaced inside a chat bubble (subset of HELPLINES). */
export const CHAT_CRISIS_LINES = [
  { label: '🇮🇳 Vandrevala Foundation', num: '+91 9999 666 555', href: 'tel:+919999666555' },
  { label: '🇮🇳 KIRAN', num: '1800-599-0019', href: 'tel:18005990019' },
  { label: '🇺🇸 Call or text', num: '988', href: 'tel:988' },
  { label: '🇬🇧 Samaritans', num: '116 123', href: 'tel:116123' },
];

export const MOOD_TIPS: Record<MoodName, string> = {
  calm: '😊 Beautiful. Calm is worth protecting — a short soundscape session can help you carry this feeling through the rest of your day.',
  stressed:
    '😰 Noted, gently. Try the Box Breathing exercise below (4·4·4·4) — 60 seconds is often enough to lower the pressure a notch.',
  focused:
    '🧠 Great state to be in! Ride the momentum: pick your most important task and give it one distraction-free sprint.',
  tired:
    '😴 Rest is productive too. If you can, take a 10-minute pause — and tonight, the 4-7-8 sleep breathing can help you wind down deeper.',
  sad: "😢 Thank you for being honest with yourself. Be gentle today. If you'd like, talk it through with Aura above — she's here to listen.",
  grateful:
    '🤲 Wonderful. Gratitude compounds — take ten seconds to really savor what brought this feeling. It trains your mind toward peace.',
};

export const DASH_TIPS = [
  '💡 Tip: a single 60-second breathing session can measurably lower stress — try one today.',
  '💡 Tip: logging your mood at the same time each day makes your trend far more meaningful.',
  '💡 Tip: pairing the Ocean soundscape with box breathing deepens the calming effect.',
  '💡 Tip: streaks build habits — even a 10-second check-in keeps yours alive.',
  '💡 Tip: notice your strongest day of the week and ask what made it different.',
];

export const AFFIRMATIONS = [
  "I don't have to carry everything at once. One breath, one step, is enough.",
  'My feelings are visitors. I can greet them without letting them move in.',
  'Rest is not a reward I must earn. It is part of the work.',
  'I am allowed to grow slowly. Even rivers take the long way to the sea.',
  'Today I will speak to myself the way I would speak to a dear friend.',
  'Calm is not the absence of storms — it is knowing I can stand in them.',
  'I release what I cannot control, and give my energy to what I can.',
];

/** BCP-47 codes for Web Speech (recognition + synthesis) per app language. */
export const SPEECH_LANGS: Record<string, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  ar: 'ar-SA',
  ur: 'ur-PK',
  es: 'es-ES',
  fr: 'fr-FR',
};
