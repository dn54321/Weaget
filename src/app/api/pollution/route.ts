import PollutionSchema from "@src/apis/apicn/pollution/pollution.schema";
import { coordsSchema } from "@src/apis/coords.schema";
import { getPollutionByCoord } from "@src/features/pollution.service";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const { lat, lng } = coordsSchema.parse(queryParams);
        const pollutionData = await getPollutionByCoord(lat, lng);
        const response = PollutionSchema.parse(pollutionData);
        return Response.json(response);
    }
    catch (err) {
        return handleNextResponseError(err as Error, "Failed to retrieve pollution data.");
    }
}
