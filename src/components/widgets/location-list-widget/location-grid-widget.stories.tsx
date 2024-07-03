import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { LocationListWidget, type LocationListWidgetProps } from ".";
import { createNearbyLocationMockData } from "@features/weaget/__mocks__/nearby-location.mock";
type StoryType = LocationListWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    title: "Widgets/Location List Widget",
    component: LocationListWidget,
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
        width: {
            name: "Width",
            description: "Card width.",
            type: { name: "number", required: false },
            defaultValue: 400,
            control: {
                type: "range",
                min: 0,
                max: 1000,
                step: 1,
            },
        },
    },
    args: {
        locationData: createNearbyLocationMockData({ count: 8 }),
        width: 400,
    },
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
                    width: width,
                }}
            />
        );
    },
};

export const Skeleton: Story = {
    args: {
        locationData: undefined,
    },
    render: (args) => {
        const { width, ...props } = args;
        return (
            <LocationListWidget
                {...props}
                sx={{
                    width: width,
                }}
            />
        );
    },
};
