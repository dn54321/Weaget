import { faker } from "@faker-js/faker";
import { openWeatherTypes } from "@src/apis/open-weather-map/one-call/one-call.utils";
import { createWeatherMockData } from "@src/apis/weaget/weather/__mocks__/weather.mock";
import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { WeatherDisplayWidget, WeatherDisplayWidgetProps } from ".";
type StoryType = WeatherDisplayWidgetProps & { weatherType: string };

const meta: Meta<StoryType> = {
    args: {
        location: faker.location.city(),
        weatherData: createWeatherMockData(),
        weatherType: faker.helpers.arrayElement(openWeatherTypes.map(weather => weather.main))
    },
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data"
        },
        weatherType: {
            control: { type: "select" },
            description: "The weather type to display for this card.",
            if: { arg: "skeleton", truthy: false },
            name: "Weather Type",
            options: openWeatherTypes.map(weather => weather.main)
        }
    },
    component: WeatherDisplayWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "padded"
    },
    tags: ["autodocs"],
    title: "Widgets/Weather Display Widget"
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
                            ...weatherDetails
                        }]
                    }
                }}
            />
        );
    }
};

export const Skeleton: Story = {
    args: {
        location: undefined,
        weatherData: undefined
    }
};
