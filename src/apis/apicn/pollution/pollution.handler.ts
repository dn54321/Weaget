import { APICN_BASE_URL } from "@src/apis/apicn/config";

import PollutionSchema from "./pollution.schema";
import PollutionModel from "./pollution.types";

// API ENDPOINTS
export const URL_GET_POLLUTION = (lat: number, lng: number) => `${APICN_BASE_URL}/feed/geo:${lat};${lng}/?token=${process.env.POLLUTION_APIKEY}`;

export async function pollutionGet(lat: number, lng: number): Promise<PollutionModel> {
    const pollutionUrl = URL_GET_POLLUTION(lat, lng);

    // No caching allowed in API TOS.
    // https://aqicn.org/data-platform/token/#:~:text=usage%22%20policy%3A-,API%20Usage,-All%20the%20APIs.
    const response = await fetch(pollutionUrl, { cache: "no-store" });

    if (!response.ok) {
        throw new Error(`[APICN Pollution] Could not fetch pollution. (lat: ${lat}, lon: ${lng})`);
    }

    const data = await response.json();
    const pollutionModel = PollutionSchema.parse(data);

    return pollutionModel;
}
