import { DailyCompactWeatherWidget, type DailyCompactWeatherWidgetProps } from ".";
import { Meta, StoryObj } from "@storybook/react";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = DailyCompactWeatherWidgetProps;

const meta: Meta<StoryType> = {
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data",
        },
    },
    args: {
        sx: {
            maxWidth: "500px",
        },
        weatherData: createWeatherMockData(),
    },
    component: DailyCompactWeatherWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ["autodocs"],
    title: "Widgets/Daily Compact Weather Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};
