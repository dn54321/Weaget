import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MoonIcon } from "@components/icon/weather/moon-icon/moon-icon/moon-icon";
import { withTestWrapper } from "@components/utils/wrappers";

describe("Component: moon-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<MoonIcon />)
        );

        expect(getByLabelText("Moon")).toBeInTheDocument();
    });
});