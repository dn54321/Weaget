import { NextRequest } from "next/server";
import { coordsSchema } from '../../../src/schemas/coords.schema';
import { getPollutionByCoord } from "../../../src/services/pollution.service";
import { extractQueryParams } from "../../../src/utils/url";
import apicnPollutionSchema from "../../../src/schemas/apicn/pollution.schema";

export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const {lat, lng} = coordsSchema.parse(queryParams);
        const pollutionData = await getPollutionByCoord(lat, lng);
        const response = apicnPollutionSchema.parse(pollutionData);
        return Response.json(response);
    }
    catch (err) {
        console.error(err);
        const errorId = crypto.randomUUID();
        const errorMessage = `Failed to retrieve pollution data.`;
        return Response.json({id: errorId, message: errorMessage}, {status: 500 });
    }
}