/* ==========================================================================
   Aura AI - Core Application Logic, Localization and Audio Synthesis
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLocalization();
    initAuraWaveCanvas();
    initAuraNaturalSynthesizer();
    initSpeechRecognitionAndSynthesis();
    initEmpatheticChatbot();
    initMoodTracker();
    initBreathingCoach();
    initNavigationDrawer();
});

/* ==========================================================================
   1. GLOBAL LOCALIZATION DICTIONARY & ENGINE
   ========================================================================== */
const LANGUAGES = {
    en: { name: 'English', rtl: false },
    hi: { name: 'हिन्दी (Hindi)', rtl: false },
    ar: { name: 'العربية (Arabic)', rtl: true },
    es: { name: 'Español (Spanish)', rtl: false },
    fr: { name: 'Français (French)', rtl: false },
    ur: { name: 'اردو (Urdu)', rtl: true }
};

let currentLanguage = 'en';

const TRANSLATIONS = {
    en: {
        // Navigation
        'nav-features': 'Features',
        'nav-wave': 'Aura Wave',
        'nav-chat': 'Meet Aura',
        'nav-mood': 'Mood Tracker',
        'nav-breathing': 'Breathing',
        'nav-safety': 'Safety',
        'nav-cta': 'Start Free',
        
        // Hero
        'badge-halal': '100% Halal Certified - Strictly No Music',
        'hero-title': 'A Safe Space for Your Thoughts, Anytime.',
        'hero-desc': 'Experience the world\'s first voice-activated, multilingual mental wellness companion. Safe, compassionate, and built completely free of music or forbidden themes—tailored strictly to support your peace of mind.',
        'hero-btn-primary': 'Speak with Aura',
        'hero-btn-secondary': 'Explore Soundscapes',
        'trust-privacy': '100% Private & Local',
        'trust-clinical': 'Clinical Safety Guardrails',
        'trust-languages': '6 Languages Supported',
        'fc1-title': 'Mindfulness',
        'fc1-desc': 'Stress reduction tips',
        'fc2-title': 'Natural Therapy',
        'fc2-desc': 'Pure synthesized rainfall',
        'fc3-title': 'Voice Companion',
        'fc3-desc': 'Just talk to express',

        // Wave Section
        'wave-tagline': 'Sensory Healing',
        'wave-title': 'Aura Wave: Generative Natural Soundscapes',
        'wave-desc': 'A highly visual and auditory sensory experience. No instruments, songs, or tunes—pure synthesized natural atmospheric waves created directly by mathematical calculations in your browser.',
        'wave-vis-title': 'Interactive Liquid Healing Canvas',
        'wave-status-active': 'Fluid Motion Active',
        'wave-state-calm': 'Calm Mode',
        'wave-state-focus': 'Focus Mode',
        'wave-state-rest': 'Rest Mode',
        'wave-mix-title': 'Halal Nature Mixer',
        'wave-mix-desc': 'Adjust sliders to blend natural synthesized waves. 100% free of instruments or background tunes.',
        'wave-btn-play': 'Generate Soundscape',
        'wave-btn-stop': 'Stop Soundscape',
        'wave-slider-rain': 'Soft Rainfall',
        'wave-slider-wind': 'Rustling Breeze',
        'wave-mixer-note': 'These ambient textures are scientifically synthesized in real-time by combining high/low frequency white and pink noise filters to match natural physics. Completely clean and permissible.',

        // Chat Section
        'chat-tagline': '24/7 Compassionate Support',
        'chat-title': 'Empathetic Mental Support Without Limits',
        'chat-desc': 'Aura is built strictly to understand and guide you through feelings of anxiety, burn-out, or loneliness. Speak or type to start a private conversation. Safe, halal, and completely locked to wellness guidance.',
        'voice-badge-text': 'Voice-Enabled Companion',
        'voice-box-title': 'Don\'t feel like typing?',
        'voice-box-desc': 'Simply click the microphone icon inside the chat box, speak naturally, and watch Aura record your words. Enable the Calming Audio Readback button to hear Aura speak back comforting tips in your native language.',
        'speech-toggle-title': 'Calming Audio Readback',
        'speech-toggle-desc': 'Aura will read its empathetic responses back to you in a soothing voice.',
        'chat-online': 'Always Listening & Compassionate',
        'chat-welcome': 'Hello, I am Aura. I am a safe, private space designed to support your mental well-being and listen to whatever is on your mind. How are you feeling today?',
        'chat-time-now': 'Just now',
        'chat-suggested': 'Quick Prompts:',
        'preset-1': 'I feel overwhelmed',
        'preset-2': 'I can\'t sleep',
        'preset-3': 'I need focus tips',
        'preset-4': 'Who is the President of India?',
        'chat-placeholder': 'Type your thoughts or feelings...',
        'mic-listening': 'Listening to your voice...',
        'mic-preview': 'Speak now to express your thoughts.',
        'mic-cancel': 'Stop Listening',

        // Mood Section
        'mood-tagline': 'Visualizing Your Journey',
        'mood-title': 'Daily Mood & Wellness Tracker',
        'mood-desc': 'Checking in with your feelings is a critical stepping stone in mental hygiene. Select your mood, record your daily check-in, and watch your mental wellness dashboard simulate weekly analytical statistics.',
        'mood-check-title': 'How do you feel right now?',
        'mood-c': 'Calm',
        'mood-s': 'Stressed',
        'mood-f': 'Focused',
        'mood-e': 'Tired',
        'mood-note-title': 'AI Clarity Recommendation:',
        'mood-rec-default': 'Select your mood emoji above. Aura\'s wellness analyzer will provide personalized clinical recommendations and adjust your dashboard stats.',
        'mood-stat-title': 'Weekly Wellness Metrics',
        'mood-legend-calm': 'Clarity Score (Average)',
        'mood-legend-active': 'Mindful Habits Logged',
        'day-m': 'Mon', 'day-t': 'Tue', 'day-w': 'Wed', 'day-th': 'Thu', 'day-f': 'Fri', 'day-sa': 'Sat', 'day-su': 'Sun',

        // Breathing Section
        'breath-tagline': 'Restorative Mindfulness',
        'breath-title': 'Guided Silent Breathing Pacer',
        'breath-desc': 'Steer your nervous system away from anxiety in less than 60 seconds. Our custom-paced breathing coach works in absolute silence—completely Halal and backed by clinical respiratory psychology.',
        'breath-m1-title': 'Settle Stress (Box Breathing)',
        'breath-m1-desc': 'Perfect for immediate panic or high work stress. Equal 4s cycles.',
        'breath-m2-title': 'Enhance Focus (Steady State)',
        'breath-m2-desc': 'Deep oxygen intake, longer exhales to alert the brain.',
        'breath-m3-title': 'Deep Sleep (Melatonin Induction)',
        'breath-m3-desc': 'The famous 4-7-8 ratio to trigger immediate sleep chemicals.',
        'breath-cue-ready': 'Ready',
        'breath-cue-in': 'Inhale',
        'breath-cue-hold': 'Hold',
        'breath-cue-out': 'Exhale',
        'breath-btn-start': 'Start Breathing',
        'breath-btn-stop': 'Stop Exercise',

        // Pillars
        'pillars-tagline': 'Why Aura?',
        'pillars-title': 'The Standard of Safe AI Companionship',
        'pillars-desc': 'Aura blends advanced natural language models with a deeply respectful design system to build an environment that feels warm, respectful, and secure.',
        'p1-title': '6 Native Languages',
        'p1-desc': 'Translate UI and speak or type to a chatbot that fully understands Hindi, Arabic, Spanish, French, Urdu, and English.',
        'p2-title': 'Absolute Privacy',
        'p2-desc': 'Your chat logs are stored entirely in your local browser sandbox. We never harvest, sell, or analyze your emotional conversations.',
        'p3-title': 'Pure Halal Audio',
        'p3-desc': 'We respect spiritual safety. Sound therapy relies strictly on natural synthesized rainfall and winds—zero music or instruments.',
        'p4-title': 'Voice Recognition',
        'p4-desc': 'No energy to type during anxiety? Simply speak. Our Web Speech engine converts your voice and talks back empathetically.',

        // Safety
        'safety-badge': 'Clinical Ethics',
        'safety-title': 'Our Trust, Boundaries & Safety Protocols',
        'safety-desc': 'Aura is a mental wellness companion, not a replacement for clinical therapy. We maintain clear boundaries to ensure safety and redirect users in crisis immediately to real-world help.',
        'safety-tab-1': 'Aura\'s Boundaries',
        'safety-tab-2': '🚨 Emergency Helpline Directory',
        'can-1': 'Provide comforting, empathetic active listening.',
        'can-2': 'Offer evidence-based relaxation and breathing paced guides.',
        'can-3': 'Teach lifestyle management, sleep guidelines, and organization.',
        'can-4': 'Offer completely private local tracking logs.',
        'cant-1': 'Provide medical diagnosis or clinical medication advice.',
        'cant-2': 'Substitute professional treatment, psychologists, or clinics.',
        'cant-3': 'Answer unrelated general knowledge (GK) trivia queries.',
        'cant-4': 'Listen to or encourage harmful ideation without raising a crisis flag.',
        'footer-slogan': 'Compassionate AI mental wellness. Private, Multilingual, and completely Halal.'
    },
    hi: {
        // Navigation
        'nav-features': 'विशेषताएं',
        'nav-wave': 'ऑरा तरंग',
        'nav-chat': 'ऑरा से मिलें',
        'nav-mood': 'मूड ट्रैकर',
        'nav-breathing': 'श्वसन अभ्यास',
        'nav-safety': 'सुरक्षा निर्देश',
        'nav-cta': 'शुरू करें',
        
        // Hero
        'badge-halal': '100% हलाल प्रमाणित - कोई संगीत नहीं',
        'hero-title': 'आपके विचारों के लिए एक सुरक्षित स्थान, किसी भी समय।',
        'hero-desc': 'दुनिया के पहले आवाज-सक्रिय, बहुभाषी मानसिक कल्याण साथी का अनुभव करें। संगीत या प्रतिबंधित विषयों से पूरी तरह से मुक्त—आपकी मानसिक शांति का समर्थन करने के लिए पूरी तरह से हलाल और सुरक्षित।',
        'hero-btn-primary': 'ऑरा से बात करें',
        'hero-btn-secondary': 'प्राकृतिक ध्वनियों को सुनें',
        'trust-privacy': '100% निजी और स्थानीय',
        'trust-clinical': 'क्लिनिकल सुरक्षा नियम',
        'trust-languages': '6 भाषाएं उपलब्ध',
        'fc1-title': 'माइंडफुलनेस',
        'fc1-desc': 'तनाव कम करने के टिप्स',
        'fc2-title': 'प्राकृतिक चिकित्सा',
        'fc2-desc': 'शुद्ध वर्षा की ध्वनि',
        'fc3-title': 'आवाज साथी',
        'fc3-desc': 'व्यक्त करने के लिए बस बोलें',

        // Wave Section
        'wave-tagline': 'इंद्रिय उपचार',
        'wave-title': 'ऑरा वेव: प्राकृतिक ध्वनि-तरंगें',
        'wave-desc': 'एक गहन दृश्य और श्रव्य इंद्रिय अनुभव। कोई वाद्य यंत्र, गीत या धुन नहीं—आपके ब्राउज़र में सीधे गणितीय गणनाओं द्वारा निर्मित विशुद्ध प्राकृतिक वायुमंडलीय लहरें।',
        'wave-vis-title': 'इंटरएक्टिव लिक्विड हीलिंग कैनवास',
        'wave-status-active': 'तरल गति सक्रिय',
        'wave-state-calm': 'शांत मोड',
        'wave-state-focus': 'एकाग्रता मोड',
        'wave-state-rest': 'विश्राम मोड',
        'wave-mix-title': 'हलाल प्रकृति मिक्सर',
        'wave-mix-desc': 'प्राकृतिक संश्लेषित ध्वनियों को मिलाने के लिए स्लाइडर्स को बदलें। वाद्य यंत्रों या धुनों से 100% मुक्त।',
        'wave-btn-play': 'ध्वनि उत्पन्न करें',
        'wave-btn-stop': 'ध्वनि बंद करें',
        'wave-slider-rain': 'धीमी वर्षा',
        'wave-slider-wind': 'सर्सराहट की हवा',
        'wave-mixer-note': 'ये परिवेशी ध्वनियाँ प्राकृतिक भौतिकी से मेल खाने के लिए उच्च/निम्न आवृत्ति सफेद और गुलाबी शोर फिल्टर को जोड़कर वास्तविक समय में संश्लेषित की जाती हैं। पूरी तरह से पवित्र और अनुमेय।',

        // Chat Section
        'chat-tagline': '24/7 सहानुभूतिपूर्ण समर्थन',
        'chat-title': 'बिना सीमा के सहानुभूतिपूर्ण मानसिक सहारा',
        'chat-desc': 'ऑरा विशेष रूप से तनाव, चिंता, थकान या अकेलेपन की भावनाओं को समझने और मार्गदर्शन करने के लिए बनाया गया है। निजी बातचीत शुरू करने के लिए बोलें या टाइप करें। सुरक्षित, हलाल और पूर्ण कल्याण के लिए समर्पित।',
        'voice-badge-text': 'आवाज सक्षम साथी',
        'voice-box-title': 'टाइप करने का मन नहीं है?',
        'voice-box-desc': 'बस चैट बॉक्स के अंदर माइक्रोफ़ोन आइकन पर क्लिक करें, स्वाभाविक रूप से बोलें, और ऑरा को आपके शब्दों को रिकॉर्ड करते हुए देखें। अपनी मूल भाषा में सांत्वनादायक सुझाव सुनने के लिए ऑडियो रीडबैक चालू करें।',
        'speech-toggle-title': 'शांत ऑडियो रीडबैक',
        'speech-toggle-desc': 'ऑरा अपनी सहानुभूतिपूर्ण प्रतिक्रियाओं को एक सुखद आवाज में जोर से पढ़ेगा।',
        'chat-online': 'हमेशा सुनने के लिए तैयार',
        'chat-welcome': 'नमस्ते, मैं ऑरा हूँ। मैं एक सुरक्षित, निजी स्थान हूँ जिसे आपकी मानसिक भलाई का समर्थन करने और आपके मन में जो कुछ भी है उसे सुनने के लिए डिज़ाइन किया गया है। आज आप कैसा महसूस कर रहे हैं?',
        'chat-time-now': 'अभी-अभी',
        'chat-suggested': 'त्वरित सुझाव:',
        'preset-1': 'मैं बहुत तनाव में हूँ',
        'preset-2': 'मुझे नींद नहीं आ रही',
        'preset-3': 'एकाग्रता के सुझाव',
        'preset-4': 'भारत के राष्ट्रपति कौन हैं?',
        'chat-placeholder': 'अपने विचार या भावनाएं साझा करें...',
        'mic-listening': 'आपकी आवाज सुनी जा रही है...',
        'mic-preview': 'अपने विचारों को व्यक्त करने के लिए अभी बोलें।',
        'mic-cancel': 'सुनना बंद करें',

        // Mood Section
        'mood-tagline': 'आपकी यात्रा का चित्र',
        'mood-title': 'दैनिक मूड और कल्याण ट्रैकर',
        'mood-desc': 'अपनी भावनाओं को जांचना मानसिक स्वच्छता का एक महत्वपूर्ण हिस्सा है। अपना मूड चुनें, अपनी दैनिक जांच दर्ज करें, और देखें कि आपका कल्याण डैशबोर्ड साप्ताहिक विश्लेषणात्मक आँकड़े दिखाता है।',
        'mood-check-title': 'अभी आप कैसा महसूस कर रहे हैं?',
        'mood-c': 'शांत',
        'mood-s': 'तनावग्रस्त',
        'mood-f': 'एकाग्रचित्त',
        'mood-e': 'थका हुआ',
        'mood-note-title': 'एआई स्पष्टता सिफारिश:',
        'mood-rec-default': 'ऊपर अपना मूड इमोजी चुनें। ऑरा का कल्याण विश्लेषक व्यक्तिगत सिफारिशें प्रदान करेगा और आपके डैशबोर्ड आँकड़ों को समायोजित करेगा।',
        'mood-stat-title': 'साप्ताहिक कल्याण मीट्रिक',
        'mood-legend-calm': 'स्पष्टता स्कोर (औसत)',
        'mood-legend-active': 'माइंडफुल आदतें दर्ज की गईं',
        'day-m': 'सोम', 'day-t': 'मंगल', 'day-w': 'बुध', 'day-th': 'गुरु', 'day-f': 'शुक्र', 'day-sa': 'शनि', 'day-su': 'रवि',

        // Breathing Section
        'breath-tagline': 'पुनर्स्थापनात्मक माइंडफुलनेस',
        'breath-title': 'निर्देशित मौन श्वास गाइड',
        'breath-desc': '60 सेकंड से भी कम समय में अपने तंत्रिका तंत्र को शांत करें। हमारा श्वास कोच पूर्ण मौन में काम करता है—पूरी तरह से हलाल और नैदानिक श्वसन विज्ञान पर आधारित।',
        'breath-m1-title': 'तनाव कम करें (बॉक्स ब्रीदिंग)',
        'breath-m1-desc': 'तत्काल घबराहट या उच्च कार्य तनाव के लिए बिल्कुल सही। समान 4 सेकंड चक्र।',
        'breath-m2-title': 'एकाग्रता बढ़ाएं (स्थिर अवस्था)',
        'breath-m2-desc': 'मस्तिष्क को सचेत करने के लिए गहरी ऑक्सीजन और लंबा सांस छोड़ना।',
        'breath-m3-title': 'गहरी नींद (मेलाटोनिन बढ़ाएं)',
        'breath-m3-desc': 'तत्काल आरामदायक नींद के रसायनों को सक्रिय करने के लिए प्रसिद्ध 4-7-8 अनुपात।',
        'breath-cue-ready': 'तैयार',
        'breath-cue-in': 'सांस अंदर लें',
        'breath-cue-hold': 'रोकें',
        'breath-cue-out': 'सांस बाहर छोड़ें',
        'breath-btn-start': 'श्वास अभ्यास शुरू करें',
        'breath-btn-stop': 'अभ्यास रोकें',

        // Pillars
        'pillars-tagline': 'ऑरा क्यों?',
        'pillars-title': 'सुरक्षित एआई साहचर्य का मानक',
        'pillars-desc': 'ऑरा एक ऐसा वातावरण बनाने के लिए उन्नत भाषा मॉडल को गहराई से सम्मानजनक डिजाइन प्रणाली के साथ मिश्रित करता है जो गर्म और सुरक्षित महसूस करता है।',
        'p1-title': '6 स्थानीय भाषाएं',
        'p1-desc': 'हिंदी, अरबी, स्पेनिश, फ्रेंच, उर्दू और अंग्रेजी को पूरी तरह से समझने वाले चैटबॉट से बात करें या टाइप करें।',
        'p2-title': 'पूर्ण गोपनीयता',
        'p2-desc': 'आपकी चैट लॉग पूरी तरह से आपके स्थानीय ब्राउज़र सैंडबॉक्स में संग्रहीत हैं। हम आपकी संवेदनशील बातचीत को कभी बेचते नहीं हैं।',
        'p3-title': 'विशुद्ध हलाल ध्वनि',
        'p3-desc': 'हम आध्यात्मिक सुरक्षा का सम्मान करते हैं। ध्वनि चिकित्सा पूरी तरह से प्राकृतिक वर्षा और हवा पर निर्भर करती है—संगीत से दूर।',
        'p4-title': 'आवाज पहचान',
        'p4-desc': 'चिंता के समय टाइप करने की ऊर्जा नहीं है? बस बोलें। हमारा वेब स्पीच इंजन आपकी आवाज को समझता है।',

        // Safety
        'safety-badge': 'क्लिनिकल नैतिकता',
        'safety-title': 'हमारी सीमाएं और सुरक्षा नियम',
        'safety-desc': 'ऑरा एक मानसिक स्वास्थ्य साथी है, क्लिनिकल थेरेपी का विकल्प नहीं। हम सुरक्षा सुनिश्चित करने के लिए स्पष्ट सीमाएं बनाए रखते हैं और संकट में फंसे उपयोगकर्ताओं को तुरंत वास्तविक मदद की ओर निर्देशित करते हैं।',
        'safety-tab-1': 'ऑरा की सीमाएं',
        'safety-tab-2': '🚨 आपातकालीन हेल्पलाइन निर्देशिका',
        'can-1': 'आरामदायक, सहानुभूतिपूर्ण और सक्रिय रूप से सुनना।',
        'can-2': 'साक्ष्य-आधारित विश्राम और निर्देशित श्वास अभ्यास प्रदान करना।',
        'can-3': 'जीवनशैली प्रबंधन, नींद के दिशानिर्देश और व्यवस्था सिखाना।',
        'can-4': 'पूरी तरह से निजी स्थानीय ट्रैकिंग लॉग प्रदान करना।',
        'cant-1': 'चिकित्सा निदान या नैदानिक दवा की सलाह देना।',
        'cant-2': 'पेशेवर उपचार, मनोवैज्ञानिकों या क्लीनिकों का स्थान लेना।',
        'cant-3': 'असंबंधित सामान्य ज्ञान (GK) के प्रश्नों का उत्तर देना।',
        'cant-4': 'बिना संकट चेतावनी के आत्म-नुकसान से जुड़े विचारों को बढ़ावा देना।',
        'footer-slogan': 'सहानुभूतिपूर्ण एआई मानसिक कल्याण। निजी, बहुभाषी और पूरी तरह से हलाल।'
    },
    ar: {
        // Navigation
        'nav-features': 'المميزات',
        'nav-wave': 'موجة أورا',
        'nav-chat': 'تحدث مع أورا',
        'nav-mood': 'متابع المزاج',
        'nav-breathing': 'التنفس الموجه',
        'nav-safety': 'السلامة والأمان',
        'nav-cta': 'ابدأ مجاناً',
        
        // Hero
        'badge-halal': 'خالٍ من الموسيقى تماماً - حلال 100%',
        'hero-title': 'مساحة آمنة لأفكارك، في أي وقت.',
        'hero-desc': 'جرب أول رفيق عافية نفسية في العالم يعمل بالصوت ومتعدد اللغات. آمن ورحيم ومبني بالكامل دون أي موسيقى أو أدوات موسيقية - مصمم خصيصاً لدعم سلامتك العقلية.',
        'hero-btn-primary': 'تحدث مع أورا',
        'hero-btn-secondary': 'اكتشف الأصوات الطبيعية',
        'trust-privacy': 'خصوصية محلية 100%',
        'trust-clinical': 'ضوابط السلامة السريرية',
        'trust-languages': 'يدعم 6 لغات عالمية',
        'fc1-title': 'اليقظة الذهنية',
        'fc1-desc': 'نصائح لتقليل التوتر',
        'fc2-title': 'علاج طبيعي',
        'fc2-desc': 'صوت تساقط المطر النقي',
        'fc3-title': 'الرفيق الصوتي',
        'fc3-desc': 'تحدث فقط لتعبّر عن نفسك',

        // Wave Section
        'wave-tagline': 'العلاج الحسي',
        'wave-title': 'موجة أورا: أصوات الطبيعة التوليدية',
        'wave-desc': 'تجربة حسية بصرية وسمعية راقية. لا توجد أدوات موسيقية أو أغاني أو ألحان—فقط موجات جوية طبيعية يتم تركيبها مباشرة عبر حسابات رياضية في متصفحك.',
        'wave-vis-title': 'لوحة الشفاء السائل التفاعلية',
        'wave-status-active': 'الحركة السائلة نشطة',
        'wave-state-calm': 'وضع الهدوء',
        'wave-state-focus': 'وضع التركيز',
        'wave-state-rest': 'وضع الراحة',
        'wave-mix-title': 'خلاط الطبيعة الحلال',
        'wave-mix-desc': 'اضبط المنزلقات لدمج الأصوات الطبيعية المصنعة. خالية 100% من الموسيقى والألحان.',
        'wave-btn-play': 'توليد الموجات الصوتية',
        'wave-btn-stop': 'إيقاف الأصوات',
        'wave-slider-rain': 'مطر خفيف',
        'wave-slider-wind': 'نسيم عليل',
        'wave-mixer-note': 'يتم تصنيع هذه الأصوات البيئية علمياً في الوقت الفعلي من خلال دمج مرشحات الضوضاء البيضاء والوردية لمحاكاة الطبيعة بدقة. نقية تماماً ومسموح بها.',

        // Chat Section
        'chat-tagline': 'دعم رحيم على مدار الساعة',
        'chat-title': 'دعم نفسي متعاطف بلا حدود',
        'chat-desc': 'تم بناء أورا خصيصاً لفهم ومساعدتك في التغلب على مشاعر القلق أو الإرهاق أو الوحدة. تحدث أو اكتب لبدء محادثة سرية. آمن، حلال ومكرس للسلام الداخلي.',
        'voice-badge-text': 'رفيق مدعوم بالصوت',
        'voice-box-title': 'لا ترغب في الكتابة؟',
        'voice-box-desc': 'ما عليك سوى النقر فوق زر الميكروفون داخل صندوق الدردشة، والتحدث بشكل طبيعي لتقوم أورا بتسجيل كلماتك. قم بتفعيل ميزة القراءة الصوتية المهدئة لسماع نصائح أورا بصوت هادئ بلغتك الأم.',
        'speech-toggle-title': 'القراءة الصوتية المهدئة',
        'speech-toggle-desc': 'ستقوم أورا بقراءة إجاباتها الداعمة بصوت مسموع ومريح للقلب.',
        'chat-online': 'جاهز للاستماع والتعاطف دائماً',
        'chat-welcome': 'مرحباً، أنا أورا. مساحتك الآمنة والخاصة لمساعدتك في العناية بسلامتك النفسية والاستماع لكل ما يدور في ذهنك. كيف تشعر اليوم؟',
        'chat-time-now': 'الآن',
        'chat-suggested': 'مواضيع سريعة:',
        'preset-1': 'أشعر بضغط شديد اليوم',
        'preset-2': 'لا أستطيع النوم',
        'preset-3': 'نصائح لزيادة التركيز',
        'preset-4': 'من هو رئيس الهند؟',
        'chat-placeholder': 'اكتب أفكارك أو مشاعرك هنا...',
        'mic-listening': 'جاري الاستماع لصوتك...',
        'mic-preview': 'تحدث الآن للتعبير عن مشاعرك.',
        'mic-cancel': 'إيقاف الاستماع',

        // Mood Section
        'mood-tagline': 'مراقبة تطورك النفسي',
        'mood-title': 'دليل المزاج اليومي والعافية',
        'mood-desc': 'تقييم مشاعرك يومياً هو ركن أساسي في الصحة النفسية. اختر مزاجك الحالي، وسجل حضورك اليومي لتشاهد رسوماً بيانية إحصائية تفاعلية تعكس عافيتك العاطفية.',
        'mood-check-title': 'كيف تشعر في هذه اللحظة؟',
        'mood-c': 'هادئ',
        'mood-s': 'متوتر',
        'mood-f': 'مركز',
        'mood-e': 'مرهق',
        'mood-note-title': 'توصية أورا الذكية للوضوح:',
        'mood-rec-default': 'اختر رمز مزاجك في الأعلى. ستقوم أورا بتحليل حالتك لتقديم نصائح مخصصة وتعديل إحصاءات عافيتك على لوحة التحكم.',
        'mood-stat-title': 'مؤشرات العافية الأسبوعية',
        'mood-legend-calm': 'معدل الوضوح الذهني',
        'mood-legend-active': 'العادات الإيجابية المسجلة',
        'day-m': 'الإثنين', 'day-t': 'الثلاثاء', 'day-w': 'الأربعاء', 'day-th': 'الخميس', 'day-f': 'الجمعة', 'day-sa': 'السبت', 'day-su': 'الأحد',

        // Breathing Section
        'breath-tagline': 'تخفيف التوتر العصبي',
        'breath-title': 'مدرب التنفس الصامت الموجه',
        'breath-desc': 'اهدأ وجهازك العصبي في أقل من 60 ثانية. يعمل مدرب التنفس المخصص لدينا في صمت تام—متوافق بالكامل مع الضوابط الشرعية ومستند إلى علم وظائف الأعضاء التنفسي.',
        'breath-m1-title': 'تهدئة التوتر (التنفس المربع)',
        'breath-m1-desc': 'مثالي للذعر الفوري أو ضغط العمل العالي. دورات متساوية مدتها 4 ثوانٍ.',
        'breath-m2-title': 'زيادة التركيز (الحالة المستقرة)',
        'breath-m2-desc': 'استنشاق عميق للأكسجين مع زفير أطول لتنبيه وتنشيط خلايا الدماغ.',
        'breath-m3-title': 'النوم العميق (تحفيز الميلاتونين)',
        'breath-m3-desc': 'نمط 4-7-8 الشهير لتهدئة الأعصاب والمساعدة في النوم الفوري.',
        'breath-cue-ready': 'مستعد',
        'breath-cue-in': 'شهيق',
        'breath-cue-hold': 'احبس نفسك',
        'breath-cue-out': 'زفير',
        'breath-btn-start': 'ابدأ تمرين التنفس',
        'breath-btn-stop': 'إيقاف التمرين',

        // Pillars
        'pillars-tagline': 'لماذا تختار أورا؟',
        'pillars-title': 'المعيار الجديد للرفقة الذكية الآمنة',
        'pillars-desc': 'يمزج أورا بين النماذج اللغوية المتطورة ونظام تصميم وقائي لتقديم بيئة دافئة ومحترمة وآمنة للجميع.',
        'p1-title': '6 لغات أصلية',
        'p1-desc': 'تحدث أو اكتب لرفيق ذكي يفهم العربية والإنجليزية والهندية والإسبانية والفرنسية والأوردو بطلاقة كاملة.',
        'p2-title': 'خصوصية مطلقة',
        'p2-desc': 'تخزن جميع محادثاتك محلياً في متصفحك الخاص فقط. نحن لا نبيع أو نحلل بياناتك النفسية الحساسة مطلقاً.',
        'p3-title': 'أصوات حلال تماماً',
        'p3-desc': 'نحترم القيم الإيمانية. يعتمد علاجنا الصوتي على المطر والرياح المصنعة فقط—دون أي نغمات أو معازف.',
        'p4-title': 'التعرف على الصوت',
        'p4-desc': 'لا تملك الطاقة للكتابة أثناء القلق؟ تحدث مباشرة وسيقوم محركنا الصوتي بفهم مشاعرك والرد عليك بصوت مريح.',

        // Safety
        'safety-badge': 'الأخلاقيات الطبية',
        'safety-title': 'بروتوكولات الأمان والحدود والخصوصية',
        'safety-desc': 'أورا هو رفيق عافية نفسية وليس بديلاً عن الطب النفسي السريري. نضع حدوداً صارمة وواضحة ونوجه المستخدمين في الأزمات فوراً للدعم الحقيقي.',
        'safety-tab-1': 'حدود عمل أورا',
        'safety-tab-2': '🚨 أرقام وخطوط الطوارئ والمساندة',
        'can-1': 'تقديم استماع نشط متعاطف ومهدئ للأعصاب.',
        'can-2': 'توفير أدلة وتمارين تنفس واسترخاء مثبتة علمياً.',
        'can-3': 'التوجيه لتحسين النوم وترتيب الأفكار وإدارة الحياة اليومية.',
        'can-4': 'توفير سجلات خصوصية محلية مشفرة بالكامل.',
        'cant-1': 'تقديم تشخيص طبي أو وصف أدوية نفسية وعقاقير سريرية.',
        'cant-2': 'النيابة عن الأطباء أو العيادات النفسية التخصصية.',
        'cant-3': 'الإجابة عن أسئلة الثقافة العامة والتوافه غير المتعلقة بالصحة العقلية.',
        'cant-4': 'الاستماع أو تشجيع أفكار إيذاء النفس دون إطلاق تنبيه الأزمات الطبية.',
        'footer-slogan': 'عناية نفسية متعاطفة بالذكاء الاصطناعي. خاص، متعدد اللغات وحلال بالكامل.'
    },
    es: {
        // Navigation
        'nav-features': 'Características',
        'nav-wave': 'Onda Aura',
        'nav-chat': 'Conoce a Aura',
        'nav-mood': 'Control de Ánimo',
        'nav-breathing': 'Respiración',
        'nav-safety': 'Seguridad',
        'nav-cta': 'Iniciar Gratis',
        
        // Hero
        'badge-halal': 'Certificado Halal - Estrictamente Sin Música',
        'hero-title': 'Un espacio seguro para tus pensamientos, siempre.',
        'hero-desc': 'Experimenta el primer compañero de bienestar mental del mundo activado por voz y multilingual. Seguro, compasivo y libre de música o instrumentos—diseñado estrictamente para proteger tu paz mental.',
        'hero-btn-primary': 'Habla con Aura',
        'hero-btn-secondary': 'Explorar Sonidos',
        'trust-privacy': '100% Privado y Local',
        'trust-clinical': 'Límites de Seguridad Clínica',
        'trust-languages': '6 Idiomas Soportados',
        'fc1-title': 'Mindfulness',
        'fc1-desc': 'Técnicas de relajación',
        'fc2-title': 'Terapia Natural',
        'fc2-desc': 'Lluvia pura sintetizada',
        'fc3-title': 'Voz Compañera',
        'fc3-desc': 'Solo habla para expresar',

        // Wave Section
        'wave-tagline': 'Sanación Sensorial',
        'wave-title': 'Aura Wave: Sonidos Naturales Generativos',
        'wave-desc': 'Una experiencia sensorial visual y auditiva única. Sin instrumentos, canciones o melodías—puras ondas naturales sintetizadas mediante fórmulas matemáticas en tu propio navegador.',
        'wave-vis-title': 'Lienzo Interactivo de Curación Líquida',
        'wave-status-active': 'Movimiento Líquido Activo',
        'wave-state-calm': 'Modo Calma',
        'wave-state-focus': 'Modo Enfoque',
        'wave-state-rest': 'Modo Descanso',
        'wave-mix-title': 'Mezclador de la Naturaleza',
        'wave-mix-desc': 'Ajusta los controles deslizantes para mezclar ondas sintetizadas. 100% libre de instrumentos o tonadas.',
        'wave-btn-play': 'Generar Sonido',
        'wave-btn-stop': 'Detener Sonido',
        'wave-slider-rain': 'Lluvia Suave',
        'wave-slider-wind': 'Brisa Natural',
        'wave-mixer-note': 'Estas texturas ambientales se sintetizan en tiempo real filtrando ruido blanco y rosa para replicar la física del agua y del viento. Completamente limpio y permitido.',

        // Chat Section
        'chat-tagline': 'Apoyo Compasivo 24/7',
        'chat-title': 'Soporte Mental Empático Sin Límites',
        'chat-desc': 'Aura está diseñada únicamente para comprender y guiarte durante momentos de estrés, ansiedad o soledad. Habla o escribe para iniciar una conversación privada y segura.',
        'voice-badge-text': 'Compañero Activado por Voz',
        'voice-box-title': '¿No quieres escribir?',
        'voice-box-desc': 'Haz clic en el micrófono, habla de forma natural y observa cómo Aura transcribe tus palabras. Activa la lectura de voz para escuchar consejos consoladores en tu propio idioma.',
        'speech-toggle-title': 'Lectura de Voz Relajante',
        'speech-toggle-desc': 'Aura leerá sus respuestas empáticas en voz alta con un tono de voz suave y reconfortante.',
        'chat-online': 'Siempre Escuchando y Disponible',
        'chat-welcome': 'Hola, soy Aura. Un espacio seguro y totalmente privado diseñado para apoyar tu bienestar mental y escuchar lo que tengas en mente. ¿Cómo te sientes hoy?',
        'chat-time-now': 'Ahora',
        'chat-suggested': 'Sugerencias:',
        'preset-1': 'Me siento abrumado',
        'preset-2': 'No puedo dormir',
        'preset-3': 'Consejos de enfoque',
        'preset-4': '¿Quién es el presidente de India?',
        'chat-placeholder': 'Escribe tus pensamientos o sentimientos...',
        'mic-listening': 'Escuchando tu voz...',
        'mic-preview': 'Habla ahora para expresarte.',
        'mic-cancel': 'Cancelar',

        // Mood Section
        'mood-tagline': 'Visualizando tu camino',
        'mood-title': 'Registro de Ánimo y Bienestar',
        'mood-desc': 'Evaluar tus sentimientos es un paso vital para tu salud emocional. Elige tu estado de ánimo, haz tu registro diario y observa tus métricas de bienestar semanales.',
        'mood-check-title': '¿Cómo te sientes en este momento?',
        'mood-c': 'Calma',
        'mood-s': 'Estresado',
        'mood-f': 'Enfocado',
        'mood-e': 'Cansado',
        'mood-note-title': 'Recomendación de Claridad de la IA:',
        'mood-rec-default': 'Selecciona tu emoji de ánimo arriba. El analizador de bienestar de Aura generará una recomendación clínica y adaptará tus estadísticas.',
        'mood-stat-title': 'Métricas Semanales de Bienestar',
        'mood-legend-calm': 'Puntuación de Claridad (Promedio)',
        'mood-legend-active': 'Hábitos Saludables Registrados',
        'day-m': 'Lun', 'day-t': 'Mar', 'day-w': 'Mié', 'day-th': 'Jue', 'day-f': 'Vie', 'day-sa': 'Sáb', 'day-su': 'Dom',

        // Breathing Section
        'breath-tagline': 'Mindfulness Restaurativo',
        'breath-title': 'Guía de Respiración Silenciosa',
        'breath-desc': 'Calma tu sistema nervioso en menos de un minuto. Nuestro entrenador de respiración trabaja en absoluto silencio—completamente Halal y respaldado por psicología respiratoria.',
        'breath-m1-title': 'Reducir Estrés (Respiración Cuadrada)',
        'breath-m1-desc': 'Perfecto para el pánico inmediato o alto estrés laboral. Ciclos iguales de 4s.',
        'breath-m2-title': 'Aumentar Enfoque (Estado Estable)',
        'breath-m2-desc': 'Inhalación profunda de oxígeno con exhalaciones largas para alertar al cerebro.',
        'breath-m3-title': 'Sueño Profundo (Inducción de Melatonina)',
        'breath-m3-desc': 'La famosa técnica 4-7-8 para desencadenar químicos de relajación física inmediatos.',
        'breath-cue-ready': 'Listo',
        'breath-cue-in': 'Inhala',
        'breath-cue-hold': 'Retén',
        'breath-cue-out': 'Exhala',
        'breath-btn-start': 'Comenzar Ejercicio',
        'breath-btn-stop': 'Detener Ejercicio',

        // Pillars
        'pillars-tagline': '¿Por qué Aura?',
        'pillars-title': 'El Estándar de Compañía IA Segura',
        'pillars-desc': 'Aura combina modelos lingüísticos avanzados con un sistema de diseño protector para crear un ambiente que se siente cálido, respetuoso y privado.',
        'p1-title': '6 Idiomas Nativos',
        'p1-desc': 'Traduce y comunícate con un chat de inteligencia artificial que comprende perfectamente español, inglés, árabe, hindi, francés y urdu.',
        'p2-title': 'Privacidad Absoluta',
        'p2-desc': 'Tus historiales se guardan exclusivamente de manera local en tu navegador. Nunca almacenamos ni vendemos tus conversaciones emocionales.',
        'p3-title': 'Audio 100% Halal',
        'p3-desc': 'Respetamos tus creencias espirituales. La terapia de sonido se limita exclusivamente a sonidos de lluvia y viento reales sintetizados.',
        'p4-title': 'Reconocimiento de Voz',
        'p4-desc': '¿Sin fuerzas para escribir durante la ansiedad? Simplemente habla y nuestro motor de voz transcribirá tus sentimientos.',

        // Safety
        'safety-badge': 'Ética Médica',
        'safety-title': 'Protocolos de Seguridad y Límites Clínicos',
        'safety-desc': 'Aura es un asistente de bienestar mental, no un reemplazo para psicólogos o tratamiento médico clínico. Mantenemos límites rígidos y dirigimos urgencias al soporte médico real de inmediato.',
        'safety-tab-1': 'Límites de Aura',
        'safety-tab-2': '🚨 Directorio de Líneas de Emergencia',
        'can-1': 'Ofrecer escucha activa, empática y reconfortante.',
        'can-2': 'Proporcionar guías de relajación y respiración comprobadas.',
        'can-3': 'Enseñar pautas de sueño saludable y organización mental.',
        'can-4': 'Mantener registros totalmente locales y privados en tu navegador.',
        'cant-1': 'Dar diagnósticos médicos o recetar fármacos psiquiátricos.',
        'cant-2': 'Reemplazar tratamientos psicológicos o consultas clínicas especializadas.',
        'cant-3': 'Responder preguntas ajenas a tu salud emocional (preguntas de cultura general).',
        'cant-4': 'Apoyar o incentivar ideas de autolesión sin activar alertas de seguridad.',
        'footer-slogan': 'Bienestar mental compasivo con IA. Privado, Multilingüe y 100% Halal.'
    },
    fr: {
        // Navigation
        'nav-features': 'Fonctionnalités',
        'nav-wave': 'Onde Aura',
        'nav-chat': 'Rencontrer Aura',
        'nav-mood': 'Suivi d\'Humeur',
        'nav-breathing': 'Respiration',
        'nav-safety': 'Sécurité',
        'nav-cta': 'Essai Gratuit',
        
        // Hero
        'badge-halal': 'Certifié Halal - Strictement Sans Musique',
        'hero-title': 'Un espace sûr pour vos pensées, à tout moment.',
        'hero-desc': 'Découvrez le premier compagnon de bien-être mental activé par la voix et multilingue. Sécurisé, compatissant et exempt de musique ou d\'instruments—conçu strictement pour soutenir votre paix d\'esprit.',
        'hero-btn-primary': 'Parler avec Aura',
        'hero-btn-secondary': 'Découvrir les Ambiances',
        'trust-privacy': '100% Privé et Local',
        'trust-clinical': 'Cadre de Sécurité Clinique',
        'trust-languages': '6 Langues Disponibles',
        'fc1-title': 'Pleine Conscience',
        'fc1-desc': 'Conseils anti-stress',
        'fc2-title': 'Thérapie Naturelle',
        'fc2-desc': 'Pluie pure synthétisée',
        'fc3-title': 'Compagnon Vocal',
        'fc3-desc': 'Parlez simplement pour exprimer',

        // Wave Section
        'wave-tagline': 'Guérison Sensorielle',
        'wave-title': 'Aura Wave : Atmosphères Naturelles Génératives',
        'wave-desc': 'Une expérience sensorielle visuelle et auditive unique. Sans instruments, chansons ou mélodies—de pures ondes atmosphériques synthétisées via des calculs mathématiques dans votre navigateur.',
        'wave-vis-title': 'Toile de Guérison Liquide Interactive',
        'wave-status-active': 'Mouvement Liquide Actif',
        'wave-state-calm': 'Mode Calme',
        'wave-state-focus': 'Mode Concentration',
        'wave-state-rest': 'Mode Repos',
        'wave-mix-title': 'Mélangeur de la Nature',
        'wave-mix-desc': 'Ajustez les curseurs pour mélanger les ondes synthétisées. 100% sans instruments ni airs.',
        'wave-btn-play': 'Générer le Son',
        'wave-btn-stop': 'Arrêter le Son',
        'wave-slider-rain': 'Pluie Douce',
        'wave-slider-wind': 'Brise Légère',
        'wave-mixer-note': 'Ces textures sonores sont synthétisées en temps réel en filtrant du bruit blanc et rose pour correspondre à la physique naturelle. Parfaitement pur et autorisé.',

        // Chat Section
        'chat-tagline': 'Soutien Compatissant 24/7',
        'chat-title': 'Accompagnement Mental Empathique Sans Limites',
        'chat-desc': 'Aura est conçu uniquement pour comprendre et vous guider à travers le stress, l\'anxiété ou la solitude. Parlez ou écrivez pour démarrer une conversation privée et sûre.',
        'voice-badge-text': 'Compagnon Vocal Activé',
        'voice-box-title': 'Pas envie d\'écrire ?',
        'voice-box-desc': 'Cliquez sur le micro, parlez naturellement et regardez Aura transcrire vos mots. Activez la lecture audio pour entendre des conseils bienveillants dans votre langue.',
        'speech-toggle-title': 'Lecture Audio Apaisante',
        'speech-toggle-desc': 'Aura lira ses réponses empathiques à haute voix avec une voix douce et rassurante.',
        'chat-online': 'À votre écoute avec bienveillance',
        'chat-welcome': 'Bonjour, je suis Aura. Un espace sûr et privé conçu pour soutenir votre santé mentale et écouter tout ce que vous avez sur le cœur. Comment vous sentez-vous aujourd\'hui ?',
        'chat-time-now': 'À l\'instant',
        'chat-suggested': 'Suggestions :',
        'preset-1': 'Je me sens submergé',
        'preset-2': 'Je n\'arrive pas à dormir',
        'preset-3': 'Conseils de concentration',
        'preset-4': 'Qui est le président de l\'Inde ?',
        'chat-placeholder': 'Partagez vos pensées ou émotions...',
        'mic-listening': 'Écoute en cours...',
        'mic-preview': 'Parlez maintenant pour vous exprimer.',
        'mic-cancel': 'Annuler',

        // Mood Section
        'mood-tagline': 'Visualiser votre parcours',
        'mood-title': 'Suivi d\'Humeur et de Clarté',
        'mood-desc': 'Faire le point sur vos émotions est un pilier de la santé mentale. Choisissez votre humeur, complétez votre enregistrement et visualisez vos métriques de bien-être.',
        'mood-check-title': 'Comment vous sentez-vous en ce moment ?',
        'mood-c': 'Calme',
        'mood-s': 'Stressé',
        'mood-f': 'Concentré',
        'mood-e': 'Fatigué',
        'mood-note-title': 'Recommandation IA de Clarté :',
        'mood-rec-default': 'Sélectionnez un emoji ci-dessus. L\'analyseur de bien-être d\'Aura rédigera une recommandation et mettra à jour vos indicateurs.',
        'mood-stat-title': 'Métriques Hebdomadaires',
        'mood-legend-calm': 'Score de Clarté (Moyen)',
        'mood-legend-active': 'Habitudes Saines Enregistrées',
        'day-m': 'Lun', 'day-t': 'Mar', 'day-w': 'Mer', 'day-th': 'Jeu', 'day-f': 'Ven', 'day-sa': 'Sam', 'day-su': 'Dim',

        // Breathing Section
        'breath-tagline': 'Mindfulness Restauratrice',
        'breath-title': 'Guide de Respiration Silencieuse',
        'breath-desc': 'Calmez votre système nerveux en moins de 60 secondes. Notre guide fonctionne en silence complet—Halal et basé sur la physiologie clinique.',
        'breath-m1-title': 'Apaiser le Stress (Respiration Carrée)',
        'breath-m1-desc': 'Idéal pour le stress aigu ou les attaques de panique. Cycles égaux de 4s.',
        'breath-m2-title': 'Améliorer la Concentration (Rythme Stable)',
        'breath-m2-desc': 'Inspiration profonde d\'oxygène, expirations prolongées pour réveiller le cerveau.',
        'breath-m3-title': 'Sommeil Profond (Sécrétion de Mélatonine)',
        'breath-m3-desc': 'Le fameux ratio 4-7-8 pour induire une détente corporelle immédiate.',
        'breath-cue-ready': 'Prêt',
        'breath-cue-in': 'Inspirez',
        'breath-cue-hold': 'Retenez',
        'breath-cue-out': 'Expirez',
        'breath-btn-start': 'Démarrer l\'Exercice',
        'breath-btn-stop': 'Arrêter l\'Exercice',

        // Pillars
        'pillars-tagline': 'Pourquoi Aura ?',
        'pillars-title': 'La Référence de l\'Accompagnement IA Sûr',
        'pillars-desc': 'Aura allie des modèles linguistiques de pointe à une charte de conception protectrice pour instaurer un climat chaleureux et intime.',
        'p1-title': '6 Langues Natives',
        'p1-desc': 'Discutez avec une intelligence artificielle qui comprend parfaitement le français, l\'anglais, l\'arabe, l\'hindi, l\'espagnol et l\'urdu.',
        'p2-title': 'Confidentialité Totale',
        'p2-desc': 'Vos discussions sont enregistrées localement dans votre navigateur. Nous ne vendons ni n\'analysons vos données émotionnelles.',
        'p3-title': 'Audio 100% Halal',
        'p3-desc': 'Nous respectons votre sérénité spirituelle. La thérapie sonore se compose exclusivement de sons de pluie et de vent modélisés.',
        'p4-title': 'Reconnaissance Vocale',
        'p4-desc': 'Trop épuisé pour écrire pendant une crise ? Parlez simplement et notre moteur vocal retranscrira vos paroles.',

        // Safety
        'safety-badge': 'Éthique Médicale',
        'safety-title': 'Protocoles de Sécurité et Limites Cliniques',
        'safety-desc': 'Aura est un compagnon de bien-être, pas un substitut à une thérapie ou à un traitement clinique. Nous maintenons des limites rigides pour votre sécurité.',
        'safety-tab-1': 'Les limites d\'Aura',
        'safety-tab-2': '🚨 Lignes d\'Urgence et d\'Écoute',
        'can-1': 'Offrir une écoute active, bienveillante et chaleureuse.',
        'can-2': 'Mettre à disposition des exercices de relaxation et de respiration.',
        'can-3': 'Enseigner des règles de sommeil sain et d\'organisation des pensées.',
        'can-4': 'Assurer un stockage 100% local et sécurisé sur votre appareil.',
        'cant-1': 'Poser des diagnostics médicaux ou prescrire des médicaments.',
        'cant-2': 'Remplacer le suivi régulier d\'un psychologue ou d\'un médecin.',
        'cant-3': 'Répondre à des questions de culture générale n\'ayant aucun lien avec votre bien-être.',
        'cant-4': 'Encourager les pensées d\'autolésion sans déclencher d\'alerte médicale.',
        'footer-slogan': 'Bien-être mental bienveillant par l\'IA. Privé, Multilingue et 100% Halal.'
    },
    ur: {
        // Navigation
        'nav-features': 'خصوصیات',
        'nav-wave': 'اورا لہر',
        'nav-chat': 'اورا سے ملیں',
        'nav-mood': 'موڈ ٹریکر',
        'nav-breathing': 'تنفس کی مشق',
        'nav-safety': 'حفاظتی تدابیر',
        'nav-cta': 'مفت شروع کریں',
        
        // Hero
        'badge-halal': '100% حلال تصدیق شدہ - کوئی موسیقی نہیں',
        'hero-title': 'آپ کے خیالات کے لئے ایک محفوظ جگہ، ہر وقت۔',
        'hero-desc': 'دنیا کے پہلے آواز سے چلنے والے، کثیر لسانی ذہنی صحت کے ساتھی کا تجربہ کریں۔ موسیقی یا ممنوعہ موضوعات سے مکمل طور پر پاک—آپ کے ذہنی سکون کے لئے حلال اور مکمل طور پر محفوظ۔',
        'hero-btn-primary': 'اورا سے بات کریں',
        'hero-btn-secondary': 'قدرتی آوازیں سنیں',
        'trust-privacy': '100% نجی اور مقامی',
        'trust-clinical': 'طبی حفاظتی ضابطے',
        'trust-languages': '6 زبانیں دستیاب',
        'fc1-title': 'ذہنی بیداری',
        'fc1-desc': 'تتناؤ کم کرنے کے طریقے',
        'fc2-title': 'قدرتی علاج',
        'fc2-desc': 'خالص بارش کی آواز',
        'fc3-title': 'آواز کا ساتھی',
        'fc3-desc': 'اظہار کے لئے بس بولیں',

        // Wave Section
        'wave-tagline': 'حسی علاج',
        'wave-title': 'اورا ویو: قدرتی آواز کی لہریں',
        'wave-desc': 'ایک گہرا حسی اور بصری تجربہ۔ کوئی موسیقی، گیت یا ساز نہیں—آپ کے براؤزر میں براہ راست ریاضیاتی فارمولوں کے ذریعے تیار کردہ قدرتی ماحولیاتی لہریں۔',
        'wave-vis-title': 'انٹرایکٹو مائع شفا بخش کینوس',
        'wave-status-active': 'مائع کی حرکت فعال',
        'wave-state-calm': 'پرسکون موڈ',
        'wave-state-focus': 'توجہ موڈ',
        'wave-state-rest': 'آرام موڈ',
        'wave-mix-title': 'حلال فطرت مکسر',
        'wave-mix-desc': 'قدرتی آوازوں کو ملانے کے لئے سلائیڈرز کو تبدیل کریں۔ سازوں اور دھنوں سے 100% پاک۔',
        'wave-btn-play': 'آواز پیدا کریں',
        'wave-btn-stop': 'آواز بند کریں',
        'wave-slider-rain': 'ہلکی بارش',
        'wave-slider-wind': 'ہوا کی سنسناہٹ',
        'wave-mixer-note': 'یہ آوازیں حقیقی وقت میں سفید اور گلابی شور کے فلٹرز کو ملا کر قدرتی طبیعیات کے مطابق تیار کی جاتی ہیں۔ بالکل پاک اور جائز۔',

        // Chat Section
        'chat-tagline': '24/7 ہمدردانہ مدد',
        'chat-title': 'بغیر کسی حد کے ہمدردانہ ذہنی سہارا',
        'chat-desc': 'اورا کو خاص طور پر تناؤ، پریشانی، تھکن یا اکیلے پن کو سمجھنے اور رہنمائی کے لئے بنایا گیا ہے۔ گفتگو شروع کرنے کے لئے بولیں یا ٹائپ کریں۔ محفوظ، حلال اور ذہنی سکون کے لئے وقف۔',
        'voice-badge-text': 'آواز کے ساتھ فعال ساتھی',
        'voice-box-title': 'ٹائپ کرنے کی ہمت نہیں؟',
        'voice-box-desc': 'بس چیٹ باکس کے اندر مائیکروفون آئیکن پر کلک کریں، قدرتی انداز میں بولیں اور اورا کو آپ کے الفاظ لکھتے ہوئے دیکھیں۔ اپنی مادری زبان میں پرسکون تجاویز سننے کے لئے آڈیو ریڈ بیک آن کریں۔',
        'speech-toggle-title': 'پرسکون آڈیو ریڈ بیک',
        'speech-toggle-desc': 'اورا اپنے ہمدردانہ جوابات کو ایک نہایت ہی نرم اور پرسکون آواز میں اونچا پڑھے گا۔',
        'chat-online': 'ہمیشہ سننے کے لئے تیار',
        'chat-welcome': 'السلام علیکم، میں اورا ہوں۔ میں ایک محفوظ اور نجی جگہ ہوں جسے آپ کے ذہنی سکون کی مدد اور آپ کے دل کی بات سننے کے لئے بنایا گیا ہے۔ آج آپ کیسا محسوس کر رہے ہیں؟',
        'chat-time-now': 'ابھی',
        'chat-suggested': 'فوری موضوعات:',
        'preset-1': 'میں بہت تناؤ میں ہوں',
        'preset-2': 'مجھے نیند نہیں آ رہی',
        'preset-3': 'توجہ مرکوز کرنے کے طریقے',
        'preset-4': 'بھارت کا صدر کون ہے؟',
        'chat-placeholder': 'اپنے خیالات یا احساسات شیئر کریں...',
        'mic-listening': 'آپ کی آواز سنی جا رہی ہے...',
        'mic-preview': 'اپنے احساسات کا اظہار کرنے کے لئے ابھی بولیں۔',
        'mic-cancel': 'سننا بند کریں',

        // Mood Section
        'mood-tagline': 'آپ کے سفر کا خاکہ',
        'mood-title': 'روزانہ موڈ اور ذہنی سکون کا ٹریکر',
        'mood-desc': 'اپنے احساسات کا جائزہ لینا ذہنی صحت کے لئے بے حد ضروری ہے۔ اپنا موڈ منتخب کریں، روزانہ کا جائزہ درج کریں، اور دیکھیں کہ آپ کا ڈیش بورڈ ہفتہ وار اعداد و شمار کیسے ظاہر کرتا ہے۔',
        'mood-check-title': 'اس وقت آپ کیسا محسوس کر رہے ہیں؟',
        'mood-c': 'پرسکون',
        'mood-s': 'پریشان',
        'mood-f': 'مرتکز',
        'mood-e': 'تھکا ہوا',
        'mood-note-title': 'اے آئی واضح تجویز:',
        'mood-rec-default': 'اوپر اپنا موڈ منتخب کریں۔ اورا کا تجزیہ کار ذاتی نوعیت کی تجاویز فراہم کرے گا اور آپ کے اعداد و شمار کو ترتیب دے گا۔',
        'mood-stat-title': 'ہفتہ وار ذہنی سکون کی پیمائش',
        'mood-legend-calm': 'ذہنی سکون کا اسکور (اوسط)',
        'mood-legend-active': 'صحت مند عادتیں درج کی گئیں',
        'day-m': 'پیر', 'day-t': 'منگل', 'day-w': 'بدھ', 'day-th': 'جمعرات', 'day-f': 'جمعہ', 'day-sa': 'ہفتہ', 'day-su': 'اتوار',

        // Breathing Section
        'breath-tagline': 'تخفیف تناؤ',
        'breath-title': 'خاموش تنفس کا رہنما کوچ',
        'breath-desc': '60 سیکنڈ سے بھی کم وقت میں اپنے اعصابی نظام کو پرسکون کریں۔ ہمارا شش کوچ مکمل خاموشی میں کام کرتا ہے—مکمل طور پر حلال اور طبی نظام تنفس کے مطابق۔',
        'breath-m1-title': 'تناؤ کم کریں (باکس بریدھنگ)',
        'breath-m1-desc': 'فوری گھبراہٹ یا شدید کام کے تناؤ کے لئے موزوں۔ یکساں 4 سیکنڈ کا سائیکل۔',
        'breath-m2-title': 'توجہ بڑھائیں (مستحکم حالت)',
        'breath-m2-desc': 'دماغ کو چوکنا کرنے کے لئے گہرا آکسیجن اور لمبا سانس باہر چھوڑنا۔',
        'breath-m3-title': 'گہری نیند (میلاٹونین کی افزائش)',
        'breath-m3-desc': 'فوری آرام دہ نیند کے کیمیکلز کو متحرک کرنے کے لئے مشہور 4-7-8 تناسب۔',
        'breath-cue-ready': 'تیار',
        'breath-cue-in': 'سانس اندر لیں',
        'breath-cue-hold': 'روکیں',
        'breath-cue-out': 'سانس باہر چھوڑیں',
        'breath-btn-start': 'مشق شروع کریں',
        'breath-btn-stop': 'مشق روکیں',

        // Pillars
        'pillars-tagline': 'اورا کیوں؟',
        'pillars-title': 'محفوظ اے آئی رفاقت کا معیار',
        'pillars-desc': 'اورا ایک گرم، احترام پر مبنی اور محفوظ ماحول بنانے کے لئے جدید زبان کے ماڈلز کو ایک بہترین ڈیزائن کے ساتھ جوڑتا ہے۔',
        'p1-title': '6 مادری زبانیں',
        'p1-desc': 'اردو، عربی، ہندی، ہسپانوی، فرانسیسی اور انگریزی کو مکمل سمجھنے والے چیٹباکس سے بات کریں یا ٹائپ کریں۔',
        'p2-title': 'مکمل رازداری',
        'p2-desc': 'آپ کی تمام گفتگو نجی طور پر صرف آپ کے اپنے براؤزر میں محفوظ ہوتی ہے۔ ہم آپ کی باتیں کبھی فروخت نہیں کرتے۔',
        'p3-title': 'خالص حلال آواز',
        'p3-desc': 'ہم آپ کی روحانی اقدار کا احترام کرتے ہیں۔ ہماری آواز کا علاج بارش اور ہوا پر مشتمل ہے—موسیقی سے پاک۔',
        'p4-title': 'آواز کی شناخت',
        'p4-desc': 'پریشانی کے وقت ٹائپ کرنے کی ہمت نہیں؟ بس بولیں، ہمارا صوتی انجن آپ کی آواز کو تحریر میں بدل دے گا۔',

        // Safety
        'safety-badge': 'طبی اخلاقیات',
        'safety-title': 'ہماری حدود اور حفاظتی اصول',
        'safety-desc': 'اورا ایک ذہنی تندرستی کا ساتھی ہے، طبی علاج کا نعم البدل نہیں۔ ہم حفاظتی حدود برقرار رکھتے ہیں اور ہنگامی صورت حال میں فوری مدد کی رہنمائی کرتے ہیں۔',
        'safety-tab-1': 'اورا کی حدود',
        'safety-tab-2': '🚨 ہنگامی امداد کی لائنوں کی فہرست',
        'can-1': 'ہمدردانہ، پرسکون اور فعال انداز میں سننا۔',
        'can-2': 'سائنسی تنفس اور آرام دہ مشقیں فراہم کرنا۔',
        'can-3': 'طرز زندگی، نیند کے اصول اور سوچ کو منظم کرنا سکھانا۔',
        'can-4': 'براؤزر میں مکمل طور پر نجی اور محفوظ ریکارڈ فراہم کرنا۔',
        'cant-1': 'طبی تشخیص یا کلینیکل ادویات تجویز کرنا۔',
        'cant-2': 'پیشہ ور ماہر نفسیات یا کلینکس کا متبادل بننا۔',
        'cant-3': 'عام معلومات (GK) کے غیر متعلقہ سوالات کے جوابات دینا۔',
        'cant-4': 'بغیر ہنگامی انتباہ کے خود کو نقصان پہنچانے والے خیالات کی حوصلہ افزائی کرنا۔',
        'footer-slogan': 'ہمدردانہ اے آئی ذہنی صحت۔ نجی، کثیر لسانی اور مکمل حلال۔'
    }
};

