import type { Meta, StoryObj } from "@storybook/react";
import { RainfallWidget, type RainfallWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = RainfallWidgetProps;

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
    component: RainfallWidget,

    decorators: [storybookWrapper],
    tags: ["autodocs"],
    title: "Widgets/Rainfall Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};

export const Skeleton: Story = {
    args: {
        weatherData: undefined,
    },

};
