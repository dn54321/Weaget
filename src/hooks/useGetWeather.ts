import { useQuery } from "@tanstack/react-query";
import { OneCallWeatherDetails } from "../types/models/openWeather/oneCall.model";
import { plainToInstance } from "class-transformer";
import OneCallWeatherDetailsDto from "../types/dtos/openWeather/openCall.dto";
import { FetchError } from "../errors/FetchError";

async function fetchWeather(location?: string, region?: string) {
    const url = `/api/weather/${location}`;
    const queryParams = new URLSearchParams({...(region && {region})});
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => plainToInstance(OneCallWeatherDetailsDto, data, { enableImplicitConversion: true, groups: ['client'] }))
}

export function useGetWeather(location?: string, region?: string) {
    return useQuery<OneCallWeatherDetails>({
        queryKey: ['weather', location, {region}], 
        queryFn: () => fetchWeather(location, region),
        enabled: Boolean(location)
    });
}