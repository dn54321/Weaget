import { useQuery } from "@tanstack/react-query";
import { FetchError } from "../errors/FetchError";
import { GoogleGeocode } from "../types/models/google/geocode.model";
import { queryClient } from "../utils/queryClient";
import { weagetLocationQuerySchema } from "../schemas/locationQuery.schema";

async function fetchLocation(location?: string, region?: string) {
    const url = `/api/location/${location}`;
    const queryParams = new URLSearchParams({...(region && {region})});
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weagetLocationQuerySchema.parse(data))
}

export function useGetLocation(location?: string, region?: string) {
    return useQuery<GoogleGeocode>({
        queryKey: ['location', location, {region}], 
        queryFn: () => fetchLocation(location, region),
        staleTime: Infinity,
        enabled: !!location,
        retry: 0,
    });
}

export async function queryLocation(location?: string, region?: string): Promise<GoogleGeocode> {
    return await queryClient.ensureQueryData<GoogleGeocode>({
        queryKey: ['location', location, {region}], 
        queryFn: () => fetchLocation(location, region),
        retry: 0,
    });
}