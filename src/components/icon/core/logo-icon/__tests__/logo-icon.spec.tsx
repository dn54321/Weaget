import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Logo from "@components/icon/core/logo-icon/logo-icon.component";

describe("Component: logo-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            <Logo />
        );

        expect(getByLabelText("Weaget logo")).toBeInTheDocument();
    });
});
