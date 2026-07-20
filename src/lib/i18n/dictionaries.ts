// i18n dictionaries. English is the complete source of truth for ALL visible UI
// copy. Other languages provide a vetted subset (nav, hero, primary CTAs,
// greeting); any missing key falls back to English via the provider. This is the
// honest "English-first" model — no machine-translated long-form prose is shipped
// as if it were reviewed.

import type { Lang } from '../types';

export type Dict = Record<string, string>;

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: '🌐 English', short: '🌐 EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिन्दी' },
  { code: 'ar', label: 'العربية', short: 'العربية' },
  { code: 'ur', label: 'اردو', short: 'اردو' },
  { code: 'es', label: 'Español', short: 'Español' },
  { code: 'fr', label: 'Français', short: 'Français' },
];

export const RTL_LANGS: Lang[] = ['ar', 'ur'];

export const en: Dict = {
  // ---- nav ----
  'nav.features': 'Features',
  'nav.soundscapes': 'Soundscapes',
  'nav.chat': 'Talk to Aura',
  'nav.mood': 'Mood',
  'nav.moodLong': 'Mood Tracker',
  'nav.breathing': 'Breathing',
  'nav.dashboard': 'Dashboard',
  'nav.safety': 'Safety',
  'nav.faq': 'FAQ',
  'nav.pricing': 'Pricing',
  'nav.cta': 'Get Started',
  'nav.menu': 'Menu',
  'nav.langAria': 'Language',
  'nav.home': 'Aura AI home',

  // ---- hero ----
  'hero.tag': 'Wellness-focused · Private · Multilingual',
  'hero.h1Html': 'A safe space for your <span class="h-em">thoughts, anytime.</span>',
  'hero.lede':
    'Aura is a compassionate AI companion that truly listens, understands, and responds with genuine care. Talk, breathe, and track your wellbeing — in any language, on any device.',
  'hero.talk': 'Talk to Aura',
  'hero.explore': 'Explore Soundscapes',
  'hero.trust1': '🛡️ 100% Private & Local',
  'hero.trust2': '🌐 6 Languages',
  'hero.trust3': '🍃 Instrument-Free Audio',
  'hero.trust4': '🤝 Safety Guardrails',

  // ---- features ----
  'features.eyebrow': 'What Aura offers',
  'features.headingHtml': 'Everything you need <span class="h-em">to feel heard</span>',
  'features.lede': 'A thoughtfully designed space that respects your faith, your privacy, and your emotions.',
  'features.c1.title': 'Empathetic AI Companion',
  'features.c1.body':
    'Talk or type freely. Aura listens without judgment, responds with care, and stays strictly within mental wellness — no off-topic detours.',
  'features.c2.title': 'Natural Soundscapes',
  'features.c2.body':
    'Synthesized rainfall, wind, ocean and campfire — created mathematically in your browser. Zero music, zero instruments. Suitable for everyone.',
  'features.c3.title': 'Guided Breathing Coach',
  'features.c3.body':
    'Box breathing, focus breathing, and 4-7-8 sleep induction — all in complete silence. Clinically grounded, silent by design.',
  'features.c4.title': 'Mood & Wellness Tracker',
  'features.c4.body':
    'Log how you feel each day, get a personal recommendation, and watch your weekly wellness trends unfold in a simple visual chart.',
  'features.c5.title': 'Voice Recognition',
  'features.c5.body':
    'Too drained to type? Simply speak. Aura converts your voice into text and can read her responses back in a calm, soothing tone.',
  'features.c6.title': 'Absolute Privacy',
  'features.c6.body':
    'Every conversation stays in your browser — never sent to a server, never stored externally. Your thoughts belong to you alone.',

  // ---- soundscape ----
  'sound.eyebrow': 'Aura Wave',
  'sound.headingHtml': 'Generative natural <span class="h-em">soundscapes</span>',
  'sound.lede':
    'Pure synthesized nature — no recordings, no instruments, no music. Just calming textures of rain, wind, ocean and fire, built from sound physics in real time.',
  'sound.rain': '🌧️ Rainfall',
  'sound.wind': '🍃 Wind',
  'sound.ocean': '🌊 Ocean',
  'sound.fire': '🔥 Campfire',
  'sound.generate': '▶ Generate Soundscape',
  'sound.pause': '⏸ Pause Soundscape',
  'sound.preset': '✨ Calm preset',
  'sound.unavailable': 'Audio unavailable in this browser',
  'sound.note':
    '🛡️ All ambient textures are synthesized live using filtered-noise mathematics. No instruments, no songs — completely clean and safe for all listeners.',

  // ---- chat ----
  'chat.eyebrow': '24/7 Companion',
  'chat.headingHtml': 'Talk to Aura, <span class="h-em">anytime you need</span>',
  'chat.lede':
    "Aura listens without judgment. Whether you're anxious, burnt out, or just need someone — she's here.",
  'chat.feat1.title': 'Voice input',
  'chat.feat1.body': 'Tap the mic to speak instead of type. Aura transcribes and responds.',
  'chat.feat2.title': 'Audio readback',
  'chat.feat2.body': 'Enable Aura to read her responses aloud in a calm, soothing voice.',
  'chat.feat3.title': '6 languages',
  'chat.feat3.body': 'Aura understands and replies in Hindi, Arabic, Urdu, Spanish or French — just switch language.',
  'chat.feat4.title': 'Crisis detection',
  'chat.feat4.body': "If you're in danger, Aura immediately surfaces crisis helpline numbers for your region.",
  'chat.companion': 'Aura AI Companion',
  'chat.online': 'Always here for you',
  'chat.leftChip': '{n} left today',
  'chat.leftChipPro': 'Pro · unlimited',
  'chat.readAloud': '🔊 Read aloud',
  'chat.reading': '🔊 Reading aloud',
  'chat.ttsUnsupported': '🔇 Not supported',
  'chat.chip1.say': 'I feel overwhelmed',
  'chat.chip1.label': '😰 I feel overwhelmed',
  'chat.chip2.say': "I can't sleep",
  'chat.chip2.label': "😴 Can't sleep",
  'chat.chip3.say': 'I need help focusing',
  'chat.chip3.label': '🧠 Need focus tips',
  'chat.chip4.say': "I'm feeling anxious",
  'chat.chip4.label': '💭 Feeling anxious',
  'chat.placeholder': "Share what's on your mind…",
  'chat.greet':
    "Hello — I'm Aura, your safe private space. 🌿 I'm here to listen and support you. How are you feeling right now?",
  'chat.limit':
    "You've used all {limit} free chats for today — they refresh at midnight. 🌙 I'll still be right here. If you'd like unlimited conversations, Pro removes the limit. ",
  'chat.limitUpgrade': '✨ Upgrade to Pro',
  'chat.crisisIntro':
    "I'm really glad you told me, and I'm concerned about you. You deserve support from a real person right now. 💛 Please reach out to a free, confidential helpline:",
  'chat.crisisOutro':
    'You are not alone, and this feeling can pass. Would you like to try a slow breathing exercise together while you reach out?',
  'chat.voiceUnsupported': "Voice input isn't supported in this browser — but typing works perfectly. 🌿",
  'chat.micError': "I couldn't access the microphone. Typing works just as well. 🌿",
  'chat.sendAria': 'Send',
  'chat.micAria': 'Voice input',

  // ---- mood ----
  'mood.eyebrow': 'Wellness Tracker',
  'mood.headingHtml': 'How are you feeling <span class="h-em">today?</span>',
  'mood.lede':
    'A simple daily check-in that helps you understand your emotional patterns over time. Saved privately on your device.',
  'mood.selectPrompt': 'Select your mood right now',
  'mood.calm': 'Calm',
  'mood.stressed': 'Stressed',
  'mood.focused': 'Focused',
  'mood.tired': 'Tired',
  'mood.sad': 'Sad',
  'mood.grateful': 'Grateful',
  'mood.weekHeading': 'Your weekly clarity score',
  'mood.average': 'average this week',
  'mood.insightDefault':
    '<b>💡 Weekly insight:</b> log your first mood to start seeing patterns. Even one check-in a day builds a clearer picture of your week.',
  'mood.insightStrongCalm':
    '<b>💡 Weekly insight:</b> your strongest day was <b>{day}</b> ({val}%). You’re trending calm — keep the routines that got you here.',
  'mood.insightStrongDip':
    '<b>💡 Weekly insight:</b> your strongest day was <b>{day}</b> ({val}%). Midweek dips are common — a 60-second breathing session on harder days can lift your baseline.',
  'mood.day.sun': 'Sun',
  'mood.day.mon': 'Mon',
  'mood.day.tue': 'Tue',
  'mood.day.wed': 'Wed',
  'mood.day.thu': 'Thu',
  'mood.day.fri': 'Fri',
  'mood.day.sat': 'Sat',

  // ---- breathing ----
  'breath.eyebrow': 'Breathing Coach',
  'breath.headingHtml': 'Settle your nervous system <span class="h-em">in under a minute</span>',
  'breath.lede': 'Clinically backed breathing patterns — in complete silence. No music, no sounds. Just your breath.',
  'breath.box.title': 'Box Breathing',
  'breath.box.body': 'Equal cycles for immediate calm. Perfect during stress or anxiety spikes.',
  'breath.focus.title': 'Focus Breathing',
  'breath.focus.body': 'Deep intake with long exhale to sharpen mental clarity and alertness.',
  'breath.sleep.title': 'Sleep Induction',
  'breath.sleep.body': 'The 4-7-8 pattern helps trigger melatonin naturally. Ideal before sleep.',
  'breath.note': '🤍 All exercises run in complete silence — no background audio of any kind.',
  'breath.ready': 'Ready',
  'breath.start': 'Start Breathing',
  'breath.stop': 'Stop',
  'breath.cycles': 'cycles',
  'breath.phase.inhale': 'Inhale',
  'breath.phase.hold': 'Hold',
  'breath.phase.exhale': 'Exhale',

  // ---- dashboard ----
  'dash.eyebrow': 'Your Dashboard',
  'dash.headingHtml': 'Your wellness, <span class="h-em">at a glance</span>',
  'dash.lede':
    'Everything below is computed live from your own activity on this device — nothing leaves your browser.',
  'dash.today': 'Today',
  'dash.usageTitle': '⚡ Daily chat usage',
  'dash.usageInit': '0 / {limit} used · resets at midnight',
  'dash.usageFree': 'Chats: {n} / {limit} used · resets {reset}',
  'dash.usagePro': 'Unlimited chats on Pro — enjoy',
  'dash.resetHours': 'in {h}h',
  'dash.resetSoon': 'in <1h',
  'dash.planFree': 'Free plan',
  'dash.planPro': 'Pro plan',
  'dash.upgrade': 'Upgrade',
  'dash.manage': 'Manage plan',
  'dash.stat.streak': '🔥 Streak',
  'dash.stat.streakSub': 'days in a row',
  'dash.stat.checkins': '📝 Check-ins',
  'dash.stat.checkinsSub': 'moods logged',
  'dash.stat.clarity': '✨ Clarity',
  'dash.stat.claritySub': '7-day average',
  'dash.stat.breathing': '🫁 Breathing',
  'dash.stat.breathingSub': 'total practiced',
  'dash.trendHeading': '📈 14-day mood trend',
  'dash.trendEmpty': 'Your 14-day trend will draw itself here after your first check-ins 🌿',
  'dash.distHeading': '🌈 Mood distribution',
  'dash.distEmpty': 'Log your first mood in the tracker above and your patterns will appear here. 🌿',
  'dash.export': '⬇ Export mood data (CSV)',
  'dash.journalHeading': '📓 Private journal',
  'dash.journalPlaceholder': 'Write a few honest lines about today… (saved only on this device)',
  'dash.journalSave': 'Save entry',
  'dash.journalDelete': 'Delete',
  'dash.affirmHeading': '🌅 Affirmation of the day',
  'dash.affirmSub': 'Read it slowly, twice. Let it settle before you scroll on.',
  'dash.remindHeading': '🔔 Gentle reminders',
  'dash.remindBody':
    'Check in with your mood once a day, breathe for 60 seconds when stress spikes, and write one journal line before bed. Small rituals, compounded daily, are how calm is built.',

  // ---- faq ----
  'faq.eyebrow': 'FAQ',
  'faq.headingHtml': 'Questions, <span class="h-em">answered</span>',
  'faq.q1': 'Is Aura really private?',
  'faq.a1':
    'Yes. Your conversations, moods and journal entries are stored only in your own browser (localStorage) — nothing is sent to a server, and there are no trackers, ads or analytics scripts on this site.',
  'faq.q2': 'Is Aura a replacement for therapy?',
  'faq.a2':
    'No. Aura is a wellness companion for everyday support — listening, breathing, mood awareness. It cannot diagnose or treat any condition, and it will always encourage professional help when a conversation suggests you need it.',
  'faq.q3': 'What happens if I run out of daily chats?',
  'faq.a3':
    'The Free plan includes 12 chats per day, which reset at midnight. Pro removes the limit entirely. Crisis-related messages are never blocked by the limit — safety always comes first.',
  'faq.q4': 'Why is there no music in the soundscapes?',
  'faq.a4':
    'Every ambient texture — rain, wind, ocean, campfire — is synthesized live from filtered-noise mathematics. No recordings, no instruments, no melodies. This keeps the audio clean, universally acceptable, and endlessly loopable.',
  'faq.q5': 'Which languages does Aura support?',
  'faq.a5':
    'The interface, greeting, voice input and read-aloud work in English, Hindi, Arabic, Urdu, Spanish and French, and right-to-left layouts (Arabic, Urdu) are supported. Aura’s chat replies are generated by an AI language model and answer in your chosen language.',
  'faq.q6': 'Does it work on my phone?',
  'faq.a6':
    "Yes — the entire experience is built mobile-first and works on any modern phone, tablet or computer. If a device can't run the 3D background, Aura automatically switches to a lightweight version with zero errors.",

  // ---- about ----
  'about.eyebrow': 'Our Story',
  'about.headingHtml': 'Built with purpose, <span class="h-em">grounded in values</span>',
  'about.p1Html':
    'Aura was created out of a simple belief: <b style="color:var(--ink);font-weight:600">everyone deserves access to mental wellness support</b> — regardless of language, culture, or faith background.',
  'about.p2':
    "Wellness apps often feel cold, clinical, or disconnected from real human emotion. They don't truly listen — they just respond. Aura was built to change that.",
  'about.val1': 'Designed with care, empathy, and genuine respect for every person',
  'about.val2': 'No advertising, no data harvesting, no third-party trackers',
  'about.val3': 'A companion, not a replacement for professional care',
  'about.val4': 'Open to all — regardless of faith or background',
  'about.tagline': 'A safe space for your thoughts — built with care, for everyone.',
  'about.stat1': 'Languages',
  'about.stat2': 'Core tools',
  'about.stat3': 'Data collected',

  // ---- safety ----
  'safety.eyebrow': 'Safety & Ethics',
  'safety.headingHtml': 'Clear boundaries. <span class="h-em">Real care.</span>',
  'safety.lede':
    "Aura is a mental wellness companion — not a therapist. We're transparent about what we can and can't do.",
  'safety.canHeading': '✅ What Aura can do',
  'safety.can1': 'Offer empathetic, active listening and comfort',
  'safety.can2': 'Guide evidence-based breathing and relaxation exercises',
  'safety.can3': 'Suggest sleep hygiene, organisation, and lifestyle tips',
  'safety.can4': 'Track your mood and show weekly wellness patterns',
  'safety.can5': 'Keep conversations fully private on your device',
  'safety.cantHeading': '❌ What Aura cannot do',
  'safety.cant1': 'Provide medical diagnoses or prescribe medication',
  'safety.cant2': 'Replace professional therapy or psychiatric care',
  'safety.cant3': 'Answer general knowledge or unrelated queries',
  'safety.cant4': 'Guarantee outcomes or clinical results',
  'safety.cant5': 'Ignore signs of crisis — safety always comes first',
  'safety.crisisHeading': '🚨 If you are in immediate danger',
  'safety.crisisBody':
    'Please reach out to a free, confidential crisis service right now. You are not alone.',

  // ---- pricing ----
  'pricing.eyebrow': 'Pricing',
  'pricing.headingHtml': 'Choose your <span class="h-em">plan</span>',
  'pricing.lede': 'Start free. Upgrade when ready. Cancel anytime. No hidden fees.',
  'pricing.free': 'Free',
  'pricing.freePeriod': ' / forever',
  'pricing.free1': '12 AI chats per day',
  'pricing.free2': 'Basic mood tracker',
  'pricing.free3': '3 breathing exercises',
  'pricing.free4': 'Soundscapes',
  'pricing.free5': 'Unlimited chats',
  'pricing.free6': 'Full analytics',
  'pricing.freeBtn': '✓ Current Plan',
  'pricing.popular': 'Most Popular',
  'pricing.monthly': 'Pro Monthly',
  'pricing.monthlyPeriod': ' / per month',
  'pricing.monthly1': 'Unlimited AI chats',
  'pricing.monthly2': 'Full mood analytics',
  'pricing.monthly3': 'All breathing patterns',
  'pricing.monthly4': 'All soundscapes',
  'pricing.monthly5': 'Voice readback',
  'pricing.monthly6': 'Priority support',
  'pricing.monthlyBtn': 'Get Pro Monthly',
  'pricing.save': 'Save 30%',
  'pricing.yearly': 'Pro Yearly',
  'pricing.yearlyPeriod': ' / per year',
  'pricing.yearly1': 'Everything in Pro Monthly',
  'pricing.yearly2': '2 months free',
  'pricing.yearly3': 'Early access to features',
  'pricing.yearly4': 'Export mood data CSV',
  'pricing.yearly5': 'Dedicated support',
  'pricing.yearlyBtn': 'Get Pro Yearly',
  'pricing.note': '🔒 Secure via Razorpay · 🌍 Works worldwide · ❤️ Cancel anytime · 🛡️ Privacy first',

  // ---- footer ----
  'footer.brand': 'A compassionate mental wellness companion. Private, multilingual, and designed for everyone, everywhere.',
  'footer.featuresH': 'Features',
  'footer.aboutH': 'About',
  'footer.aboutStory': 'Our Story',
  'footer.aboutOffer': 'What We Offer',
  'footer.supportH': 'Support',
  'footer.supportCrisis': 'Crisis Lines',
  'footer.copyright': '© 2026 Aura AI. Built with care, for everyone. All conversations stay in your browser.',
  'footer.privacy': 'Privacy',

  // ---- modal ----
  'modal.title': 'Upgrade to Aura Pro',
  'modal.desc': 'Unlimited conversations, full analytics and every feature — for less than a coffee a week.',
  'modal.perk1': 'Unlimited AI chats every day',
  'modal.perk2': 'Full mood analytics & CSV export',
  'modal.perk3': 'All breathing patterns & soundscapes',
  'modal.perk4': 'Voice readback & priority support',
  'modal.unlock': '✨ Unlock Pro — demo',
  'modal.switchFree': 'Switch back to Free',
  'modal.later': 'Maybe later',
  'modal.close': 'Close',
  'modal.note':
    'This is a live product demo — the button above simulates the Pro plan instantly so you can experience the full upgrade flow. In production it connects to Razorpay / Stripe checkout.',

  // ---- toasts ----
  'toast.welcome': 'Welcome to Aura 🌿 Everything here stays private on your device.',
  'toast.threeLeft': '3 free chats left today',
  'toast.proUnlocked': '✨ Pro unlocked — unlimited chats (demo)',
  'toast.switchedFree': 'Switched to Free plan',
  'toast.alreadyFree': "You're already on the Free plan 🌿",
  'toast.journalSaved': 'Journal entry saved — only on this device 📓',
  'toast.journalDeleted': 'Entry deleted',
  'toast.writeFirst': 'Write a line first 🌿',
  'toast.exported': 'Mood history exported ⬇',
  'toast.nothingExport': 'Log a mood first — nothing to export yet',
  'toast.exportUnsupported': 'Export not supported in this browser',

  // ---- loader ----
  'loader.brand': 'Aura',

  // ---- a11y ----
  'a11y.backToTop': 'Back to top',
};

