import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { withTestWrapper } from "@utils/wrappers";
import { SunIcon } from "..";

describe("Component: sun-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<SunIcon />)
        );

        expect(getByLabelText("Sun")).toBeInTheDocument();
    });
});
