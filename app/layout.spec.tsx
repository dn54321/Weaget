import { describe, expect, it } from "vitest";
import Layout from "./layout";
import { withRender } from "@utils/wrappers";

describe("Page: layout.tsx", async () => {
    it("should be able to render it's children element successfully.", () => {
        const { getByText } = withRender(<Layout>testText</Layout>);
        expect(getByText("testText")).toBeInTheDocument();
    });
});
