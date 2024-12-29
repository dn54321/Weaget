import { LocationGridWidget, type LocationGridWidgetProps } from ".";
import { Meta, StoryObj } from "@storybook/react";
import { createNearbyLocationMockData } from "@features/weaget/__mocks__/nearby-location.mock";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = LocationGridWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    argTypes: {
        locationData: {
            description: "Location data object.",
            name: "Location Data",
        },
    },
    args: {
        locationData: createNearbyLocationMockData({ count: 8 }),
        sx: { maxWidth: 500 },
    },
    component: LocationGridWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ["autodocs"],
    title: "Widgets/Location Grid Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};
