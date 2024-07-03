import { afterEach, describe, expect, test } from "vitest";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/wrappers";
import { WeatherIcon } from "@components/ui/weather-icon";

describe("Component: weather-icon", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    test("should be able to render a weather icon without rain", () => {
        const { getByLabelText } = withRender(<WeatherIcon id={511} />);
        expect(getByLabelText("Rain cloud")).toBeInTheDocument();
    });

    test.each(
        [[200], [300], [500], [600], [700], [800], [801], [802], [803], [804]],
    )("should be able to render weather icon with id '%d'.", (weatherId) => {
        withRender(<WeatherIcon id={weatherId} />);
    });

    test("should show a moon icon if no icon exists", () => {
        const { getByLabelText } = withRender(<WeatherIcon id={999} />);
        expect(getByLabelText("Moon")).toBeInTheDocument();
    });

    test("should be able to render a weather icon with rain", () => {
        const view = withRender(<WeatherIcon id={200} rainPercentage={0.25} />);
        expect(view.getByText("25%")).toBeInTheDocument();
    });
});
