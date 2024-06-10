import { useQuery } from "@tanstack/react-query";
import { GoogleGeocode } from "../types/models/google/geocode.model";
import { plainToInstance } from "class-transformer";
import { GoogleGeocodeDto } from "../types/dtos/google/geocode.dto";
import { queryClient } from "../../pages/_app";
import { FetchError } from "../errors/FetchError";

async function fetchLocation(location?: string, region?: string) {
    const url = `/api/location/${location}`;
    const queryParams = new URLSearchParams({...(region && {region})});
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => plainToInstance(GoogleGeocodeDto, data, { enableImplicitConversion: true, groups: ['client'] }))
}

export function useGetLocation(location?: string, region?: string) {
    return useQuery<GoogleGeocode>({
        queryKey: ['location', location, {region}], 
        queryFn: () => fetchLocation(location, region),
        staleTime: Infinity,
        enabled: !!location
    });
}

export async function queryLocation(location?: string, region?: string): Promise<GoogleGeocode> {
    return await queryClient.ensureQueryData<GoogleGeocode>({
        queryKey: ['location', location, {region}], 
        queryFn: () => fetchLocation(location, region),
    });
}