import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SnowCloud } from "@components/icon/weather/snow-cloud-icon/snow-cloud-icon/snow-cloud-icon";
import { withTestWrapper } from "@components/utils/wrappers";

describe("Component: snow-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<SnowCloud />)
        );

        expect(getByLabelText("Snow cloud")).toBeInTheDocument();
    });
});
