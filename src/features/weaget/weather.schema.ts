import { z } from "zod";

const weatherDetailsSchema = z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
});

const minutelyWeatherDetailsShema = z.object({
    dt: z.coerce.date(),
    precipitation: z.number(),
});

const hourlyDownpourWeatherDetailsSchema = z.object({
    "1h": z.number().optional(),
});

const hourlyWeatherDetailsSchema = z.object({
    dt: z.coerce.date(),
    temp: z.number(),
    feelsLike: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dewPoint: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    windSpeed: z.number(),
    windDeg: z.number(),
    windGust: z.number().optional(),
    weather: z.array(weatherDetailsSchema),
    pop: z.number(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional(),
});

const dailyWeatherDetailsSchema = z.object({
    dt: z.coerce.date(),
    sunrise: z.coerce.date().optional(),
    sunset: z.coerce.date().optional(),
    moonrise: z.coerce.date(),
    moonset: z.coerce.date(),
    moonPhase: z.number(),
    temp: z.object({
        morn: z.number(),
        day: z.number(),
        eve: z.number(),
        night: z.number(),
        min: z.number(),
        max: z.number(),
    }),
    feelsLike: z.object({
        morn: z.number(),
        day: z.number(),
        eve: z.number(),
        night: z.number(),
    }),
    pressure: z.number(),
    humidity: z.number(),
    dewPoint: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    windSpeed: z.number(),
    windDeg: z.number(),
    windGust: z.number().optional(),
    weather: z.array(weatherDetailsSchema),
    pop: z.number(),
    rain: z.number().optional(),
    snow: z.number().optional(),
});

const weatherAlertSchema = z.object({
    senderName: z.string(),
    event: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()),
});

const CurrentWeatherDetailsSchema = z.object({
    dt: z.coerce.date(),
    sunrise: z.coerce.date().optional(),
    sunset: z.coerce.date().optional(),
    temp: z.number(),
    feelsLike: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dewPoint: z.number(),
    weather: z.array(weatherDetailsSchema),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    windSpeed: z.number(),
    windDeg: z.number(),
    windGust: z.number().optional(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional(),
});

export const weatherSchema = z.object({
    lat: z.number(),
    lon: z.number(),
    timezone: z.string(),
    timezoneOffset: z.number(),
    current: CurrentWeatherDetailsSchema.optional(),
    minutely: z.array(minutelyWeatherDetailsShema).optional(),
    hourly: z.array(hourlyWeatherDetailsSchema).optional(),
    daily: z.array(dailyWeatherDetailsSchema).optional(),
    alerts: z.array(weatherAlertSchema).optional(),
});

export default weatherSchema;
