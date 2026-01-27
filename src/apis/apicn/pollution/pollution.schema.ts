import { z } from "zod";

const timeSchema = z.object({
    iso: z.string(),
    s: z.string(),
    tz: z.string(),
    v: z.number()
});

const debugSchema = z.object({
    sync: z.coerce.date()
});

const volumeSchema = z.object({
    v: z.number()
});

const attributionSchema = z.object({
    name: z.string(),
    url: z.string()
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
    wg: volumeSchema.optional()
});

const dailyPollutantReportSchema = z.object({
    avg: z.number(),
    day: z.string(),
    max: z.number(),
    min: z.number()
});

const dailySchema = z.object({
    o3: z.array(dailyPollutantReportSchema).optional(),
    pm10: z.array(dailyPollutantReportSchema).optional(),
    pm25: z.array(dailyPollutantReportSchema).optional(),
    uvi: z.array(dailyPollutantReportSchema).optional()
});

const forecastSchema = z.object({
    daily: dailySchema
});

const citySchema = z.object({
    geo: z.array(z.number()),
    location: z.string(),
    name: z.string(),
    url: z.string()
});

export const apicnPollutionSchemaData = z.object({
    aqi: z.number(),
    attributions: z.array(attributionSchema),
    city: citySchema,
    debug: debugSchema,
    dominentpol: z.string(),
    forecast: forecastSchema,
    iaqi: iaqiSchema,
    idx: z.number(),
    time: timeSchema
});

export const PollutionSchema = z.object({
    data: apicnPollutionSchemaData,
    message: z.string().optional(),
    status: z.string()
});

export default PollutionSchema;
