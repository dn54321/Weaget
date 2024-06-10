import { plainToInstance } from "class-transformer";
import { NextApiRequest } from "next";
import { getNearbyLocationDetails } from "../../../../src/services/geolocation.service";
import { CoordsDto } from "../../../../src/types/dtos/google/geocode.dto";
import { extractQueryParams } from "../../../../src/utils/url";

// Generates a list of autocomplete queries given a string
export async function GET(req: NextApiRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const {lat, lng} = plainToInstance(CoordsDto, queryParams, {excludeExtraneousValues: true});
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