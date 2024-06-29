import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("Page: not-found", () => {
    it("should display loader when page isn't loaded.", () => {
        const { getByText } = render(NotFound());
        expect(getByText("404")).toBeInTheDocument();
    });

    it("should have a button that heads to the home screen.", () => {
        const { getByRole } = render(NotFound());
        const homeButton = getByRole("link");
        expect(homeButton).toHaveTextContent("Go back to home");
        expect(homeButton).toHaveAttribute("href", "/");
    });
});
