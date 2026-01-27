import { CacheDuration } from "@src/apis/api.types";

import { GoogleGeocode } from "./location-lookup.model";
import googleLocationLookupSchema from "./location-lookup.schema";

// API ENDPOINTS
const URL_GET_LOCATION = (loc: string, region?: string, lang?: string) => `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&language=${lang}&key=${process.env.GOOGLE_APIKEY}${region ? "&region=" + region : ""}`;

/**
 * Fetches geolocation information for a location specified by region and returns it as an instance of GoogleGeocode model.
 * @param location A string representing the location you want to search for.
 * @param region An optional string representing a specific country or administrative region to narrow down your search.
 * @param lang An optional string specifying the language you want to use in the response.
 * @returns A promise that resolves to an instance of OneCallWeatherDetails.
 */
export async function getLocationDetails(location: string, region?: string, lang?: string): Promise<GoogleGeocode> {
    const googleLocationLookupUrl = URL_GET_LOCATION(location, region, lang);
    const response = await fetch(googleLocationLookupUrl, { next: { revalidate: CacheDuration.DAILY } });

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location data. (loc: ${location}, reg: ${region}, lang: ${lang})`);
    }

    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
        throw new Error("[Location Service] Could not fetch location data. Invalid Google Geocode API key.");
    }

    return googleLocationLookupSchema.parse(data);
}
