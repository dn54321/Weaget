import { useQuery } from "@tanstack/react-query";
import { FetchError } from "@errors/fetch-error";
import { GoogleGeocode } from "@features/google-geocode/location-lookup.model";
import { queryClient } from "@utils/query-client";
import { locationLookupSchema } from "@features/weaget/location-lookup.schema";

async function fetchLocation(location?: string, region?: string) {
    const url = `/api/location/${location}`;
    const queryParams = new URLSearchParams({ ...(region && { region }) });
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => locationLookupSchema.parse(data));
}

export function useGetLocation(location?: string, region?: string) {
    return useQuery<GoogleGeocode>({
        queryKey: ["location", location, { region }],
        queryFn: () => fetchLocation(location, region),
        staleTime: Infinity,
        enabled: !!location,
        retry: 0,
    });
}

export async function queryLocation(location?: string, region?: string): Promise<GoogleGeocode> {
    return await queryClient.ensureQueryData<GoogleGeocode>({
        queryKey: ["location", location, { region }],
        queryFn: () => fetchLocation(location, region),
        retry: 0,
    });
}
