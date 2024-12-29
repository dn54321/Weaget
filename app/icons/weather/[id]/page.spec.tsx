import { describe, expect, it } from "vitest";
import Page from "./page";
import { waitFor } from "@testing-library/react";
import { withRender } from "@utils/render";

describe("Page: app/icons/weather/[id]", () => {
    it("should correctly display the correct information for 200 weather id.", async () => {
        const params = Promise.resolve({ id: "200" });
        const { getByText } = withRender(<Page params={params} />);
        await waitFor(() => expect(getByText("weather.icon.thunderstorm.title")).toBeInTheDocument());
        expect(getByText("weather.icon.thunderstorm.description")).toBeInTheDocument();
    });

    it("should display an error message if an unexpected weather id is received.", () => {
        const params = Promise.resolve({ id: "999" });
        const { getByText } = withRender(<Page params={params} />);
        expect(getByText("page.iconGallery.invalidIcon")).toBeInTheDocument();
    });
});
