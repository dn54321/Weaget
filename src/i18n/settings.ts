import { SystemLocale } from "@src/types/system.types";

export const DEFAULT_LOCALE = "en";
export const languages = Object.values(SystemLocale);
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(lng = DEFAULT_LOCALE, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng: DEFAULT_LOCALE,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
