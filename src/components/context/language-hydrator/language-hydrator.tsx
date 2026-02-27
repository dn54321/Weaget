"use client";

import { useEffect } from "react";
import { useSystemSettings } from "@project/src/hooks/use-system-settings";

export default function LanguageHydrator() {
    const setting = useSystemSettings();

    useEffect(() => {
        document.documentElement.lang = setting.locale;
    }, [setting.locale]);

    return null;
}
