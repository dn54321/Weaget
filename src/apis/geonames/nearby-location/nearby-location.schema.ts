import { z } from "zod";

const adminCodeSchema = z.object({
    ISO3166_2: z.string().optional()
});

export const geonamesNearbyLocationResultSchema = z.object({
    adminCode1: z.string(),
    adminCodes1: adminCodeSchema.optional(),
    adminName1: z.string(),
    countryCode: z.string(),
    countryId: z.coerce.number(),
    countryName: z.string(),
    distance: z.coerce.number(),
    fcl: z.string(),
    fclName: z.string(),
    fcode: z.string(),
    fcodeName: z.string(),
    geonameId: z.number(),
    lat: z.coerce.string(),
    lng: z.coerce.number(),
    name: z.string(),
    population: z.number(),
    toponymName: z.string()
});

export const geonamesNearbyLocationSchema = z.object({
    geonames: z.array(geonamesNearbyLocationResultSchema)
});

export default geonamesNearbyLocationSchema;
