import { afterEach, describe, expect, it } from "vitest";
import { MeasurementScale } from "@src/types/measurement.types";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";
import { SpeedUnit } from "./..";

describe("Component: speed-unit", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [1.23, 2, "1.23"],
        [1.23, 1, "1.2"],
        [1.23, 0, "1"],
    ])("should convert %d with %d d.p. to %s. (m/s => m/s)", (
        input: number,
        decimal: number,
        expected: string
    ) => {
        const settings = { measurementScale: MeasurementScale.METRIC };
        const { getByText } = withRender(<SpeedUnit value={input} decimals={decimal} />, { settings });
        expect(getByText(expected)).toBeInTheDocument();
    });

    it.each([
        [1.23, 2, "2.75"],
        [1.23, 1, "2.8"],
        [1.23, 0, "3"],
    ])("should convert %d with %d d.p. to %s. (m/s => mph)", (
        input: number,
        decimal: number,
        expected: string
    ) => {
        const settings = { measurementScale: MeasurementScale.IMPERIAL };
        const { getByText } = withRender(<SpeedUnit value={input} decimals={decimal} />, { settings });
        expect(getByText(expected)).toBeInTheDocument();
    });

    it("should work without decimal.", (
    ) => {
        const settings = { measurementScale: MeasurementScale.METRIC };
        const { getByText } = withRender(<SpeedUnit value={1} />, { settings });
        expect(getByText(1)).toBeInTheDocument();
    });

    it("should default to m/s if measurement scale is unknown.", (
    ) => {
        const settings = { measurementScale: "unknownScale" };
        const { getByText } = withRender(<SpeedUnit value={1} />, { settings });
        expect(getByText(1)).toBeInTheDocument();
    });
});
