import { describe, expect, it } from "vitest";
import { getOptions } from "@project/src/i18n/settings";

describe("i18n Settings", async () => {
    it("should have getOptions function return an object", () => {
        const result = getOptions();
        expect(typeof result).toEqual("object");
    });

    it("should expect passed parameters to be keys of the object", () => {
        const result = getOptions("testLng", "testNs");
        expect(result).toMatchObject({
            lng: "testLng",
            ns: "testNs",
        });
    });
});
