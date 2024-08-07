import { beforeAll, describe, expect, it, test } from "vitest";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { createWeatherDailyMockData, createWeatherHourlyMockData, createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { RainfallWidget } from "./..";
import { withRender } from "@utils/render";
import userEvent from "@testing-library/user-event";

describe("Component: rainfall-widget", async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });
    it("should contain a title.", () => {
        const { getByText } = withRender(
            <RainfallWidget weatherData={weatherData} />,
        );

        expect(getByText("Rainfall")).toBeInTheDocument();
    });

    test.each([
        ["minutely", "120 mins"],
        ["hourly", "48 hours"],
        ["daily", "14 days"],
    ])("should show rainfall for %s.", (
        rainfallType: string,
        title: string
    ) => {
        const rainfallData = weatherData[rainfallType as keyof OneCallWeatherDetails];
        const { getByText } = withRender(
            <RainfallWidget weatherData={{
                ...weatherData,
                hourly: undefined,
                minutely: undefined,
                daily: undefined,
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
                hourly: undefined,
                minutely: undefined,
                daily: undefined,
            }}
            />
        );
        expect(getAllByRole("button")).toHaveLength(2);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "See 14 days rainfall");
        await user.click(getAllByRole("button")[0]);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "See 48 hours rainfall");
        await user.click(getAllByRole("button")[0]);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "See 120 mins rainfall");
        await user.click(getAllByRole("button")[1]);
        expect(getAllByRole("button")[0]).toHaveAttribute("aria-label", "See 48 hours rainfall");
    });

    it.each([
        ["minutely", [{ ...createWeatherHourlyMockData(), rain: undefined }]],
        ["hourly", [{ ...createWeatherHourlyMockData(), rain: { "1h": undefined } }]],
        ["daily", [{ ...createWeatherDailyMockData(), rain: undefined }]],
    ])("should work when there is no rainfall weather for %s.", async (key: string, value: object) => {
        const view = withRender(
            <RainfallWidget weatherData={{
                ...weatherData,
                hourly: [],
                minutely: [],
                daily: [],
                [key]: value,
            }}
            />
        );

        expect(view.getByText("Rainfall")).toBeInTheDocument();
    });

    it("should return a skeleton if no data is provided.", () => {
        const { getByTestId } = withRender(
            <RainfallWidget weatherData={undefined} />,
        );
        expect(getByTestId("rainfall-skeleton")).toBeInTheDocument();
    });
});
