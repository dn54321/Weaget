import { afterEach, describe, expect, it } from "vitest";
import { TempUnit } from "./..";
import { TemperatureScale } from "@src/types/weather.types";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";

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
        expected: string,
    ) => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const { getByText, getByTitle } = withRender(<TempUnit value={kelvin} decimals={decimal} symbol />, { settings });
        expect(getByText(`${expected}°`)).toBeInTheDocument();
        expect(getByTitle("temperature.celsius.text")).toHaveTextContent("C");
    });

    it.each([
        [274.34, 2, "34.14"],
        [274.34, 1, "34.1"],
        [274.34, 0, "34"],
    ])("should convert %d kelvin with %d decimals to %s fahrenheit.", (
        kelvin: number,
        decimal: number,
        expected: string,
    ) => {
        const settings = { temperatureScale: TemperatureScale.FAHRENHEIT };
        const { getByText, getByTitle } = withRender(<TempUnit value={kelvin} decimals={decimal} symbol />, { settings });
        expect(getByText(`${expected}°`)).toBeInTheDocument();
        expect(getByTitle("temperature.fahrenheit.text")).toHaveTextContent("F");
    });

    it("should work without decimal.", (
    ) => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const { getByText, getByTitle } = withRender(<TempUnit value={274.284} symbol />, { settings });
        expect(getByText(`1°`)).toBeInTheDocument();
        expect(getByTitle("temperature.celsius.text")).toHaveTextContent("C");
    });

    it("should default to kelvin if measurement scale is not provided.", (
    ) => {
        const settings = { temperatureScale: undefined };
        const { getByText, getByTitle } = withRender(<TempUnit value={274.284} symbol />, { settings });
        expect(getByText(`274°`)).toBeInTheDocument();
        expect(getByTitle("temperature.kelvin.text")).toHaveTextContent("K");
    });
});
