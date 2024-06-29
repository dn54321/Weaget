import { describe, expect, it } from "vitest";
import { extractQueryParams } from "@utils/next-request-helper";

describe('Utils - next-request-helper', () => {
    describe('extractQueryParams', () => {
        it.each([
            ["https://www.example.com?lat=1.1234&lng=2.2345", {lat: "1.1234", lng: "2.2345"}],
            ["https://www.example.com", {}],
            ["https://www.examp.com?str=abc&num=123", {str: "abc", num: "123"}]
        ])('Url %s should have query params %o.', (
            url: string,
            result: Record<string, string>,
        ) => {
            expect(extractQueryParams(url)).toEqual(result);
        });
    });
})