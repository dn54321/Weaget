import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { WeatherStatWidget, WeatherStatWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
type StoryType = WeatherStatWidgetProps;

const meta: Meta<StoryType> = {
    title: "Widgets/Weather Stat Widget",
    component: WeatherStatWidget,
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
    },
    args: {
        weatherData: createWeatherMockData(),
        sx: { maxWidth: 800 },
    },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};

export const Skeleton: Story = {
    args: {
        weatherData: undefined,
    },
};
