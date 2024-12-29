import { z } from "zod";

export const nearbyLocationSchema = z.array(z.object({
    country: z.string(),
    name: z.string(),
    state: z.string(),
}));
