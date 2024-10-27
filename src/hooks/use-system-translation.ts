import { useSystemSettings } from "./use-system-settings";
import { useTranslation as i18nTranslation, UseTranslationOptions } from "react-i18next";

export function useSystemTranslation(
    ns?: string,
    options?: UseTranslationOptions<undefined> | undefined,
) {
    const { locale } = useSystemSettings();
    const userLocale = (window !== undefined)
        ? navigator.languages.find(lng => lng.startsWith(locale))
        : undefined;

    const parsedLocale = userLocale || locale;

    return { ...i18nTranslation(ns, { lng: parsedLocale, ...options }), locale };
}
