import { getWeatherByRegion } from "@services/weather.service";
import { NextRequest } from "next/server";
import { extractQueryParams } from "@src/utils/url";

export async function GET(
    req: NextRequest, 
    { params }: { params: { location: string } }
) {
    const queryParams = extractQueryParams(`${req.url}`);
    const region = queryParams.region;
    const location = params.location;
    if (typeof(location) !== "string") {
        return Response.json({error: "Invalid Request"}, {status: 400});
    }

    try {
        const weatherData = await getWeatherByRegion(location, region);
        return Response.json(weatherData);
    }
    catch (err) {
        console.error(err);
        const errorId = crypto.randomUUID();
        const errorMessage = `Failed to retrieve weather.`;
        return Response.json({
            id: errorId, 
            message: errorMessage,
            data: queryParams
        }, {status: 500 });
    }
}