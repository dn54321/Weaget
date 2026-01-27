import { FetchError } from "@errors/fetch-error";
import IpinfoGeocode from "@src/apis/ipinfo/current-location/current-location.model";
import weagetCurrentLocationSchema from "@src/apis/weaget/current-location/current-location.schema";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/query-client";

export async function queryCurrentLocation(client: QueryClient = queryClient) {
    return await client.ensureQueryData<IpinfoGeocode>({
        queryFn: () => fetchCurrentLocation(),
        queryKey: []
    });
}

export function useGetCurrentLocation() {
    return useQuery<IpinfoGeocode>({
        queryFn: () => fetchCurrentLocation(),
        queryKey: ["current-location"],
        retry: 0
    });
}

async function fetchCurrentLocation() {
    const url = "/api/location";
    return await fetch(url)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weagetCurrentLocationSchema.parse(data));
}
