import { createStore } from "zustand";
import { MeasurementScale } from "@src/types/measurement.types";
import { SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";
import { persist } from "zustand/middleware";

export interface SettingState {
    temperatureScale: string;
    measurementScale: string;
    theme: SystemTheme;

}

export interface SettingActions {
    setTemperatureScale: (temperatureScale: TemperatureScale) => void;
    setMeasurementScale: (measurementScale: MeasurementScale) => void;
    setTheme: (theme: SystemTheme) => void;
    toggleTheme: () => void;
}

export type SettingStore = SettingState & SettingActions;

export const initialSettingStoreState: SettingState = {
    temperatureScale: TemperatureScale.CELSIUS,
    measurementScale: MeasurementScale.METRIC,
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
        setTemperatureScale: (temperatureScale: TemperatureScale) => set(() => ({ temperatureScale: temperatureScale })),
        setMeasurementScale: (measurementScale: MeasurementScale) => set(() => ({ measurementScale: measurementScale })),
        setTheme: (theme: SystemTheme) => set(() => ({ theme: theme })),
        toggleTheme: () => set((state) => {
            if (state.theme === SystemTheme.LIGHT) {
                return { theme: SystemTheme.DARK };
            }
            if (state.theme === SystemTheme.DARK) {
                return { theme: SystemTheme.LIGHT };
            }
            const isDarkPreferred = checkIsDarkSchemePreferred();
            return { theme: isDarkPreferred ? SystemTheme.LIGHT : SystemTheme.DARK };
        }),
    }), { name: "persistentStore", ...(!shouldPersist && { partialize: () => {} }) }));
};
