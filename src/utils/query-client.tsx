import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const testQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export const testOfflineQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            networkMode: "offlineFirst",
        },
    },
});
