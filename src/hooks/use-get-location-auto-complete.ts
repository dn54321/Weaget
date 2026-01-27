import { FetchError } from "@errors/fetch-error";
import { weagetAutoCompleteSchema } from "@src/apis/weaget/auto-complete/auto-complete.schema";
import { AutoCompleteQueryParams, AutoCompleteSuggestions } from "@src/apis/weaget/auto-complete/auto-complete.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useGetLocationAutoComplete(input: string, location?: string) {
    const [sessiontoken] = useState(crypto.randomUUID());
    const [query, setQuery] = useState<string | undefined>(input);
    const reactQuery = useQuery<Array<AutoCompleteSuggestions>>({
        enabled: !!query,
        queryFn: () => fetchAutoComplete(query as string, { location, sessiontoken }),
        queryKey: ["location-auto-complete", query, { location }],
        retry: 0,
        staleTime: Infinity
    });
    return [reactQuery, setQuery] as const;
}

async function fetchAutoComplete(input: string, params?: AutoCompleteQueryParams) {
    const url = "/api/location/auto-complete";
    const queryParams = new URLSearchParams({ input, ...params });
    return await fetch(`${url}?${queryParams}`)
        .then(async (data) => {
            const result = await data.json();
            if (!data.ok) throw new FetchError(data, result.message);
            return result;
        })
        .then(data => weagetAutoCompleteSchema.parse(data));
}
