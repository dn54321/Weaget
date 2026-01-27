import { FetchError } from "@errors/fetch-error";
import { Pollution } from "@src/apis/apicn/pollution/pollution.types";
import { pollutionSchema } from "@src/apis/weaget/pollution/pollution.schema";
import { Duration } from "@src/types/math.types";
import { useQuery } from "@tanstack/react-query";

export function useGetPollution(lat?: number, lng?: number) {
    return useQuery<Pollution>({
        enabled: Boolean(lat !== undefined && lng !== undefined),
        queryFn: () => fetchPollution(lat, lng),
        queryKey: ["pollution", lat, lng],
        retry: 0,
        staleTime: Duration.HOURLY
    });
}

async function fetchPollution(lat?: number, lng?: number) {
    const url = "/api/pollution";
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
