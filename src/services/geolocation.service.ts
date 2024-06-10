import { plainToInstance } from "class-transformer";
import { GoogleGeocode } from "../types/models/google/geocode.model";
import { GoogleGeocodeDto } from "../types/dtos/google/geocode.dto";
import IpinfoGeocode from "../types/models/ipinfo/geocode.model";
import IpinfoGeocodeDto from "../types/dtos/ipinfo/geocode.dto";
import { GeonamesGeocode } from "../types/models/geonames/geocode.model";
import { GeonamesGeocodeDto } from "../types/dtos/geonames/geocode.dto";
import { LocationSuggestionOptional } from "../types/geolocation.types";
import GoogleLocationSuggestion from "../types/models/google/locationSuggestion.model";
import GoogleLocationSuggestionDto from "../types/dtos/google/locationSuggestion.dto";

// API ENDPOINTS
const URL_GET_LOCATION = (loc: string, region?: string) => `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${process.env.GOOGLE_APIKEY}${region ? "&region="+region : ""}`;
const URL_GET_LOCATION_BY_IP = (ipAddr: string) => `https://ipinfo.io/${ipAddr}?token=${process.env.IPINFO_APIKEY}`
const URL_GET_NEARBY_LOCATION = (lat: number, lng: number) => `http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lng}&username=${process.env.GEONAMES_USERNAME}&maxRows=9&radius=300&featureCode=PPLX`
const URL_GET_LOCATION_SUGGESTIONS = (input: string, optionalParameters: Partial<LocationSuggestionOptional>) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_APIKEY}&${new URLSearchParams({input,...optionalParameters})}`;

// CONFIGURATIONS
const LOCATION_LOOKUP_CACHE_SECONDS = 24*60*60; // 1 day
const IP_LOOKUP_CACHE_SECONDS = 60*30;          // 30 mins

/**
 * Fetches geolocation information for a location specified by region and returns it as an instance of GoogleGeocode model.
 * @param location A string representing the location you want to search for.
 * @param region An optional string representing a specific country or administrative region to narrow down your search.
 * @returns A promise that resolves to an instance of OneCallWeatherDetails.
 */
export async function getLocationDetails(location: string, region?: string): Promise<GoogleGeocode> {
    const googleLocationLookupUrl = URL_GET_LOCATION(location, region);
    const response = await fetch(googleLocationLookupUrl, { next: {revalidate: LOCATION_LOOKUP_CACHE_SECONDS }});

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location data. (loc: ${location}, reg: ${region})`);
    }

    const data = await response.json();

    if (data.status === "REQUEST_DENIED") {
        throw new Error(`[Location Service] Could not fetch location data. Invalid Google Geocode API key.`);
    }

    return plainToInstance(GoogleGeocodeDto, data, { enableImplicitConversion: true });
}

/**
 * Fetches geolocation information for a location specified by ip address and returns it as an instance of IpinfoGeocode model.
 * @param ip A string representing the ip address you want to search for.
 * @returns A promise that resolves to an instance of IpinfoGeocode.
 */
export async function getLocationDetailsByIp(ip: string): Promise<IpinfoGeocode> {
    const ipinfoLocationLookupUrl = URL_GET_LOCATION_BY_IP(ip);
    const response = await fetch(ipinfoLocationLookupUrl, { next: {revalidate: IP_LOOKUP_CACHE_SECONDS }});

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location data. (ip: '${ip}')`);
    }

    let data = await response.json();
    const payload = plainToInstance(IpinfoGeocodeDto, data, { enableImplicitConversion: true });

    // Local development
    if (payload.bogon === true) {
        return await getLocationDetailsByIp("");
    }

    return payload;
}

/**
 * Fetches geolocation information for a location near specified coordinates and returns it as an instance of GeonamesGeocode model.
 * @param lat A number representing the latitude you want to search for nearby locations.
 * @param lng A number representing the longitude you want to search for nearby locations.
 * @returns A promise that resolves to an instance of GeonamesGeocode.
 */
export async function getNearbyLocationDetails(lat: number, lng: number): Promise<GeonamesGeocode> {
    const geonamesLocationLookupUrl = URL_GET_NEARBY_LOCATION(lat, lng);
    const response = await fetch(geonamesLocationLookupUrl, { next: {revalidate: LOCATION_LOOKUP_CACHE_SECONDS }});

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch nearby location data.  (lat: '${lat}', lng: '${lng}')`);
    }

    const data = await response.json();
    return plainToInstance(GeonamesGeocodeDto, data, { enableImplicitConversion: true });
}


/**
 * Fetches location suggestions from Google Places API based on a given input string.
 * @param input A string representing the search query for location suggestions.
 * @param optionalParameters An object containing optional parameters to customize the results.
 * @returns A promise that resolves to an instance of GoogleLocationSuggestion.
 */
export async function getLocationSuggestions(
    input: string, 
    optionalParameters: Partial<LocationSuggestionOptional> = {}
): Promise<GoogleLocationSuggestion> {
    const queryParameters = {
        ...optionalParameters,
        types: "(cities)",
        radius: 500,
    }
    
    const locationSuggestionUrl = URL_GET_LOCATION_SUGGESTIONS(input, queryParameters);
    const response = await fetch(locationSuggestionUrl, { next: {revalidate: LOCATION_LOOKUP_CACHE_SECONDS }});

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location suggestions.  (input: '${input}')`);
    }

    const data = await response.json();
    return plainToInstance(GoogleLocationSuggestionDto, data, { enableImplicitConversion: true });
}