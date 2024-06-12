import { z } from "zod";

export const ipinfoGeocodeSchema = z.object({
    ip: z.string(),
    hostname: z.string().optional(),
    city: z.string(),
    region: z.string(),
    country: z.string(),
    loc: z.string(),
    org: z.string(),
    postal: z.string(),
    timezone: z.string(),
    bogon: z.boolean().optional(),
}).transform((o) => ({
    ...o,
    lat: Number.parseFloat(o.loc.split(",")[0]),
    lng: Number.parseFloat(o.loc.split(",")[1]),
}));
