import { CacheDuration } from "@src/apis/api.types";
import { GEONAMES_BASE_URL } from "@src/apis/geonames/config";
import { revalidateTag } from "next/cache";

import geonamesNearbyLocationSchema from "./nearby-location.schema";
import { GeonamesNearbyLocation } from "./nearby-location.types";

// API ENDPOINTS
const URL_GET_NEARBY_LOCATION = (lat: number, lng: number, lang: string = "local") => `${GEONAMES_BASE_URL}/findNearbyJSON?lat=${lat}&lng=${lng}&lang=${lang}&username=${process.env.GEONAMES_USERNAME}&maxRows=9&radius=300&featureCode=PPLX`;

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
    lang: string = "local"
): Promise<GeonamesNearbyLocation> {
    const geonamesLocationLookupUrl = URL_GET_NEARBY_LOCATION(lat, lng, lang);
    const response = await fetch(geonamesLocationLookupUrl, {
        next: {
            revalidate: CacheDuration.DAILY,
            tags: ["api", "geonames::nearby-search"]
        }
    });

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch nearby location data.  (lat: '${lat}', lng: '${lng}', lang: '${lang}')`);
    }

    const data = await response.json();
    try {
        return geonamesNearbyLocationSchema.parse(data);
    }
    catch (err) {
        revalidateTag("geonames::nearby-search");
        throw err;
    }
}
