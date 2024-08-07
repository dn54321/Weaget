import { describe, expect, it } from "vitest";
import Page from "./page";
import { withRender } from "@utils/render";

describe("Page: app/icons/weather/[id]", () => {
    it("should correctly display the correct information for 200 weather id.", () => {
        const { getByText } = withRender(Page({ params: { id: "200" } }));
        expect(getByText("Thunderstorm")).toBeInTheDocument();
        expect(getByText("A lightning bolt accompanied with a cloud.")).toBeInTheDocument();
    });

    it("should display an error message if an unexpected weather id is received.", () => {
        const { getByText } = withRender(Page({ params: { id: "999" } }));
        expect(getByText("Invalid ID. Please try again later.")).toBeInTheDocument();
    });
});
