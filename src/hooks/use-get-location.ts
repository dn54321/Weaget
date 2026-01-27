import { FetchError } from "@errors/fetch-error";
import type { GoogleGeocode } from "@features/google-geocode/location-lookup.model";
import { locationLookupSchema } from "@features/weaget/location-lookup/location-lookup.schema";
import { queryClient } from "@utils/query-client";
import { useQuery } from "@tanstack/react-query";

async function fetchLocation(location?: string, region?: string, lang?: string) {
    const url = `/api/location/${location}`;
    const queryParams = new URLSearchParams({
        ...(region && { region }),
        ...(lang && { lang: lang }),
    });
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => locationLookupSchema.parse(data));
}

export function useGetLocation(location?: string, region?: string, lang?: string) {
    return useQuery<GoogleGeocode>({
        enabled: !!location,
        queryFn: () => fetchLocation(location, region, lang),
        queryKey: ["location", location, { lang, region }],
        retry: 0,
        staleTime: Infinity,
    });
}

export async function queryLocation(location?: string, region?: string, lang?: string): Promise<GoogleGeocode> {
    return await queryClient.ensureQueryData<GoogleGeocode>({
        queryFn: () => fetchLocation(location, region, lang),
        queryKey: ["location", location, { lang, region }],
        retry: 0,
    });
}
