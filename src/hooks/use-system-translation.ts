import { useTranslation as i18nTranslation, UseTranslationOptions } from "react-i18next";

import { useSystemSettings } from "./use-system-settings";

export function useSystemTranslation(
    ns?: string,
    options?: undefined | UseTranslationOptions<undefined>
) {
    const { locale } = useSystemSettings();
    return { ...i18nTranslation(ns, { lng: locale, ...options }), locale };
}
