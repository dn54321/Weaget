import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FewCloudIcon } from "@components/icon/weather/few-cloud-icon/few-cloud-icon/few-cloud-icon";

describe('Component: few-cloud-icon', () => {
    it('Widget should be able to render.', () => {
        const { getByLabelText } = render(
            <FewCloudIcon/>
        );
        
        expect(getByLabelText('Few clouds')).toBeInTheDocument();
    });
});