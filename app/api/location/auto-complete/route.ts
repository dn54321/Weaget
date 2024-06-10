import { NextRequest } from "next/server";
import { extractQueryParams } from "@src/utils/url";
import { plainToInstance } from "class-transformer";
import { getLocationSuggestions } from "@src/services/geolocation.service";
import { GoogleLocationSuggestionQueryParamsDto } from "../../../../src/types/dtos/google/locationSuggestion.dto";

// Generates a list of autocomplete queries given a string
export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const {input, ...params} = plainToInstance(GoogleLocationSuggestionQueryParamsDto, queryParams, {excludeExtraneousValues: true});
        const suggestions = await getLocationSuggestions(input, params);
        const formattedSuggestions = suggestions.predictions.map(prediction => ({
            main: prediction.structuredFormatting.mainText,
            secondary: prediction.structuredFormatting.secondaryText
        }));
        return Response.json(formattedSuggestions);
    }
    catch (err) {
        console.error(err);
        const errorId = crypto.randomUUID();
        const errorMessage = `Failed to retrieve location suggestion.`;
        return Response.json({
            id: errorId, 
            message: errorMessage,
            data: queryParams
        }, {status: 500 });
    }
}