function initLocalization() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langActiveLabel = document.getElementById('lang-active-label');

    // Language selector dropdown toggle
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langBtn.parentElement.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        langBtn.parentElement.classList.remove('open');
    });

    // Language select options
    langDropdown.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const selectedLang = item.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });
}

function setLanguage(lang) {
    if (!LANGUAGES[lang]) return;
    currentLanguage = lang;

    // Update active label UI
    const langActiveLabel = document.getElementById('lang-active-label');
    langActiveLabel.textContent = LANGUAGES[lang].name;

    // Set document directions (RTL vs LTR)
    const isRtl = LANGUAGES[lang].rtl;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    // Translate page elements with data-localize
    document.querySelectorAll('[data-localize]').forEach(el => {
        const key = el.getAttribute('data-localize');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });

    // Translate inputs with data-localize-placeholder
    document.querySelectorAll('[data-localize-placeholder]').forEach(el => {
        const key = el.getAttribute('data-localize-placeholder');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.setAttribute('placeholder', TRANSLATIONS[lang][key]);
        }
    });

    // Adjust canvas label display text
    const canvasLabel = document.getElementById('canvas-wave-label');
    const activeStateBtn = document.querySelector('.state-btn.active');
    if (activeStateBtn && canvasLabel) {
        const activeState = activeStateBtn.getAttribute('data-state').toUpperCase();
        canvasLabel.textContent = TRANSLATIONS[lang][`wave-state-${activeState.toLowerCase()}`].toUpperCase();
    }

    // Refresh breathing coach timer strings
    updateBreathingCoachUI();

    // Add CSS localized modifications if needed
    console.log(`Language set to: ${lang} (RTL: ${isRtl})`);
}


