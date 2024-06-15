import { useQuery } from "@tanstack/react-query";
import { NearbyLocation } from "../types/geolocation.types";
import { FetchError } from "../errors/FetchError";
import { weagetNearbyLocationSchema } from "../schemas/nearbyLocation.schema";

async function fetchNearbyLocations(lat?: number, lng?: number) {
    const url = `/api/location/nearby-search`;
    const queryParams = new URLSearchParams({
        lat: `${lat}`,
        lng: `${lng}`
    });
    const data = await fetch(`${url}?${queryParams}`)        
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        });

   return weagetNearbyLocationSchema.parse(data);
}

export function useGetLocationNearbySearch(lat?: number, lng?: number) {
    return useQuery<Array<NearbyLocation>>({
        queryKey: ['location-nearby-search', lat, lng], 
        queryFn: () => fetchNearbyLocations(lat, lng),
        enabled: Boolean(lat && lng),
        staleTime: Infinity,
        retry: 0,
    });
}