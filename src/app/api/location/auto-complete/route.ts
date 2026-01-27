import { googleLocationSuggestionInputSchema } from "@src/apis/google/location-autocomplete/location-auto-complete.schema";
import { getLocationAutocompleteSuggestions } from "@src/features/geolocation.service";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";
import { NextRequest } from "next/server";

// Generates a list of autocomplete queries given a string
export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const { input, ...params } = googleLocationSuggestionInputSchema.parse(queryParams);
        const suggestions = await getLocationAutocompleteSuggestions(input, params);
        const formattedSuggestions = suggestions.predictions.map(prediction => ({
            main: prediction.structuredFormatting.mainText,
            secondary: prediction.structuredFormatting.secondaryText
        }));
        return Response.json(formattedSuggestions);
    }
    catch (err) {
        return handleNextResponseError(err as Error, "Failed to retrieve location suggestion.");
    }
}
