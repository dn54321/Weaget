import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Thunderstorm } from "@components/icon/weather/thunderstorm-icon/thunderstorm-icon/thunderstorm-icon";
import { withTestWrapper } from "@components/utils/wrappers";

describe('Component: thunderstorm-icon', () => {
    it('Widget should be able to render.', () => {
        const { getByLabelText } = render(
            withTestWrapper(<Thunderstorm/>)
        );
        
        expect(getByLabelText('Thunderstorm')).toBeInTheDocument();
    });
});