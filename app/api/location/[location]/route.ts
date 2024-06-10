import { NextApiRequest } from "next";
import { getLocationDetails } from "@services/geolocation.service";
import { instanceToPlain } from "class-transformer";

export async function GET(
    req: NextApiRequest, 
    { params }: { params: { location: string } }
) {
    const queryParams = new URL(`${req.url}`).searchParams;
    const region = queryParams.get("region") || undefined;
    
    try {
        const data = await getLocationDetails(params.location, region);

        if (data.status === "ZERO_RESULTS") {
            return Response.json({
                id: crypto.randomUUID(), 
                message: "No results found",
                data: {
                    location: params.location,
                    region: region
                }
            }, {status: 404 });
        }

        const response = instanceToPlain(data)
        return Response.json(response);
    }
    catch(err) {
        console.error(err);
        const errorId = crypto.randomUUID();
        const errorMessage = `Failed to retrieve location data.)`;
        return Response.json({
            id: errorId, 
            message: errorMessage,
            data: {
                location: params.location,
                region: region
            }
        }, {status: 500 });
    }
}