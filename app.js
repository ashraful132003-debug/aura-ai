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
        'nav-features': 'Features',
        'nav-wave': 'Aura Wave',
        'nav-chat': 'Meet Aura',
        'nav-mood': 'Mood Tracker',
        'nav-breathing': 'Breathing',
        'nav-safety': 'Safety',
        'nav-cta': 'Start Free',
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
        'wave-mixer-note': 'These ambient textures are scientifically synthesized in real-time. Completely clean and permissible.',
        'chat-tagline': '24/7 Compassionate Support',
        'chat-title': 'Empathetic Mental Support Without Limits',
        'chat-desc': 'Aura is built strictly to understand and guide you through feelings of anxiety, burn-out, or loneliness.',
        'voice-badge-text': 'Voice-Enabled Companion',
        'voice-box-title': 'Don\'t feel like typing?',
        'voice-box-desc': 'Simply click the microphone icon inside the chat box, speak naturally, and watch Aura record your words.',
        'speech-toggle-title': 'Calming Audio Readback',
        'speech-toggle-desc': 'Aura will read its empathetic responses back to you in a soothing voice.',
        'chat-online': 'Always Listening & Compassionate',
        'chat-welcome': 'Hello, I am Aura. I am a safe, private space designed to support your mental well-being. How are you feeling today?',
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
        'mood-tagline': 'Visualizing Your Journey',
        'mood-title': 'Daily Mood & Wellness Tracker',
        'mood-desc': 'Checking in with your feelings is a critical stepping stone in mental hygiene.',
        'mood-check-title': 'How do you feel right now?',
        'mood-c': 'Calm',
        'mood-s': 'Stressed',
        'mood-f': 'Focused',
        'mood-e': 'Tired',
        'mood-note-title': 'AI Clarity Recommendation:',
        'mood-rec-default': 'Select your mood emoji above. Aura\'s wellness analyzer will provide personalized recommendations.',
        'mood-stat-title': 'Weekly Wellness Metrics',
        'mood-legend-calm': 'Clarity Score (Average)',
        'mood-legend-active': 'Mindful Habits Logged',
        'day-m': 'Mon', 'day-t': 'Tue', 'day-w': 'Wed', 'day-th': 'Thu', 'day-f': 'Fri', 'day-sa': 'Sat', 'day-su': 'Sun',
        'breath-tagline': 'Restorative Mindfulness',
        'breath-title': 'Guided Silent Breathing Pacer',
        'breath-desc': 'Steer your nervous system away from anxiety in less than 60 seconds.',
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
        'pillars-tagline': 'Why Aura?',
        'pillars-title': 'The Standard of Safe AI Companionship',
        'pillars-desc': 'Aura blends advanced natural language models with a deeply respectful design system.',
        'p1-title': '6 Native Languages',
        'p1-desc': 'Translate UI and speak or type to a chatbot that fully understands Hindi, Arabic, Spanish, French, Urdu, and English.',
        'p2-title': 'Absolute Privacy',
        'p2-desc': 'Your conversations are safe. We never harvest or sell your emotional data.',
        'p3-title': 'Pure Halal Audio',
        'p3-desc': 'Sound therapy relies strictly on natural synthesized rainfall and winds—zero music or instruments.',
        'p4-title': 'Voice Recognition',
        'p4-desc': 'No energy to type during anxiety? Simply speak. Our Web Speech engine converts your voice.',
        'safety-badge': 'Clinical Ethics',
        'safety-title': 'Our Trust, Boundaries & Safety Protocols',
        'safety-desc': 'Aura is a mental wellness companion, not a replacement for clinical therapy.',
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
        'nav-features': 'विशेषताएं','nav-wave': 'ऑरा तरंग','nav-chat': 'ऑरा से मिलें','nav-mood': 'मूड ट्रैकर','nav-breathing': 'श्वसन अभ्यास','nav-safety': 'सुरक्षा निर्देश','nav-cta': 'शुरू करें',
        'badge-halal': '100% हलाल प्रमाणित - कोई संगीत नहीं','hero-title': 'आपके विचारों के लिए एक सुरक्षित स्थान।','hero-desc': 'दुनिया के पहले आवाज-सक्रिय, बहुभाषी मानसिक कल्याण साथी का अनुभव करें।','hero-btn-primary': 'ऑरा से बात करें','hero-btn-secondary': 'प्राकृतिक ध्वनियों को सुनें',
        'trust-privacy': '100% निजी','trust-clinical': 'क्लिनिकल सुरक्षा','trust-languages': '6 भाषाएं',
        'fc1-title': 'माइंडफुलनेस','fc1-desc': 'तनाव कम करने के टिप्स','fc2-title': 'प्राकृतिक चिकित्सा','fc2-desc': 'शुद्ध वर्षा की ध्वनि','fc3-title': 'आवाज साथी','fc3-desc': 'व्यक्त करने के लिए बस बोलें',
        'wave-tagline': 'इंद्रिय उपचार','wave-title': 'ऑरा वेव','wave-desc': 'कोई वाद्य यंत्र नहीं—शुद्ध प्राकृतिक लहरें।','wave-vis-title': 'इंटरएक्टिव कैनवास','wave-status-active': 'सक्रिय','wave-state-calm': 'शांत मोड','wave-state-focus': 'एकाग्रता मोड','wave-state-rest': 'विश्राम मोड',
        'wave-mix-title': 'हलाल प्रकृति मिक्सर','wave-mix-desc': 'स्लाइडर्स बदलें।','wave-btn-play': 'ध्वनि उत्पन्न करें','wave-btn-stop': 'ध्वनि बंद करें','wave-slider-rain': 'धीमी वर्षा','wave-slider-wind': 'सर्सराहट की हवा','wave-mixer-note': 'पूरी तरह से पवित्र।',
        'chat-tagline': '24/7 सहानुभूतिपूर्ण समर्थन','chat-title': 'बिना सीमा के सहानुभूतिपूर्ण सहारा','chat-desc': 'ऑरा आपकी मदद के लिए है।','voice-badge-text': 'आवाज सक्षम साथी','voice-box-title': 'टाइप करने का मन नहीं?','voice-box-desc': 'माइक्रोफ़ोन पर क्लिक करें।','speech-toggle-title': 'शांत ऑडियो रीडबैक','speech-toggle-desc': 'ऑरा आपको जवाब पढ़कर सुनाएगा।',
        'chat-online': 'हमेशा सुनने के लिए तैयार','chat-welcome': 'नमस्ते, मैं ऑरा हूँ। आज आप कैसा महसूस कर रहे हैं?','chat-time-now': 'अभी-अभी','chat-suggested': 'त्वरित सुझाव:','preset-1': 'मैं बहुत तनाव में हूँ','preset-2': 'मुझे नींद नहीं आ रही','preset-3': 'एकाग्रता के सुझाव','preset-4': 'भारत के राष्ट्रपति कौन हैं?','chat-placeholder': 'अपने विचार साझा करें...','mic-listening': 'सुनी जा रही है...','mic-preview': 'अभी बोलें।','mic-cancel': 'बंद करें',
        'mood-tagline': 'आपकी यात्रा','mood-title': 'दैनिक मूड ट्रैकर','mood-desc': 'अपनी भावनाओं को जांचें।','mood-check-title': 'अभी कैसा महसूस?','mood-c': 'शांत','mood-s': 'तनावग्रस्त','mood-f': 'एकाग्रचित्त','mood-e': 'थका हुआ','mood-note-title': 'एआई सिफारिश:','mood-rec-default': 'मूड चुनें।','mood-stat-title': 'साप्ताहिक मीट्रिक','mood-legend-calm': 'स्पष्टता स्कोर','mood-legend-active': 'आदतें',
        'day-m': 'सोम','day-t': 'मंगल','day-w': 'बुध','day-th': 'गुरु','day-f': 'शुक्र','day-sa': 'शनि','day-su': 'रवि',
        'breath-tagline': 'माइंडफुलनेस','breath-title': 'श्वास गाइड','breath-desc': '60 सेकंड में शांत हों।','breath-m1-title': 'तनाव कम करें','breath-m1-desc': 'समान 4 सेकंड चक्र।','breath-m2-title': 'एकाग्रता बढ़ाएं','breath-m2-desc': 'गहरी सांस।','breath-m3-title': 'गहरी नींद','breath-m3-desc': '4-7-8 अनुपात।','breath-cue-ready': 'तैयार','breath-cue-in': 'सांस अंदर','breath-cue-hold': 'रोकें','breath-cue-out': 'सांस बाहर','breath-btn-start': 'शुरू करें','breath-btn-stop': 'रोकें',
        'pillars-tagline': 'ऑरा क्यों?','pillars-title': 'सुरक्षित एआई का मानक','pillars-desc': 'गर्म और सुरक्षित।','p1-title': '6 भाषाएं','p1-desc': 'हिंदी सहित।','p2-title': 'गोपनीयता','p2-desc': 'स्थानीय संग्रहण।','p3-title': 'हलाल ध्वनि','p3-desc': 'संगीत से मुक्त।','p4-title': 'आवाज पहचान','p4-desc': 'बस बोलें।',
        'safety-badge': 'नैतिकता','safety-title': 'सुरक्षा नियम','safety-desc': 'हम आपकी सुरक्षा करते हैं।','safety-tab-1': 'सीमाएं','safety-tab-2': '🚨 हेल्पलाइन','can-1': 'सहानुभूति से सुनना।','can-2': 'श्वास अभ्यास।','can-3': 'जीवनशैली सुझाव।','can-4': 'निजी ट्रैकिंग।','cant-1': 'चिकित्सा निदान नहीं।','cant-2': 'पेशेवर का विकल्प नहीं।','cant-3': 'सामान्य ज्ञान नहीं।','cant-4': 'हानिकारक विचारों को प्रोत्साहन नहीं।',
        'footer-slogan': 'सहानुभूतिपूर्ण एआई। निजी, बहुभाषी और हलाल।'
    },
    ar: {
        'nav-features': 'المميزات','nav-wave': 'موجة أورا','nav-chat': 'تحدث مع أورا','nav-mood': 'متابع المزاج','nav-breathing': 'التنفس','nav-safety': 'السلامة','nav-cta': 'ابدأ مجاناً',
        'badge-halal': 'خالٍ من الموسيقى - حلال 100%','hero-title': 'مساحة آمنة لأفكارك.','hero-desc': 'رفيق عافية نفسية متعدد اللغات.','hero-btn-primary': 'تحدث مع أورا','hero-btn-secondary': 'اكتشف الأصوات',
        'trust-privacy': 'خصوصية 100%','trust-clinical': 'ضوابط السلامة','trust-languages': '6 لغات',
        'fc1-title': 'اليقظة','fc1-desc': 'تقليل التوتر','fc2-title': 'علاج طبيعي','fc2-desc': 'صوت المطر','fc3-title': 'الرفيق الصوتي','fc3-desc': 'تحدث فقط',
        'wave-tagline': 'العلاج الحسي','wave-title': 'موجة أورا','wave-desc': 'لا موسيقى—أصوات طبيعية.','wave-vis-title': 'لوحة تفاعلية','wave-status-active': 'نشط','wave-state-calm': 'هدوء','wave-state-focus': 'تركيز','wave-state-rest': 'راحة',
        'wave-mix-title': 'خلاط الطبيعة','wave-mix-desc': 'اضبط المنزلقات.','wave-btn-play': 'توليد الأصوات','wave-btn-stop': 'إيقاف','wave-slider-rain': 'مطر','wave-slider-wind': 'نسيم','wave-mixer-note': 'نقية تماماً.',
        'chat-tagline': 'دعم على مدار الساعة','chat-title': 'دعم نفسي بلا حدود','chat-desc': 'أورا هنا للمساعدة.','voice-badge-text': 'رفيق صوتي','voice-box-title': 'لا تريد الكتابة؟','voice-box-desc': 'تحدث بشكل طبيعي.','speech-toggle-title': 'القراءة الصوتية','speech-toggle-desc': 'ستقرأ أورا ردودها بصوت.',
        'chat-online': 'جاهز للاستماع','chat-welcome': 'مرحباً، أنا أورا. كيف تشعر اليوم؟','chat-time-now': 'الآن','chat-suggested': 'مواضيع:','preset-1': 'أشعر بالضغط','preset-2': 'لا أستطيع النوم','preset-3': 'نصائح التركيز','preset-4': 'من هو رئيس الهند؟','chat-placeholder': 'اكتب مشاعرك...','mic-listening': 'جاري الاستماع...','mic-preview': 'تحدث الآن.','mic-cancel': 'إيقاف',
        'mood-tagline': 'تطورك النفسي','mood-title': 'دليل المزاج','mood-desc': 'قيّم مشاعرك يومياً.','mood-check-title': 'كيف تشعر الآن؟','mood-c': 'هادئ','mood-s': 'متوتر','mood-f': 'مركز','mood-e': 'مرهق','mood-note-title': 'توصية أورا:','mood-rec-default': 'اختر مزاجك.','mood-stat-title': 'مؤشرات أسبوعية','mood-legend-calm': 'معدل الوضوح','mood-legend-active': 'العادات',
        'day-m': 'الإثنين','day-t': 'الثلاثاء','day-w': 'الأربعاء','day-th': 'الخميس','day-f': 'الجمعة','day-sa': 'السبت','day-su': 'الأحد',
        'breath-tagline': 'تخفيف التوتر','breath-title': 'مدرب التنفس','breath-desc': 'اهدأ في أقل من دقيقة.','breath-m1-title': 'تهدئة التوتر','breath-m1-desc': 'دورات 4 ثوانٍ.','breath-m2-title': 'زيادة التركيز','breath-m2-desc': 'استنشاق عميق.','breath-m3-title': 'النوم العميق','breath-m3-desc': 'نمط 4-7-8.','breath-cue-ready': 'مستعد','breath-cue-in': 'شهيق','breath-cue-hold': 'احبس','breath-cue-out': 'زفير','breath-btn-start': 'ابدأ','breath-btn-stop': 'إيقاف',
        'pillars-tagline': 'لماذا أورا؟','pillars-title': 'المعيار الجديد','pillars-desc': 'بيئة آمنة ودافئة.','p1-title': '6 لغات','p1-desc': 'بما فيها العربية.','p2-title': 'خصوصية','p2-desc': 'تخزين محلي.','p3-title': 'أصوات حلال','p3-desc': 'بدون موسيقى.','p4-title': 'التعرف على الصوت','p4-desc': 'تحدث فقط.',
        'safety-badge': 'الأخلاقيات','safety-title': 'بروتوكولات الأمان','safety-desc': 'حدود واضحة.','safety-tab-1': 'حدود أورا','safety-tab-2': '🚨 أرقام الطوارئ','can-1': 'استماع متعاطف.','can-2': 'تمارين تنفس.','can-3': 'نصائح النوم.','can-4': 'سجلات خاصة.','cant-1': 'لا تشخيص طبي.','cant-2': 'لا بديل عن الأطباء.','cant-3': 'لا ثقافة عامة.','cant-4': 'لا تشجيع للأذى.',
        'footer-slogan': 'عناية نفسية بالذكاء الاصطناعي. خاص، متعدد اللغات وحلال.'
    },
    es: {
        'nav-features': 'Características','nav-wave': 'Onda Aura','nav-chat': 'Conoce a Aura','nav-mood': 'Control de Ánimo','nav-breathing': 'Respiración','nav-safety': 'Seguridad','nav-cta': 'Iniciar Gratis',
        'badge-halal': 'Certificado Halal - Sin Música','hero-title': 'Un espacio seguro para tus pensamientos.','hero-desc': 'Compañero de bienestar mental multilingüe.','hero-btn-primary': 'Habla con Aura','hero-btn-secondary': 'Explorar Sonidos',
        'trust-privacy': '100% Privado','trust-clinical': 'Seguridad Clínica','trust-languages': '6 Idiomas',
        'fc1-title': 'Mindfulness','fc1-desc': 'Técnicas de relajación','fc2-title': 'Terapia Natural','fc2-desc': 'Lluvia sintetizada','fc3-title': 'Voz Compañera','fc3-desc': 'Solo habla',
        'wave-tagline': 'Sanación Sensorial','wave-title': 'Aura Wave','wave-desc': 'Sin instrumentos—sonidos naturales.','wave-vis-title': 'Lienzo Interactivo','wave-status-active': 'Activo','wave-state-calm': 'Calma','wave-state-focus': 'Enfoque','wave-state-rest': 'Descanso',
        'wave-mix-title': 'Mezclador','wave-mix-desc': 'Ajusta los controles.','wave-btn-play': 'Generar Sonido','wave-btn-stop': 'Detener','wave-slider-rain': 'Lluvia','wave-slider-wind': 'Brisa','wave-mixer-note': 'Completamente limpio.',
        'chat-tagline': 'Apoyo 24/7','chat-title': 'Soporte Mental Empático','chat-desc': 'Aura está aquí para ti.','voice-badge-text': 'Voz Activada','voice-box-title': '¿No quieres escribir?','voice-box-desc': 'Haz clic en el micrófono.','speech-toggle-title': 'Lectura de Voz','speech-toggle-desc': 'Aura leerá sus respuestas.',
        'chat-online': 'Siempre Escuchando','chat-welcome': 'Hola, soy Aura. ¿Cómo te sientes hoy?','chat-time-now': 'Ahora','chat-suggested': 'Sugerencias:','preset-1': 'Me siento abrumado','preset-2': 'No puedo dormir','preset-3': 'Consejos de enfoque','preset-4': '¿Quién es el presidente de India?','chat-placeholder': 'Escribe tus pensamientos...','mic-listening': 'Escuchando...','mic-preview': 'Habla ahora.','mic-cancel': 'Cancelar',
        'mood-tagline': 'Tu camino','mood-title': 'Registro de Ánimo','mood-desc': 'Evalúa tus sentimientos.','mood-check-title': '¿Cómo te sientes?','mood-c': 'Calma','mood-s': 'Estresado','mood-f': 'Enfocado','mood-e': 'Cansado','mood-note-title': 'Recomendación:','mood-rec-default': 'Selecciona tu ánimo.','mood-stat-title': 'Métricas Semanales','mood-legend-calm': 'Claridad','mood-legend-active': 'Hábitos',
        'day-m': 'Lun','day-t': 'Mar','day-w': 'Mié','day-th': 'Jue','day-f': 'Vie','day-sa': 'Sáb','day-su': 'Dom',
        'breath-tagline': 'Mindfulness','breath-title': 'Guía de Respiración','breath-desc': 'Calma en 60 segundos.','breath-m1-title': 'Reducir Estrés','breath-m1-desc': 'Ciclos de 4s.','breath-m2-title': 'Aumentar Enfoque','breath-m2-desc': 'Respiración profunda.','breath-m3-title': 'Sueño Profundo','breath-m3-desc': 'Técnica 4-7-8.','breath-cue-ready': 'Listo','breath-cue-in': 'Inhala','breath-cue-hold': 'Retén','breath-cue-out': 'Exhala','breath-btn-start': 'Comenzar','breath-btn-stop': 'Detener',
        'pillars-tagline': '¿Por qué Aura?','pillars-title': 'Compañía IA Segura','pillars-desc': 'Cálido y respetuoso.','p1-title': '6 Idiomas','p1-desc': 'Incluye español.','p2-title': 'Privacidad','p2-desc': 'Local y seguro.','p3-title': 'Audio Halal','p3-desc': 'Sin música.','p4-title': 'Voz','p4-desc': 'Habla libremente.',
        'safety-badge': 'Ética','safety-title': 'Protocolos de Seguridad','safety-desc': 'Límites claros.','safety-tab-1': 'Límites','safety-tab-2': '🚨 Emergencias','can-1': 'Escucha activa.','can-2': 'Respiración.','can-3': 'Hábitos de sueño.','can-4': 'Registros privados.','cant-1': 'Sin diagnóstico.','cant-2': 'Sin reemplazar terapeutas.','cant-3': 'Sin cultura general.','cant-4': 'Sin fomentar el daño.',
        'footer-slogan': 'Bienestar mental con IA. Privado, Multilingüe y Halal.'
    },
    fr: {
        'nav-features': 'Fonctionnalités','nav-wave': 'Onde Aura','nav-chat': 'Rencontrer Aura','nav-mood': 'Humeur','nav-breathing': 'Respiration','nav-safety': 'Sécurité','nav-cta': 'Essai Gratuit',
        'badge-halal': 'Certifié Halal - Sans Musique','hero-title': 'Un espace sûr pour vos pensées.','hero-desc': 'Compagnon de bien-être multilingue.','hero-btn-primary': 'Parler avec Aura','hero-btn-secondary': 'Découvrir les Ambiances',
        'trust-privacy': '100% Privé','trust-clinical': 'Sécurité Clinique','trust-languages': '6 Langues',
        'fc1-title': 'Pleine Conscience','fc1-desc': 'Conseils anti-stress','fc2-title': 'Thérapie Naturelle','fc2-desc': 'Pluie synthétisée','fc3-title': 'Compagnon Vocal','fc3-desc': 'Parlez simplement',
        'wave-tagline': 'Guérison Sensorielle','wave-title': 'Aura Wave','wave-desc': 'Sans instruments—sons naturels.','wave-vis-title': 'Toile Interactive','wave-status-active': 'Actif','wave-state-calm': 'Calme','wave-state-focus': 'Concentration','wave-state-rest': 'Repos',
        'wave-mix-title': 'Mélangeur','wave-mix-desc': 'Ajustez les curseurs.','wave-btn-play': 'Générer le Son','wave-btn-stop': 'Arrêter','wave-slider-rain': 'Pluie','wave-slider-wind': 'Brise','wave-mixer-note': 'Parfaitement pur.',
        'chat-tagline': 'Soutien 24/7','chat-title': 'Accompagnement Empathique','chat-desc': 'Aura est là pour vous.','voice-badge-text': 'Vocal Activé','voice-box-title': 'Pas envie d\'écrire ?','voice-box-desc': 'Cliquez sur le micro.','speech-toggle-title': 'Lecture Audio','speech-toggle-desc': 'Aura lira ses réponses.',
        'chat-online': 'À votre écoute','chat-welcome': 'Bonjour, je suis Aura. Comment vous sentez-vous ?','chat-time-now': 'À l\'instant','chat-suggested': 'Suggestions :','preset-1': 'Je me sens submergé','preset-2': 'Je n\'arrive pas à dormir','preset-3': 'Conseils de concentration','preset-4': 'Qui est le président de l\'Inde ?','chat-placeholder': 'Partagez vos pensées...','mic-listening': 'Écoute...','mic-preview': 'Parlez maintenant.','mic-cancel': 'Annuler',
        'mood-tagline': 'Votre parcours','mood-title': 'Suivi d\'Humeur','mood-desc': 'Évaluez vos émotions.','mood-check-title': 'Comment vous sentez-vous ?','mood-c': 'Calme','mood-s': 'Stressé','mood-f': 'Concentré','mood-e': 'Fatigué','mood-note-title': 'Recommandation :','mood-rec-default': 'Sélectionnez votre humeur.','mood-stat-title': 'Métriques Hebdomadaires','mood-legend-calm': 'Clarté','mood-legend-active': 'Habitudes',
        'day-m': 'Lun','day-t': 'Mar','day-w': 'Mer','day-th': 'Jeu','day-f': 'Ven','day-sa': 'Sam','day-su': 'Dim',
        'breath-tagline': 'Mindfulness','breath-title': 'Guide de Respiration','breath-desc': 'Calmez-vous en 60 secondes.','breath-m1-title': 'Apaiser le Stress','breath-m1-desc': 'Cycles de 4s.','breath-m2-title': 'Améliorer la Concentration','breath-m2-desc': 'Inspiration profonde.','breath-m3-title': 'Sommeil Profond','breath-m3-desc': 'Ratio 4-7-8.','breath-cue-ready': 'Prêt','breath-cue-in': 'Inspirez','breath-cue-hold': 'Retenez','breath-cue-out': 'Expirez','breath-btn-start': 'Démarrer','breath-btn-stop': 'Arrêter',
        'pillars-tagline': 'Pourquoi Aura ?','pillars-title': 'Compagnon IA Sûr','pillars-desc': 'Chaleureux et intime.','p1-title': '6 Langues','p1-desc': 'Dont le français.','p2-title': 'Confidentialité','p2-desc': 'Local et sécurisé.','p3-title': 'Audio Halal','p3-desc': 'Sans musique.','p4-title': 'Reconnaissance Vocale','p4-desc': 'Parlez librement.',
        'safety-badge': 'Éthique','safety-title': 'Protocoles de Sécurité','safety-desc': 'Limites claires.','safety-tab-1': 'Limites d\'Aura','safety-tab-2': '🚨 Lignes d\'Urgence','can-1': 'Écoute active.','can-2': 'Exercices de respiration.','can-3': 'Conseils de sommeil.','can-4': 'Stockage local privé.','cant-1': 'Pas de diagnostic.','cant-2': 'Pas de remplacement des thérapeutes.','cant-3': 'Pas de culture générale.','cant-4': 'Pas de soutien à l\'automutilation.',
        'footer-slogan': 'Bien-être mental par IA. Privé, Multilingue et Halal.'
    },
    ur: {
        'nav-features': 'خصوصیات','nav-wave': 'اورا لہر','nav-chat': 'اورا سے ملیں','nav-mood': 'موڈ ٹریکر','nav-breathing': 'تنفس','nav-safety': 'حفاظت','nav-cta': 'مفت شروع',
        'badge-halal': '100% حلال - کوئی موسیقی نہیں','hero-title': 'آپ کے خیالات کے لئے محفوظ جگہ۔','hero-desc': 'کثیر لسانی ذہنی صحت کا ساتھی۔','hero-btn-primary': 'اورا سے بات کریں','hero-btn-secondary': 'قدرتی آوازیں',
        'trust-privacy': '100% نجی','trust-clinical': 'طبی حفاظت','trust-languages': '6 زبانیں',
        'fc1-title': 'ذہنی بیداری','fc1-desc': 'تناؤ کم کریں','fc2-title': 'قدرتی علاج','fc2-desc': 'بارش کی آواز','fc3-title': 'آواز کا ساتھی','fc3-desc': 'بس بولیں',
        'wave-tagline': 'حسی علاج','wave-title': 'اورا ویو','wave-desc': 'کوئی موسیقی نہیں۔','wave-vis-title': 'انٹرایکٹو کینوس','wave-status-active': 'فعال','wave-state-calm': 'پرسکون','wave-state-focus': 'توجہ','wave-state-rest': 'آرام',
        'wave-mix-title': 'حلال مکسر','wave-mix-desc': 'سلائیڈرز بدلیں۔','wave-btn-play': 'آواز چلائیں','wave-btn-stop': 'بند کریں','wave-slider-rain': 'بارش','wave-slider-wind': 'ہوا','wave-mixer-note': 'بالکل پاک۔',
        'chat-tagline': '24/7 مدد','chat-title': 'ہمدردانہ سہارا','chat-desc': 'اورا آپ کے لئے ہے۔','voice-badge-text': 'آواز سے فعال','voice-box-title': 'ٹائپ نہیں کرنا؟','voice-box-desc': 'مائیکروفون پر کلک کریں۔','speech-toggle-title': 'آڈیو ریڈ بیک','speech-toggle-desc': 'اورا جواب پڑھے گا۔',
        'chat-online': 'ہمیشہ تیار','chat-welcome': 'السلام علیکم، میں اورا ہوں۔ آج کیسا محسوس کر رہے ہیں؟','chat-time-now': 'ابھی','chat-suggested': 'فوری موضوعات:','preset-1': 'میں تناؤ میں ہوں','preset-2': 'نیند نہیں آ رہی','preset-3': 'توجہ کے طریقے','preset-4': 'بھارت کا صدر کون؟','chat-placeholder': 'احساسات شیئر کریں...','mic-listening': 'سنا جا رہا ہے...','mic-preview': 'ابھی بولیں۔','mic-cancel': 'بند کریں',
        'mood-tagline': 'آپ کا سفر','mood-title': 'موڈ ٹریکر','mood-desc': 'احساسات جانچیں۔','mood-check-title': 'ابھی کیسا محسوس؟','mood-c': 'پرسکون','mood-s': 'پریشان','mood-f': 'مرتکز','mood-e': 'تھکا','mood-note-title': 'تجویز:','mood-rec-default': 'موڈ منتخب کریں۔','mood-stat-title': 'ہفتہ وار میٹرکس','mood-legend-calm': 'وضاحت اسکور','mood-legend-active': 'عادات',
        'day-m': 'پیر','day-t': 'منگل','day-w': 'بدھ','day-th': 'جمعرات','day-f': 'جمعہ','day-sa': 'ہفتہ','day-su': 'اتوار',
        'breath-tagline': 'تخفیف تناؤ','breath-title': 'تنفس کوچ','breath-desc': '60 سیکنڈ میں سکون۔','breath-m1-title': 'تناؤ کم کریں','breath-m1-desc': '4 سیکنڈ سائیکل۔','breath-m2-title': 'توجہ بڑھائیں','breath-m2-desc': 'گہرا سانس۔','breath-m3-title': 'گہری نیند','breath-m3-desc': '4-7-8 تناسب۔','breath-cue-ready': 'تیار','breath-cue-in': 'سانس اندر','breath-cue-hold': 'روکیں','breath-cue-out': 'سانس باہر','breath-btn-start': 'شروع کریں','breath-btn-stop': 'روکیں',
        'pillars-tagline': 'اورا کیوں؟','pillars-title': 'محفوظ اے آئی','pillars-desc': 'گرم اور محفوظ۔','p1-title': '6 زبانیں','p1-desc': 'اردو سمیت۔','p2-title': 'رازداری','p2-desc': 'مقامی ذخیرہ۔','p3-title': 'حلال آواز','p3-desc': 'موسیقی سے پاک۔','p4-title': 'آواز پہچان','p4-desc': 'بس بولیں۔',
        'safety-badge': 'اخلاقیات','safety-title': 'حفاظتی اصول','safety-desc': 'واضح حدود۔','safety-tab-1': 'حدود','safety-tab-2': '🚨 ہنگامی لائنیں','can-1': 'ہمدردی سے سننا۔','can-2': 'تنفس مشق۔','can-3': 'نیند کے اصول۔','can-4': 'نجی ریکارڈ۔','cant-1': 'طبی تشخیص نہیں۔','cant-2': 'ماہر کا متبادل نہیں۔','cant-3': 'عام معلومات نہیں۔','cant-4': 'نقصان کی حوصلہ افزائی نہیں۔',
        'footer-slogan': 'ہمدردانہ اے آئی ذہنی صحت۔ نجی، کثیر لسانی اور حلال۔'
    }
};

