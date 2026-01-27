export interface CurrentWeatherDetails {
    clouds: number
    dewPoint: number
    dt: Date
    feelsLike: number
    humidity: number
    pressure: number
    rain?: HourlyDownpourWeatherDetails
    snow?: HourlyDownpourWeatherDetails
    sunrise?: Date
    sunset?: Date
    temp: number
    uvi: number
    visibility: number
    weather: Array<WeatherDetails>
    windDeg: number
    windGust?: number
    windSpeed: number
}

export interface DailyWeatherDetails {
    clouds: number
    dewPoint: number
    dt: Date
    feelsLike: {
        day: number
        eve: number
        morn: number
        night: number
    }
    humidity: number
    moonPhase: number
    moonrise: Date
    moonset: Date
    pop: number
    pressure: number
    rain?: number
    snow?: number
    sunrise?: Date
    sunset?: Date
    temp: {
        day: number
        eve: number
        max: number
        min: number
        morn: number
        night: number
    }
    uvi: number
    weather: WeatherDetails[]
    windDeg: number
    windGust?: number
    windSpeed: number
}

export interface HourlyDownpourWeatherDetails {
    "1h"?: number
}

export interface HourlyWeatherDetails {
    clouds: number
    dewPoint: number
    dt: Date
    feelsLike: number
    humidity: number
    pop: number
    pressure: number
    rain?: HourlyDownpourWeatherDetails
    snow?: HourlyDownpourWeatherDetails
    temp: number
    uvi: number
    visibility: number
    weather: WeatherDetails[]
    windDeg: number
    windGust?: number
    windSpeed: number
}

export interface MinutelyWeatherDetails {
    dt: Date
    precipitation: number
}

export interface OneCallWeatherDetails {
    alerts?: Array<WeatherAlert>
    current?: CurrentWeatherDetails
    daily?: Array<DailyWeatherDetails>
    hourly?: Array<HourlyWeatherDetails>
    lat: number
    lon: number
    minutely?: Array<MinutelyWeatherDetails>
    timezone: string
    timezoneOffset: number
}

export interface WeatherAlert {
    description: string
    end: Date
    event: string
    senderName: string
    start: Date
    tags: Array<string>
}

export interface WeatherDetails {
    description: string
    icon: string
    id: number
    main: string
}
