import { z } from "zod";

export const ipinfoCurrentLocationSchema = z.object({
    bogon: z.boolean().optional(),
    city: z.string(),
    country: z.string(),
    hostname: z.string().optional(),
    ip: z.string(),
    loc: z.string(),
    org: z.string(),
    postal: z.string().optional(),
    region: z.string(),
    timezone: z.string()
}).transform(o => ({
    ...o,
    lat: Number.parseFloat(o.loc.split(",")[0]),
    lng: Number.parseFloat(o.loc.split(",")[1])
}));
