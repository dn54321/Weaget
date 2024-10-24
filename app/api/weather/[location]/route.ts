import { getWeatherByRegion } from "@services/weather.service";
import { NextRequest } from "next/server";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";

interface PageProps {
    params: Promise<{
        location: string;
    }>;
}

export async function GET(
    req: NextRequest,
    props: PageProps
) {
    try {
        const queryParams = extractQueryParams(`${req.url}`);
        const region = queryParams.region;
        const lang = queryParams.lang;
        const params = await props.params;
        const weatherData = await getWeatherByRegion(params.location, region, lang);
        return Response.json(weatherData);
    }
    catch (err) {
        if (err instanceof Error) {
            return handleNextResponseError(err, "Failed to retrieve weather.");
        }
    }
}
