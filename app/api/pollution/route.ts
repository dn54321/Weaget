import { NextRequest } from "next/server";
import apicnPollutionSchema from "../../../src/features/apicn-pollution/pollution.schema";
import { coordsSchema } from '../../../src/features/weaget/coords.schema';
import { getPollutionByCoord } from "../../../src/services/pollution.service";
import { extractQueryParams, handleNextResponseError } from "../../../src/utils/next-request-helper";

export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const {lat, lng} = coordsSchema.parse(queryParams);
        const pollutionData = await getPollutionByCoord(lat, lng);
        const response = apicnPollutionSchema.parse(pollutionData);
        return Response.json(response);
    }
    catch (err) {
        return handleNextResponseError(err, 'Failed to retrieve pollution data.');
    }
}