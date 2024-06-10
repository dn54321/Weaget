import { getLocationDetailsByIp } from "@services/geolocation.service";
import { instanceToPlain } from "class-transformer";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import requestIp from "request-ip";

export async function GET(req: NextRequest) {
    // Note - it's possible to spoof this header.
    // But we aren't using this function for anything sensitive, so we don't care.
    let ip = req.headers.get('x-forwarded-for');
    
    if (!ip) {
        return Response.json({error: "Failed to retrieve IP address."}, {status: 500 });
    }

    if (ip.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", ""); 
    }
    
    try {
        const data = await getLocationDetailsByIp(ip);
        const response = instanceToPlain(data);
        return Response.json(response);
    }
    catch(err) {
        console.error(err);
        const errorId = crypto.randomUUID();
        const errorMessage = `Failed to retrieve location data.`;
        return Response.json({id: errorId, message: errorMessage}, {status: 500 });
    }
}