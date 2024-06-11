import ApicnPollutionModel from "../types/models/apicn/pollution.model";

// API ENDPOINTS
const URL_GET_POLLUTION = (lat: number, lng: number) => `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${process.env.POLLUTION_APIKEY}`;

// CONFIGURATIONS
const POLLUTION_CACHE_SECONDS = 30*60;

export async function getPollutionByCoord(lat: number, lng: number): Promise<ApicnPollutionModel> {
    const pollutionUrl = URL_GET_POLLUTION(lat, lng);
    
    // No caching allowed in API TOS.
    // https://aqicn.org/api/#:~:text=The%20data%20can%20not%20be%20redistributed%20as%20cached%20or%20archived%20data.
    const response = await fetch(pollutionUrl, {cache: 'no-store'});

    if (!response.ok) {
        throw new Error(`[Pollution Service] Could not fetch pollution. (lat: ${lat}, lon: ${lng})`);
    }

    const data = await response.json();
    return data;
}