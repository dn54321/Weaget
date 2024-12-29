import { Meta, StoryObj } from "@storybook/react";
import { WeatherCard, type WeatherCardProps } from ".";
import { SkeletonProps } from "@src/types/component.types";
import { TemperatureScale } from "@src/types/weather.types";
import { faker } from "@faker-js/faker";
import { openWeatherTypes } from "@features/open-weather-map-one-call/oneCall.utils";
import { storybookWrapper } from "@utils/wrappers";

type StoryType = WeatherCardProps & {
    weatherType: string;
    temperatureScale: TemperatureScale;
};

const meta: Meta<StoryType> = {
    argTypes: {
        date: {
            control: { type: "date" },
            description: "Date of the weather data.",
            if: { arg: "skeleton", truthy: false },
            name: "Date",
        },
        maxTemperature: {
            control: { type: "number" },
            description: "The maximum temperature to show on the card.",
            if: { arg: "skeleton", truthy: false },
            name: "Max Temperature (Kelvin)",
        },
        minTemperature: {
            control: { type: "number" },
            description: "The minimum temperature to show on the card.",
            if: { arg: "skeleton", truthy: false },
            name: "Min Temperature (Kelvin)",
        },
        rainfallPercentage: {
            control: {
                max: 1,
                min: 0,
                step: 0.01,
                type: "range",
            },
            description: "Rainfall percentage in the last 24 hours.",
            if: { arg: "skeleton", truthy: false },
            name: "Rainfall Percentage",
        },
        timezone: {
            control: { type: "select" },
            description: "Timezone of the weather data.",
            if: { arg: "skeleton", truthy: false },
            name: "Timezone",
            options: Intl.supportedValuesOf("timeZone"),
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
        date: new Date(),
        maxTemperature: faker.number.float({ fractionDigits: 2, max: 300.15, min: 273.15 }),
        minTemperature: faker.number.float({ fractionDigits: 2, max: 325.15, min: 301.15 }),
        rainfallPercentage: faker.number.float({ fractionDigits: 2, max: 1, min: 0.1 }),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        weatherType: faker.helpers.arrayElement(openWeatherTypes.map(weather => weather.main)),
    },
    component: WeatherCard,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "Cards/Weather Card",
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
            <WeatherCard
                {...props}
                weatherCode={weatherDetails.id}
                weatherDescription={weatherDetails.description}
            />
        );
    },
};

export const Skeleton: StoryObj<SkeletonProps> = {
    args: {
        skeleton: true,
    },
};
