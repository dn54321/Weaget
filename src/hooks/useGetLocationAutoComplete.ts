import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { GoogleLocationSuggestionQueryParamsDto } from "../types/dtos/google/locationSuggestion.dto";
import { AutoCompleteSuggestions } from "../types/autoComplete.types";
import { FetchError } from "../errors/FetchError";

async function fetchAutoComplete(input: string, params?: Partial<GoogleLocationSuggestionQueryParamsDto>) {
    const url = `/api/location/auto-complete`;
    const queryParams = new URLSearchParams({input, ...params});
    return await fetch(`${url}?${queryParams}`)        
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        });
}

export function useGetLocationAutoComplete(input: string, location?: string) {
    const [sessiontoken, _] = useState(crypto.randomUUID());
    const [query, setQuery] = useState(input);
    const reactQuery = useQuery<Array<AutoCompleteSuggestions>>({
        queryKey: ['location-auto-complete', query, {location}],
        queryFn: () => fetchAutoComplete(query, {location, sessiontoken}),
        enabled: !!query,
        staleTime: Infinity
    });
    return [reactQuery, setQuery] as const;
}