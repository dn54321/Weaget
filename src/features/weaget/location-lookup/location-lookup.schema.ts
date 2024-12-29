import { z } from "zod";

const addressComponentSchema = z.object({
    longName: z.string(),
    shortName: z.string(),
    types: z.array(z.string()),
});

const plusCodeSchema = z.object({
    compoundCode: z.string(),
    globalCode: z.string(),
});

const coordsSchema = z.object({
    lat: z.number(),
    lng: z.number(),
});

const boundsSchema = z.object({
    northeast: coordsSchema,
    southwest: coordsSchema,
});

const geometryCoordinatesSchema = z.object({
    bounds: boundsSchema.optional(),
    location: coordsSchema,
    locationType: z.string(),
    viewport: boundsSchema,
});

const loationLookupResultSchema = z.object({
    addressComponents: z.array(addressComponentSchema),
    formattedAddress: z.string(),
    geometry: geometryCoordinatesSchema,
    partialMatch: z.boolean().optional(),
    placeId: z.string(),
    plusCode: plusCodeSchema.optional(),
    types: z.array(z.string()),
});

export const locationLookupSchema = z.object({
    results: z.array(loationLookupResultSchema),
    status: z.string(),
});

export default locationLookupSchema;
