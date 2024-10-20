import { NextRequest } from "next/server";
import apicnPollutionSchema from "@features/apicn-pollution/pollution.schema";
import { coordsSchema } from "@features/coords.schema";
import { getPollutionByCoord } from "@services/pollution.service";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";

export async function GET(req: NextRequest) {
    const queryParams = extractQueryParams(`${req.url}`);

    try {
        const { lat, lng } = coordsSchema.parse(queryParams);
        const pollutionData = await getPollutionByCoord(lat, lng);
        const response = apicnPollutionSchema.parse(pollutionData);
        return Response.json(response);
    }
    catch (err) {
        if (err instanceof Error) {
            return handleNextResponseError(err, "Failed to retrieve pollution data.");
        }
    }
}
