import { z } from "zod";

const addressComponentSchema = z.object({
    longName: z.string(),
    shortName: z.string(),
    types: z.array(z.string())
});

const plusCodeSchema = z.object({
    compoundCode: z.string(),
    globalCode: z.string()
});

const coordsSchema = z.object({
    lat: z.number(),
    lng: z.number()
});

const boundsSchema = z.object({
    northeast: coordsSchema,
    southwest: coordsSchema
});

const geometryCoordinatesSchema = z.object({
    location: coordsSchema,
    locationType: z.string(),
    viewport: boundsSchema,
    bounds: boundsSchema.optional()
});

const weagetLoationQueryResultSchema = z.object({
    addressComponents: z.array(addressComponentSchema),
    formattedAddress: z.string(),
    geometry: geometryCoordinatesSchema,
    placeId: z.string(),
    plusCode: plusCodeSchema.optional(),
    partialMatch: z.boolean().optional(),
    types: z.array(z.string())
});

export const weagetLocationQuerySchema = z.object({
    results: z.array(weagetLoationQueryResultSchema),
    status: z.string()
})

export default weagetLocationQuerySchema;