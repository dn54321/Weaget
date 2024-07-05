import { createStore } from "zustand";
import { DailyWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";

export interface WidgetState {
    focusedWeather?: DailyWeatherDetails;

}

export interface WidgetActions {
    setFocusedWeather: (weather?: DailyWeatherDetails) => void;
    resetState: () => void;
}

export type WidgetStore = WidgetState & WidgetActions;

export const initialWidgetStoreState: WidgetState = {
    focusedWeather: undefined,
};

export const createWidgetStore = (
    initState: Partial<WidgetState> = {},
) => {
    return createStore<WidgetStore>()(set => ({
        ...initialWidgetStoreState,
        ...initState,
        setFocusedWeather: state => set(() => ({ focusedWeather: state })),
        resetState: () => set(() => ({ focusedWeather: undefined })),
    }));
};
