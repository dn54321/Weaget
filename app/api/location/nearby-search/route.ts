import { NextRequest } from "next/server";
import { getNearbyLocationDetails } from "@services/geolocation.service";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";
import { coordsSchema } from "@features/weaget/coords.schema";

// Generates a list of autocomplete queries given a string
export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const { lat, lng } = coordsSchema.parse(queryParams);
        const locations = await getNearbyLocationDetails(lat, lng);
        const formattedLocations = locations.geonames.map(location => ({
            name: location.name,
            state: location.adminCodes1?.ISO3166_2 ?? "",
            country: location.countryName,
        }));
        return Response.json(formattedLocations);
    }
    catch (err) {
        if (err instanceof Error) {
            return handleNextResponseError(err, "Failed to retrieve nearby locations.");
        }
    }
}
