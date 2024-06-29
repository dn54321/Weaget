import { render, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { MeasurementScale } from "@src/types/measurement.types";
import { testQueryClient } from "@utils/query-client";
import { testWrapper } from "@utils/wrappers";
import SpeedUnit from "@components/ui/speed-unit";
import { Box } from "@mui/material";

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
/*
     SpeedUnit
     
     The speedUnit component is a component that outputs the speed in the selected system unit.
     The speeds are as follows:
        - Metric: m/s
        - Imperial: mph
*/
export function convertMeasurement(value: number, measurementScale: string) {
    switch (measurementScale) {
        case MeasurementScale.METRIC: return value;
        case MeasurementScale.IMPERIAL: return value * 2.23694;
        default: return value;
    }
}

export function getSymbol(temperatureScale: string) {
    switch (temperatureScale) {
        case MeasurementScale.IMPERIAL: return <abbr title="miles per hour">mph</abbr>;
        case MeasurementScale.METRIC: return <abbr title="meters per second">ms<Box component="sup" sx={{
            verticalAlign: "top",
            position: "relative",
            top: "-0.5em",
        }}>-1</Box></abbr>;
    }
}
