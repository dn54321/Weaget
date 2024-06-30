import { render, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { MeasurementScale } from "@src/types/measurement.types";
import { testQueryClient } from "@utils/query-client";
import { testWrapper } from "@utils/wrappers";
import { VolumeUnit } from "./..";
import { convertVolumeMeasurement, getVolumeSymbol } from "@components/ui/volume-unit/volume-unit.utils";

describe("Component: volume-unit", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [1.23, 2, "1.23"],
        [1.23, 1, "1.2"],
        [1.23, 0, "1"],
    ])("should convert %d with %d d.p. to %s. (mmh => mmh)", (
        input: number,
        decimal: number,
        expected: string
    ) => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        result.current.setMeasurementScale(MeasurementScale.METRIC);
        const { getByText } = render(<VolumeUnit value={input} decimals={decimal} />);
        expect(getByText(expected)).toBeInTheDocument();
    });

    it.each([
        [100, 2, "3.94"],
        [100, 1, "3.9"],
        [100, 0, "4"],
    ])("should convert %d with %d d.p. to %s. (mmh => iph)", (
        input: number,
        decimal: number,
        expected: string
    ) => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        result.current.setMeasurementScale(MeasurementScale.IMPERIAL);
        const { getByText } = render(<VolumeUnit value={input} decimals={decimal} />);
        expect(getByText(expected)).toBeInTheDocument();
    });

    it("should work without decimal.", () => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        result.current.setMeasurementScale(MeasurementScale.METRIC);
        const { getByText } = render(<VolumeUnit value={1} />);
        expect(getByText(1)).toBeInTheDocument();
    });

    it.each([
        ["mmh", MeasurementScale.METRIC],
        ["iph", MeasurementScale.IMPERIAL],
    ])("should return %s unit given the measurement scale is set to %s.", (
        symbol: string,
        measurementScale: MeasurementScale
    ) => {
        const { result } = renderHook(() => useSettingStore(), { wrapper: testWrapper });
        result.current.setMeasurementScale(measurementScale);
        const { getByText } = render(<VolumeUnit value={1} symbol />);
        expect(getByText(symbol)).toBeInTheDocument();
    });

    describe("getVolumeSymbol", () => {
        it.each([
            ["mm/h", MeasurementScale.METRIC],
            ["iph", MeasurementScale.IMPERIAL],
        ])("should return %s unit given %s", (
            symbol: string,
            measurementScale: MeasurementScale
        ) => {
            const element = getVolumeSymbol(measurementScale);
            expect(element).toEqual(symbol);
        });
    });

    describe("convertVolumeMeasurement", () => {
        it.each([
            [1.23, 2, 1.23],
            [1.23, 1, 1.2],
            [1.23, 0, 1],
        ])("should convert %d with %d d.p. to %d. (mmh => iph)", (
            input: number,
            decimal: number,
            expected: number
        ) => {
            const res = convertVolumeMeasurement(MeasurementScale.METRIC, input, decimal);
            expect(res).toEqual(expected);
        });
    });
});
