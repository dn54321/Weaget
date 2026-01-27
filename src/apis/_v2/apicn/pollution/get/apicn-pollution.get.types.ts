import { z } from "zod";

const timeValidationSchema = z.object({
    iso: z.string(),
    s: z.string(),
    tz: z.string(),
    v: z.number()
});

const debugValidationSchema = z.object({
    sync: z.coerce.date()
});

const volumeValidationSchema = z.object({
    v: z.number()
});

const attributionValidationSchema = z.object({
    name: z.string(),
    url: z.string()
});

const iaqiValidationSchema = z.object({
    co: volumeValidationSchema.optional(),
    h: volumeValidationSchema.optional(),
    neph: volumeValidationSchema.optional(),
    no2: volumeValidationSchema.optional(),
    o3: volumeValidationSchema.optional(),
    p: volumeValidationSchema.optional(),
    pm10: volumeValidationSchema.optional(),
    pm25: volumeValidationSchema.optional(),
    so2: volumeValidationSchema.optional(),
    t: volumeValidationSchema.optional(),
    w: volumeValidationSchema.optional(),
    wg: volumeValidationSchema.optional()
});

const dailyPollutantReportValidationSchema = z.object({
    avg: z.number(),
    day: z.string(),
    max: z.number(),
    min: z.number()
});

const dailyValidationSchema = z.object({
    o3: z.array(dailyPollutantReportValidationSchema).optional(),
    pm10: z.array(dailyPollutantReportValidationSchema).optional(),
    pm25: z.array(dailyPollutantReportValidationSchema).optional(),
    uvi: z.array(dailyPollutantReportValidationSchema).optional()
});

const forecastValidationSchema = z.object({
    daily: dailyValidationSchema
});

const cityValidationSchema = z.object({
    geo: z.array(z.number()),
    location: z.string(),
    name: z.string(),
    url: z.string()
});

export const apicnPollutionValidationSchemaData = z.object({
    aqi: z.number(),
    attributions: z.array(attributionValidationSchema),
    city: cityValidationSchema,
    debug: debugValidationSchema,
    dominentpol: z.string(),
    forecast: forecastValidationSchema,
    iaqi: iaqiValidationSchema,
    idx: z.number(),
    time: timeValidationSchema
});

export const apicnPollutionGetValidationSchema = z.object({
    data: apicnPollutionValidationSchemaData,
    message: z.string().optional(),
    status: z.string()
});

export type ApicnPollutionGetModel = z.infer<typeof apicnPollutionGetValidationSchema>;

export type ApicnPollutionGetQueryParameter = {
    lat: number;
    lng: number;
};
export type ApicnPollutionModel = z.infer<typeof apicnPollutionValidationSchemaData>;