function initLocalization() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langActiveLabel = document.getElementById('lang-active-label');

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langBtn.parentElement.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        langBtn.parentElement.classList.remove('open');
    });

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

    const langActiveLabel = document.getElementById('lang-active-label');
    langActiveLabel.textContent = LANGUAGES[lang].name;

    const isRtl = LANGUAGES[lang].rtl;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-localize]').forEach(el => {
        const key = el.getAttribute('data-localize');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });

    document.querySelectorAll('[data-localize-placeholder]').forEach(el => {
        const key = el.getAttribute('data-localize-placeholder');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.setAttribute('placeholder', TRANSLATIONS[lang][key]);
        }
    });

    const canvasLabel = document.getElementById('canvas-wave-label');
    const activeStateBtn = document.querySelector('.state-btn.active');
    if (activeStateBtn && canvasLabel) {
        const activeState = activeStateBtn.getAttribute('data-state').toUpperCase();
        canvasLabel.textContent = TRANSLATIONS[lang][`wave-state-${activeState.toLowerCase()}`].toUpperCase();
    }

    updateBreathingCoachUI();
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
            { color: 'rgba(16, 185, 129, 0.22)', speed: 0.012, amp: 28, freq: 0.006 },
            { color: 'rgba(20, 184, 166, 0.16)', speed: 0.008, amp: 45, freq: 0.004 },
            { color: 'rgba(167, 139, 250, 0.12)', speed: 0.005, amp: 60, freq: 0.002 }
        ]
    },
    focus: {
        bg: '#06050e',
        waves: [
            { color: 'rgba(139, 92, 246, 0.25)', speed: 0.025, amp: 20, freq: 0.012 },
            { color: 'rgba(59, 130, 246, 0.18)', speed: 0.018, amp: 32, freq: 0.008 },
            { color: 'rgba(167, 139, 250, 0.14)', speed: 0.010, amp: 48, freq: 0.005 }
        ]
    },
    rest: {
        bg: '#030509',
        waves: [
            { color: 'rgba(59, 130, 246, 0.12)', speed: 0.005, amp: 50, freq: 0.003 },
            { color: 'rgba(167, 139, 250, 0.15)', speed: 0.003, amp: 75, freq: 0.001 },
            { color: 'rgba(15, 23, 42, 0.3)', speed: 0.002, amp: 90, freq: 0.0008 }
        ]
    }
};

