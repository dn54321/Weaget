import { beforeAll, describe, expect, it, test } from "vitest";
import { createWeatherDailyMockData, createWeatherHourlyMockData, createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { RainfallWidget } from "./..";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";

describe("Component: rainfall-widget", async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });
    it("should contain a title.", () => {
        const { getByText } = withRender(
            <RainfallWidget weatherData={weatherData} />,
        );

        expect(getByText("component.widget.rainfall.title")).toBeInTheDocument();
    });

    test.each([
        ["minutely", "component.widget.rainfall.120Mins"],
        ["hourly", "component.widget.rainfall.48Hours"],
        ["daily", "component.widget.rainfall.14Days"],
    ])("should show rainfall title for %s rainfall.", (
        rainfallType: string,
        title: string,
    ) => {
        const rainfallData = weatherData[rainfallType as keyof OneCallWeatherDetails];
        const { getByText } = withRender(
            <RainfallWidget weatherData={{
                ...weatherData,
                daily: undefined,
                hourly: undefined,
                minutely: undefined,
                [rainfallType]: rainfallData,
            }}
            />,
        );

        expect(getByText(title)).toBeInTheDocument();
    });

    it("should be able to switch between 3 different rainfalls", async () => {
        const user = userEvent.setup();
        const { getAllByRole } = withRender(
            <RainfallWidget weatherData={{
                ...weatherData,
                daily: undefined,
                hourly: undefined,
                minutely: undefined,
            }}
            />,
        );
        expect(getAllByRole("button")).toHaveLength(2);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "component.widget.rainfall.see14Days");
        await user.click(getAllByRole("button")[0]);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "component.widget.rainfall.see48Hours");
        await user.click(getAllByRole("button")[0]);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "component.widget.rainfall.see120Mins");
        await user.click(getAllByRole("button")[1]);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "component.widget.rainfall.see48Hours");
    });

    it.each([
        ["minutely", [{ ...createWeatherHourlyMockData(), rain: undefined }]],
        ["hourly", [{ ...createWeatherHourlyMockData(), rain: { "1h": undefined } }]],
        ["daily", [{ ...createWeatherDailyMockData(), rain: undefined }]],
    ])("should work when there is no rainfall weather for %s.", async (key: string, value: object) => {
        const view = withRender(
            <RainfallWidget weatherData={{
                ...weatherData,
                daily: [],
                hourly: [],
                [key]: value,
                minutely: [],
            }}
            />,
        );

        expect(view.getByText("component.widget.rainfall.title")).toBeInTheDocument();
    });

    it("should return a skeleton if no data is provided.", () => {
        const { getByTestId } = withRender(
            <RainfallWidget weatherData={undefined} />,
        );
        expect(getByTestId("rainfall-skeleton")).toBeInTheDocument();
    });
});
