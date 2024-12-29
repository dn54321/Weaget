import { SystemLocale, SystemTheme } from "@src/types/system.types";
import { MeasurementScale } from "@src/types/measurement.types";
import { TemperatureScale } from "@src/types/weather.types";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingState {
    temperatureScale: TemperatureScale;
    measurementScale: MeasurementScale;
    locale: SystemLocale;
    theme: SystemTheme;

}

export interface SettingActions {
    setTemperatureScale: (temperatureScale: TemperatureScale) => void;
    setMeasurementScale: (measurementScale: MeasurementScale) => void;
    setTheme: (theme: SystemTheme) => void;
    setLocale: (locale: SystemLocale) => void;
    toggleTheme: () => void;
}

export type SettingStore = SettingState & SettingActions;

export const initialSettingStoreState: SettingState = {
    locale: SystemLocale.ENGLISH,
    measurementScale: MeasurementScale.METRIC,
    temperatureScale: TemperatureScale.CELSIUS,
    theme: SystemTheme.SYSTEM,
};

export const createSettingsStore = (
    initState: Partial<SettingState> = {},
    shouldPersist: boolean = true,
) => {
    const checkIsDarkSchemePreferred = () => window.matchMedia("(prefers-color-scheme:dark)").matches;
    return createStore<SettingStore>()(persist(set => ({
        ...initialSettingStoreState,
        ...initState,
        setLocale: (locale: SystemLocale) => set(() => ({ locale: locale })),
        setMeasurementScale: (measurementScale: MeasurementScale) => set(() => ({ measurementScale: measurementScale })),
        setTemperatureScale: (temperatureScale: TemperatureScale) => set(() => ({ temperatureScale: temperatureScale })),
        setTheme: (theme: SystemTheme) => set(() => ({ theme: theme })),
        toggleTheme: () => set((state) => {
            if (state.theme === SystemTheme.LIGHT) {
                return { theme: SystemTheme.DARK };
            }
            if (state.theme === SystemTheme.DARK) {
                return { theme: SystemTheme.LIGHT };
            }
            const isDarkPreferred = checkIsDarkSchemePreferred(); // checkIsDarkSchemePreferred();
            return { theme: isDarkPreferred ? SystemTheme.LIGHT : SystemTheme.DARK };
        }),
    }), { name: "persistentStore", ...(!shouldPersist && { partialize: () => {} }) }));
};
