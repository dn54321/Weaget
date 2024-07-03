import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { RainfallWidget, type RainfallWidgetProps } from ".";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
type StoryType = RainfallWidgetProps;

const meta: Meta<StoryType> = {
    title: "Widgets/Rainfall Widget",
    component: RainfallWidget,
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
