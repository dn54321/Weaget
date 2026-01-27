import { HourlyWeatherStripWidget, type HourlyWeatherStripWidgetProps } from ".";
import type { Meta, StoryObj } from "@storybook/react";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = HourlyWeatherStripWidgetProps;

const meta: Meta<StoryType> = {
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data",
        },
    },
    args: {
        weatherData: createWeatherMockData(),
    },
    component: HourlyWeatherStripWidget,
    decorators: [storybookWrapper],
    tags: ["autodocs"],
    title: "Widgets/Hourly Weather Strip Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};

export const Skeleton: Story = {
    args: {
        weatherData: undefined,
    },
};