/* ==========================================================================
   2. MORPHING LIQUID WAVE CANVAS VISUALIZER
   ========================================================================== */
let canvas, ctx;
let animationFrameId;
let wavePhase = 0;
let activeWaveState = 'calm';

const STATE_COLORS = {
    calm: {
        bg: '#05070c',
        waves: [
            { color: 'rgba(16, 185, 129, 0.22)', speed: 0.012, amp: 28, freq: 0.006 }, // teal/mint
            { color: 'rgba(20, 184, 166, 0.16)', speed: 0.008, amp: 45, freq: 0.004 },
            { color: 'rgba(167, 139, 250, 0.12)', speed: 0.005, amp: 60, freq: 0.002 }  // soft lavender overlay
        ]
    },
    focus: {
        bg: '#06050e',
        waves: [
            { color: 'rgba(139, 92, 246, 0.25)', speed: 0.025, amp: 20, freq: 0.012 }, // vibrant violet
            { color: 'rgba(59, 130, 246, 0.18)', speed: 0.018, amp: 32, freq: 0.008 },  // serene blue
            { color: 'rgba(167, 139, 250, 0.14)', speed: 0.010, amp: 48, freq: 0.005 }
        ]
    },
    rest: {
        bg: '#030509',
        waves: [
            { color: 'rgba(59, 130, 246, 0.12)', speed: 0.005, amp: 50, freq: 0.003 }, // ocean blue
            { color: 'rgba(167, 139, 250, 0.15)', speed: 0.003, amp: 75, freq: 0.001 }, // deep lavender
            { color: 'rgba(15, 23, 42, 0.3)', speed: 0.002, amp: 90, freq: 0.0008 }
        ]
    }
};

