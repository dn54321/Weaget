import { StateCreator } from "zustand";
import { MeasurementScale } from "@src/types/measurement.types";
import { SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";

export interface SettingSlice {
    temperatureScale: string;
    measurementScale: string;
    theme: SystemTheme;
    setTemperatureScale: (temperatureScale: TemperatureScale) => void;
    setMeasurementScale: (measurementScale: MeasurementScale) => void;
    setTheme: (theme: SystemTheme) => void;
    toggleTheme: () => void;
}

export const createSettingSlice: StateCreator<
    SettingSlice, 
    [], [], 
    SettingSlice
> = (set) => {
    const checkIsDarkSchemePreferred = () => window.matchMedia("(prefers-color-scheme:dark)").matches;
    return {
        temperatureScale: TemperatureScale.CELSIUS,
        measurementScale: MeasurementScale.METRIC,
        theme: SystemTheme.SYSTEM,
        setTemperatureScale: (temperatureScale: TemperatureScale) => set(() => ({ temperatureScale: temperatureScale })),
        setMeasurementScale: (measurementScale: MeasurementScale) => set(() => ({ measurementScale: measurementScale })),
        toggleTheme: () => set((state) => { 
            if (state.theme === SystemTheme.LIGHT) {
                return {theme: SystemTheme.DARK};
            }
            if (state.theme === SystemTheme.DARK) {
                return {theme: SystemTheme.LIGHT};
            }
            const isDarkPreferred = checkIsDarkSchemePreferred();
            return {theme: isDarkPreferred ? SystemTheme.LIGHT : SystemTheme.DARK};
        }),

        setTheme: (theme: SystemTheme) => set(() => ({ theme: theme }))
    }
}