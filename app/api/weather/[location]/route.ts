import { getWeatherByRegion } from "@services/weather.service";
import { NextApiRequest } from "next";
import { extractQueryParams } from "../../../../src/utils/url";
import { classToPlain, instanceToPlain } from "class-transformer";
import OneCallWeatherDetailsDto from "../../../../src/types/dtos/openWeather/openCall.dto";

export async function GET(
    req: NextApiRequest, 
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
        const response = instanceToPlain(weatherData);
        return Response.json(response);
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