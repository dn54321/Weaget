import { afterEach, describe, expect, it } from "vitest";
import { WeatherIcon } from "@components/ui/weather-icon";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";

describe("Component: weather-icon", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it("should be able to render a weather icon without rain", () => {
        const { getByTitle } = withRender(<WeatherIcon id={511} />);
        expect(getByTitle("weather.icon.rainCloud.title")).toBeInTheDocument();
    });

    it.each(
        [[200], [300], [500], [600], [700], [800], [801], [802], [803], [804]],
    )("should be able to render weather icon with id '%d'.", (weatherId) => {
        withRender(<WeatherIcon id={weatherId} />);
    });

    it("should show a moon icon if no icon exists", () => {
        const { getByTitle } = withRender(<WeatherIcon id={999} />);
        expect(getByTitle("weather.icon.moon.title")).toBeInTheDocument();
    });

    it("should be able to render a weather icon with rain", () => {
        const view = withRender(<WeatherIcon id={200} rainPercentage={0.25} />);
        expect(view.getByText("25%")).toBeInTheDocument();
    });
});
