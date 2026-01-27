import { createWeatherMockData } from "@src/apis/weaget/weather/__mocks__/weather.mock";
import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { WeatherStatWidget, WeatherStatWidgetProps } from ".";
type StoryType = WeatherStatWidgetProps;

const meta: Meta<StoryType> = {
    args: {
        sx: { maxWidth: 800 },
        weatherData: createWeatherMockData()
    },
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data"
        }
    },
    component: WeatherStatWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "padded"
    },
    tags: ["autodocs"],
    title: "Widgets/Weather Stat Widget"
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};

export const Skeleton: Story = {
    args: {
        weatherData: undefined
    }
};
