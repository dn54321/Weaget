import { AutoCompleteQueryParams, AutoCompleteSuggestions } from "@features/weaget/auto-complete/auto-complete.types";
import { FetchError } from "@errors/fetch-error";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { weagetAutoCompleteSchema } from "@features/weaget/auto-complete/auto-complete.schema";

async function fetchAutoComplete(input: string, params?: AutoCompleteQueryParams) {
    const url = `/api/location/auto-complete`;
    const queryParams = new URLSearchParams({ input, ...params });
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weagetAutoCompleteSchema.parse(data));
}

export function useGetLocationAutoComplete(input: string, location?: string) {
    const [sessiontoken] = useState(crypto.randomUUID());
    const [query, setQuery] = useState(input);
    const reactQuery = useQuery<Array<AutoCompleteSuggestions>>({
        enabled: !!query,
        queryFn: () => fetchAutoComplete(query, { location, sessiontoken }),
        queryKey: ["location-auto-complete", query, { location }],
        retry: 0,
        staleTime: Infinity,
    });
    return [reactQuery, setQuery] as const;
}
