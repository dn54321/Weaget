import { useSystemSettings } from "./use-system-settings";
import { useTranslation as i18nTranslation, UseTranslationOptions } from "react-i18next";

export function useSystemTranslation(
    ns?: string,
    options?: UseTranslationOptions<undefined> | undefined,
) {
    const { locale } = useSystemSettings();
    return { ...i18nTranslation(ns, { lng: locale, ...options }), locale };
}
