import { afterEach, describe, expect, it } from "vitest";
import { TemperatureScale } from "@src/types/weather.types";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";
import { TempUnit } from "./..";

describe("Component: temperature-unit", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [274.284, 2, "1.13"],
        [274.284, 1, "1.1"],
        [274.284, 0, "1"],
    ])("should convert %d kelvin with %d decimals to %s celcius.", (
        kelvin: number,
        decimal: number,
        expected: string
    ) => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const view = withRender(<TempUnit value={kelvin} decimals={decimal} symbol />, { settings });
        expect(view.getByText(`${expected}°C`)).toBeInTheDocument();
    });

    it.each([
        [274.34, 2, "34.14"],
        [274.34, 1, "34.1"],
        [274.34, 0, "34"],
    ])("should convert %d kelvin with %d decimals to %s fahrenheit.", (
        kelvin: number,
        decimal: number,
        expected: string
    ) => {
        const settings = { temperatureScale: TemperatureScale.FAHRENHEIT };
        const view = withRender(<TempUnit value={kelvin} decimals={decimal} symbol />, { settings });
        expect(view.getByText(`${expected}°F`)).toBeInTheDocument();
    });

    it("should work without decimal.", (
    ) => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const view = withRender(<TempUnit value={274.284} symbol />, { settings });
        expect(view.getByText(`1°C`)).toBeInTheDocument();
    });

    it("should default to kelvin if measurement scale is unknown.", (
    ) => {
        const settings = { temperatureScale: "unknownScale" };
        const view = withRender(<TempUnit value={274.284} symbol />, { settings });
        expect(view.getByText(`274°K`)).toBeInTheDocument();
    });
});
