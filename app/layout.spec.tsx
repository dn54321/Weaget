import { describe, expect, it } from "vitest";
import Layout from "./layout";
import { render } from "@testing-library/react";

describe("Page: layout.tsx", async () => {
    it("should be able to render it's children element successfully.", () => {
        const { getByText } = render(<Layout>testText</Layout>);
        expect(getByText("testText")).toBeInTheDocument();
    });
});
