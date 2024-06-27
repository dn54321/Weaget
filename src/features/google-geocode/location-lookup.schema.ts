import { z } from "zod";

const addressComponentSchema = z.object({
    long_name: z.string(),
    short_name: z.string(),
    types: z.array(z.string())
}).transform(o => ({
    longName: o.long_name, 
    shortName: o.short_name, 
    types: o.types
}));

const plusCodeSchema = z.object({
    compound_code: z.string(),
    global_code: z.string()
}).transform(o => ({
    compoundCode: o.compound_code, 
    globalCode: o.global_code
}));

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
    location_type: z.string(),
    viewport: boundsSchema,
    bounds: boundsSchema.optional()
}).transform(o => ({
    location: o.location, 
    locationType: o.location_type, 
    viewport: o.viewport, 
    bounds: o.bounds
}));

const googleGeocodeResultSchema = z.object({
    address_components: z.array(addressComponentSchema),
    formatted_address: z.string(),
    geometry: geometryCoordinatesSchema,
    place_id: z.string(),
    plus_code: plusCodeSchema.optional(),
    partial_match: z.boolean().optional(),
    types: z.array(z.string())
}).transform(o => ({
    addressComponents: o.address_components, 
    formattedAddress: o.formatted_address, 
    geometry: o.geometry, 
    placeId: o.place_id, 
    plusCode: o.plus_code,
    partialMatch: o.partial_match,
    types: o.types,
}));

export const googleLocationLookupSchema = z.object({
    results: z.array(googleGeocodeResultSchema),
    status: z.string()
});

export default googleLocationLookupSchema;