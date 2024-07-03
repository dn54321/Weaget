import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { DailyCompactWeatherWidget, type DailyCompactWeatherWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
type StoryType = DailyCompactWeatherWidgetProps;

const meta: Meta<StoryType> = {
    title: "Widgets/Daily Compact Weather Widget",
    component: DailyCompactWeatherWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
        nextjs: {
            appDirectory: true,
        },
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
        sx: {
            maxWidth: "500px",
        },
    },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};
