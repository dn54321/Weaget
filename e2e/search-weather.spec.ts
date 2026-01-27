import { beforeEach } from "vitest";
import { pages } from "next/dist/build/templates/app-page";
import test from "@playwright/test";

test.describe("Search Weather", () => {
    beforeEach(() => {
        pages.goto("/");
    });

    test("should be able to search the weather using the search bar", async ({ page }) => {
        await page.getByPlaceholder("Search Weather Location").click();
    });
});
