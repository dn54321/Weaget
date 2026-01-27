export interface Attribution {
    name: string
    url: string
}

export interface City {
    geo: Array<number>
    location: string
    name: string
    url: string
}

export interface Daily {
    o3?: Array<DailyPollutantReport>
    pm10?: Array<DailyPollutantReport>
    pm25?: Array<DailyPollutantReport>
    uvi?: Array<DailyPollutantReport>
}

export interface DailyPollutantReport {
    avg: number
    day: string
    max: number
    min: number
}

export interface Debug {
    sync: Date
}

export interface Forecast {
    daily: Daily
}

export interface Iaqi {
    co?: Volume
    h?: Volume
    neph?: Volume
    no2?: Volume
    o3?: Volume
    p?: Volume
    pm10?: Volume
    pm25?: Volume
    so2?: Volume
    t?: Volume
    w?: Volume
    wg?: Volume
}

export interface Pollution {
    aqi: number
    attributions: Array<Attribution>
    city: City
    debug: Debug
    dominentpol: string
    forecast: Forecast
    iaqi: Iaqi
    idx: number
    time: Time
}

export default interface PollutionModel {
    data: Pollution
    message?: string
    status: string
}

export interface Time {
    iso: string
    s: string
    tz: string
    v: number
}

export interface Volume {
    v: number
}
