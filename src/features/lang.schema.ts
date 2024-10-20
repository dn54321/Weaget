import { z } from "zod";

export const langSchema = z.object({
    lang: z.preprocess(val => val == undefined ? undefined : String(val), z.string().optional()),
});
