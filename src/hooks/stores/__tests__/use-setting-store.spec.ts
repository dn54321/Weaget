import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MeasurementScale } from "@src/types/measurement.types";
import { TemperatureScale } from "@src/types/weather.types";
import { testWrapper } from "@utils/wrappers";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";

describe("Hooks - use-setting-store", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each([
        [TemperatureScale.CELSIUS],
        [TemperatureScale.FAHRENHEIT],
    ])("should return %s if the temperature scale is set to it.", (
        temperatureScale: TemperatureScale,
    ) => {
        const { result } = renderHook(() => useSettingStore(state => state), { wrapper: testWrapper });
        act(() => result.current.setTemperatureScale(temperatureScale));
        expect(result.current.temperatureScale).toBe(temperatureScale);
    });

    it.each([
        [MeasurementScale.METRIC],
        [MeasurementScale.IMPERIAL],
    ])("should return %s if the measurement scale is set to it.", (
        measurementScale: MeasurementScale,
    ) => {
        const { result } = renderHook(() => useSettingStore(state => state), { wrapper: testWrapper });
        act(() => result.current.setMeasurementScale(measurementScale));
        expect(result.current.measurementScale).toBe(measurementScale);
    });

    it("should throw error if no provider for setting store is provided", async () => {
        expect(
            () => renderHook(() => useSettingStore(state => state)),
        ).toThrow(`useSettingStore must be used within SettingsStoreProvider`);
    });
});
