import { NextRequest } from "next/server";
import { getNearbyLocationDetails } from "../../../../src/services/geolocation.service";
import { extractQueryParams } from "../../../../src/utils/url";
import { coordsSchema } from '../../../../src/schemas/coords.schema';

// Generates a list of autocomplete queries given a string
export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const {lat, lng} = coordsSchema.parse(queryParams);
        const locations = await getNearbyLocationDetails(lat, lng);
        const formattedLocations = locations.geonames.map(location => ({
            name: location.name,
            state: location.adminCodes1.ISO3166_2,
            country: location.countryName
        }));
        return Response.json(formattedLocations);
    }
    catch (err) {
        console.error(err);
        const errorId = crypto.randomUUID();
        const errorMessage = `Failed to retrieve nearby locations.`;
        return Response.json({id: errorId, message: errorMessage}, {status: 500 });
    }
}