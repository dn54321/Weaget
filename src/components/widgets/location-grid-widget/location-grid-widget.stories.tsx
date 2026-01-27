import { createNearbyLocationMockData } from "@src/apis/weaget/nearby-location/__mocks__/nearby-location.mock";
import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { LocationGridWidget, type LocationGridWidgetProps } from ".";
type StoryType = LocationGridWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    args: {
        locationData: createNearbyLocationMockData({ count: 8 }),
        sx: { maxWidth: 500 }
    },
    argTypes: {
        locationData: {
            description: "Location data object.",
            name: "Location Data"
        }
    },
    component: LocationGridWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
        nextjs: {
            appDirectory: true
        }
    },
    tags: ["autodocs"],
    title: "Widgets/Location Grid Widget"
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {};
