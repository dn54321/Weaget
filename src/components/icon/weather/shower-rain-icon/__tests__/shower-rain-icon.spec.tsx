import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShowerRain } from "@components/icon/weather/shower-rain-icon/shower-rain-icon/shower-rain-icon";
import { withTestWrapper } from "@components/utils/wrappers";

describe("Component: shower-rain-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<ShowerRain />)
        );

        expect(getByLabelText("Shower rain")).toBeInTheDocument();
    });
});
