import { z } from "zod";

const matchedSubStringSchema = z.object({
    length: z.number(),
    offset: z.number()
});

const structuredFormattingSchema = z.object({
    main_text: z.string(),
    main_text_matched_substrings: z.array(matchedSubStringSchema),
    secondary_text: z.string(),
}).transform((o) => ({
    mainText: o.main_text,
    mainTextMatchedSubstrings: o.main_text_matched_substrings,
    secondaryText: o.secondary_text
}));

const termSchema = z.object({
    offset: z.number(),
    value: z.string(),
});

const googleLocationSuggestionResultSchema = z.object({
    description: z.string(),
    matched_substrings: z.array(matchedSubStringSchema),
    place_id: z.string(),
    reference: z.string(),
    structured_formatting: structuredFormattingSchema,
    terms: z.array(termSchema),
    types: z.array(z.string()),
}).transform((o) => ({
    description: o.description,
    matchedSubstrings: o.matched_substrings,
    placeId: o.place_id,
    reference: o.reference,
    structuredFormatting: o.structured_formatting,
    terms: o.terms,
    types: o.types
}));



export const googleLocationSuggestionInputSchema = z.object({
    input: z.string(),
    location: z.string().optional(),
    sessiontoken: z.string(),
});

export const googleLocationSuggestionSchema = z.object({
    predictions: z.array(googleLocationSuggestionResultSchema)
});