// Vetted subset for other languages — nav, hero, primary CTAs, greeting.
// Everything not present here falls back to English.

const hi: Dict = {
  'nav.features': 'सुविधाएँ',
  'nav.soundscapes': 'साउंडस्केप',
  'nav.chat': 'Aura से बात करें',
  'nav.mood': 'मूड',
  'nav.moodLong': 'मूड ट्रैकर',
  'nav.breathing': 'श्वास',
  'nav.dashboard': 'डैशबोर्ड',
  'nav.safety': 'सुरक्षा',
  'nav.faq': 'सामान्य प्रश्न',
  'nav.pricing': 'मूल्य',
  'nav.cta': 'शुरू करें',
  'hero.tag': 'वेलनेस-केंद्रित · निजी · बहुभाषी',
  'hero.h1Html': 'आपके विचारों के लिए <span class="h-em">एक सुरक्षित जगह।</span>',
  'hero.lede':
    'Aura एक संवेदनशील AI साथी है जो सच में सुनता है, समझता है और परवाह से जवाब देता है। किसी भी भाषा में बात करें, सांस लें और अपनी सेहत ट्रैक करें।',
  'hero.talk': 'Aura से बात करें',
  'hero.explore': 'साउंडस्केप सुनें',
  'chat.online': 'हमेशा आपके साथ',
  'chat.placeholder': 'अपने मन की बात लिखें…',
  'chat.greet': 'नमस्ते — मैं Aura हूँ। यह आपके लिए बनाई गई एक सुरक्षित, निजी जगह है। 🌿\n\nआप अभी कैसा महसूस कर रहे हैं?',
};

