import { Meta, StoryObj } from "@storybook/react";
import { CompactWeatherCard, type CompactWeatherCardProps } from ".";
import { faker } from "@faker-js/faker";
import { storybookWrapper } from "@utils/wrappers";
import { openWeatherTypes } from "@features/open-weather-map-one-call/oneCall.utils";

type StoryType = CompactWeatherCardProps & {
    weatherType: string;
};

const meta: Meta<StoryType> = {
    title: "Cards/Compact Weather Card",
    component: CompactWeatherCard,
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
        weatherCode: {
            table: {
                disable: true,
            },
            name: "Weather Code",
            description: "The weather code to display for this card.",
            control: { type: "select" },
            options: openWeatherTypes.map(weather => weather.id),
        },
    },
    args: {
        rainfallPercentage: faker.number.float({ min: 0.1, max: 1, fractionDigits: 2 }),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: new Date(),
        maxTemperature: faker.number.float({ min: 273.15, max: 300.15, fractionDigits: 2 }),
        minTemperature: faker.number.float({ min: 301.15, max: 325.15, fractionDigits: 2 }),
        weatherType: faker.helpers.arrayElement(openWeatherTypes.map(weather => weather.main)),
        sx: { minWidth: "120px" },
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
            <CompactWeatherCard
                {...props}
                weatherCode={weatherDetails.id}
            />
        );
    },
};
