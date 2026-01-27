import type { Meta, StoryObj } from "@storybook/react";
import { WeatherStatWidget } from ".";
import type { WeatherStatWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = WeatherStatWidgetProps;

const meta: Meta<StoryType> = {
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data",
        },
    },
    args: {
        sx: { maxWidth: 800 },
        weatherData: createWeatherMockData(),
    },
    component: WeatherStatWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    title: "Widgets/Weather Stat Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};

export const Skeleton: Story = {
    args: {
        weatherData: undefined,
    },
};
