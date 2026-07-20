// Shared domain types for Aura AI.

export type Lang = 'en' | 'hi' | 'ar' | 'ur' | 'es' | 'fr';

export type Plan = 'free' | 'pro';

/** Which pricing SKU triggered an upgrade — kept so the modal can reflect it. */
export type PlanIntent = 'free' | 'pro-monthly' | 'pro-yearly';

export type MoodName = 'calm' | 'stressed' | 'focused' | 'tired' | 'sad' | 'grateful';

export interface MoodEntry {
  /** mood name */
  m: MoodName;
  /** clarity value 0–100 */
  v: number;
}

/** localStorage `aura_moods` — keyed by local YYYY-MM-DD. */
export type MoodStore = Record<string, MoodEntry>;

/** localStorage `aura_usage`. */
export interface Usage {
  /** day key the count belongs to */
  d: string;
  /** number of chats consumed */
  n: number;
}

/** localStorage `aura_breath`. */
export interface BreathStat {
  /** total seconds practised */
  s: number;
  /** completed session count */
  n: number;
}

/** localStorage `aura_journal` entry. */
export interface JournalEntry {
  /** display date string */
  d: string;
  /** entry text */
  t: string;
}

export type ChatRole = 'me' | 'ai';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  /** special render kind */
  kind?: 'text' | 'crisis' | 'limit';
}
