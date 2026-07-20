# Aura AI — Project Handoff / Context Dump
*For continuing work in Claude Code. Everything below reflects the actual current state as of this handoff.*

---

## 1. What this project is

**Aura AI** — a private, multilingual AI mental-wellness companion website. Built as a **personal skill-showcase project** (explicitly NOT intended to be sold/producted as-is — it's a portfolio piece).

- **Live URL:** https://ashraful132003-debug.github.io/aura-ai/
- **GitHub repo:** `ashraful132003-debug/aura-ai` (public)
- **Sibling repo exists:** `ashraful132003-debug/aura-ai-backend` (not yet built/explored — likely intended for a future real backend)
- **Owner:** Ashraful (repo owner); developer doing the build/handoff is a collaborator

## 2. Architecture — read this first

**The entire site is ONE self-contained `index.html` file (~107KB).** No build step, no bundler, no npm install needed to run it. CSS is in a `<style>` block in `<head>`, all JS is in one `<script>` block before `</body>`. This was a deliberate choice for simple GitHub Pages deployment.

The repo also still contains legacy `app.js` and `styles.css` files from the original site — **these are unused/dead** since the current `index.html` is fully self-contained. Safe to ignore or delete them, they don't affect anything.

**Deployment method used so far:** manual "Add file → Upload files" on GitHub's web UI, commit directly to `main`, GitHub Pages auto-builds in ~2-3 min. No CI/CD pipeline exists yet.

## 3. Tech stack

- Vanilla HTML/CSS/JS — no framework, no React, no build tools
- **Three.js r128** (CDN) — 3D animated background orb (custom GLSL shader: noise + fresnel, breathing pulse animation, mouse parallax, auto-disables on no-WebGL/reduced-motion → falls back to CSS gradient blur)
- **Web Audio API** — soundscapes (rain/wind/ocean/campfire) are **synthesized live from filtered noise**, not recordings/music
- **Web Speech API** — `SpeechRecognition` for voice input, `speechSynthesis` for read-aloud
- **Canvas 2D** — dashboard's 14-day mood trend chart (hand-drawn, gradient line + area fill)
- **localStorage** — all persistence (see Data Model below); zero backend, zero accounts
- Fonts: **Fraunces** (serif, headings/display) + **Outfit** (sans, body) via Google Fonts CDN

## 4. Design tokens (CSS custom properties)

```
--bg: #070B14        --bg-2: #0B1120
--teal: #6EE7D8       --vio: #A78BFA        --peach: #FFC2B4
--ink: #EAF0FB         --mut: #93A0B8         --dim: #5D6A82
--grad: linear-gradient(115deg, var(--teal), var(--vio))
```
Dark navy background, teal→violet gradient as the signature brand accent, pill-shaped buttons, glassy `.panel` cards with subtle blur.

## 5. Full feature list (all implemented and working)

| Section | What it does |
|---|---|
| **Nav** | Sticky, blurs on scroll, language selector (desktop + mobile menu), hamburger for mobile |
| **Hero** | 3D orb, gradient headline, CTA buttons, trust badges |
| **Features** | 6 tilt-on-hover cards (desktop only — tilt disabled on touch) |
| **Soundscape** | Live-mixed rain/wind/ocean/campfire via Web Audio, canvas visualizer, presets |
| **Chat ("Talk to Aura")** | Rule-based keyword-matched responses (see §6), voice input, TTS readback, crisis detection |
| **Mood tracker** | 6 moods, daily check-in, weekly bar chart, contextual tips |
| **Breathing coach** | 3 patterns (Box 4-4-4-4, Focus 4-4-8, Sleep 4-7-8), animated orb + SVG progress ring, timer, cycle count |
| **Dashboard** | Usage meter, streak/stats, 14-day canvas trend chart, mood distribution bars, private journal (save/delete), daily affirmation, CSV export |
| **Safety** | Can/cannot-do lists, real crisis helplines (India/US/UK/Canada) as tappable `tel:`/`sms:` links |
| **Pricing** | Free / Pro Monthly ₹299 / Pro Yearly ₹2499 — **demo-only**, no real payment gateway wired |
| **FAQ** | 6 native `<details>` accordion items, zero JS |
| **Footer** | Standard link columns |

## 6. Chat system — IMPORTANT, be honest about this

**The chat is NOT a real LLM.** It's a keyword-matching engine: a `CRISIS` keyword array checked first (always bypasses the daily limit, surfaces real helpline numbers), then category regexes (overwhelm/sleep/anxious/focus/sad/grateful/stress/angry/greet) each mapped to a pool of pre-written empathetic responses, with a generic fallback pool if nothing matches.

**This was communicated honestly to the project owner** — it's presentable as a demo/prototype, but if this migrates toward being a real product, wiring in a real LLM backend (Claude API / Groq, using the existing but-empty `aura-ai-backend` repo) is the natural next step.

## 7. Token/usage system

- Free plan: **12 chats/day**, resets at **local midnight** (device timezone — this was a bug that got fixed, see §9)
- `localStorage['aura_usage']` = `{d: "YYYY-MM-DD", n: count}` — date key computed via local `getFullYear()/getMonth()/getDate()`, **not** `toISOString()` (that was the UTC bug)
- `localStorage['aura_plan']` = `'free'` or `'pro'`
- Crisis messages **always bypass** the limit, no exceptions
- Upgrade modal (`#upModal`) **simulates** Pro unlock instantly for demo purposes — clearly labeled as a demo in its own copy, no real Razorpay/Stripe integration yet

## 8. Data model — everything is localStorage, per-device, no accounts

| Key | Shape | Used by |
|---|---|---|
| `aura_moods` | `{ "YYYY-MM-DD": {m: moodName, v: 0-100} }` | Mood tracker, dashboard streak/trend/distribution |
| `aura_usage` | `{ d: "YYYY-MM-DD", n: count }` | Chat token limit |
| `aura_plan` | `"free"` \| `"pro"` | Plan gating |
| `aura_breath` | `{ s: totalSeconds, n: sessionCount }` | Dashboard breathing-minutes stat |
| `aura_journal` | `[{ d: displayDateString, t: text }, ...]` (max 50) | Dashboard journal |
| `aura_seen` | `"1"` | First-visit welcome toast, one-time |

**No cross-device sync. No accounts. Clearing browser data wipes everything.** This is a stated privacy feature, not a bug — but worth knowing if this ever needs to become a real multi-device product (would need Supabase/Firebase + auth at that point).

## 9. Bugs found and fixed this session (read before touching layout/CSS again)

1. **Midnight reset was UTC, not local** → `dayKey()` rewritten to use `getFullYear/getMonth/getDate()` instead of `toISOString().slice(0,10)`. This function is shared by mood tracker, streak calc, and token reset — one fix covered all three.
2. **Mobile chat header overflow** — the "12 left today" chip + "Read aloud" button kept overflowing/misbehaving across several flexbox attempts (text wrapping into 3 lines, then chip+button stacking as two full-width rows). **Final fix uses CSS Grid** (`grid-template-areas: "ava who" "actions actions"` at `max-width:560px`) — far more predictable than flex-wrap tricks for this kind of 2-row header layout.
3. **Floating "Back to Top" button overlapping the chat send button** on mobile — fixed two ways combined: (a) hide on `focusin`/`focusout` of any input/textarea, (b) `IntersectionObserver` on the chat panel (`#chatPanel`) toggling an `.in-chat` class that force-hides the button whenever the chat section is anywhere in view.
4. **Self-inflicted bug during an edit**: accidentally deleted 3 wrapper `<div>`s (`.chat`, `.chat-head`, `.chat-ava`) while adding an `id` attribute via a careless `str_replace`. **Lesson: always recount `<div>` open vs close tags after any structural edit** — that's how it was caught (158 vs 158 mismatch).
5. **Text overflow in `.chat-feat` paragraphs and helpline card labels** on narrow screens — root cause was flex children without `min-width:0`, which is a classic flexbox gotcha (flex items default to `min-width:auto`, blocking text-wrap in constrained containers). Fixed with `flex:1;min-width:0` + global `overflow-wrap:break-word` safety net.
6. **Greeting message too long**, required scrolling before user could see the input box. Shortened from ~185 to ~112 characters.
7. Chat panel height was tuned back and forth (540→480→560px, `max-height` 74svh→64svh→72svh) balancing "fits above the fold" vs "not cramped" — **560px / 72svh is the current final value.**

## 10. Testing constraints encountered (relevant if Claude Code has better tooling)

**No real browser/headless renderer was available in the sandbox used for this build** — `puppeteer` was installed but its bundled Chromium download was blocked by network egress rules (only specific package registries were whitelisted, not Google's Chromium storage CDN). All testing was done via:
- **jsdom** for functional/DOM/JS-logic testing (button clicks, state changes, localStorage) — this does NOT compute real visual layout
- Manual HTML tag-balance counting (`<div>` open vs close) after every structural edit
- Careful manual CSS reasoning (traced through flexbox/grid behavior by hand)
- **Real visual bugs were only caught via the project owner's own phone screenshots**, requiring several iterative rounds

**If Claude Code's environment has a working headless browser (Puppeteer/Playwright with actual Chromium), that would be a major upgrade** — real screenshot-based visual regression testing would have caught bugs #2 and #3 above in one shot instead of three rounds of guessing.

## 11. Known limitations (already disclosed honestly to the project owner)

1. Chat is rule-based, not a real LLM
2. Pro upgrade is simulated — no real payment processor
3. No accounts, no cross-device sync — pure per-device localStorage
4. No automated visual testing was possible in the build sandbox (see §10)

## 12. Not part of this website — separate deliverables from the same conversation

These were built for a *different* purpose (a Dubai real-estate side project) and are unrelated to Aura — mentioning only so they aren't confused as part of this handoff:
- Two Meta/Instagram ad videos (MP4, cinematic + "viral facts" style)
- A Meta ads copy pack (markdown)
- A LinkedIn promotional graphic + 3 cropped real-device screenshots used for a LinkedIn post about *this* Aura project

## 13. Suggested next steps (not started yet, just flagged as logical continuations)

- Wire real LLM backend (Claude API or Groq) into the chat, replacing/augmenting the rule-based engine — the empty `aura-ai-backend` repo was likely created for this
- If real payments are ever wanted: Razorpay/Stripe + a minimal backend to verify the Pro plan server-side (currently 100% client-side/spoofable, which is fine for a demo, not fine for a real paid product)
- If cross-device sync is ever wanted: would need real accounts (Supabase/Firebase auth) — a significant architecture change from the current zero-backend design, not a small patch

---
*Current file: `index.html`, ~107KB, single file, last known-good state as fixed in this conversation.*