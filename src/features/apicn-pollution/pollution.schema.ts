import { z } from "zod";

const timeSchema = z.object({
    s: z.string(),
    tz: z.string(),
    v: z.number(),
    iso: z.string(),
});

const debugSchema = z.object({
    sync: z.coerce.date(),
});

const volumeSchema = z.object({
    v: z.number(),
});

const attributionSchema = z.object({
    url: z.string(),
    name: z.string(),
});

const iaqiSchema = z.object({
    co: volumeSchema.optional(),
    h: volumeSchema.optional(),
    neph: volumeSchema.optional(),
    no2: volumeSchema.optional(),
    o3: volumeSchema.optional(),
    p: volumeSchema.optional(),
    pm10: volumeSchema.optional(),
    pm25: volumeSchema.optional(),
    so2: volumeSchema.optional(),
    t: volumeSchema.optional(),
    w: volumeSchema.optional(),
    wg: volumeSchema.optional(),
});

const dailyPollutantReportSchema = z.object({
    avg: z.number(),
    day: z.string(),
    max: z.number(),
    min: z.number(),
});

const dailySchema = z.object({
    o3: z.array(dailyPollutantReportSchema).optional(),
    pm10: z.array(dailyPollutantReportSchema).optional(),
    pm25: z.array(dailyPollutantReportSchema).optional(),
    uvi: z.array(dailyPollutantReportSchema).optional(),
});

const forecastSchema = z.object({
    daily: dailySchema,
});

const citySchema = z.object({
    geo: z.array(z.number()),
    name: z.string(),
    url: z.string(),
    location: z.string(),
});

export const apicnPollutionSchemaResult = z.object({
    aqi: z.number(),
    idx: z.number(),
    attributions: z.array(attributionSchema),
    city: citySchema,
    dominentpol: z.string(),
    iaqi: iaqiSchema,
    time: timeSchema,
    forecast: forecastSchema,
    debug: debugSchema,
});

export const apicnPollutionSchema = z.object({
    status: z.string(),
    data: apicnPollutionSchemaResult,
    message: z.string().optional(),
});

export default apicnPollutionSchema;
