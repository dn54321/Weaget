import { useQuery } from "@tanstack/react-query";
import { FetchError } from "../errors/FetchError";
import IpinfoGeocode from "../types/models/ipinfo/geocode.model";
import { queryClient } from "../utils/queryClient";
import weagetCurrentLocationSchema from "../schemas/currentLocation.schema";

async function fetchCurrentLocation() {
    const url = `/api/location`;
    return await fetch(url)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weagetCurrentLocationSchema.parse(data));
}

export function useGetCurrentLocation() {
    return useQuery<IpinfoGeocode>({
        queryKey: ['current-location'], 
        queryFn: () => fetchCurrentLocation(),
        retry: 0,
    });
}

export async function queryCurrentLocation(): Promise<IpinfoGeocode> {
    return await queryClient.ensureQueryData<IpinfoGeocode>({         
        queryKey: [], 
        queryFn: () => fetchCurrentLocation()
    });
}