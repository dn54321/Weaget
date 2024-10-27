import { getLocationDetails } from "@services/geolocation.service";
import { NextRequest } from "next/server";
import { createNextResponseError, handleNextResponseError } from "@utils/next-request-helper";

interface PageProps {
    params: Promise<{
        location: string;
    }>;
}

export async function GET(
    req: NextRequest,
    props: PageProps,
) {
    const queryParams = new URL(`${req.url}`).searchParams;
    const region = queryParams.get("region") || undefined;
    const lang = queryParams.get("lang") || undefined;
    const params = await props.params;
    try {
        const data = await getLocationDetails(params.location, region, lang);
        if (data.status === "ZERO_RESULTS") {
            return createNextResponseError("No results found", 404);
        }

        return Response.json(data);
    }
    catch (err) {
        if (err instanceof Error) {
            return handleNextResponseError(err, "Failed to retrieve location data.");
        }
    }
}
