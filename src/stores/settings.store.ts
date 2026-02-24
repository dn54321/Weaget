import { MeasurementScale } from "@src/types/measurement.types";
import { SystemLocale } from "@src/types/system.types";
import type { SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingState {
    temperatureScale: TemperatureScale;
    measurementScale: MeasurementScale;
    locale: SystemLocale;
    theme: SystemTheme;
}

export interface SettingStoreState {
    temperatureScale: TemperatureScale;
    measurementScale: MeasurementScale;
    locale: SystemLocale;
}

export interface SettingActions {
    setTemperatureScale: (temperatureScale: TemperatureScale) => void;
    setMeasurementScale: (measurementScale: MeasurementScale) => void;
    setLocale: (locale: SystemLocale) => void;
}

export type SettingStore = SettingStoreState & SettingActions;

export const initialSettingStoreState: SettingStoreState = {
    locale: SystemLocale.ENGLISH,
    measurementScale: MeasurementScale.METRIC,
    temperatureScale: TemperatureScale.CELSIUS,
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
    }), { name: "persistentStore", ...(!shouldPersist && { partialize: () => {} }) }));
};
