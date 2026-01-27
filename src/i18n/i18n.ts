"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend((lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)))
    .init({
        debug: false,
        defaultNS: "common",
        fallbackLng: "ja",
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        ns: ["common"],
        preload: []
    });

export default i18n;
