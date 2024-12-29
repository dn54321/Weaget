import { SystemLocale } from "@src/types/system.types";

export const DEFAULT_LOCALE = "en";
export const languages = Object.values(SystemLocale);
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = DEFAULT_LOCALE, ns = defaultNS) {
    return {
        defaultNS,
        fallbackLng: DEFAULT_LOCALE,
        fallbackNS: defaultNS,
        lng,
        ns,
        // debug: true,
        supportedLngs: languages,
    };
}
