import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScatteredCloud } from "..";
import { withTestWrapper } from "@utils/wrappers";

describe("Component: scattered-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<ScatteredCloud />)
        );

        expect(getByLabelText("Scattered cloud")).toBeInTheDocument();
    });
});
