
export interface Weather {
    date: Date,
    timezone: string,
    weatherCode: number,
    weatherDescription: string,
    rainfallPercentage: number,
    maxTemperature: number,
    minTemperature: number
}

export enum TemperatureScale {
    CELSIUS = "celsius",
    FAHRENHEIT = "fahrenheit",
    KELVIN = "kelvin"
}