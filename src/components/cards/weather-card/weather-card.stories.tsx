import { Meta, StoryObj } from "@storybook/react";
import { WeatherCard, type WeatherCardProps } from ".";
import { faker } from "@faker-js/faker";
import { storybookWrapper } from "@utils/wrappers";
import { openWeatherTypes } from "@features/open-weather-map-one-call/oneCall.utils";
import { TemperatureScale } from "@src/types/weather.types";
import { SkeletonProps } from "@src/types/component.types";

type StoryType = WeatherCardProps & {
    weatherType: string;
    temperatureScale: TemperatureScale;
};

const meta: Meta<StoryType> = {
    title: "Cards/Weather Card",
    component: WeatherCard,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        rainfallPercentage: {
            if: { arg: "skeleton", truthy: false },
            name: "Rainfall Percentage",
            description: "Rainfall percentage in the last 24 hours.",
            control: {
                type: "range",
                min: 0,
                max: 1,
                step: 0.01,
            },
        },
        timezone: {
            name: "Timezone",
            if: { arg: "skeleton", truthy: false },
            description: "Timezone of the weather data.",
            control: { type: "select" },
            options: Intl.supportedValuesOf("timeZone"),
        },
        date: {
            name: "Date",
            description: "Date of the weather data.",
            if: { arg: "skeleton", truthy: false },
            control: { type: "date" },
        },
        maxTemperature: {
            name: "Max Temperature (Kelvin)",
            description: "The maximum temperature to show on the card.",
            if: { arg: "skeleton", truthy: false },
            control: { type: "number" },
        },
        minTemperature: {
            name: "Min Temperature (Kelvin)",
            description: "The minimum temperature to show on the card.",
            if: { arg: "skeleton", truthy: false },
            control: { type: "number" },
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
        rainfallPercentage: faker.number.float({ min: 0.1, max: 1, fractionDigits: 2 }),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date(),
        maxTemperature: faker.number.float({ min: 273.15, max: 300.15, fractionDigits: 2 }),
        minTemperature: faker.number.float({ min: 301.15, max: 325.15, fractionDigits: 2 }),
        weatherType: faker.helpers.arrayElement(openWeatherTypes.map(weather => weather.main)),
    },
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
