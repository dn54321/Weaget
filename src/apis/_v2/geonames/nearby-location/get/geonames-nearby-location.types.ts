import { z } from "zod";

const adminCodeValidationSchema = z.object({
    ISO3166_2: z.string().optional()
});

export const geonamesNearbyLocationGetValidationSchema = z.object({
    adminCode1: z.string(),
    adminCodes1: adminCodeValidationSchema.optional(),
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

export const geonamesNearbyLocationValidationSchema = z.object({
    geonames: z.array(geonamesNearbyLocationGetValidationSchema)
});


export type GeonamesAdminCodeModel = z.infer<typeof adminCodeValidationSchema>;

export type GeonamesNearbyLocationGetModel = z.infer<typeof geonamesNearbyLocationGetValidationSchema>;
export type GeonamesNearbyLocationModel = z.infer<typeof geonamesNearbyLocationValidationSchema>;
export interface GeonamesNearbyLocationQueryParameter {
    featureCode?: string;
    lat?: number;
    lng?: number;
    maxRows?: number;
    radius?: number;
    username: string;
}
