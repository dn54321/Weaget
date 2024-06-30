import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SnowCloud } from "..";
import { withTestWrapper } from "@utils/wrappers";

describe("Component: snow-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<SnowCloud />)
        );

        expect(getByLabelText("Snow cloud")).toBeInTheDocument();
    });
});
