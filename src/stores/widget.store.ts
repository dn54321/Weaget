import { DailyWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { createStore } from "zustand";

export interface WidgetActions {
    resetState: () => void
    setFocusedWeather: (weather?: DailyWeatherDetails) => void
}

export interface WidgetState {
    focusedWeather?: DailyWeatherDetails

}

export type WidgetStore = WidgetActions & WidgetState;

export const initialWidgetStoreState: WidgetState = {
    focusedWeather: undefined
};

export const createWidgetStore = (
    initState: Partial<WidgetState> = {}
) => {
    return createStore<WidgetStore>()(set => ({
        ...initialWidgetStoreState,
        ...initState,
        resetState: () => set(() => ({ focusedWeather: undefined })),
        setFocusedWeather: state => set(() => ({ focusedWeather: state }))
    }));
};
