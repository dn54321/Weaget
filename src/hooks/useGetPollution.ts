import { useQuery } from "@tanstack/react-query";
import { Pollution } from "../types/models/apicn/pollution.model";
import { FetchError } from "../errors/FetchError";
import { weagetPollutionSchema } from "../schemas/pollution.schema";

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

    const response = weagetPollutionSchema.parse(data.data);
    return response;
}

export function useGetPollution(lat?: number, lng?: number) {
    return useQuery<Pollution>({
        queryKey: ['pollution', lat, lng], 
        queryFn: () => fetchPollution(lat, lng),
        enabled: Boolean(lat && lng),
        retry: 0,
    });
}