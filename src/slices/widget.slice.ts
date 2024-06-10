import { StateCreator } from "zustand"
import { DailyWeatherDetails } from "../types/models/openWeather/oneCall.model"

export interface WidgetSlice {
    focusedWeather?: DailyWeatherDetails,
    setFocusedWeather: (weather?: DailyWeatherDetails) => void,
    resetState: () => void
}

export const createWidgetSlice: StateCreator<
    WidgetSlice, 
    [], [], 
    WidgetSlice
> = (set) => ({
    focusedWeather: undefined,
    setFocusedWeather: (state) => set(() => ({ focusedWeather: state })),
    resetState: () => set(() => ({ focusedWeather: undefined}))
})