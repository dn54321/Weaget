import { NextRequest } from "next/server";
import { getLocationAutocompleteSuggestions } from "@services/geolocation.service";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";
import { googleLocationSuggestionInputSchema } from "@features/google-geocode/location-auto-complete.schema";

// Generates a list of autocomplete queries given a string
export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const { input, ...params } = googleLocationSuggestionInputSchema.parse(queryParams);
        const suggestions = await getLocationAutocompleteSuggestions(input, params);
        const formattedSuggestions = suggestions.predictions.map(prediction => ({
            main: prediction.structuredFormatting.mainText,
            secondary: prediction.structuredFormatting.secondaryText,
        }));
        return Response.json(formattedSuggestions);
    }
    catch (err) {
        return handleNextResponseError(err, "Failed to retrieve location suggestion.");
    }
}
