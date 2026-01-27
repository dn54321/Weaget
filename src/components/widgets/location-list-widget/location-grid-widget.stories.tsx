import { createNearbyLocationMockData } from "@src/apis/weaget/nearby-location/__mocks__/nearby-location.mock";
import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { LocationListWidget, type LocationListWidgetProps } from ".";
type StoryType = LocationListWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    args: {
        locationData: createNearbyLocationMockData({ count: 8 }),
        width: 400
    },
    argTypes: {
        locationData: {
            description: "Location data object.",
            name: "Location Data"
        },
        width: {
            control: {
                max: 1000,
                min: 0,
                step: 1,
                type: "range"
            },
            defaultValue: 400,
            description: "Card width.",
            name: "Width",
            type: { name: "number", required: false }
        }
    },
    component: LocationListWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
        nextjs: {
            appDirectory: true
        }
    },
    tags: ["autodocs"],
    title: "Widgets/Location List Widget"
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
    render: (args) => {
        const { width, ...props } = args;
        return (
            <LocationListWidget
                {...props}
                sx={{
                    width: width
                }}
            />
        );
    }
};

export const Skeleton: Story = {
    args: {
        locationData: undefined
    },
    render: (args) => {
        const { width, ...props } = args;
        return (
            <LocationListWidget
                {...props}
                sx={{
                    width: width
                }}
            />
        );
    }
};
