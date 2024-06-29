import { getLocationDetails } from "@services/geolocation.service";
import { NextRequest } from "next/server";
import { createNextResponseError, handleNextResponseError } from "@utils/next-request-helper";

export async function GET(
    req: NextRequest,
    { params }: { params: { location: string } }
) {
    const queryParams = new URL(`${req.url}`).searchParams;
    const region = queryParams.get("region") || undefined;

    try {
        const data = await getLocationDetails(params.location, region);
        if (data.status === "ZERO_RESULTS") {
            return createNextResponseError("No results found", 404);
        }

        return Response.json(data);
    }
    catch (err) {
        return handleNextResponseError(err, "Failed to retrieve location data.");
    }
}
