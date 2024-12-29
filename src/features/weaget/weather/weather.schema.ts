import { z } from "zod";

const weatherDetailsSchema = z.object({
    description: z.string(),
    icon: z.string(),
    id: z.number(),
    main: z.string(),
});

const minutelyWeatherDetailsShema = z.object({
    dt: z.coerce.date(),
    precipitation: z.number(),
});

const hourlyDownpourWeatherDetailsSchema = z.object({
    "1h": z.number().optional(),
});

const hourlyWeatherDetailsSchema = z.object({
    clouds: z.number(),
    dewPoint: z.number(),
    dt: z.coerce.date(),
    feelsLike: z.number(),
    humidity: z.number(),
    pop: z.number(),
    pressure: z.number(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional(),
    temp: z.number(),
    uvi: z.number(),
    visibility: z.number(),
    weather: z.array(weatherDetailsSchema),
    windDeg: z.number(),
    windGust: z.number().optional(),
    windSpeed: z.number(),
});

const dailyWeatherDetailsSchema = z.object({
    clouds: z.number(),
    dewPoint: z.number(),
    dt: z.coerce.date(),
    feelsLike: z.object({
        day: z.number(),
        eve: z.number(),
        morn: z.number(),
        night: z.number(),
    }),
    humidity: z.number(),
    moonPhase: z.number(),
    moonrise: z.coerce.date(),
    moonset: z.coerce.date(),
    pop: z.number(),
    pressure: z.number(),
    rain: z.number().optional(),
    snow: z.number().optional(),
    sunrise: z.coerce.date().optional(),
    sunset: z.coerce.date().optional(),
    temp: z.object({
        day: z.number(),
        eve: z.number(),
        max: z.number(),
        min: z.number(),
        morn: z.number(),
        night: z.number(),
    }),
    uvi: z.number(),
    weather: z.array(weatherDetailsSchema),
    windDeg: z.number(),
    windGust: z.number().optional(),
    windSpeed: z.number(),
});

const weatherAlertSchema = z.object({
    description: z.string(),
    end: z.coerce.date(),
    event: z.string(),
    senderName: z.string(),
    start: z.coerce.date(),
    tags: z.array(z.string()),
});

const CurrentWeatherDetailsSchema = z.object({
    clouds: z.number(),
    dewPoint: z.number(),
    dt: z.coerce.date(),
    feelsLike: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional(),
    sunrise: z.coerce.date().optional(),
    sunset: z.coerce.date().optional(),
    temp: z.number(),
    uvi: z.number(),
    visibility: z.number(),
    weather: z.array(weatherDetailsSchema),
    windDeg: z.number(),
    windGust: z.number().optional(),
    windSpeed: z.number(),
});

export const weatherSchema = z.object({
    alerts: z.array(weatherAlertSchema).optional(),
    current: CurrentWeatherDetailsSchema.optional(),
    daily: z.array(dailyWeatherDetailsSchema).optional(),
    hourly: z.array(hourlyWeatherDetailsSchema).optional(),
    lat: z.number(),
    lon: z.number(),
    minutely: z.array(minutelyWeatherDetailsShema).optional(),
    timezone: z.string(),
    timezoneOffset: z.number(),
});

export default weatherSchema;
