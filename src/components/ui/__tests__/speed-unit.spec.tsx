import { render, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSettingStore } from "../../../hooks/stores/use-setting-store";
import { MeasurementScale } from "../../../types/measurement.types";
import { testQueryClient } from "../../../utils/query-client";
import { testWrapper } from "../../../utils/wrappers";
import SpeedUnit from "../speed-unit";

describe("Component: speed-unit", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [1.23, 2, "1.23"],
        [1.23, 1, "1.2"],
        [1.23, 0, "1"]
    ])("should convert %d with %d d.p. to %s. (m/s => m/s)", (
        input: number,
        decimal: number,
        expected: string
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setMeasurementScale(MeasurementScale.METRIC);
        const {getByText} = render(<SpeedUnit value={input} decimals={decimal}/>);
        expect(getByText(expected)).toBeInTheDocument();
    });

    it.each([
        [1.23, 2, "2.75"],
        [1.23, 1, "2.8"],
        [1.23, 0, "3"]
    ])("should convert %d with %d d.p. to %s. (m/s => mph)", (
        input: number,
        decimal: number,
        expected: string
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setMeasurementScale(MeasurementScale.IMPERIAL);
        const {getByText} = render(<SpeedUnit value={input} decimals={decimal}/>);
        expect(getByText(expected)).toBeInTheDocument();
    });

    it("should work without decimal.", (
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setMeasurementScale(MeasurementScale.METRIC);
        const {getByText} = render(<SpeedUnit value={1} />);
        expect(getByText(1)).toBeInTheDocument();
    });

    it("should default to m/s if measurement scale is unknown.", (
    ) => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setMeasurementScale("unknownScale" as unknown as MeasurementScale);
        const {getByText} = render(<SpeedUnit value={1} />);
        expect(getByText(1)).toBeInTheDocument();
    });
})