const ar: Dict = {
  'nav.features': 'الميزات',
  'nav.soundscapes': 'الأصوات',
  'nav.chat': 'تحدّث مع Aura',
  'nav.mood': 'المزاج',
  'nav.moodLong': 'متتبع المزاج',
  'nav.breathing': 'التنفّس',
  'nav.dashboard': 'لوحة المعلومات',
  'nav.safety': 'الأمان',
  'nav.faq': 'الأسئلة الشائعة',
  'nav.pricing': 'الأسعار',
  'nav.cta': 'ابدأ الآن',
  'hero.tag': 'خصوصية تامة · متعدد اللغات',
  'hero.h1Html': 'مساحة آمنة <span class="h-em">لأفكارك، في أي وقت.</span>',
  'hero.lede':
    'Aura رفيق ذكاء اصطناعي حنون يستمع إليك حقًا ويفهمك ويرد باهتمام صادق. تحدث وتنفّس وتابع صحتك النفسية بأي لغة.',
  'hero.talk': 'تحدث مع Aura',
  'hero.explore': 'استكشف الأصوات',
  'chat.online': 'هنا دائمًا من أجلك',
  'chat.placeholder': 'شارك ما يدور في ذهنك…',
  'chat.greet': 'مرحبًا — أنا Aura. هذه مساحة آمنة وخاصة صُممت من أجلك. 🌿\n\nكيف تشعر الآن؟',
};

