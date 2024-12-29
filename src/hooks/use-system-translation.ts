import { UseTranslationOptions, useTranslation as i18nTranslation } from "react-i18next";
import { useSystemSettings } from "./use-system-settings";

export function useSystemTranslation(
    ns?: string,
    options?: UseTranslationOptions<undefined> | undefined,
) {
    const { locale } = useSystemSettings();
    return { ...i18nTranslation(ns, { lng: locale, ...options }), locale };
}
