import { z } from "zod";

export const weagetAutoCompleteSchema = z.array(z.object({
    main: z.string(),
    secondary: z.string(),
}));
