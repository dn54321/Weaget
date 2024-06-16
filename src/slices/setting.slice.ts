import { StateCreator } from "zustand";
import { MeasurementScale } from "../types/measurement.types";
import { SystemTheme } from "../types/system.types";
import { TemperatureScale } from "../types/weather.types";

export interface SettingSlice {
    temperatureScale: string;
    measurementScale: string;
    theme: SystemTheme;
    setTemperatureScale: (temperatureScale: TemperatureScale) => void;
    setMeasurementScale: (measurementScale: MeasurementScale) => void;
    toggleTheme: () => void;
}

export const createSettingSlice: StateCreator<
    SettingSlice, 
    [], [], 
    SettingSlice
> = (set) => {

    let prefersDarkMode = false;
    if (typeof window !== "undefined") {
        prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return {
        temperatureScale: TemperatureScale.CELSIUS,
        measurementScale: MeasurementScale.METRIC,
        theme: prefersDarkMode ? SystemTheme.DARK : SystemTheme.LIGHT,
        setTemperatureScale: (temperatureScale: TemperatureScale) => set(() => ({ temperatureScale: temperatureScale })),
        setMeasurementScale: (measurementScale: MeasurementScale) => set(() => ({ measurementScale: measurementScale })),
        toggleTheme: () => set((state) => ({ theme: state.theme === SystemTheme.DARK ? SystemTheme.LIGHT : SystemTheme.DARK})),
    }
}