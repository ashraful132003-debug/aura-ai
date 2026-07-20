// Date helpers. dayKey uses LOCAL calendar fields (not toISOString) so the daily
// reset happens at the device's local midnight — shared by mood tracker, streak
// calculation, and the chat token limit.

export function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayKey(): string {
  return dayKey(new Date());
}

/** Whole hours until the next local midnight (minimum reported is 1). */
export function hoursToMidnight(): number {
  const now = new Date();
  const mid = new Date(now);
  mid.setHours(24, 0, 0, 0);
  return Math.max(1, Math.ceil((mid.getTime() - now.getTime()) / 3600000));
}
