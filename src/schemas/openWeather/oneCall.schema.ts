import { z } from "zod";

const weatherDetailsSchema = z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string()
});

const minutelyWeatherDetailsShema = z.object({
    dt: z.number().transform(v => new Date(v*1000)),
    precipitation: z.number(),
});

const hourlyDownpourWeatherDetailsSchema = z.object({
    "1h": z.number().optional(),
});

const hourlyWeatherDetailsSchema = z.object({
    dt: z.number().transform(v => new Date(v*1000)),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    weather: z.array(weatherDetailsSchema),
    pop: z.number(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional()
}).transform((o) => ({
    dt: o.dt,
    temp: o.temp,
    feelsLike: o.feels_like,
    pressure: o.pressure,
    humidity: o.humidity,
    dewPoint: o.dew_point,
    uvi: o.uvi,
    clouds: o.clouds,
    visibility: o.visibility,
    windSpeed: o.wind_speed,
    windDeg: o.wind_deg,
    windGust: o.wind_gust,
    weather: o.weather,
    pop: o.pop,
    rain: o.rain,
    snow: o.snow
}));

const dailyWeatherDetailsSchema = z.object({
    dt: z.number().transform(v => new Date(v*1000)),
    sunrise: z.number().transform(v => new Date(v*1000)).optional(),
    sunset: z.number().transform(v => new Date(v*1000)).optional(),
    moonrise: z.number().transform(v => new Date(v*1000)),
    moonset: z.number().transform(v => new Date(v*1000)),
    moon_phase: z.number(),
    temp: z.object({
        morn: z.number(),
        day: z.number(),
        eve: z.number(),
        night: z.number(),
        min: z.number(),
        max: z.number()
    }),
    feels_like: z.object({
        morn: z.number(),
        day: z.number(),
        eve: z.number(),
        night: z.number(),
    }),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    weather: z.array(weatherDetailsSchema),
    pop: z.number(),
    rain: z.number().optional(),
    snow: z.number().optional(),
}).transform((o) => ({
    dt: o.dt,
    sunrise: o.sunrise,
    sunset: o.sunset,
    moonrise: o.moonrise,
    moonset: o.moonset,
    moonPhase: o.moon_phase,
    temp: {
        morn: o.temp.morn,
        day: o.temp.day,
        eve: o.temp.eve,
        night: o.temp.night,
        min: o.temp.min,
        max: o.temp.max
    },
    feelsLike: {
        morn: o.feels_like.morn,
        day: o.feels_like.day,
        eve: o.feels_like.eve,
        night: o.feels_like.night
    },
    pressure: o.pressure,
    humidity: o.humidity,
    dewPoint: o.dew_point,
    uvi: o.uvi,
    clouds: o.clouds,
    windSpeed: o.wind_speed,
    windDeg: o.wind_deg,
    windGust: o.wind_gust,
    weather: o.weather,
    pop: o.pop,
    rain: o.rain,
    snow: o.snow
}));

const weatherAlertSchema = z.object({
    sender_name: z.string(),
    event: z.string(),
    start: z.number().transform(v => new Date(v*1000)),
    end: z.number().transform(v => new Date(v*1000)),
    description: z.string(),
    tags: z.string()
}).transform((o) => ({
    senderName: o.sender_name,
    event: o.event,
    start: o.start,
    end: o.end,
    description: o.description,
    tags: o.tags
}));

const CurrentWeatherDetailsSchema = z.object({
    dt: z.number().transform(v => new Date(v*1000)),
    sunrise: z.number().transform(v => new Date(v*1000)).optional(),
    sunset: z.number().transform(v => new Date(v*1000)).optional(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    weather: z.array(weatherDetailsSchema),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional(),
}).transform((o) => ({
    dt: o.dt,
    sunrise: o.sunrise,
    sunset: o.sunset,
    temp: o.temp,
    feelsLike: o.feels_like,
    pressure: o.pressure,
    humidity: o.humidity,
    dewPoint: o.dew_point,
    weather: o.weather,
    uvi: o.uvi,
    clouds: o.clouds,
    visibility: o.visibility,
    windSpeed: o.wind_speed,
    windDeg: o.wind_deg,
    windGust: o.wind_gust,
    rain: o.rain,
    snow: o.snow
}));

export const oneCallWeatherDetailsSchema = z.object({
    lat: z.number(),
    lon: z.number(),
    timezone: z.string(),
    timezone_offset: z.number(),
    current: CurrentWeatherDetailsSchema.optional(),
    minutely: z.array(minutelyWeatherDetailsShema).optional(),
    hourly: z.array(hourlyWeatherDetailsSchema).optional(),
    daily: z.array(dailyWeatherDetailsSchema).optional(),
    alerts: weatherAlertSchema.optional(),
}).transform((o) => ({
    lat: o.lat,
    lon: o.lon,
    timezone: o.timezone,
    timezoneOffset: o.timezone_offset,
    current: o.current,
    minutely: o.minutely,
    hourly: o.hourly,
    daily: o.daily,
    alerts: o.alerts
}));