function initAuraWaveCanvas() {
    canvas = document.getElementById('wave-canvas');
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.querySelectorAll('.state-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const state = btn.getAttribute('data-state');
            switchWaveState(state);
        });
    });

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

    const canvasLabel = document.getElementById('canvas-wave-label');
    if (canvasLabel) {
        canvasLabel.textContent = TRANSLATIONS[currentLanguage][`wave-state-${state}`].toUpperCase();
    }
}

function renderWaves() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const config = STATE_COLORS[activeWaveState];
    wavePhase += 0.02;

    ctx.fillStyle = config.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    config.waves.forEach((w, index) => {
        ctx.beginPath();
        ctx.fillStyle = w.color;

        const cy = canvas.height / 2;
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 4) {
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
   3. HALAL NATURAL SOUND SYNTHESIZER
   ========================================================================== */
let audioCtx = null;
let isSoundPlaying = false;
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

    sliderRain.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('val-rain').textContent = `${val}%`;
        document.getElementById('fill-rain').style.width = `${val}%`;
        if (rainGain) {
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

    document.getElementById('fill-rain').style.width = `${sliderRain.value}%`;
    document.getElementById('val-rain').textContent = `${sliderRain.value}%`;
    document.getElementById('fill-wind').style.width = `${sliderWind.value}%`;
    document.getElementById('val-wind').textContent = `${sliderWind.value}%`;
}

function startSoundscape() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
    createRainNoiseNode();
    createWindNoiseNode();
    isSoundPlaying = true;
}

function stopSoundscape() {
    if (audioCtx) {
        if (rainNode) { rainNode.stop(); rainNode = null; }
        if (windNode) { windNode.stop(); windNode = null; }
        if (windLfo) { windLfo.stop(); windLfo = null; }
        isSoundPlaying = false;
    }
}

function createRainNoiseNode() {
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    rainNode = audioCtx.createBufferSource();
    rainNode.buffer = noiseBuffer;
    rainNode.loop = true;

    const rainFilter = audioCtx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1400;
    rainFilter.Q.value = 0.5;

    rainGain = audioCtx.createGain();
    const initVol = document.getElementById('slider-rain').value;
    rainGain.gain.setValueAtTime((initVol / 100) * 0.8, audioCtx.currentTime);

    rainNode.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(masterGain);
    rainNode.start();
}

function createWindNoiseNode() {
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

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
        output[i] *= 0.11;
        b6 = white * 0.115926;
    }

    windNode = audioCtx.createBufferSource();
    windNode.buffer = noiseBuffer;
    windNode.loop = true;

    windFilter = audioCtx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 400;
    windFilter.Q.value = 2.0;

    windLfo = audioCtx.createOscillator();
    windLfo.type = 'sine';
    windLfo.frequency.value = 0.12;

    const windLfoGain = audioCtx.createGain();
    windLfoGain.gain.value = 250;

    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);

    windGain = audioCtx.createGain();
    const initVol = document.getElementById('slider-wind').value;
    windGain.gain.setValueAtTime((initVol / 100) * 0.6, audioCtx.currentTime);

    windNode.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);

    windNode.start();
    windLfo.start();
}


