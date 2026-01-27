import { RestApiBuilder } from "@services/rest/services/rest-api.builder";
import { RestRecipeDirector } from "@services/rest/services/rest-api.director";
import { LocationSuggestionOptional } from "@src/apis/weaget/nearby-location/nearby-location.types";

import GoogleLocationSuggestion from "./location-auto-complete.model";

// API ENDPOINTS
const URL_GET_LOCATION_SUGGESTIONS = (input: string, optionalParameters: Partial<LocationSuggestionOptional>) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_APIKEY}&${new URLSearchParams({ input, ...optionalParameters })}`;

/**
 * Fetches location suggestions from Google Places API based on a given input string.
 * @param input A string representing the search query for location suggestions.
 * @param optionalParameters An object containing optional parameters to customize the results.
 * @returns A promise that resolves to an instance of GoogleLocationSuggestion.
 */
export async function getLocationAutocompleteSuggestions(
    input: string,
    optionalParameters: Partial<LocationSuggestionOptional> = {}
): Promise<GoogleLocationSuggestion> {
    // const queryParameters = {
    //     ...optionalParameters,
    //     radius: 500,
    //     types: "(cities)",
    // };

    // const locationSuggestionUrl = URL_GET_LOCATION_SUGGESTIONS(input, queryParameters);
    // const response = await fetch(locationSuggestionUrl, { next: { revalidate: CacheDuration.DAILY } });

    // if (!response.ok) {
    //     throw new Error(`[Location Service] Could not fetch location suggestions.  (input: '${input}')`);
    // }

    // const data = await response.json();
    // return googleLocationAutoCompleteSchema.parse(data);
    const builder = new RestApiBuilder();
    const director = new RestRecipeDirector();
    const recipe = director.make(builder, key);
}
