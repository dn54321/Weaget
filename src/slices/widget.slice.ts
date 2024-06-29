import { StateCreator } from "zustand"
import { DailyWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type"

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