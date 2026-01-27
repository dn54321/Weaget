import { test } from "@playwright/test";

test("Should be able able to search weather by current location.", async ({ page }) => {
    await page.goto("/");
});
