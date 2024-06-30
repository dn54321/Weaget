import { TemperatureScale } from "@src/types/weather.types";

export function convertTemperature(tempScale: TemperatureScale, temp: number) {
    switch (tempScale) {
        case TemperatureScale.CELSIUS: return (temp - 273.15);
        case TemperatureScale.FAHRENHEIT: return ((temp - 273.15) * 9 / 5 + 32);
        default: return temp;
    }
}

export function getTemperatureSymbol(tempScale: TemperatureScale) {
    switch (tempScale) {
        case TemperatureScale.CELSIUS: return "C";
        case TemperatureScale.FAHRENHEIT: return "F";
        default: return "K";
    }
}
