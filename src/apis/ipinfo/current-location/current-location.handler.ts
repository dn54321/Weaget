import IpinfoGeocode from "./current-location.model";
import { ipinfoCurrentLocationSchema } from "./current-location.schema";

/**
 * Fetches geolocation information for a location specified by ip address and returns it as an instance of IpinfoGeocode model.
 * @param ip A string representing the ip address you want to search for.
 * @returns A promise that resolves to an instance of IpinfoGeocode.
 */
export async function getLocationDetailsByIp(ip: string, retry = true): Promise<IpinfoGeocode> {
    const URL_GET_LOCATION_BY_IP = (ipAddr: string) => `https://ipinfo.io/${ipAddr}?token=${process.env.IPINFO_APIKEY}`;
    const ipinfoLocationLookupUrl = URL_GET_LOCATION_BY_IP(ip);
    const response = await fetch(ipinfoLocationLookupUrl, { next: { revalidate: IP_LOOKUP_CACHE_SECONDS } });

    if (!response.ok) {
        throw new Error(`[Location Service] Could not fetch location data. (ip: '${ip}')`);
    }

    const data = await response.json();

    // Local development
    if (data.bogon && retry) {
        return await getLocationDetailsByIp("", false);
    }

    const payload = ipinfoCurrentLocationSchema.parse(data);
    return payload;
}
