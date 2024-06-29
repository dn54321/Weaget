import { z } from "zod";

const adminCodeSchema = z.object({
    ISO3166_2: z.string().optional(),
});

export const geonamesNearbyLocationResultSchema = z.object({
    adminCode1: z.string(),
    lng: z.coerce.number(),
    distance: z.coerce.number(),
    geonameId: z.number(),
    toponymName: z.string(),
    countryId: z.coerce.number(),
    fcl: z.string(),
    population: z.number(),
    countryCode: z.string(),
    name: z.string(),
    fclName: z.string(),
    adminCodes1: adminCodeSchema.optional(),
    countryName: z.string(),
    fcodeName: z.string(),
    adminName1: z.string(),
    lat: z.coerce.string(),
    fcode: z.string(),
});

export const geonamesNearbyLocationSchema = z.object({
    geonames: z.array(geonamesNearbyLocationResultSchema),
});

export default geonamesNearbyLocationSchema;
