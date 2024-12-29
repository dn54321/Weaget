import { QueryClient, useQuery } from "@tanstack/react-query";
import { FetchError } from "@errors/fetch-error";
import IpinfoGeocode from "@features/ipinfo-current-location/current-location.model";
import { queryClient } from "@utils/query-client";
import weagetCurrentLocationSchema from "@features/weaget/current-location/current-location.schema";

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
        queryFn: () => fetchCurrentLocation(),
        queryKey: ["current-location"],
        retry: 0,
    });
}

export async function queryCurrentLocation(client: QueryClient = queryClient) {
    return await client.ensureQueryData<IpinfoGeocode>({
        queryFn: () => fetchCurrentLocation(),
        queryKey: [],
    });
}