function initAuraWaveCanvas() {
    canvas = document.getElementById('wave-canvas');
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave Mode Selectors
    document.querySelectorAll('.state-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const state = btn.getAttribute('data-state');
            switchWaveState(state);
        });
    });

    // Start wave rendering loop
    renderWaves();
}

function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 320;
}

function switchWaveState(state) {
    if (!STATE_COLORS[state]) return;
    activeWaveState = state;

    // Update label localization
    const canvasLabel = document.getElementById('canvas-wave-label');
    if (canvasLabel) {
        canvasLabel.textContent = TRANSLATIONS[currentLanguage][`wave-state-${state}`].toUpperCase();
    }
}

function renderWaves() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const config = STATE_COLORS[activeWaveState];
    wavePhase += 0.02; // Global master time ticker

    // 1. Render soft ambient background fill matching the wave states
    ctx.fillStyle = config.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw overlapping organic liquid waves
    config.waves.forEach((w, index) => {
        ctx.beginPath();
        ctx.fillStyle = w.color;

        const cy = canvas.height / 2; // Midpoint height
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 4) {
            // Combine mathematical sine and cosine to create organic ripples
            const angle1 = x * w.freq + wavePhase * (w.speed * 100);
            const angle2 = x * (w.freq * 0.5) - wavePhase * (w.speed * 50);
            
            const yOffset = Math.sin(angle1) * w.amp + Math.cos(angle2) * (w.amp * 0.4);
            ctx.lineTo(x, cy + yOffset);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
    });

    animationFrameId = requestAnimationFrame(renderWaves);
}


