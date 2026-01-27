import { coordsSchema } from "@src/apis/coords.schema";
import { getNearbyLocationDetails } from "@src/features/geolocation.service";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";
import { NextRequest } from "next/server";

// Generates a list of autocomplete queries given a string
export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const { lat, lng } = coordsSchema.parse(queryParams);
        const locations = await getNearbyLocationDetails(lat, lng, queryParams.lang);
        const formattedLocations = locations.geonames.map(location => ({
            country: location.countryName,
            name: location.name,
            state: location.adminCodes1?.ISO3166_2 ?? ""
        }));
        return Response.json(formattedLocations);
    }
    catch (err) {
        return handleNextResponseError(err as Error, "Failed to retrieve nearby locations.");
    }
}
