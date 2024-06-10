import { StateCreator } from "zustand";
import { TemperatureScale } from "../types/weather.types";
import { MeasurementScale } from "../types/measurement.types";

export interface SettingSlice {
    temperatureScale: string;
    measurementScale: string;
    setTemperatureScale: (temperatureScale: TemperatureScale) => void;
    setMeasurementScale: (measurementScale: MeasurementScale) => void;
}

export const createSettingSlice: StateCreator<
    SettingSlice, 
    [], [], 
    SettingSlice
> = (set) => ({
    temperatureScale: TemperatureScale.CELSIUS,
    measurementScale: MeasurementScale.METRIC,
    setTemperatureScale: (temperatureScale: TemperatureScale) => set(() => ({ temperatureScale: temperatureScale })),
    setMeasurementScale: (measurementScale: MeasurementScale) => set(() => ({ measurementScale: measurementScale }))
})