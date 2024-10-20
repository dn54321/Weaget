import { getWeatherByRegion } from "@services/weather.service";
import { NextRequest } from "next/server";
import { extractQueryParams, handleNextResponseError } from "@utils/next-request-helper";

export async function GET(
    req: NextRequest,
    { params }: { params: { location: string } }
) {
    try {
        const queryParams = extractQueryParams(`${req.url}`);
        const region = queryParams.region;
        const lang = queryParams.lang;
        const location = params.location;
        const weatherData = await getWeatherByRegion(location, region, lang);
        return Response.json(weatherData);
    }
    catch (err) {
        if (err instanceof Error) {
            return handleNextResponseError(err, "Failed to retrieve weather.");
        }
    }
}
