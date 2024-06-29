import { describe, expect, it } from "vitest";
import { round } from "@utils/math";

describe('Utils - math', async () => {
    it.each([
        [1.2523, 0, 1],
        [1.2413, 1, 1.2],
        [1.2523, 1, 1.3],
        [1.2523, 2, 1.25],
        [-1.2523, 2, -1.25],
    ])('Number %f rounded down to %f decimal places should return %f.', async (
        number: number,
        decimals: number,
        expected: number
    ) => {
        expect(round(number, decimals)).toBe(expected);
    });
})