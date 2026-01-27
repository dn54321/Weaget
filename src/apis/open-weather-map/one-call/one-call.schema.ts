import { z } from "zod";

const weatherDetailsSchema = z.object({
    description: z.string(),
    icon: z.string(),
    id: z.number(),
    main: z.string()
});

const minutelyWeatherDetailsShema = z.object({
    dt: z.number().transform(v => new Date(v * 1000)),
    precipitation: z.number()
});

const hourlyDownpourWeatherDetailsSchema = z.object({
    "1h": z.number().optional()
});

const hourlyWeatherDetailsSchema = z.object({
    clouds: z.number(),
    dew_point: z.number(),
    dt: z.number().transform(v => new Date(v * 1000)),
    feels_like: z.number(),
    humidity: z.number(),
    pop: z.number(),
    pressure: z.number(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional(),
    temp: z.number(),
    uvi: z.number(),
    visibility: z.number(),
    weather: z.array(weatherDetailsSchema),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    wind_speed: z.number()
}).transform(o => ({
    clouds: o.clouds,
    dewPoint: o.dew_point,
    dt: o.dt,
    feelsLike: o.feels_like,
    humidity: o.humidity,
    pop: o.pop,
    pressure: o.pressure,
    rain: o.rain,
    snow: o.snow,
    temp: o.temp,
    uvi: o.uvi,
    visibility: o.visibility,
    weather: o.weather,
    windDeg: o.wind_deg,
    windGust: o.wind_gust,
    windSpeed: o.wind_speed
}));

const dailyWeatherDetailsSchema = z.object({
    clouds: z.number(),
    dew_point: z.number(),
    dt: z.number().transform(v => new Date(v * 1000)),
    feels_like: z.object({
        day: z.number(),
        eve: z.number(),
        morn: z.number(),
        night: z.number()
    }),
    humidity: z.number(),
    moon_phase: z.number(),
    moonrise: z.number().transform(v => new Date(v * 1000)),
    moonset: z.number().transform(v => new Date(v * 1000)),
    pop: z.number(),
    pressure: z.number(),
    rain: z.number().optional(),
    snow: z.number().optional(),
    sunrise: z.number().transform(v => new Date(v * 1000)).optional(),
    sunset: z.number().transform(v => new Date(v * 1000)).optional(),
    temp: z.object({
        day: z.number(),
        eve: z.number(),
        max: z.number(),
        min: z.number(),
        morn: z.number(),
        night: z.number()
    }),
    uvi: z.number(),
    weather: z.array(weatherDetailsSchema),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    wind_speed: z.number()
}).transform(o => ({
    clouds: o.clouds,
    dewPoint: o.dew_point,
    dt: o.dt,
    feelsLike: {
        day: o.feels_like.day,
        eve: o.feels_like.eve,
        morn: o.feels_like.morn,
        night: o.feels_like.night
    },
    humidity: o.humidity,
    moonPhase: o.moon_phase,
    moonrise: o.moonrise,
    moonset: o.moonset,
    pop: o.pop,
    pressure: o.pressure,
    rain: o.rain,
    snow: o.snow,
    sunrise: o.sunrise,
    sunset: o.sunset,
    temp: {
        day: o.temp.day,
        eve: o.temp.eve,
        max: o.temp.max,
        min: o.temp.min,
        morn: o.temp.morn,
        night: o.temp.night
    },
    uvi: o.uvi,
    weather: o.weather,
    windDeg: o.wind_deg,
    windGust: o.wind_gust,
    windSpeed: o.wind_speed
}));

const weatherAlertSchema = z.object({
    description: z.string(),
    end: z.number().transform(v => new Date(v * 1000)),
    event: z.string(),
    sender_name: z.string(),
    start: z.number().transform(v => new Date(v * 1000)),
    tags: z.array(z.string())
}).transform(o => ({
    description: o.description,
    end: o.end,
    event: o.event,
    senderName: o.sender_name,
    start: o.start,
    tags: o.tags
}));

const CurrentWeatherDetailsSchema = z.object({
    clouds: z.number(),
    dew_point: z.number(),
    dt: z.number().transform(v => new Date(v * 1000)),
    feels_like: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    rain: hourlyDownpourWeatherDetailsSchema.optional(),
    snow: hourlyDownpourWeatherDetailsSchema.optional(),
    sunrise: z.number().transform(v => new Date(v * 1000)).optional(),
    sunset: z.number().transform(v => new Date(v * 1000)).optional(),
    temp: z.number(),
    uvi: z.number(),
    visibility: z.number(),
    weather: z.array(weatherDetailsSchema),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    wind_speed: z.number()
}).transform(o => ({
    clouds: o.clouds,
    dewPoint: o.dew_point,
    dt: o.dt,
    feelsLike: o.feels_like,
    humidity: o.humidity,
    pressure: o.pressure,
    rain: o.rain,
    snow: o.snow,
    sunrise: o.sunrise,
    sunset: o.sunset,
    temp: o.temp,
    uvi: o.uvi,
    visibility: o.visibility,
    weather: o.weather,
    windDeg: o.wind_deg,
    windGust: o.wind_gust,
    windSpeed: o.wind_speed
}));

export const oneCallWeatherDetailsSchema = z.object({
    alerts: z.array(weatherAlertSchema).optional(),
    current: CurrentWeatherDetailsSchema.optional(),
    daily: z.array(dailyWeatherDetailsSchema).optional(),
    hourly: z.array(hourlyWeatherDetailsSchema).optional(),
    lat: z.number(),
    lon: z.number(),
    minutely: z.array(minutelyWeatherDetailsShema).optional(),
    timezone: z.string(),
    timezone_offset: z.number()
}).transform(o => ({
    alerts: o.alerts,
    current: o.current,
    daily: o.daily,
    hourly: o.hourly,
    lat: o.lat,
    lon: o.lon,
    minutely: o.minutely,
    timezone: o.timezone,
    timezoneOffset: o.timezone_offset
}));
