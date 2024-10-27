import { googleLocationLookupSchema } from "@features/google-geocode/location-lookup.schema";
import { googleLocationAutoCompleteSchema } from "@features/google-geocode/location-auto-complete.schema";
import { ipinfoCurrentLocationSchema } from "@features/ipinfo-current-location/current-location.schema";
import { LocationSuggestionOptional } from "@features/weaget/nearby-location/nearby-location.types";
import { GoogleGeocode } from "@features/google-geocode/location-lookup.model";
import IpinfoGeocode from "@features/ipinfo-current-location/current-location.model";
import GoogleLocationSuggestion from "@features/google-geocode/location-auto-complete.model";
import geonamesNearbyLocationSchema from "@features/geonames-nearby-search/nearby-location.schema";
import { GeonamesNearbyLocation } from "@features/geonames-nearby-search/nearby-location.types";

// API ENDPOINTS
const URL_GET_LOCATION = (loc: string, region?: string, lang?: string) => `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&language=${lang}&key=${process.env.GOOGLE_APIKEY}${region ? "&region=" + region : ""}`;
const URL_GET_LOCATION_BY_IP = (ipAddr: string) => `https://ipinfo.io/${ipAddr}?token=${process.env.IPINFO_APIKEY}`;
const URL_GET_NEARBY_LOCATION = (lat: number, lng: number, lang: string = "local") => `http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lng}&lang=${lang}&username=${process.env.GEONAMES_USERNAME}&maxRows=9&radius=300&featureCode=PPLX`;
const URL_GET_LOCATION_SUGGESTIONS = (input: string, optionalParameters: Partial<LocationSuggestionOptional>) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_APIKEY}&${new URLSearchParams({ input, ...optionalParameters })}`;

// CONFIGURATIONS
const LOCATION_LOOKUP_CACHE_SECONDS = 24 * 60 * 60; // 1 day
const IP_LOOKUP_CACHE_SECONDS = 60 * 30; // 30 mins

/**
 * Fetches geolocation information for a location specified by region and returns it as an instance of GoogleGeocode model.
 * @param location A string representing the location you want to search for.
 * @param region An optional string representing a specific country or administrative region to narrow down your search.
 * @param lang An optional string specifying the language you want to use in the response.
 * @returns A promise that resolves to an instance of OneCallWeatherDetails.
 */
export async function getLocationDetails(location: string, region?: string, lang?: string): Promise<GoogleGeocode> {
    const googleLocationLookupUrl = URL_GET_LOCATION(location, region, lang);
    const response = await fetch(googleLocationLookupUrl, { next: { revalidate: LOCATION_LOOKUP_CACHE_SECONDS } });

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location data. (loc: ${location}, reg: ${region}, lang: ${lang})`);
    }

    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
        throw new Error(`[Location Service] Could not fetch location data. Invalid Google Geocode API key.`);
    }

    return googleLocationLookupSchema.parse(data);
}

/**
 * Fetches geolocation information for a location specified by ip address and returns it as an instance of IpinfoGeocode model.
 * @param ip A string representing the ip address you want to search for.
 * @returns A promise that resolves to an instance of IpinfoGeocode.
 */
export async function getLocationDetailsByIp(ip: string, retry = true): Promise<IpinfoGeocode> {
    const ipinfoLocationLookupUrl = URL_GET_LOCATION_BY_IP(ip);
    const response = await fetch(ipinfoLocationLookupUrl, { next: { revalidate: IP_LOOKUP_CACHE_SECONDS } });

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location data. (ip: '${ip}')`);
    }

    let data = await response.json();

    // Local development
    if (data.bogon && retry) {
        return await getLocationDetailsByIp("", false);
    }

    const payload = ipinfoCurrentLocationSchema.parse(data);
    return payload;
}

/**
 * Fetches geolocation information for a location near specified coordinates and returns it as an instance of GeonamesGeocode model.
 * @param lat A number representing the latitude you want to search for nearby locations.
 * @param lng A number representing the longitude you want to search for nearby locations.
 * @param lang The language to use for the names of places.
 * @returns A promise that resolves to an instance of GeonamesGeocode.
 */
export async function getNearbyLocationDetails(
    lat: number,
    lng: number,
    lang: string = "local",
): Promise<GeonamesNearbyLocation> {
    const geonamesLocationLookupUrl = URL_GET_NEARBY_LOCATION(lat, lng, lang);
    const response = await fetch(geonamesLocationLookupUrl, {
        next: { revalidate: LOCATION_LOOKUP_CACHE_SECONDS },
    });

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch nearby location data.  (lat: '${lat}', lng: '${lng}', lang: '${lang}')`);
    }

    const data = await response.json();
    return geonamesNearbyLocationSchema.parse(data);
}

/**
 * Fetches location suggestions from Google Places API based on a given input string.
 * @param input A string representing the search query for location suggestions.
 * @param optionalParameters An object containing optional parameters to customize the results.
 * @returns A promise that resolves to an instance of GoogleLocationSuggestion.
 */
export async function getLocationAutocompleteSuggestions(
    input: string,
    optionalParameters: Partial<LocationSuggestionOptional> = {},
): Promise<GoogleLocationSuggestion> {
    const queryParameters = {
        ...optionalParameters,
        types: "(cities)",
        radius: 500,
    };

    const locationSuggestionUrl = URL_GET_LOCATION_SUGGESTIONS(input, queryParameters);
    const response = await fetch(locationSuggestionUrl, { next: { revalidate: LOCATION_LOOKUP_CACHE_SECONDS } });

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location suggestions.  (input: '${input}')`);
    }

    const data = await response.json();
    return googleLocationAutoCompleteSchema.parse(data);
}
