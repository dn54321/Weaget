import { z } from "zod";

export const coordsSchema = z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number()
});
