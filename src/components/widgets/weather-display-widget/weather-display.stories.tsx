import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { WeatherDisplayWidget, WeatherDisplayWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { faker } from "@faker-js/faker";
import { openWeatherTypes } from "@features/open-weather-map-one-call/oneCall.utils";
type StoryType = WeatherDisplayWidgetProps & { weatherType: string };

const meta: Meta<StoryType> = {
    title: "Widgets/Weather Display Widget",
    component: WeatherDisplayWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        weatherData: {
            name: "Weather Data",
            description: "Weather data object.",
        },
        weatherType: {
            if: { arg: "skeleton", truthy: false },
            name: "Weather Type",
            description: "The weather type to display for this card.",
            control: { type: "select" },
            options: openWeatherTypes.map(weather => weather.main),
        },
    },
    args: {
        weatherData: createWeatherMockData(),
        weatherType: faker.helpers.arrayElement(openWeatherTypes.map(weather => weather.main)),
        location: faker.location.city(),
    },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
    render: (args) => {
        const { weatherType, ...props } = args;
        const weatherDetails = openWeatherTypes.find(
            openWeatherType => openWeatherType.main === weatherType
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
        weatherData: undefined,
        location: undefined,
    },
};
