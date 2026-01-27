import { withRender } from "@utils/render";
import { describe, expect, it } from "vitest";

import NotFound from "./not-found";

describe("Page: not-found", () => {
    it("should display loader when page isn't loaded.", () => {
        const { getByText } = withRender(<NotFound />);
        expect(getByText("404")).toBeInTheDocument();
    });

    it("should have a button that heads to the home screen.", () => {
        const { getByRole } = withRender(<NotFound />);
        const homeButton = getByRole("link");
        expect(homeButton).toHaveTextContent("page.404.goBackToHomeButton");
        expect(homeButton).toHaveAttribute("href", "/");
    });
});
