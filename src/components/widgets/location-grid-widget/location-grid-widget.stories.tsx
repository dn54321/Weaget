import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { LocationGridWidget, type LocationGridWidgetProps } from ".";
import { createNearbyLocationMockData } from "@features/weaget/__mocks__/nearby-location.mock";
type StoryType = LocationGridWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    title: "Widgets/Location Grid Widget",
    component: LocationGridWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ["autodocs"],
    argTypes: {
        locationData: {
            name: "Location Data",
            description: "Location data object.",
        },
    },
    args: {
        locationData: createNearbyLocationMockData({ count: 8 }),
        sx: { maxWidth: 500 },
    },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};
