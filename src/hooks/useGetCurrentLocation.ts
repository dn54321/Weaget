import { useQuery } from "@tanstack/react-query";
import IpinfoGeocode from "../types/models/ipinfo/geocode.model";
import IpinfoGeocodeDto from "../types/dtos/ipinfo/geocode.dto";
import { plainToInstance } from "class-transformer";
import { FetchError } from "../errors/FetchError";
import { queryClient } from "../utils/queryClient";

async function fetchCurrentLocation() {
    const url = `/api/location`;
    return await fetch(url)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => plainToInstance(IpinfoGeocodeDto, data, { enableImplicitConversion: true, groups: ['client'] }));
}

export function useGetCurrentLocation() {
    return useQuery<IpinfoGeocode>({
        queryKey: ['current-location'], 
        queryFn: () => fetchCurrentLocation()
    });
}

export async function queryCurrentLocation(): Promise<IpinfoGeocode> {
    return await queryClient.ensureQueryData<IpinfoGeocode>({         
        queryKey: [], 
        queryFn: () => fetchCurrentLocation()
    });
}