import { debounce, throttle } from "throttle-debounce";

export const throttleFunc = throttle(500, (func, query) => {
    if (query !== undefined) func(query)
});

export const debounceFunc = debounce(500, (func, query) => {
    if (query !== undefined) func(query)
});