/* ==========================================================================
   3. HALAL NATURAL SOUND SYNTHESIZER (PURE NOISE GENERATION)
   ========================================================================== */
let audioCtx = null;
let isSoundPlaying = false;

// Synthesizer Audio Nodes
let rainNode = null;
let windNode = null;
let rainGain = null;
let windGain = null;
let masterGain = null;
let windFilter = null;
let windLfo = null;

function initAuraNaturalSynthesizer() {
    const playBtn = document.getElementById('sound-master-btn');
    const playBtnText = document.getElementById('sound-master-text');
    const sliderRain = document.getElementById('slider-rain');
    const sliderWind = document.getElementById('slider-wind');

    // Button master toggle
    playBtn.addEventListener('click', () => {
        if (!isSoundPlaying) {
            startSoundscape();
            playBtn.classList.add('playing');
            playBtn.querySelector('.play-icon').textContent = '■';
            playBtnText.textContent = TRANSLATIONS[currentLanguage]['wave-btn-stop'];
        } else {
            stopSoundscape();
            playBtn.classList.remove('playing');
            playBtn.querySelector('.play-icon').textContent = '▶';
            playBtnText.textContent = TRANSLATIONS[currentLanguage]['wave-btn-play'];
        }
    });

    // Sliders event listeners
    sliderRain.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('val-rain').textContent = `${val}%`;
        document.getElementById('fill-rain').style.width = `${val}%`;
        if (rainGain) {
            // Logarithmic volume curve for smooth perception
            rainGain.gain.setValueAtTime((val / 100) * 0.8, audioCtx.currentTime);
        }
    });

    sliderWind.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('val-wind').textContent = `${val}%`;
        document.getElementById('fill-wind').style.width = `${val}%`;
        if (windGain) {
            windGain.gain.setValueAtTime((val / 100) * 0.6, audioCtx.currentTime);
        }
    });

    // Initialize track fills
    document.getElementById('fill-rain').style.width = `${sliderRain.value}%`;
    document.getElementById('val-rain').textContent = `${sliderRain.value}%`;
    document.getElementById('fill-wind').style.width = `${sliderWind.value}%`;
    document.getElementById('val-wind').textContent = `${sliderWind.value}%`;
}

