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
        const location = params.location;
        const weatherData = await getWeatherByRegion(location, region);
        return Response.json(weatherData);
    }
    catch (err) {
        return handleNextResponseError(err, 'Failed to retrieve weather.');
    }
}