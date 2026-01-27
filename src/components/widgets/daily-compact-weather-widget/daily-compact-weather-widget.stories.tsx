import { createWeatherMockData } from "@src/apis/weaget/weather/__mocks__/weather.mock";
import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { DailyCompactWeatherWidget, type DailyCompactWeatherWidgetProps } from ".";
type StoryType = DailyCompactWeatherWidgetProps;

const meta: Meta<StoryType> = {
    args: {
        sx: {
            maxWidth: "500px"
        },
        weatherData: createWeatherMockData()
    },
    argTypes: {
        weatherData: {
            description: "Weather data object.",
            name: "Weather Data"
        }
    },
    component: DailyCompactWeatherWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
        nextjs: {
            appDirectory: true
        }
    },
    tags: ["autodocs"],
    title: "Widgets/Daily Compact Weather Widget"
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};
