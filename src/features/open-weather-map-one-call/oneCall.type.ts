export interface WeatherDetails {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface MinutelyWeatherDetails {
    dt: Date,
    precipitation: number,
}

export interface HourlyDownpourWeatherDetails {
    "1h"?: number,
}

export interface HourlyWeatherDetails {
    dt: Date,
    temp: number,
    feelsLike: number,
    pressure: number,
    humidity: number,
    dewPoint: number,
    uvi: number,
    clouds: number,
    visibility: number,
    windSpeed: number,
    windDeg: number,
    windGust?: number,
    weather: WeatherDetails[],
    pop: number,
    rain?: HourlyDownpourWeatherDetails,
    snow?: HourlyDownpourWeatherDetails,
}

export interface DailyWeatherDetails {
    dt: Date,
    sunrise?: Date,
    sunset?: Date,
    moonrise: Date,
    moonset: Date,
    moonPhase: number,
    temp: {
        morn: number,
        day: number,
        eve: number,
        night: number,
        min: number,
        max: number
    },
    feelsLike: {
        morn: number,
        day: number,
        eve: number,
        night: number,
    },
    pressure: number,
    humidity: number,
    dewPoint: number,
    uvi: number,
    clouds: number,
    windSpeed: number,
    windDeg: number,
    windGust?: number,
    weather: WeatherDetails[],
    pop: number,
    rain?: number,
    snow?: number,
}

export interface WeatherAlert {
    senderName: string,
    event: string,
    start: Date,
    end: Date,
    description: string,
    tags: Array<string>
}

export interface CurrentWeatherDetails {
    dt: Date,
    sunrise?: Date,
    sunset?: Date,
    temp: number,
    feelsLike: number,
    pressure: number,
    humidity: number,
    dewPoint: number,
    weather: Array<WeatherDetails>
    uvi: number,
    clouds: number,
    visibility: number,
    windSpeed: number,
    windDeg: number,
    windGust?: number,
    rain?: HourlyDownpourWeatherDetails,
    snow?: HourlyDownpourWeatherDetails;
}

export interface OneCallWeatherDetails {
    lat: number,
    lon: number,
    timezone: string,
    timezoneOffset: number,
    current?: CurrentWeatherDetails
    minutely?: Array<MinutelyWeatherDetails>
    hourly?: Array<HourlyWeatherDetails>,
    daily?: Array<DailyWeatherDetails>,
    alerts?: Array<WeatherAlert>
}   