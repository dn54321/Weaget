import { useQuery } from "@tanstack/react-query";
import { OneCallWeatherDetails } from "../types/models/openWeather/oneCall.model";
import { FetchError } from "../errors/FetchError";
import { weagetWeatherSchema } from "../schemas/weather.schema";

async function fetchWeather(location?: string, region?: string) {
    const url = `/api/weather/${location}`;
    const queryParams = new URLSearchParams({...(region && {region})});
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weagetWeatherSchema.parse(data))
}

export function useGetWeather(location?: string, region?: string) {
    return useQuery<OneCallWeatherDetails>({
        queryKey: ['weather', location, {region}], 
        queryFn: () => fetchWeather(location, region),
        enabled: Boolean(location),
        retry: 0,
    });
}