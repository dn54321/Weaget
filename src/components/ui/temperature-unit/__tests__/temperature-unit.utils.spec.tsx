import { describe, expect, it } from "vitest";
import { convertTemperature, getTemperatureSymbol } from "@components/ui/temperature-unit/temperature-unit.utils";
import { TemperatureScale } from "@src/types/weather.types";

describe("Component: temperature-unit", async () => {
    describe("convertTemperature", () => {
        it.each([
            [293.15, 20],
            [293.65, 20.5],
        ])("should convert %s kelvin temperature to %s celcius.", (
            kelvinTemp,
            expected
        ) => {
            expect(convertTemperature(TemperatureScale.CELSIUS, kelvinTemp)).toBe(expected);
        });

        it.each([
            [266.483, 19.999400000000048], // 20 // rounding error
            [266.7611, 20.49998000000004], // 20.5 // rounding error
        ])("should convert %s kelvin temperature to %s celcius.", (
            kelvinTemp,
            expected
        ) => {
            expect(convertTemperature(TemperatureScale.FAHRENHEIT, kelvinTemp)).toBe(expected);
        });
    });
    describe("getTemperatureUnit", () => {
        it.each([
            [TemperatureScale.CELSIUS, "C"],
            [TemperatureScale.FAHRENHEIT, "F"],
            ["unknown", "K"],
        ])("given %s temperature scale, %s should be returned as a symbol.", (
            scale,
            expected
        ) => {
            expect(getTemperatureSymbol(scale as TemperatureScale)).toEqual(expected);
        });
    });
});
