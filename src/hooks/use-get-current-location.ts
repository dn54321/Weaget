import { FetchError } from "@errors/fetch-error";
import type IpinfoGeocode from "@features/ipinfo-current-location/current-location.model";
import type { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@utils/query-client";
import { useQuery } from "@tanstack/react-query";
import weagetCurrentLocationSchema from "@features/weaget/current-location/current-location.schema";

async function fetchCurrentLocationByIp() {
    const url = `/api/location`;
    return await fetch(url)
        .then(async (data) => {
            const result = await data.clone().json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weagetCurrentLocationSchema.parse(data));
}

export function useGetCurrentLocationByIp() {
    return useQuery<IpinfoGeocode>({
        queryFn: () => fetchCurrentLocationByIp(),
        queryKey: ["current-location"],
        retry: 0,
    });
}

export async function queryCurrentLocationByIp(client: QueryClient = queryClient) {
    return await client.ensureQueryData<IpinfoGeocode>({
        queryFn: () => fetchCurrentLocationByIp(),
        queryKey: [],
    });
}
