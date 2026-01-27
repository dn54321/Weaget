import { FetchError } from "@errors/fetch-error";
import { GoogleGeocode } from "@src/apis/google/location-lookup/location-lookup.model";
import { locationLookupSchema } from "@src/apis/weaget/location-lookup/location-lookup.schema";
import { Duration } from "@src/types/math.types";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/query-client";

export async function queryLocation(location?: string, region?: string, lang?: string): Promise<GoogleGeocode> {
    return await queryClient.ensureQueryData<GoogleGeocode>({
        queryFn: () => fetchLocation(location, region, lang),
        queryKey: ["location", location, { lang, region }],
        retry: 0
    });
}

export function useGetLocation(location?: string, region?: string, lang?: string) {
    return useQuery<GoogleGeocode>({
        enabled: !!location,
        queryFn: () => fetchLocation(location, region, lang),
        queryKey: ["location", location, { lang, region }],
        retry: 0,
        staleTime: Duration.HOURLY
    });
}

async function fetchLocation(location?: string, region?: string, lang?: string) {
    const url = `/api/location/${location}`;
    const queryParams = new URLSearchParams({
        ...(region && { region }),
        ...(lang && { lang: lang })
    });
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => locationLookupSchema.parse(data));
}
