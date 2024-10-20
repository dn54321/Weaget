import { useQuery } from "@tanstack/react-query";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { FetchError } from "@errors/fetch-error";
import weatherSchema from "@features/weaget/weather/weather.schema";

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

export function useGetWeather(location?: string, region?: string, lang?: string) {
    return useQuery<OneCallWeatherDetails>({
        queryKey: ["weather", location, { region, lang }],
        queryFn: () => fetchWeather(location, region, lang),
        enabled: Boolean(location),
        retry: 0,
    });
}
