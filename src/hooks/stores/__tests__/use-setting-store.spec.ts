import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TemperatureScale } from "@src/types/weather.types";
import { act, renderHook } from "@testing-library/react";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { testWrapper } from "@utils/wrappers";
import { MeasurementScale } from "@src/types/measurement.types";
import { SystemTheme } from "@src/types/system.types";

describe("Hooks - use-setting-store", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each([
        [TemperatureScale.CELSIUS],
        [TemperatureScale.FAHRENHEIT],
    ])("should return %s if the temperature scale is set to it.", (
        temperatureScale: TemperatureScale
    ) => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        act(() => result.current.setTemperatureScale(temperatureScale));
        expect(result.current.temperatureScale).toBe(temperatureScale);
    });

    it.each([
        [MeasurementScale.METRIC],
        [MeasurementScale.IMPERIAL],
    ])("should return %s if the measurement scale is set to it.", (
        measurementScale: MeasurementScale
    ) => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        act(() => result.current.setMeasurementScale(measurementScale));
        expect(result.current.measurementScale).toBe(measurementScale);
    });

    it.each([
        [SystemTheme.DARK],
        [SystemTheme.LIGHT],
    ])("should return %s if the system theme is set to it.", (
        systemTheme: SystemTheme
    ) => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        act(() => result.current.setTheme(systemTheme));
        expect(result.current.theme).toBe(systemTheme);
    });

    it.each([
        [SystemTheme.LIGHT, SystemTheme.DARK],
        [SystemTheme.DARK, SystemTheme.LIGHT],
    ])("should toggle from %s to %s if the system theme toggle is invoked.", (
        input: SystemTheme,
        expected: SystemTheme
    ) => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        act(() => result.current.setTheme(input));
        act(() => result.current.toggleTheme());
        expect(result.current.theme).toBe(expected);
    });

    it.each([
        [SystemTheme.LIGHT, true],
        [SystemTheme.DARK, false],
    ])("should toggle to %s the user's system preference has darkmode set to %o.", (
        expected: SystemTheme,
        isDarkMode: boolean
    ) => {
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: isDarkMode,
            media: true,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
        }));

        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        act(() => result.current.setTheme(SystemTheme.SYSTEM));
        act(() => result.current.toggleTheme());
        expect(result.current.theme).toBe(expected);
    });
});