/* ==========================================================================
   4. VOICE COMMUNICATOR ENGINE
   ========================================================================== */
let recognition = null;
let isListening = false;
let isTtsEnabled = false;

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

    speechToggle.addEventListener('change', (e) => {
        isTtsEnabled = e.target.checked;
        if (isTtsEnabled) {
            window.speechSynthesis.getVoices();
        }
    });

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
                }, 900);
            }
        };

        recognition.onerror = (e) => {
            console.error('Speech recognition error:', e);
            stopSpeechRecognition();
        };

        recognition.onend = () => {
            stopSpeechRecognition();
        };

        micBtn.addEventListener('click', () => {
            if (!isListening) {
                recognition.lang = SPEECH_LANG_CODES[currentLanguage];
                recognition.start();
            }
        });

        cancelSpeechBtn.addEventListener('click', () => {
            stopSpeechRecognition();
        });

    } else {
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

function speakAuraResponse(text, lang) {
    if (!isTtsEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LANG_CODES[lang];

    const voices = window.speechSynthesis.getVoices();
    const targetLangCode = SPEECH_LANG_CODES[lang];
    const matchingVoice = voices.find(v => v.lang.includes(targetLangCode) || v.lang === targetLangCode);
    if (matchingVoice) {
        utterance.voice = matchingVoice;
    }

    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
}


/* ==========================================================================
   5. EMPATHETIC CHATBOT - NOW POWERED BY BACKEND AI
   ========================================================================== */
const MULTILINGUAL_AI_ANSWERS = {
    en: {
        'gk-block': 'I am here specifically to support your emotional well-being and mental health. For general knowledge questions, a search engine would be a better fit.',
        'stress': 'I hear you. Stress can feel like an invisible heavy weight. Try to pause for a moment. Would you like to try a 1-minute silent box breathing exercise to calm your pulse?',
        'anxious': 'It\'s completely okay to feel anxious. Remember that feelings are like clouds—they pass. You are safe here. Take a slow deep breath.',
        'sleep': 'Struggling to sleep can be very exhausting. Avoid checking the clock, turn off your screens, and try our Rainfall soundscape to calm your room.',
        'focus': 'When the mind is scattered, don\'t force it. Try focusing on just ONE tiny task for 10 minutes, then rest.',
        'lonely': 'I am right here with you. Loneliness can feel very quiet, but you are not alone. Tell me about your day.',
        'default': 'Thank you for sharing that with me. I am here to listen and support you without judgment. How does that make you feel?'
    },
    hi: {
        'gk-block': 'मैं यहाँ आपके मानसिक स्वास्थ्य के लिए हूँ। सामान्य ज्ञान के लिए खोज इंजन का उपयोग करें।',
        'stress': 'मैं समझ सकता हूँ। एक पल के लिए रुकें। क्या आप श्वास अभ्यास करना चाहेंगे?',
        'anxious': 'घबराहट सामान्य है। आप सुरक्षित हैं। एक गहरी सांस लें।',
        'sleep': 'नींद न आना थका देता है। स्क्रीन बंद करें और बारिश की आवाज सुनें।',
        'focus': 'एक छोटा काम चुनें, 10 मिनट ध्यान दें, फिर आराम करें।',
        'lonely': 'मैं यहाँ हूँ। आप अकेले नहीं हैं। अपने दिन के बारे में बताएं।',
        'default': 'आपकी बात सुनकर अच्छा लगा। आप कैसा महसूस कर रहे हैं?'
    },
    ar: {
        'gk-block': 'أنا هنا لدعم صحتك النفسية. للأسئلة العامة، استخدم محرك البحث.',
        'stress': 'أنا أشعر بك. خذ قسطاً من الراحة. هل تود تجربة تمرين التنفس؟',
        'anxious': 'القلق طبيعي. أنت آمن هنا. خذ نفساً عميقاً.',
        'sleep': 'أغلق الشاشات وشغّل صوت المطر للاسترخاء.',
        'focus': 'اختر مهمة واحدة صغيرة وركز عليها 10 دقائق.',
        'lonely': 'أنا هنا معك. أخبرني عن يومك.',
        'default': 'شكراً لمشاركتي. كيف تشعر الآن؟'
    },
    es: {
        'gk-block': 'Estoy aquí para tu bienestar mental. Para preguntas generales, usa un buscador.',
        'stress': 'Te entiendo. Intenta pausar. ¿Te gustaría un ejercicio de respiración?',
        'anxious': 'Es normal sentirse ansioso. Estás seguro aquí. Respira profundo.',
        'sleep': 'Apaga las pantallas y activa el sonido de lluvia para relajarte.',
        'focus': 'Elige una sola tarea pequeña y enfócate 10 minutos.',
        'lonely': 'Estoy aquí contigo. Cuéntame sobre tu día.',
        'default': 'Gracias por compartir. ¿Cómo te hace sentir eso?'
    },
    fr: {
        'gk-block': 'Je suis ici pour votre bien-être mental. Pour les questions générales, utilisez un moteur de recherche.',
        'stress': 'Je vous comprends. Faites une pause. Voulez-vous essayer la respiration guidée?',
        'anxious': 'L\'anxiété est normale. Vous êtes en sécurité. Prenez une grande inspiration.',
        'sleep': 'Éteignez les écrans et activez le son de pluie pour vous détendre.',
        'focus': 'Choisissez une seule micro-tâche et concentrez-vous 10 minutes.',
        'lonely': 'Je suis là avec vous. Racontez-moi votre journée.',
        'default': 'Merci de partager. Comment vous sentez-vous maintenant?'
    },
    ur: {
        'gk-block': 'میں آپ کی ذہنی صحت کے لئے یہاں ہوں۔ عام سوالات کے لئے سرچ انجن استعمال کریں۔',
        'stress': 'میں سمجھتا ہوں۔ ایک پل رکیں۔ کیا تنفس کی مشق کریں گے؟',
        'anxious': 'پریشانی فطری ہے۔ آپ محفوظ ہیں۔ گہرا سانس لیں۔',
        'sleep': 'فون بند کریں اور بارش کی آواز سنیں۔',
        'focus': 'ایک چھوٹا کام چنیں اور 10 منٹ توجہ دیں۔',
        'lonely': 'میں یہاں ہوں۔ اپنے دن کے بارے میں بتائیں۔',
        'default': 'آپ کی بات سن کر اچھا لگا۔ ابھی کیسا محسوس کر رہے ہیں؟'
    }
};

const GK_KEYWORDS = [
    'president', 'prime minister', 'capital of', 'who is', 'weather in',
    'solve', 'equation', 'math', 'sports', 'football', 'cricket', 'news',
    'currency of', 'population', 'born in', 'history of',
    'राष्ट्रपति', 'प्रधानमंत्री', 'राजधानी', 'मौसम', 'गणित', 'क्रिकेट',
    'رئيس', 'وزير', 'عاصمة', 'طقس', 'رياضة', 'أخبار',
    'presidente', 'primer ministro', 'capital de', 'clima', 'matemáticas',
    'président', 'premier ministre', 'capitale', 'météo', 'maths',
    'صدر', 'وزیراعظم', 'دارالحکومت', 'موسم', 'کرکٹ'
];

function initEmpatheticChatbot() {
    const sendBtn = document.getElementById('chat-send-btn');
    const textInput = document.getElementById('chat-text-input');
    const presetsContainer = document.getElementById('presets-container');

    sendBtn.addEventListener('click', () => {
        const msg = textInput.value.trim();
        if (msg) {
            handleUserMessage(msg);
            textInput.value = '';
        }
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const msg = textInput.value.trim();
            if (msg) {
                handleUserMessage(msg);
                textInput.value = '';
            }
        }
    });

    presetsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const presetType = btn.getAttribute('data-msg');
            let testText = '';

            if (presetType === 'feeling-overwhelmed') {
                testText = currentLanguage === 'hi' ? 'मैं बहुत तनाव महसूस कर रहा हूँ' :
                           currentLanguage === 'ar' ? 'أشعر بالضغط الشديد' :
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
                testText = currentLanguage === 'hi' ? 'एकाग्रता बढ़ाने के सुझाव' :
                           currentLanguage === 'ar' ? 'نصائح للتركيز' :
                           currentLanguage === 'es' ? 'Necesito consejos para enfocarme' :
                           currentLanguage === 'fr' ? 'Conseils pour me concentrer' :
                           currentLanguage === 'ur' ? 'توجہ مرکوز کرنے کی ٹپس' : 'I need focus tips';
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

/* ==========================================================================
   MAIN CHAT FUNCTION - CALLS SECURE BACKEND SERVER
   ========================================================================== */
function handleUserMessage(msgText) {
    appendMessage(msgText, 'user');

    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';

    const history = document.getElementById('chat-history');
    history.scrollTop = history.scrollHeight;

    // Build conversation history for context
    const chatBubbles = document.querySelectorAll('.chat-bubble');
    const conversationHistory = [];
    chatBubbles.forEach(bubble => {
        const role = bubble.classList.contains('user-message') ? 'user' : 'assistant';
        const content = bubble.querySelector('.message-content').textContent;
        conversationHistory.push({ role, content });
    });

    // Call the secure backend server
    fetch('https://aura-ai-backend-irvg.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: msgText,
            history: conversationHistory.slice(-10),
            language: currentLanguage
        })
    })
    .then(res => res.json())
    .then(data => {
        typingIndicator.style.display = 'none';

        if (data.error) {
            appendMessage('I am having a little trouble connecting right now. Please try again in a moment.', 'bot');
            return;
        }

        const replyText = data.reply;
        appendMessage(replyText, 'bot');
        speakAuraResponse(replyText, currentLanguage);

        if (data.isCrisis) {
            setTimeout(() => {
                const crisisMsg = currentLanguage === 'hi' ?
                    'यदि आप संकट में हैं, कृपया iCall से संपर्क करें: 9152987821' :
                    currentLanguage === 'ar' ?
                    'إذا كنت في أزمة، يرجى الاتصال بخط المساعدة فوراً' :
                    'If you are in crisis, please reach out immediately. India: iCall 9152987821 | UK: 116 123 | US: 988';
                appendMessage(crisisMsg, 'bot');
            }, 500);
        }
    })
    .catch(err => {
        typingIndicator.style.display = 'none';
        console.error('Backend error:', err);

        // Fallback to local responses if server unavailable
        const lowerMsg = msgText.toLowerCase();
        let replyText = '';
        const isGkQuestion = checkIsGKQuestion(msgText);

        if (isGkQuestion) {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['gk-block'];
        } else if (containsAny(lowerMsg, ['stress', 'overwhelm', 'तनाव', 'ضغط', 'abrumado', 'surmené'])) {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['stress'];
        } else if (containsAny(lowerMsg, ['anxious', 'panic', 'चिंता', 'قلق', 'ansioso', 'peur'])) {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['anxious'];
        } else if (containsAny(lowerMsg, ['sleep', 'insomnia', 'नींद', 'نوم', 'dormir', 'sommeil'])) {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['sleep'];
        } else if (containsAny(lowerMsg, ['focus', 'concentrate', 'एकाग्र', 'تركيز', 'enfocar', 'concentrer'])) {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['focus'];
        } else if (containsAny(lowerMsg, ['lonely', 'alone', 'sad', 'अकेला', 'وحيد', 'soledad', 'seul'])) {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['lonely'];
        } else {
            replyText = MULTILINGUAL_AI_ANSWERS[currentLanguage]['default'];
        }

        appendMessage(replyText, 'bot');
        speakAuraResponse(replyText, currentLanguage);
    });
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

    history.scrollTop = history.scrollHeight;
}

