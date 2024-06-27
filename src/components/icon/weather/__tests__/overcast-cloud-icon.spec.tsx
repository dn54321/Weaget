import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OvercastCloud } from "../overcast-cloud-icon";
import { withTestWrapper } from "../../../../utils/wrappers";

describe('Component: overcast-cloud-icon', () => {
    it('Widget should be able to render.', () => {
        const { getByLabelText } = render(
            withTestWrapper(<OvercastCloud/>)
        );
        
        expect(getByLabelText('Overcast cloud')).toBeInTheDocument();
    });
});