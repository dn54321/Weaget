import { getWeatherByRegion } from "@src/features/weather.service";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";
import { NextRequest } from "next/server";

interface PageProps {
    params: Promise<{
        location: string
    }>
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
        return handleNextResponseError(err as Error, "Failed to retrieve weather.");
    }
}
