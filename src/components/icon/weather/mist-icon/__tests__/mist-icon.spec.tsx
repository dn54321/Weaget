import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Mist } from "..";
import { withTestWrapper } from "@utils/wrappers";

describe('Component: Mist', () => {
    it('Widget should be able to render.', () => {
        const { getByLabelText } = render(
            withTestWrapper(<Mist/>)
        );
        
        expect(getByLabelText('Mist')).toBeInTheDocument();
    });
});