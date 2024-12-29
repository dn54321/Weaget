import { Meta, StoryObj } from "@storybook/react";
import { WeatherDisplayWidget, WeatherDisplayWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { faker } from "@faker-js/faker";
import { openWeatherTypes } from "@features/open-weather-map-one-call/oneCall.utils";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = WeatherDisplayWidgetProps & { weatherType: string };

const meta: Meta<StoryType> = {
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data",
        },
        weatherType: {
            control: { type: "select" },
            description: "The weather type to display for this card.",
            if: { arg: "skeleton", truthy: false },
            name: "Weather Type",
            options: openWeatherTypes.map(weather => weather.main),
        },
    },
    args: {
        location: faker.location.city(),
        weatherData: createWeatherMockData(),
        weatherType: faker.helpers.arrayElement(openWeatherTypes.map(weather => weather.main)),
    },
    component: WeatherDisplayWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    title: "Widgets/Weather Display Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
    render: (args) => {
        const { weatherType, ...props } = args;
        const weatherDetails = openWeatherTypes.find(
            openWeatherType => openWeatherType.main === weatherType,
        );
        if (weatherDetails === undefined) throw new Error("No weather details found");
        return (
            <WeatherDisplayWidget
                {...props}
                weatherData={{
                    ...props.weatherData!,
                    current: {
                        ...props.weatherData!.current!,
                        weather: [{
                            ...weatherDetails,
                        }],
                    },
                }}
            />
        );
    },
};

export const Skeleton: Story = {
    args: {
        location: undefined,
        weatherData: undefined,
    },
};
