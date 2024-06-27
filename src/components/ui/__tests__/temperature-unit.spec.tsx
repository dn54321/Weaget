import { render, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSettingStore } from "../../../hooks/stores/use-setting-store";
import { TemperatureScale } from "../../../types/weather.types";
import { testQueryClient } from "../../../utils/query-client";
import { testWrapper } from "../../../utils/wrappers";
import Temp from "../temperature-unit";

describe("Component: temperature-unit", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [274.284, 2, "1.13"],
        [274.284, 1, "1.1"],
        [274.284, 0, "1"]
    ])("should convert %d kelvin with %d decimals to %s celcius.", (
        kelvin: number,
        decimal: number,
        expected: string
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setTemperatureScale(TemperatureScale.CELSIUS);
        const {getByText} = render(<Temp value={kelvin} decimals={decimal} symbol/>);
        expect(getByText(`${expected}°C`)).toBeInTheDocument();
    });

    it.each([
        [274.34, 2, "34.14"],
        [274.34, 1, "34.1"],
        [274.34, 0, "34"]
    ])("should convert %d kelvin with %d decimals to %s fahrenheit.", (
        kelvin: number,
        decimal: number,
        expected: string
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setTemperatureScale(TemperatureScale.FAHRENHEIT);
        const {getByText} = render(<Temp value={kelvin} decimals={decimal} symbol/>);
        expect(getByText(`${expected}°F`)).toBeInTheDocument();
    });

    it("should work without decimal.", (
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setTemperatureScale(TemperatureScale.CELSIUS);
        const {getByText} = render(<Temp value={274.284} symbol/>);
        expect(getByText(`1°C`)).toBeInTheDocument();
    });

    it("should default to kelvin if measurement scale is unknown.", (
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setTemperatureScale("unknownScale" as unknown as TemperatureScale);
        const {getByText} = render(<Temp value={274.284} symbol/>);
        expect(getByText(`274°K`)).toBeInTheDocument();
    });
})