import { MeasurementScale } from "@src/types/measurement.types";
import { SystemLocale, SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingActions {
    setLocale: (locale: SystemLocale) => void
    setMeasurementScale: (measurementScale: MeasurementScale) => void
    setTemperatureScale: (temperatureScale: TemperatureScale) => void
    setTheme: (theme: SystemTheme) => void
    toggleTheme: () => void
}

export interface SettingState {
    locale: SystemLocale
    measurementScale: MeasurementScale
    temperatureScale: TemperatureScale
    theme: SystemTheme

}

export type SettingStore = SettingActions & SettingState;

export const initialSettingStoreState: SettingState = {
    locale: SystemLocale.ENGLISH,
    measurementScale: MeasurementScale.METRIC,
    temperatureScale: TemperatureScale.CELSIUS,
    theme: SystemTheme.SYSTEM
};

export const createSettingsStore = (
    initState: Partial<SettingState> = {},
    shouldPersist: boolean = true
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
        })
    }), { name: "persistentStore", ...(!shouldPersist && { partialize: () => {} }) }));
};
