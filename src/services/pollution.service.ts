import ApicnPollutionModel from "../types/models/apicn/pollution.model";

// API ENDPOINTS
const URL_GET_POLLUTION = (lat: number, lng: number) => `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${process.env.POLLUTION_APIKEY}`;

// CONFIGURATIONS
const POLLUTION_CACHE_SECONDS = 30*60;

export async function getPollutionByCoord(lat: number, lng: number): Promise<ApicnPollutionModel> {
    const pollutionUrl = URL_GET_POLLUTION(lat, lng);
    const response = await fetch(pollutionUrl, { next: {revalidate: POLLUTION_CACHE_SECONDS }});

    if (!response.ok) {
        throw new Error(`[Pollution Service] Could not fetch pollution. (lat: ${lat}, lon: ${lng})`);
    }

    const data = await response.json();
    return data;
}