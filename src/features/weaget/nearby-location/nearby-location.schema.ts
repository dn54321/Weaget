import { z } from "zod";

export const nearbyLocationSchema = z.array(z.object({
    name: z.string(),
    state: z.string(),
    country: z.string(),
}));
