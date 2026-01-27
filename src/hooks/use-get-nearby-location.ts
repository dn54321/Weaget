import { FetchError } from "@errors/fetch-error";
import { nearbyLocationSchema } from "@src/apis/weaget/nearby-location/nearby-location.schema";
import { NearbyLocation } from "@src/apis/weaget/nearby-location/nearby-location.types";
import { useQuery } from "@tanstack/react-query";

export function useGetNearbyLocation(lat?: number, lng?: number, lang?: string) {
    return useQuery<Array<NearbyLocation>>({
        enabled: Boolean(lat !== undefined && lng !== undefined),
        queryFn: () => fetchNearbyLocations(lat, lng, lang),
        queryKey: ["location-nearby-search", lat, lng, lang],
        retry: 0,
        staleTime: Infinity
    });
}

async function fetchNearbyLocations(lat?: number, lng?: number, lang: string = "local") {
    const url = "/api/location/nearby-search";
    const queryParams = new URLSearchParams({
        lang: `${lang}`,
        lat: `${lat}`,
        lng: `${lng}`
    });
    const data = await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        });

    return nearbyLocationSchema.parse(data);
}
