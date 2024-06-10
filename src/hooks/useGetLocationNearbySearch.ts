import { useQuery } from "@tanstack/react-query";
import { NearbySearch } from "../types/geolocation.types";
import { plainToInstance } from "class-transformer";
import { FetchError } from "../errors/FetchError";

async function fetchNearbyLocations(lat?: number, lng?: number) {
    const url = `/api/location/nearby-search`;
    const queryParams = new URLSearchParams({
        lat: `${lat}`,
        lng: `${lng}`
    });
    return await fetch(`${url}?${queryParams}`)        
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        });
}

export function useGetLocationNearbySearch(lat?: number, lng?: number) {
    return useQuery<Array<NearbySearch>>({
        queryKey: ['location-nearby-search', lat, lng], 
        queryFn: () => fetchNearbyLocations(lat, lng),
        enabled: Boolean(lat && lng),
        staleTime: Infinity,
    });
}