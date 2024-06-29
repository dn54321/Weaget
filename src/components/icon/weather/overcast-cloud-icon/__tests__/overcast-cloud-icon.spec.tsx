import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OvercastCloud } from "@components/icon/weather/overcast-cloud-icon/overcast-cloud-icon/overcast-cloud-icon";
import { withTestWrapper } from "@components/utils/wrappers";

describe('Component: overcast-cloud-icon', () => {
    it('Widget should be able to render.', () => {
        const { getByLabelText } = render(
            withTestWrapper(<OvercastCloud/>)
        );
        
        expect(getByLabelText('Overcast cloud')).toBeInTheDocument();
    });
});