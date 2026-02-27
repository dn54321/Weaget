import { createJSONStorage, persist } from "zustand/middleware";
import { MeasurementScale } from "@src/types/measurement.types";
import type { StateStorage } from "zustand/middleware";
import { SystemLocale } from "@src/types/system.types";
import type { SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";
import { createStore } from "zustand";

// Native Cookie Helper (No NPM dependencies needed)
const cookieStorage: StateStorage = {
    getItem: (name): string | null => {
        if (typeof document === "undefined") return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
    },
    setItem: (name, value) => {
        if (typeof document !== "undefined") {
            // Setting cookie for 1 year
            document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
        }
    },
    removeItem: (name) => {
        if (typeof document !== "undefined") {
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
    },
};

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
    initState: Partial<SettingStoreState> = {},
    shouldPersist: boolean = true,
) => {
    return createStore<SettingStore>()(
        persist(
            set => ({
                ...initialSettingStoreState,
                ...initState,
                setLocale: locale => set({ locale }),
                setMeasurementScale: measurementScale => set({ measurementScale }),
                setTemperatureScale: temperatureScale => set({ temperatureScale }),
            }),
            {
                name: "NEXT_LOCALE_STORE", // The cookie name
                storage: createJSONStorage(() => cookieStorage),
                skipHydration: !shouldPersist,
            },
        ),
    );
};