const ur: Dict = {
  'nav.features': 'خصوصیات',
  'nav.soundscapes': 'ساؤنڈ اسکیپس',
  'nav.chat': 'Aura سے بات کریں',
  'nav.mood': 'موڈ',
  'nav.moodLong': 'موڈ ٹریکر',
  'nav.breathing': 'سانس',
  'nav.dashboard': 'ڈیش بورڈ',
  'nav.safety': 'حفاظت',
  'nav.faq': 'سوالات',
  'nav.pricing': 'قیمتیں',
  'nav.cta': 'شروع کریں',
  'hero.tag': 'نجی · کثیر اللسانی',
  'hero.h1Html': 'آپ کے خیالات کے لیے <span class="h-em">ایک محفوظ جگہ۔</span>',
  'hero.lede':
    'Aura ایک ہمدرد AI ساتھی ہے جو واقعی سنتا ہے، سمجھتا ہے اور خلوص سے جواب دیتا ہے۔ کسی بھی زبان میں بات کریں، سانس لیں اور اپنی صحت کا خیال رکھیں۔',
  'hero.talk': 'Aura سے بات کریں',
  'hero.explore': 'ساؤنڈ اسکیپس',
  'chat.online': 'ہمیشہ آپ کے ساتھ',
  'chat.placeholder': 'اپنے دل کی بات لکھیں…',
  'chat.greet': 'السلام علیکم — میں Aura ہوں۔ یہ آپ کے لیے ایک محفوظ اور نجی جگہ ہے۔ 🌿\n\nآپ اس وقت کیسا محسوس کر رہے ہیں؟',
};

