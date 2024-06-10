export interface Pollution {
    aqi: number;
    idx: number;
    attributions: Array<Attribution>
    city: City;
    dominentpol: string;
    iaqi:Iaqi;
    time: Time;
    forecast: Forecast;
    debug: Debug
}

export interface Iaqi {
    co: Volume,
    h: Volume,
    no2: Volume,
    o3: Volume,
    P: Volume,
    pm10: Volume,
    pm25: Volume,
    so2: Volume,
    t: Volume,
    w: Volume
}

export interface Time {
    s: string,
    tz: string,
    v: number,
    iso: string
}

export interface Debug {
    sync: number
}

export interface Volume {
    v: number;
}

export interface Attribution {
    url: string;
    name: string;
}

export interface Forecast {
    daily: Daily
}

export interface Daily {
    o3: DailyPollutantReport
    pm10: DailyPollutantReport
    pm25: DailyPollutantReport
    uvi: DailyPollutantReport
}

export interface DailyPollutantReport {
    avg: number,
    day: string,
    max: number,
    min: number
}

export interface City {
    geo: Array<number>;
    name: string;
    url: string;
    location: string;
}

export default interface ApicnPollutionModel {
    status: string;
    data: Pollution;
    message?: string;
}