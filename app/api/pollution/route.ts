import { plainToInstance } from "class-transformer";
import { NextRequest } from "next/server";
import { extractQueryParams } from "../../../src/utils/url";
import { CoordsDto } from "../../../src/types/dtos/google/geocode.dto";
import { getPollutionByCoord } from "../../../src/services/pollution.service";

export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const {lat, lng} = plainToInstance(CoordsDto, queryParams, {excludeExtraneousValues: true});
        const pollutionData = await getPollutionByCoord(lat, lng);
        return Response.json(pollutionData);
    }
    catch (err) {
        console.error(err);
        const errorId = crypto.randomUUID();
        const errorMessage = `Failed to retrieve pollution data.`;
        return Response.json({id: errorId, message: errorMessage}, {status: 500 });
    }
}