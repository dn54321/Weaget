import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";
import type { NextRequest } from "next/server";
import apicnPollutionSchema from "@features/apicn-pollution/pollution.schema";
import { coordsSchema } from "@features/coords.schema";
import { getPollutionByCoord } from "@services/pollution.service";

export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const { lat, lng } = coordsSchema.parse(queryParams);
        const pollutionData = await getPollutionByCoord(lat, lng);
        const response = apicnPollutionSchema.parse(pollutionData);
        return Response.json(response);
    }
    catch (err) {
        return handleNextResponseError(err as Error, "Failed to retrieve pollution data.");
    }
}
