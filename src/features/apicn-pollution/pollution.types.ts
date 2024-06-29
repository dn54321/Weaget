export interface Pollution {
    aqi: number;
    idx: number;
    attributions: Array<Attribution>;
    city: City;
    dominentpol: string;
    iaqi: Iaqi;
    time: Time;
    forecast: Forecast;
    debug: Debug;
}

export interface Iaqi {
    co?: Volume;
    h?: Volume;
    neph?: Volume;
    no2?: Volume;
    o3?: Volume;
    p?: Volume;
    pm10?: Volume;
    pm25?: Volume;
    so2?: Volume;
    t?: Volume;
    w?: Volume;
    wg?: Volume;
}

export interface Time {
    s: string;
    tz: string;
    v: number;
    iso: string;
}

export interface Debug {
    sync: Date;
}

export interface Volume {
    v: number;
}

export interface Attribution {
    url: string;
    name: string;
}

export interface Forecast {
    daily: Daily;
}

export interface Daily {
    o3?: Array<DailyPollutantReport>;
    pm10?: Array<DailyPollutantReport>;
    pm25?: Array<DailyPollutantReport>;
    uvi?: Array<DailyPollutantReport>;
}

export interface DailyPollutantReport {
    avg: number;
    day: string;
    max: number;
    min: number;
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
