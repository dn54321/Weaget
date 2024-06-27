import { useQuery } from "@tanstack/react-query";
import { Pollution } from "../features/apicn-pollution/pollution.types";
import { FetchError } from "../errors/fetch-error";
import { pollutionSchema } from "../features/weaget/pollution.schema";

async function fetchPollution(lat?: number, lng?: number) {
    const url = `/api/pollution`;
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

    if (data.status === "error") {
        throw new Error(data.message);
    }

    const response = pollutionSchema.parse(data.data);
    return response;
}

export function useGetPollution(lat?: number, lng?: number) {
    return useQuery<Pollution>({
        queryKey: ['pollution', lat, lng], 
        queryFn: () => fetchPollution(lat, lng),
        enabled: Boolean(lat !== undefined && lng !== undefined),
        retry: 0,
    });
}