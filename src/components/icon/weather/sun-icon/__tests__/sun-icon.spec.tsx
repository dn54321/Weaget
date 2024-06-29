import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SunIcon from "@components/icon/weather/sun-icon/sun-icon.component";
import { withTestWrapper } from "@utils/wrappers";

describe("Component: sun-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<SunIcon />)
        );

        expect(getByLabelText("Sun")).toBeInTheDocument();
    });
});
