import { FetchError } from "@errors/fetch-error";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { useQuery } from "@tanstack/react-query";
import weatherSchema from "@features/weaget/weather/weather.schema";

/**
 * Fetches weather data from the API.
 * 
 * @param location The location for which to fetch weather data.
 * @param region The region to narrow down the location search.
 * @param lang  The language for the weather data.
 * @returns Weather details.
 */
async function fetchWeather(location?: string, region?: string, lang?: string) {
    const url = `/api/weather/${location}`;
    const queryParams = new URLSearchParams({
        ...(region && { region }),
        ...(lang && { lang }),
    });
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weatherSchema.parse(data));
}

/**
 * Fetches weather data using React Query.
 * 
 * @param location The location for which to fetch weather data.
 * @param region The region to narrow down the location search.
 * @param lang The language for the weather data.
 * @returns Weather details wrapped in a React Query object.
 */
export function useGetWeather(location?: string, region?: string, lang?: string) {
    return useQuery<OneCallWeatherDetails>({
        enabled: Boolean(location),
        queryFn: () => fetchWeather(location, region, lang),
        queryKey: ["weather", location, { lang, region }],
        retry: 0,
        gcTime: 30 * 60 * 1000,
    });
}
