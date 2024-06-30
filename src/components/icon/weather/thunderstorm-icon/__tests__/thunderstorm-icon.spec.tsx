import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Thunderstorm } from "./..";
import { withTestWrapper } from "@utils/wrappers";

describe("Component: thunderstorm-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<Thunderstorm />)
        );

        expect(getByLabelText("Thunderstorm")).toBeInTheDocument();
    });
});
