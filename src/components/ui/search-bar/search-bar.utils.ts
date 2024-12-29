import { debounce, throttle } from "throttle-debounce";

export const throttleSearchFunc = throttle(500, (func: (query?: string) => void, query?: string) => {
    if (query !== undefined) func(query);
});

export const debounceSearchFunc = debounce(500, (func: (query?: string) => void, query?: string) => {
    if (query !== undefined) func(query);
});