function startSoundscape() {
    // 1. Web Audio safe initialization
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    // 2. Set up master node path
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // 3. Create RAIN SOUND node (Generative high pass White Noise buffer)
    createRainNoiseNode();

    // 4. Create WIND SOUND node (Pink Noise modulated with a slow LFO sweep)
    createWindNoiseNode();

    isSoundPlaying = true;
    console.log("Generative nature soundscape started. Strictly Halal, zero musical tones.");
}

function stopSoundscape() {
    if (audioCtx) {
        if (rainNode) { rainNode.stop(); rainNode = null; }
        if (windNode) { windNode.stop(); windNode = null; }
        if (windLfo) { windLfo.stop(); windLfo = null; }
        isSoundPlaying = false;
        console.log("Generative soundscape stopped.");
    }
}

// Generate White Noise (Standard rain sound component)
function createRainNoiseNode() {
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Math.random builds standard audio white noise
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    rainNode = audioCtx.createBufferSource();
    rainNode.buffer = noiseBuffer;
    rainNode.loop = true;

    // Apply rain high-cut band filter to sound like soft rustling leaves and water
    const rainFilter = audioCtx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1400; // soft soothing rain hum
    rainFilter.Q.value = 0.5;

    rainGain = audioCtx.createGain();
    const initVol = document.getElementById('slider-rain').value;
    rainGain.gain.setValueAtTime((initVol / 100) * 0.8, audioCtx.currentTime);

    // Connect nodes
    rainNode.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(masterGain);

    rainNode.start();
}

// Generate Pink Noise & modulate it using a slow LFO (Standard breathing wind)
function createWindNoiseNode() {
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise approximation (1/f distribution)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // normalise volume
        b6 = white * 0.115926;
    }

    windNode = audioCtx.createBufferSource();
    windNode.buffer = noiseBuffer;
    windNode.loop = true;

    // Setup bandpass filters that sweep across frequency spectra to create gentle wind blowing
    windFilter = audioCtx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 400; // central bass breeze frequency
    windFilter.Q.value = 2.0;

    // Slow Low Frequency Oscillator (LFO) to swell filter frequency up/down like wave breezes
    windLfo = audioCtx.createOscillator();
    windLfo.type = 'sine';
    windLfo.frequency.value = 0.12; // 0.12Hz (completes a cycle every 8 seconds)

    const windLfoGain = audioCtx.createGain();
    windLfoGain.gain.value = 250; // Sweeps range of +/- 250Hz

    // Modulate filter frequency with LFO
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);

    windGain = audioCtx.createGain();
    const initVol = document.getElementById('slider-wind').value;
    windGain.gain.setValueAtTime((initVol / 100) * 0.6, audioCtx.currentTime);

    // Connect nodes
    windNode.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);

    windNode.start();
    windLfo.start();
}


/* ==========================================================================
   4. VOICE COMMUNICATOR ENGINE (STT & TTS COMFORT SYSTEMS)
   ========================================================================== */
let recognition = null;
let isListening = false;
let isTtsEnabled = false;

// Language code mapper for web speech systems
const SPEECH_LANG_CODES = {
    en: 'en-US',
    hi: 'hi-IN',
    ar: 'ar-SA',
    es: 'es-ES',
    fr: 'fr-FR',
    ur: 'ur-PK'
};

function initSpeechRecognitionAndSynthesis() {
    const micBtn = document.getElementById('chat-mic-btn');
    const speechToggle = document.getElementById('speech-synthesis-toggle');
    const micOverlay = document.getElementById('mic-status-overlay');
    const cancelSpeechBtn = document.getElementById('cancel-speech-btn');

    // 1. Initialise speech synthesis checkbox state
    speechToggle.addEventListener('change', (e) => {
        isTtsEnabled = e.target.checked;
        if (isTtsEnabled) {
            // Warm-up synthesis voices instantly
            window.speechSynthesis.getVoices();
        }
    });

    // 2. Setup Speech Recognition system inside browser
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
            isListening = true;
            micOverlay.style.display = 'flex';
            document.getElementById('speech-transcript-preview').textContent = TRANSLATIONS[currentLanguage]['mic-preview'];
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            const previewText = finalTranscript || interimTranscript;
            document.getElementById('speech-transcript-preview').textContent = previewText;

            if (finalTranscript) {
                document.getElementById('chat-text-input').value = finalTranscript;
                setTimeout(() => {
                    stopListeningAndSubmit();
                }, 900); // Small pause after speaking ends to auto-submit
            }
        };

        recognition.onerror = (e) => {
            console.error('Speech recognition error:', e);
            stopSpeechRecognition();
        };

        recognition.onend = () => {
            stopSpeechRecognition();
        };

        // Mic Button Click handler
        micBtn.addEventListener('click', () => {
            if (!isListening) {
                // Set language locale dynamically
                recognition.lang = SPEECH_LANG_CODES[currentLanguage];
                recognition.start();
            }
        });

        // Cancel Listening
        cancelSpeechBtn.addEventListener('click', () => {
            stopSpeechRecognition();
        });

    } else {
        // Fallback for browsers without speech support (e.g. Firefox)
        micBtn.style.opacity = '0.5';
        micBtn.title = "Voice recognition is not supported in this browser.";
        micBtn.addEventListener('click', () => {
            alert("Speech recognition is not supported by your browser. Please try Chrome, Edge, or Safari.");
        });
    }
}

function stopSpeechRecognition() {
    isListening = false;
    const micOverlay = document.getElementById('mic-status-overlay');
    if (micOverlay) micOverlay.style.display = 'none';
    if (recognition) {
        recognition.stop();
    }
}

function stopListeningAndSubmit() {
    stopSpeechRecognition();
    const inputField = document.getElementById('chat-text-input');
    const userMsg = inputField.value.trim();
    if (userMsg) {
        handleUserMessage(userMsg);
        inputField.value = '';
    }
}

// Empathy Speech Synthesis Audio Output
function speakAuraResponse(text, lang) {
    if (!isTtsEnabled || !('speechSynthesis' in window)) return;

    // Safely stop any running synthesis beforehand
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LANG_CODES[lang];
    
    // Choose appropriate soothing voice based on local lists
    const voices = window.speechSynthesis.getVoices();
    const targetLangCode = SPEECH_LANG_CODES[lang];
    
    // Attempt to locate native accent voices
    const matchingVoice = voices.find(v => v.lang.includes(targetLangCode) || v.lang === targetLangCode);
    if (matchingVoice) {
        utterance.voice = matchingVoice;
    }

    // Set comforting pace speeds (slower than normal rates)
    utterance.rate = 0.88; 
    utterance.pitch = 1.0; 

    window.speechSynthesis.speak(utterance);
}


/* ==========================================================================
   5. EMPATHETIC CHATBOT DIALOG ENGINE WITH GENERAL KNOWLEDGE BLOCK
   ========================================================================== */
