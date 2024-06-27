import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Logo from "../logo-icon";

describe('Component: logo-icon', () => {
    it('Widget should be able to render.', () => {
        const { getByLabelText } = render(
            <Logo/>
        );
        
        expect(getByLabelText('Weaget logo')).toBeInTheDocument();
    });
});