const es: Dict = {
  'nav.features': 'Funciones',
  'nav.soundscapes': 'Sonidos',
  'nav.chat': 'Habla con Aura',
  'nav.mood': 'Ánimo',
  'nav.moodLong': 'Registro de ánimo',
  'nav.breathing': 'Respiración',
  'nav.dashboard': 'Panel',
  'nav.safety': 'Seguridad',
  'nav.faq': 'Preguntas',
  'nav.pricing': 'Precios',
  'nav.cta': 'Empezar',
  'hero.tag': 'Bienestar · Privado · Multilingüe',
  'hero.h1Html': 'Un espacio seguro para <span class="h-em">tus pensamientos.</span>',
  'hero.lede':
    'Aura es una compañera de IA compasiva que realmente escucha, comprende y responde con cuidado genuino. Habla, respira y registra tu bienestar en cualquier idioma.',
  'hero.talk': 'Habla con Aura',
  'hero.explore': 'Explorar sonidos',
  'chat.online': 'Siempre aquí para ti',
  'chat.placeholder': 'Comparte lo que piensas…',
  'chat.greet': 'Hola — soy Aura. Este es un espacio seguro y privado diseñado para ti. 🌿\n\n¿Cómo te sientes ahora mismo?',
};

const fr: Dict = {
  'nav.features': 'Fonctions',
  'nav.soundscapes': 'Sons',
  'nav.chat': 'Parler à Aura',
  'nav.mood': 'Humeur',
  'nav.moodLong': "Suivi d'humeur",
  'nav.breathing': 'Respiration',
  'nav.dashboard': 'Tableau de bord',
  'nav.safety': 'Sécurité',
  'nav.faq': 'FAQ',
  'nav.pricing': 'Tarifs',
  'nav.cta': 'Commencer',
  'hero.tag': 'Bien-être · Privé · Multilingue',
  'hero.h1Html': 'Un espace sûr pour <span class="h-em">vos pensées.</span>',
  'hero.lede':
    "Aura est une compagne IA bienveillante qui écoute vraiment, comprend et répond avec une attention sincère. Parlez, respirez et suivez votre bien-être dans n'importe quelle langue.",
  'hero.talk': 'Parler à Aura',
  'hero.explore': 'Explorer les sons',
  'chat.online': 'Toujours là pour vous',
  'chat.placeholder': 'Partagez ce qui vous préoccupe…',
  'chat.greet': "Bonjour — je suis Aura. Ceci est un espace sûr et privé conçu pour vous. 🌿\n\nComment vous sentez-vous en ce moment ?",
};

export const dictionaries: Record<Lang, Dict> = { en, hi, ar, ur, es, fr };