const MULTILINGUAL_AI_ANSWERS = {
    en: {
        // Topic Boundary Block Redirect Response
        'gk-block': 'I am here specifically to support your emotional well-being and mental health. If you are feeling stressed, anxious, or just want to talk about your day, I\'m here to listen. For general knowledge questions, a search engine would be a better fit.',
        
        // Empathetic dialog answers
        'stress': 'I hear you. Stress can feel like an invisible heavy weight. Try to pause for a moment. You don\'t have to figure everything out right now. Would you like to try a 1-minute silent box breathing exercise to calm your pulse?',
        'anxious': 'It\'s completely okay to feel anxious, but remember that feelings are like clouds—they pass through your sky. You are safe here. Take a slow deep breath. Tell me, is there a specific thought making you feel anxious, or is it a general body feeling?',
        'sleep': 'Struggling to sleep can be very exhausting. Avoid checking the clock. Try turning off your screens, lowering your room temperature, and relaxing your jaw. You can also listen to our Rainfall soundscape on the dashboard to calm your room.',
        'focus': 'When the mind is scattered, don\'t force it. Try the Pomodoro method: pick just ONE tiny task, focus for 10 minutes, then rest. Taking a 5-minute walk outside or stepping away from your screen can also restore mental clarity.',
        'lonely': 'I am right here with you. Loneliness can feel very quiet, but you are not alone in having these human feelings. Tell me about what you are passionate about, or what you did today. I am all ears and happy to keep you company.',
        'default': 'Thank you for sharing that with me. I am here to listen and support you without judgment. How does that make you feel, and is there anything I can do to help you organize your thoughts?'
    },
    hi: {
        'gk-block': 'मैं यहाँ विशेष रूप से आपके भावनात्मक कल्याण और मानसिक स्वास्थ्य का समर्थन करने के लिए हूँ। यदि आप तनाव या चिंता महसूस कर रहे हैं, तो मैं यहाँ आपकी सुनने के लिए हूँ। सामान्य ज्ञान के प्रश्नों के लिए खोज इंजन बेहतर रहेगा।',
        'stress': 'मैं समझ सकता हूँ। तनाव एक अदृश्य भारी वजन की तरह महसूस हो सकता है। एक पल के लिए रुकें। आपको अभी सब कुछ हल करने की आवश्यकता नहीं है। क्या आप अपने तनाव को कम करने के लिए 1 मिनट का मौन श्वास अभ्यास करना चाहेंगे?',
        'anxious': 'घबराहट महसूस होना पूरी तरह से सामान्य है, लेकिन याद रखें कि भावनाएं बादलों की तरह हैं—वे भी गुजर जाएंगी। आप यहाँ पूरी तरह सुरक्षित हैं। एक गहरी सांस लें। क्या कोई विशिष्ट विचार आपको परेशान कर रहा है?',
        'sleep': 'नींद न आना बहुत थका देने वाला हो सकता है। घड़ी देखना बंद करें, अपनी स्क्रीन बंद करें और अपने जबड़े को ढीला करें। आप शांत होने के लिए हमारे डैशबोर्ड पर बारिश की आवाज भी चालू कर सकते हैं।',
        'focus': 'जब मन अशांत हो, तो जबरदस्ती न करें। केवल एक छोटा काम चुनें, 10 मिनट के लिए ध्यान केंद्रित करें, फिर आराम करें। थोड़ा टहलने से भी मस्तिष्क को स्पष्टता मिलती है।',
        'lonely': 'मैं यहाँ आपके साथ हूँ। अकेलापन बहुत शांत महसूस करा सकता है, लेकिन इस भावना में आप अकेले नहीं हैं। मुझे अपने दिन के बारे में बताएं, मैं आपकी बात सुनने के लिए हमेशा तैयार हूँ।',
        'default': 'मुझसे यह साझा करने के लिए धन्यवाद। मैं आपकी बात बिना किसी निर्णय के सुनने और आपका समर्थन करने के लिए यहाँ हूँ। आपको कैसा महसूस हो रहा है?'
    },
    ar: {
        'gk-block': 'أنا هنا خصيصاً لدعم سلامتك العقلية والعاطفية. إذا كنت تشعر بالتوتر أو القلق، أنا هنا للاستماع إليك. بالنسبة لأسئلة الثقافة العامة، فإن محرك البحث سيكون الخيار الأنسب.',
        'stress': 'أنا أشعر بك. يمكن للتوتر أن يشعرنا بحمل ثقيل غير مرئي. خذ قسطاً من الراحة، لست مضطراً لحل كل شيء في هذه اللحظة. هل تود تجربة تمرين التنفس المربع الصامت لمدة دقيقة لتهدئة نبضك؟',
        'anxious': 'من الطبيعي تماماً أن تشعر بالقلق، لكن تذكر أن المشاعر مثل الغيوم—تأتي وتذهب. أنت آمن هنا. خذ نفساً عميقاً وبطيئاً. هل هناك فكرة معينة تجعلك قلقاً؟',
        'sleep': 'صعوبة النوم يمكن أن تكون مرهقة للغاية. تجنب النظر إلى الساعة، وأغلق شاشات الهواتف، وأرح فكك. يمكنك أيضاً تشغيل صوت المطر من لوحة التحكم لمساعدتك على الاسترخاء.',
        'focus': 'عندما يكون ذهنك مشتتاً، لا تجبر نفسك. جرب التركيز على مهمة واحدة صغيرة جداً لمدة 10 دقائق فقط، ثم خذ قسطاً من الراحة. المشي القصير في الهواء الطلق يمكن أن يعيد لك صفاءك الذهني.',
        'lonely': 'أنا هنا معك. يمكن للوحدة أن تشعرنا بالهدوء الشديد، لكنك لست وحدك في هذه المشاعر الإنسانية. أخبرني عن يومك، أنا هنا للاستماع والمحافظة على صحبتك والوقوف بجانبك.',
        'default': 'شكراً لمشاركتي هذا. أنا هنا للاستماع إليك ودعمك دون أي أحكام. كيف يجعلك هذا تشعر الآن؟'
    },
    es: {
        'gk-block': 'Estoy aquí específicamente para apoyar tu bienestar emocional y salud mental. Si te sientes estresado, ansioso o simplemente quieres hablar de tu día, estoy aquí para escucharte. Para preguntas de cultura general, un motor de búsqueda sería más adecuado.',
        'stress': 'Te entiendo. El estrés puede sentirse como un peso invisible y pesado. Intenta pausar por un momento. No tienes que resolver todo hoy. ¿Te gustaría intentar una respiración en caja silenciosa de 1 minuto?',
        'anxious': 'Está completamente bien sentirse ansioso, pero recuerda que las emociones son como las nubes: pasan por tu cielo. Estás seguro aquí. Toma un respiro lento y profundo. ¿Hay algún pensamiento en especial o es algo físico?',
        'sleep': 'Luchar por conciliar el sueño puede ser agotador. Evita mirar el reloj, apaga tus pantallas y relaja la mandíbula. También puedes activar el sonido de la Lluvia en el panel para calmar tu habitación.',
        'focus': 'Cuando la mente está dispersa, no la fuerces. Elige una sola tarea pequeña, enfócate por 10 minutos y luego descansa. Una caminata corta afuera o alejarte de la pantalla te devolverá la claridad mental.',
        'lonely': 'Estoy aquí contigo. La soledad puede sentirse muy silenciosa, pero no estás solo en tener estos sentimientos humanos. Cuéntame sobre tu día o algo que te apasione, me alegra hacerte compañía.',
        'default': 'Gracias por compartir eso conmigo. Estoy aquí para escucharte y apoyarte sin juzgar. ¿Cómo te hace sentir eso hoy?'
    },
    fr: {
        'gk-block': 'Je suis ici spécifiquement pour soutenir votre bien-être émotionnel et votre santé mentale. Si vous êtes stressé, anxieux ou souhaitez simplement parler de votre journée, je suis là pour vous écouter. Pour les questions de culture générale, un moteur de recherche sera plus adapté.',
        'stress': 'Je vous comprends. Le stress peut peser comme un fardeau invisible. Prenez une pause. Vous n\'avez pas à tout résoudre maintenant. Souhaitez-vous essayer un exercice de respiration silencieux pour calmer votre rythme ?',
        'anxious': 'C\'est tout à fait normal de ressentir de l\'anxiété, mais rappelez-vous que les émotions passent comme des nuages. Vous êtes en sécurité ici. Prenez une respiration lente. Y a-t-il une pensée précise qui vous préoccupe ?',
        'sleep': 'Avoir du mal à dormir est épuisant. Évitez de regarder l\'heure, éteignez les écrans et relâchez vos tensions corporelles. Vous pouvez aussi activer notre son de Pluie douce pour vous aider à vous endormir.',
        'focus': 'Lorsque l\'esprit est dispersé, ne forcez rien. Choisissez une seule micro-tâche, concentrez-vous dessus pendant 10 minutes, puis reposez-vous. Une courte marche peut également clarifier vos pensées.',
        'lonely': 'Je suis là avec vous. La solitude est parfois lourde, mais ces sentiments humains sont partagés. Racontez-moi votre journée ou vos passions, je serai ravi de vous tenir compagnie.',
        'default': 'Merci de partager cela avec moi. Je suis à votre écoute pour vous soutenir sans jugement. Comment cela vous fait-il vous sentir en ce moment ?'
    },
    ur: {
        'gk-block': 'میں یہاں خاص طور پر آپ کی جذباتی تندرستی اور ذہنی صحت کی مدد کے لئے ہوں۔ اگر آپ تناؤ، پریشانی محسوس کر رہے ہیں تو میں آپ کی بات سننے کے لئے تیار ہوں۔ عام معلومات کے سوالات کے لئے سرچ انجن کا استعمال بہتر رہے گا۔',
        'stress': 'میں آپ کی بات سمجھ سکتا ہوں۔ تناؤ ایک بھاری غیبی بوجھ کی طرح محسوس ہو سکتا ہے۔ تھوڑی دیر کے لئے رکیں۔ آپ کو ابھی سب کچھ حل کرنے کی ضرورت نہیں ہے۔ کیا آپ تناؤ کم کرنے کے لئے 1 منٹ کی پرسکون تنفس کی مشق کرنا چاہیں گے؟',
        'anxious': 'پریشانی محسوس ہونا بالکل فطری بات ہے، لیکن یاد رکھیں کہ احساسات بادلوں کی طرح ہوتے ہیں جو گزر جاتے ہیں۔ آپ یہاں بالکل محفوظ ہیں۔ ایک گہرا اور دھما سانس لیں۔ کیا کوئی خاص سوچ آپ کو پریشان کر رہی ہے؟',
        'sleep': 'نیند نہ آنا انسان کو بہت نڈھال کر دیتا ہے۔ بار بار گھڑی مت دیکھیں، فون اسکرین بند کریں اور آرام سے لیٹیں۔ آپ ذہن کو پرسکون کرنے کے لئے ہمارے مکسر پر بارش کی آواز بھی چلا سکتے ہیں۔',
        'focus': 'جب ذہن منتشر ہو تو زبردستی مت کریں۔ صرف ایک چھوٹا سا کام منتخب کریں، 10 منٹ کے لئے اس پر توجہ دیں، پھر آرام کریں۔ تھوڑی دیر چہل قدمی کرنے سے بھی ذہن صاف ہو جاتا ہے۔',
        'lonely': 'میں یہاں آپ کے ساتھ ہوں۔ اکیلا پن خاموش سا محسوس ہوتا ہے، لیکن اس احساس میں آپ اکیلے نہیں ہیں۔ مجھے اپنے دن کے بارے میں کچھ بتائیں، میں آپ کی بات سننے کے لئے ہمیشہ تیار ہوں۔',
        'default': 'مجھ سے یہ بات شیئر کرنے کے لئے شکریہ۔ میں بغیر کسی تنقید کے آپ کی بات سننے اور آپ کی مدد کرنے کے لئے یہاں ہوں۔ اب آپ کیسا محسوس کر رہے ہیں؟'
    }
};

// General Knowledge and out-of-scope keyword checkers across languages
const GK_KEYWORDS = [
    'president', 'prime minister', 'capital of', 'who is', 'weather in', 
    'solve', 'equation', 'math', 'sports', 'football', 'cricket', 'news', 
    'currency of', 'population', 'born in', 'history of', 'capital is',
    'राष्ट्रपति', 'प्रधानमंत्री', 'राजधानी', 'मौसम', 'गणित', 'क्रिकेट', 'समाचार',
    'رئيس', 'وزير', 'عاصمة', 'طقس', 'رياضة', 'كرة', 'أخبار', 'حل المعادلة',
    'presidente', 'primer ministro', 'capital de', 'clima en', 'matemáticas', 'fútbol', 'noticias',
    'président', 'premier ministre', 'capitale de', 'météo à', 'maths', 'foot', 'nouvelles',
    'صدر', 'وزیراعظم', 'دارالحکومت', 'موسم', 'کرکٹ', 'خبریں', 'ریاضی'
];

function initEmpatheticChatbot() {
    const sendBtn = document.getElementById('chat-send-btn');
    const textInput = document.getElementById('chat-text-input');
    const presetsContainer = document.getElementById('presets-container');

    // Send Button Click
    sendBtn.addEventListener('click', () => {
        const msg = textInput.value.trim();
        if (msg) {
            handleUserMessage(msg);
            textInput.value = '';
        }
    });

    // Press Enter to Send
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const msg = textInput.value.trim();
            if (msg) {
                handleUserMessage(msg);
                textInput.value = '';
            }
        }
    });

    // Preset Prompt click triggers
    presetsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const presetType = btn.getAttribute('data-msg');
            let testText = '';
            
            // Map test text accurately across current languages
            if (presetType === 'feeling-overwhelmed') {
                testText = currentLanguage === 'hi' ? 'मैं बहुत तनाव महसूस कर रहा हूँ' : 
                           currentLanguage === 'ar' ? 'أشعر بالضغط الشديد اليوم' : 
                           currentLanguage === 'es' ? 'Me siento muy abrumado' : 
                           currentLanguage === 'fr' ? 'Je me sens submergé' : 
                           currentLanguage === 'ur' ? 'میں بہت تناؤ محسوس کر رہا ہوں' : 'I feel overwhelmed';
            } else if (presetType === 'cannot-sleep') {
                testText = currentLanguage === 'hi' ? 'मुझे नींद नहीं आ रही है' : 
                           currentLanguage === 'ar' ? 'لا أستطيع النوم' : 
                           currentLanguage === 'es' ? 'No puedo conciliar el sueño' : 
                           currentLanguage === 'fr' ? 'Je n\'arrive pas à dormir' : 
                           currentLanguage === 'ur' ? 'مجھے نیند نہیں آ رہی ہے' : 'I cannot sleep';
            } else if (presetType === 'need-focus') {
                testText = currentLanguage === 'hi' ? 'एकाग्रता बढ़ाने के सुझाव चाहिए' : 
                           currentLanguage === 'ar' ? 'أحتاج لنصائح لزيادة التركيز' : 
                           currentLanguage === 'es' ? 'Necesito consejos para enfocarme' : 
                           currentLanguage === 'fr' ? 'Conseils pour me concentrer' : 
                           currentLanguage === 'ur' ? 'توجہ مرکوز کرنے کی ٹپس چاہیے' : 'I need focus tips';
            } else if (presetType === 'gk-test') {
                testText = currentLanguage === 'hi' ? 'भारत के राष्ट्रपति कौन हैं?' : 
                           currentLanguage === 'ar' ? 'من هو رئيس الهند؟' : 
                           currentLanguage === 'es' ? '¿Quién es el presidente de India?' : 
                           currentLanguage === 'fr' ? 'Qui est le président de l\'Inde ?' : 
                           currentLanguage === 'ur' ? 'بھارت کا صدر کون ہے؟' : 'Who is the President of India?';
            }

            handleUserMessage(testText);
        });
    });
}

function handleUserMessage(msgText) {
    appendMessage(msgText, 'user');

    // Trigger Typing Dot Indicator
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';

    // Auto-scroll chat history to bottom
    const history = document.getElementById('chat-history');
    history.scrollTop = history.scrollHeight;

    // Simulate comforting natural processing typing delay (1.5 seconds)
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        
        // 1. Process text against boundary constraints (GK interceptor)
        const isGkQuestion = checkIsGKQuestion(msgText);
        let replyText = '';

        if (isGkQuestion) {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['gk-block'];
        } else {
            // 2. Standard wellness categorization
            const lowerMsg = msgText.toLowerCase();
            if (containsAny(lowerMsg, ['stress', 'overwhelm', 'heavy', 'work', 'तनाव', 'दबाव', 'ضغط', 'متوتر', 'abrumado', 'estrés', 'fatigue', 'surmené'])) {
                replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['stress'];
            } else if (containsAny(lowerMsg, ['anxious', 'panic', 'fear', 'nervous', 'चिंता', 'घबराहट', 'قلق', 'خوف', 'ansioso', 'ansiedad', 'peur', 'panique', 'پریشان', 'گھبراہٹ'])) {
                replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['anxious'];
            } else if (containsAny(lowerMsg, ['sleep', 'insomnia', 'night', 'tired', 'नींद', 'थकान', 'نوم', 'أرق', 'سهر', 'dormir', 'sueño', 'sommeil', 'nuit', 'تھکن'])) {
                replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['sleep'];
            } else if (containsAny(lowerMsg, ['focus', 'scattered', 'concentrate', 'study', 'एकाग्र', 'ध्यान', 'تركيز', 'توجہ', 'enfocar', 'concentración', 'concentrer', 'مرتکز'])) {
                replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['focus'];
            } else if (containsAny(lowerMsg, ['lonely', 'alone', 'sad', 'cry', 'अकेला', 'उदासी', 'وحيد', 'حزن', 'soledad', 'triste', 'seul', 'اکیلا', 'اداس'])) {
                replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['lonely'];
            } else {
                replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['default'];
            }
        }

        // Render AI bubble
        appendMessage(replyText, 'bot');
        
        // Optional voice synthesis out loud readback (strictly Halal speech, no tones)
        speakAuraResponse(replyText, currentLanguage);

    }, 1500);
}

