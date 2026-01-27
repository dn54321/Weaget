import { createWeatherMockData } from "@src/apis/weaget/weather/__mocks__/weather.mock";
import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { HourlyWeatherStripWidget, type HourlyWeatherStripWidgetProps } from ".";
type StoryType = HourlyWeatherStripWidgetProps;

const meta: Meta<StoryType> = {
    args: {
        weatherData: createWeatherMockData()
    },
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data"
        }
    },
    component: HourlyWeatherStripWidget,
    decorators: [storybookWrapper],
    tags: ["autodocs"],
    title: "Widgets/Hourly Weather Strip Widget"
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};

export const Skeleton: Story = {
    args: {
        weatherData: undefined
    }
};
