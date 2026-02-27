import { describe, expect, it } from "vitest";
import Layout from "./layout";
import { withAsyncRender } from "@utils/render";

describe("Page: layout.tsx", () => {
    it("should be able to render it's children element successfully.", async () => {
        const { getByText } = await withAsyncRender(Layout, { children: "testText" });
        expect(getByText("testText")).toBeInTheDocument();
    });
});
