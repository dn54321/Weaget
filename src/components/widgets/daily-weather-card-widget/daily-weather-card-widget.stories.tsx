import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { DailyWeatherCardWidget, type DailyWeatherCardWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
type StoryType = DailyWeatherCardWidgetProps;

const meta: Meta<StoryType> = {
    title: "Widgets/Daily Weather Card Widget",
    component: DailyWeatherCardWidget,
    decorators: [storybookWrapper],
    tags: ["autodocs"],
    argTypes: {
        weatherData: {
            name: "Weather Data",
            description: "Weather data object.",
        },
    },
    args: {
        weatherData: createWeatherMockData(),
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
