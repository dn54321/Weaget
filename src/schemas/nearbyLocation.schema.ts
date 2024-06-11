import { z } from "zod";

export const weagetNearbyLocationSchema = z.array(z.object({
    name: z.string(),
    state: z.string(),
    country: z.string(),
}));