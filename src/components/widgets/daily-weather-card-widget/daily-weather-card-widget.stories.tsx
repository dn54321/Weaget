import { DailyWeatherCardWidget, type DailyWeatherCardWidgetProps } from ".";
import { Meta, StoryObj } from "@storybook/react";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = DailyWeatherCardWidgetProps;

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
    component: DailyWeatherCardWidget,
    decorators: [storybookWrapper],
    tags: ["autodocs"],
    title: "Widgets/Daily Weather Card Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};
export const Skeleton: Story = {
    args: {
        weatherData: undefined,
    },
};
