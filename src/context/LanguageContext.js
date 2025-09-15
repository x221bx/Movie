import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const RTL_LANGS = ["ar-EG", "ar-SA", "he-IL"];

const TMDB_LANG_MAP = {
    "en-US": "en-US",
    "ar-EG": "ar-SA", // TMDB يعرض محتوى عربي أفضل بكود ar-SA
    "fr-FR": "fr-FR",
    "de-DE": "de-DE",
    "es-ES": "es-ES",
    "it-IT": "it-IT",
    "ja-JP": "ja-JP",
    "hi-IN": "hi-IN",
};

const MESSAGES = {
    "en-US": {
        nav: { home: "Home", fav: "Favorites", wish: "Wish List", login: "Login", register: "Register" },
        home: {
            heading: "Discover Amazing Movies",
            start: "Start Watching",
            popular: "Popular Movies",
            resultsFor: 'Results for "{{q}}"',
            showing: "Showing {{count}} movies from page {{page}}",
        },
        loading: "Loading movies...",
        footer: "© 2025 Movies - Your Ultimate Movie Destination",
    },
    "ar-EG": {
        nav: { home: "الرئيسية", fav: "المفضلة", wish: "القائمة المرغوبة", login: "تسجيل الدخول", register: "إنشاء حساب" },
        home: {
            heading: "اكتشف أفلامًا مذهلة",
            start: "ابدأ المشاهدة",
            popular: "أفلام شائعة",
            resultsFor: 'نتائج عن "{{q}}"',
            showing: "عرض {{count}} فيلم من الصفحة {{page}}",
        },
        loading: "جارٍ تحميل الأفلام...",
        footer: "© 2025 Movies - وجهتك المفضلة للأفلام",
    },
    "fr-FR": {
        nav: { home: "Accueil", fav: "Favoris", wish: "Liste d’envies", login: "Connexion", register: "Inscription" },
        home: {
            heading: "Découvrez des films incroyables",
            start: "Commencer",
            popular: "Films populaires",
            resultsFor: 'Résultats pour « {{q}} »',
            showing: "Affichage de {{count}} films à partir de la page {{page}}",
        },
        loading: "Chargement des films…",
        footer: "© 2025 Movies - Votre destination cinéma",
    },
    "de-DE": {
        nav: { home: "Start", fav: "Favoriten", wish: "Wunschliste", login: "Anmelden", register: "Registrieren" },
        home: {
            heading: "Entdecke großartige Filme",
            start: "Jetzt ansehen",
            popular: "Beliebte Filme",
            resultsFor: 'Ergebnisse für „{{q}}“',
            showing: "Zeige {{count}} Filme ab Seite {{page}}",
        },
        loading: "Filme werden geladen…",
        footer: "© 2025 Movies – Dein Filmziel",
    },
    "es-ES": {
        nav: { home: "Inicio", fav: "Favoritos", wish: "Lista de deseos", login: "Ingresar", register: "Registrarse" },
        home: {
            heading: "Descubre películas increíbles",
            start: "Comenzar a ver",
            popular: "Películas populares",
            resultsFor: 'Resultados para "{{q}}"',
            showing: "Mostrando {{count}} películas de la página {{page}}",
        },
        loading: "Cargando películas…",
        footer: "© 2025 Movies - Tu destino de cine",
    },
    "it-IT": {
        nav: { home: "Home", fav: "Preferiti", wish: "Lista desideri", login: "Accedi", register: "Registrati" },
        home: {
            heading: "Scopri film straordinari",
            start: "Inizia a guardare",
            popular: "Film popolari",
            resultsFor: 'Risultati per "{{q}}"',
            showing: "Mostrando {{count}} film dalla pagina {{page}}",
        },
        loading: "Caricamento film…",
        footer: "© 2025 Movies - La tua meta per i film",
    },
    "ja-JP": {
        nav: { home: "ホーム", fav: "お気に入り", wish: "ウィッシュリスト", login: "ログイン", register: "登録" },
        home: {
            heading: "素晴らしい映画を見つけよう",
            start: "視聴を開始",
            popular: "人気の映画",
            resultsFor: '「{{q}}」の結果',
            showing: "ページ{{page}}から{{count}}作品を表示",
        },
        loading: "映画を読み込み中…",
        footer: "© 2025 Movies - あなたの映画目的地",
    },
    "hi-IN": {
        nav: { home: "होम", fav: "पसंदीदा", wish: "इच्छा-सूची", login: "लॉगिन", register: "रजिस्टर" },
        home: {
            heading: "कमाल की फ़िल्में खोजें",
            start: "देखना शुरू करें",
            popular: "लोकप्रिय फ़िल्में",
            resultsFor: '"{{q}}" के परिणाम',
            showing: "पेज {{page}} से {{count}} फ़िल्में दिख रही हैं",
        },
        loading: "फ़िल्में लोड हो रही हैं…",
        footer: "© 2025 Movies - आपकी मूवी डेस्टिनेशन",
    },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "en-US");
    const tmdbLang = TMDB_LANG_MAP[language] || "en-US";

    useEffect(() => {
        localStorage.setItem("lang", language);
        document.documentElement.lang = language.slice(0, 2);
        document.documentElement.dir = RTL_LANGS.includes(language) ? "rtl" : "ltr";
    }, [language]);

    const t = useMemo(() => {
        const dict = MESSAGES[language] || MESSAGES["en-US"];
        return (key, vars = {}) => {
            const segs = key.split(".");
            let cur = dict;
            for (const s of segs) cur = cur?.[s];
            let out = cur || key;
            Object.entries(vars).forEach(([k, v]) => {
                out = String(out).replaceAll(`{{${k}}}`, String(v));
            });
            return out;
        };
    }, [language]);

    const value = { language, setLanguage, tmdbLang, t };
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
