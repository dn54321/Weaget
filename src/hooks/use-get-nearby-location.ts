import { useQuery } from "@tanstack/react-query";
import { NearbyLocation } from "@features/weaget/nearby-location/nearby-location.types";
import { FetchError } from "@errors/fetch-error";
import { nearbyLocationSchema } from "@features/weaget/nearby-location/nearby-location.schema";

async function fetchNearbyLocations(lat?: number, lng?: number) {
    const url = `/api/location/nearby-search`;
    const queryParams = new URLSearchParams({
        lat: `${lat}`,
        lng: `${lng}`,
    });
    const data = await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        });

    return nearbyLocationSchema.parse(data);
}

export function useGetNearbyLocation(lat?: number, lng?: number) {
    return useQuery<Array<NearbyLocation>>({
        queryKey: ["location-nearby-search", lat, lng],
        queryFn: () => fetchNearbyLocations(lat, lng),
        enabled: Boolean(lat !== undefined && lng !== undefined),
        staleTime: Infinity,
        retry: 0,
    });
}