function checkIsGKQuestion(text) {
    const cleaned = text.toLowerCase().trim();
    if (cleaned.includes('president of india') ||
        cleaned.includes('राष्ट्रपति कौन') ||
        cleaned.includes('رئيس الهند') ||
        cleaned.includes('presidente de india') ||
        cleaned.includes('président de l\'inde') ||
        cleaned.includes('صدر کون')) {
        return true;
    }
    return GK_KEYWORDS.some(k => cleaned.includes(k));
}

function containsAny(text, array) {
    return array.some(item => text.includes(item));
}


/* ==========================================================================
   6. MOOD TRACKER
   ========================================================================== */
const MOOD_STATISTICS = {
    calm: {
        rec: {
            en: 'Splendid state! Keep maintaining this balanced mindfulness. Continue with your silent walks or take moments to breathe in 4s tempos.',
            hi: 'उत्कृष्ट स्थिति! इस संतुलित स्पष्टता को बनाए रखें।',
            ar: 'حالة رائعة! استمر في الحفاظ على هذا التوازن.',
            es: '¡Excelente estado! Sigue manteniendo este equilibrio.',
            fr: 'Superbe état ! Continuez à cultiver cet équilibre.',
            ur: 'شاندار حالت! اس پرسکون بیداری کو برقرار رکھیں۔'
        },
        score: '88%',
        bars: [85, 88, 76, 92, 80, 95, 88]
    },
    stressed: {
        rec: {
            en: 'Stress levels are elevated. Try to pause. We recommend starting our 1-minute Guided Breathing Pacer below immediately.',
            hi: 'तनाव अधिक है। रुकें और श्वास कोच आजमाएं।',
            ar: 'مستويات التوتر مرتفعة. نوصي بتمرين التنفس.',
            es: 'El estrés es alto. Te recomendamos el entrenador de respiración.',
            fr: 'Le stress est élevé. Essayez notre exercice de respiration.',
            ur: 'تناؤ زیادہ ہے۔ تنفس کی مشق کریں۔'
        },
        score: '58%',
        bars: [50, 62, 58, 48, 65, 55, 58]
    },
    focused: {
        rec: {
            en: 'High productivity state! Harness this cognitive flow. Remember to take a 5-minute eye-rest every 45 minutes.',
            hi: 'उच्च एकाग्रता! हर 45 मिनट में आंखों को आराम दें।',
            ar: 'تركيز ممتاز! خذ راحة للعينين كل 45 دقيقة.',
            es: '¡Alta concentración! Descansa los ojos 5 minutos cada 45.',
            fr: 'Focalisation optimale ! Reposez vos yeux toutes les 45 minutes.',
            ur: 'بہترین توجہ! ہر 45 منٹ بعد آنکھوں کو آرام دیں۔'
        },
        score: '92%',
        bars: [90, 92, 85, 96, 88, 98, 92]
    },
    exhausted: {
        rec: {
            en: 'Body battery is draining. Try to wrap up early, drink warm water, and avoid screens before sleep.',
            hi: 'ऊर्जा कम हो रही है। जल्दी सोएं और स्क्रीन से दूर रहें।',
            ar: 'طاقتك منخفضة. أنهِ مهامك مبكراً وابتعد عن الشاشات.',
            es: 'Energía baja. Termina temprano y apaga pantallas antes de dormir.',
            fr: 'Énergie faible. Terminez tôt et éteignez les écrans.',
            ur: 'توانائی کم ہو رہی ہے۔ جلدی سوئیں اور فون مت دیکھیں۔'
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
            emojiBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedMood = btn.getAttribute('data-mood');
            const data = MOOD_STATISTICS[selectedMood];

            if (data) {
                recBox.innerHTML = `<p style="color: var(--text-primary); font-weight: 500;">${data.rec[currentLanguage]}</p>`;
                scoreBadge.textContent = `Score: ${data.score}`;

                const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
                dayKeys.forEach((day, index) => {
                    const barFill = document.getElementById(`bar-${day}`);
                    if (barFill) {
                        const scoreVal = data.bars[index];
                        barFill.style.height = `${scoreVal}%`;
                        barFill.querySelector('.bar-value').textContent = `${scoreVal}%`;

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
let breathingPhaseIndex = 0;
let breathingTimeRemaining = 0;
let activeBreathingRatio = 'relax';

const BREATHING_CONFIG = {
    relax: { ratios: [4, 4, 4, 4], names: ['inhale', 'hold', 'exhale', 'hold'] },
    focus: { ratios: [4, 4, 8, 0], names: ['inhale', 'hold', 'exhale'] },
    sleep: { ratios: [4, 7, 8, 0], names: ['inhale', 'hold', 'exhale'] }
};

function initBreathingCoach() {
    const breathingModeCards = document.querySelectorAll('.breathing-modes .mode-card');
    const startBtn = document.getElementById('start-breathing-btn');

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

    const config = BREATHING_CONFIG[activeBreathingRatio];
    breathingTimeRemaining = config.ratios[breathingPhaseIndex];

    executeBreathingPhaseCycle();

    breathingTimerInterval = setInterval(() => {
        breathingTimeRemaining--;
        document.getElementById('breathing-timer').textContent = `${breathingTimeRemaining}s`;

        if (breathingTimeRemaining <= 0) {
            breathingPhaseIndex = (breathingPhaseIndex + 1) % config.ratios.length;
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
    const activePhaseName = config.names[breathingPhaseIndex];
    const ring = document.getElementById('breathing-ring');

    ring.className = `breathing-ring-outer ${activePhaseName}`;

    const cueLabelKey = `breath-cue-${activePhaseName}`;
    document.getElementById('breathing-cue').textContent = TRANSLATIONS[currentLanguage][cueLabelKey];
    document.getElementById('breathing-timer').textContent = `${breathingTimeRemaining}s`;

    document.querySelectorAll('.cue-indicator').forEach(c => c.classList.remove('active-cue'));

    let indicatorId = '';
    if (activePhaseName === 'inhale') indicatorId = 'cue-in';
    else if (activePhaseName === 'hold') indicatorId = 'cue-hold';
    else if (activePhaseName === 'exhale') indicatorId = 'cue-out';

    const activeIndicator = document.getElementById(indicatorId);
    if (activeIndicator) activeIndicator.classList.add('active-cue');
}

function updateBreathingCoachUI() {
    const cueText = document.getElementById('breathing-cue');
    const startBtn = document.getElementById('start-breathing-btn');

    if (!breathingPacerActive) {
        cueText.textContent = TRANSLATIONS[currentLanguage]['breath-cue-ready'];
        startBtn.textContent = TRANSLATIONS[currentLanguage]['breath-btn-start'];
    } else {
        startBtn.textContent = TRANSLATIONS[currentLanguage]['breath-btn-stop'];
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

    navBar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navBar.classList.remove('open');
        });
    });

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