function appendMessage(text, sender) {
    const history = document.getElementById('chat-history');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-message`;

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;

    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = TRANSLATIONS[currentLanguage]['chat-time-now'];

    bubble.appendChild(content);
    bubble.appendChild(time);
    history.appendChild(bubble);

    // Smooth scroll down
    history.scrollTop = history.scrollHeight;
}

function checkIsGKQuestion(text) {
    const cleaned = text.toLowerCase().trim();
    
    // Exact matching for pre-defined GK testing prompts
    if (cleaned.includes('president of india') || 
        cleaned.includes('राष्ट्रपति कौन') || 
        cleaned.includes('رئيس الهند') || 
        cleaned.includes('presidente de india') || 
        cleaned.includes('président de l\'inde') || 
        cleaned.includes('صدر کون')) {
        return true;
    }

    // Keyword matching fallback
    return GK_KEYWORDS.some(k => cleaned.includes(k));
}

function containsAny(text, array) {
    return array.some(item => text.includes(item));
}


/* ==========================================================================
   6. MOOD TRACKER & ANALYTICS INTERACTIVE MODULE
   ========================================================================== */
const MOOD_STATISTICS = {
    calm: {
        rec: {
            en: 'Splendid state! Keep maintaining this balanced mindfulness. Continue with your silent walks or take moments to breathe in 4s tempos.',
            hi: 'उत्कृष्ट स्थिति! इस संतुलित स्पष्टता को बनाए रखें। अपनी मौन सैर जारी रखें या समय-समय पर गहरी सांसें लेते रहें।',
            ar: 'حالة رائعة ومميزة! استمر في الحفاظ على هذا التوازن العصبي. واصل ممارسة المشي الهادئ وأخذ فترات راحة قصيرة للتنفس.',
            es: '¡Excelente estado! Sigue manteniendo este equilibrio consciente. Continúa con caminatas silenciosas o momentos de respiración tranquila.',
            fr: 'Superbe état ! Continuez à cultiver cet équilibre. Poursuivez vos marches silencieuses ou prenez de courts moments pour respirer.',
            ur: 'شاندار حالت! اس پرسکون بیداری کو برقرار رکھیں۔ اپنی خاموش چہل قدمی جاری رکھیں اور گہرے سانس لیتے رہیں۔'
        },
        score: '88%',
        bars: [85, 88, 76, 92, 80, 95, 88]
    },
    stressed: {
        rec: {
            en: 'Stress levels are elevated. Try to pause what you are doing. We highly recommend starting our 1-minute Guided Breathing Box Pacer below immediately to reset.',
            hi: 'तनाव का स्तर अधिक है। आप जो कर रहे हैं उसे एक पल के लिए रोकें। शरीर को शांत करने के लिए हम नीचे दिए गए 1-मिनट श्वास कोच को तुरंत करने की सलाह देते हैं।',
            ar: 'مستويات التوتر لديك مرتفعة حالياً. نوصي بشدة بأخذ استراحة وتجربة مدرب التنفس الموجه بالأسفل لمدة دقيقة لتنظيم ضربات قلبك ونبضك.',
            es: 'Los niveles de estrés son altos. Detén lo que estás haciendo por un segundo. Te recomendamos usar el entrenador de respiración guiada de 1 minuto abajo.',
            fr: 'Le niveau de stress est élevé. Faites une pause. Nous vous recommandons vivement de commencer notre exercice de respiration guidée ci-dessous.',
            ur: 'تناؤ کا لیول زیادہ ہے۔ کام کو ایک سیکنڈ کے لئے روکیں۔ ہم تجویز کرتے ہیں کہ اعصاب کو پرسکون کرنے کے لئے نیچے دی گئی تنفس کی مشق فوری کریں۔'
        },
        score: '58%',
        bars: [50, 62, 58, 48, 65, 55, 58]
    },
    focused: {
        rec: {
            en: 'High productivity and alert state! Harness this cognitive flow. Remember to step away for a 5-minute eye-rest stretch every 45 minutes.',
            hi: 'उच्च स्पष्टता और उत्पादक स्थिति! इस एकाग्र प्रवाह का लाभ उठाएं। याद रखें कि हर 45 मिनट में आंखों को आराम देने के लिए एक छोटा ब्रेक लें।',
            ar: 'حالة إنتاجية وتركيز ممتاز! استثمر هذا التدفق الذهني. تذكر أخذ قسط من الراحة للعينين ولمدة 5 دقائق كل 45 دقيقة من العمل المستمر.',
            es: '¡Estado de alta concentración! Aprovecha este flujo cognitivo. Recuerda descansar los ojos 5 minutos por cada 45 minutos de enfoque.',
            fr: 'Focalisation et clarté optimales ! Profitez de ce flux cognitif. N\'oubliez pas de reposer vos yeux 5 minutes toutes les 45 minutes.',
            ur: 'بہترین توجہ اور کام کرنے کی حالت! اس ذہنی بہاؤ سے فائدہ اٹھائیں۔ ہر 45 منٹ بعد آنکھوں کو آرام دینے کے لئے 5 منٹ کا وقفہ لازمی کریں۔'
        },
        score: '92%',
        bars: [90, 92, 85, 96, 88, 98, 92]
    },
    exhausted: {
        rec: {
            en: 'Body battery is draining. Physical tiredness directly dulls the mind. Try to wrap up your day early, drink warm water, and avoid using screens prior to sleep.',
            hi: 'शारीरिक ऊर्जा कम हो रही है। अत्यधिक थकान मन को सुस्त बनाती है। आज अपना काम जल्दी समाप्त करें, गुनगुना पानी पिएं और सोने से पहले स्क्रीन से दूर रहें।',
            ar: 'مستويات طاقتك منخفضة. الإرهاق البدني يقلل من صفاء الذهن. حاول إنهاء مهامك مبكراً، واشرب كوباً من الماء وتجنب تماماً الشاشات المضيئة قبل النوم.',
            es: 'La energía de tu cuerpo está baja. El cansancio físico reduce la claridad mental. Intenta terminar tus tareas temprano y apagar pantallas antes de dormir.',
            fr: 'Votre niveau d\'énergie est bas. La fatigue physique engourdit l\'esprit. Essayez de terminer votre journée tôt et éteignez les écrans avant de dormir.',
            ur: 'جسمانی توانائی کم ہو رہی ہے۔ جسمانی تھکن دماغ کو سست کر دیتی ہے۔ آج کام جلدی ختم کریں، ہلکا نیم گرم پانی پیئں اور نیند سے پہلے فون مت دیکھیں۔'
        },
        score: '64%',
        bars: [68, 70, 60, 62, 58, 72, 64]
    }
};

function initMoodTracker() {
    const emojiBtns = document.querySelectorAll('.mood-emoji-btn');
    const recBox = document.getElementById('ai-mood-rec');
    const scoreBadge = document.getElementById('weekly-score-badge');

    emojiBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active classes
            emojiBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedMood = btn.getAttribute('data-mood');
            const data = MOOD_STATISTICS[selectedMood];

            if (data) {
                // Update recommendation text localized
                recBox.innerHTML = `<p style="color: var(--text-primary); font-weight: 500;">${data.rec[currentLanguage]}</p>`;
                
                // Update weekly score badge
                scoreBadge.textContent = `Score: ${data.score}`;

                // Animate bars update smoothly
                const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                dayKeys.forEach((day, index) => {
                    const barFill = document.getElementById(`bar-${day}`);
                    if (barFill) {
                        const scoreVal = data.bars[index];
                        barFill.style.height = `${scoreVal}%`;
                        barFill.querySelector('.bar-value').textContent = `${scoreVal}%`;
                        
                        // Dynamically adjust color highlights based on score scales
                        if (scoreVal < 60) {
                            barFill.style.background = 'linear-gradient(180deg, var(--accent-rose) 0%, rgba(244, 63, 94, 0.15) 100%)';
                        } else if (scoreVal < 80) {
                            barFill.style.background = 'linear-gradient(180deg, var(--accent-blue) 0%, rgba(59, 130, 246, 0.15) 100%)';
                        } else {
                            barFill.style.background = 'linear-gradient(180deg, var(--accent-green) 0%, rgba(16, 185, 129, 0.15) 100%)';
                        }
                    }
                });
            }
        });
    });
}


/* ==========================================================================
   7. GUIDED SILENT BREATHING PACER
   ========================================================================== */
let breathingTimerInterval = null;
let breathingPacerActive = false;
let breathingPhaseIndex = 0; // 0 = Inhale, 1 = Hold, 2 = Exhale, 3 = Hold
let breathingTimeRemaining = 0;
let activeBreathingRatio = 'relax';

const BREATHING_CONFIG = {
    // Cycles in seconds [Inhale, Hold, Exhale, Hold]
    relax: { ratios: [4, 4, 4, 4], names: ['inhale', 'hold', 'exhale', 'hold'] },
    focus: { ratios: [4, 4, 8, 0], names: ['inhale', 'hold', 'exhale'] },
    sleep: { ratios: [4, 7, 8, 0], names: ['inhale', 'hold', 'exhale'] }
};

function initBreathingCoach() {
    const breathingModeCards = document.querySelectorAll('.breathing-modes .mode-card');
    const startBtn = document.getElementById('start-breathing-btn');

    // Select breathing modes
    breathingModeCards.forEach(card => {
        card.addEventListener('click', () => {
            if (breathingPacerActive) {
                stopBreathingExercise();
            }
            breathingModeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            activeBreathingRatio = card.getAttribute('data-bmode');
        });
    });

    // Start/Stop Exercise Trigger
    startBtn.addEventListener('click', () => {
        if (!breathingPacerActive) {
            startBreathingExercise();
            startBtn.classList.add('active');
            startBtn.textContent = TRANSLATIONS[currentLanguage]['breath-btn-stop'];
        } else {
            stopBreathingExercise();
            startBtn.classList.remove('active');
            startBtn.textContent = TRANSLATIONS[currentLanguage]['breath-btn-start'];
        }
    });

    // Support tab panels triggers for Clinical Safety center
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPane = document.getElementById(`tab-${tab.getAttribute('data-tab')}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

function startBreathingExercise() {
    breathingPacerActive = true;
    breathingPhaseIndex = 0;
    
    // Lock in the configuration timings
    const config = BREATHING_CONFIG[activeBreathingRatio];
    breathingTimeRemaining = config.ratios[breathingPhaseIndex];

    executeBreathingPhaseCycle();

    breathingTimerInterval = setInterval(() => {
        breathingTimeRemaining--;
        document.getElementById('breathing-timer').textContent = `${breathingTimeRemaining}s`;

        if (breathingTimeRemaining <= 0) {
            // Advance to next cycle phase
            breathingPhaseIndex = (breathingPhaseIndex + 1) % config.ratios.length;
            
            // Skip 0-second phase states (e.g. Focus & Sleep have no final hold)
            if (config.ratios[breathingPhaseIndex] === 0) {
                breathingPhaseIndex = 0;
            }

            breathingTimeRemaining = config.ratios[breathingPhaseIndex];
            executeBreathingPhaseCycle();
        }
    }, 1000);
}

function stopBreathingExercise() {
    breathingPacerActive = false;
    clearInterval(breathingTimerInterval);
    breathingTimerInterval = null;

    // Reset visual cues
    const ring = document.getElementById('breathing-ring');
    ring.className = 'breathing-ring-outer';
    document.getElementById('breathing-cue').textContent = TRANSLATIONS[currentLanguage]['breath-cue-ready'];
    document.getElementById('breathing-timer').textContent = '0s';

    document.querySelectorAll('.cue-indicator').forEach(c => c.classList.remove('active-cue'));
    
    const startBtn = document.getElementById('start-breathing-btn');
    startBtn.classList.remove('active');
    startBtn.textContent = TRANSLATIONS[currentLanguage]['breath-btn-start'];
}

function executeBreathingPhaseCycle() {
    const config = BREATHING_CONFIG[activeBreathingRatio];
    const activePhaseName = config.names[breathingPhaseIndex]; // 'inhale', 'hold', 'exhale'
    const ring = document.getElementById('breathing-ring');

    // Update ring size animations by modifying class variables
    ring.className = `breathing-ring-outer ${activePhaseName}`;
    
    // Update textual prompt cues localized
    const cueLabelKey = `breath-cue-${activePhaseName}`;
    document.getElementById('breathing-cue').textContent = TRANSLATIONS[currentLanguage][cueLabelKey];
    document.getElementById('breathing-timer').textContent = `${breathingTimeRemaining}s`;

    // Highlight step cards
    document.querySelectorAll('.cue-indicator').forEach(c => c.classList.remove('active-cue'));
    
    let indicatorId = '';
    if (activePhaseName === 'inhale') indicatorId = 'cue-in';
    else if (activePhaseName === 'hold') indicatorId = 'cue-hold';
    else if (activePhaseName === 'exhale') indicatorId = 'cue-out';

    const activeIndicator = document.getElementById(indicatorId);
    if (activeIndicator) activeIndicator.classList.add('active-cue');
}

function updateBreathingCoachUI() {
    const ring = document.getElementById('breathing-ring');
    const cueText = document.getElementById('breathing-cue');
    const startBtn = document.getElementById('start-breathing-btn');

    if (!breathingPacerActive) {
        cueText.textContent = TRANSLATIONS[currentLanguage]['breath-cue-ready'];
        startBtn.textContent = TRANSLATIONS[currentLanguage]['breath-btn-start'];
    } else {
        startBtn.textContent = TRANSLATIONS[currentLanguage]['breath-btn-stop'];
        // Re-trigger current cycle phase textual translations instantly
        const config = BREATHING_CONFIG[activeBreathingRatio];
        const activePhaseName = config.names[breathingPhaseIndex];
        cueText.textContent = TRANSLATIONS[currentLanguage][`breath-cue-${activePhaseName}`];
    }
}


/* ==========================================================================
   8. MOBILE RESPONSIVE DRAWER & HEADER SCROLLS
   ========================================================================== */
function initNavigationDrawer() {
    const toggleBtn = document.getElementById('nav-toggle');
    const navBar = document.getElementById('navbar');

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBtn.classList.toggle('open');
        navBar.classList.toggle('open');
    });

    // Close menu when clicking links
    navBar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navBar.classList.remove('open');
        });
    });

    // Header scroll background modification
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 40) {
            header.style.background = 'rgba(5, 7, 12, 0.9)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.background = 'rgba(8, 12, 20, 0.4)';
            header.style.boxShadow = 'none';
        }
    });
}
