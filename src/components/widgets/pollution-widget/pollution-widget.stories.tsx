import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";
import { PollutionWidget, type PollutionWidgetProps } from ".";
import { createPollutionMockData } from "@features/weaget/__mocks__/pollution.mock";
type StoryType = PollutionWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    title: "Widgets/Pollution Widget",
    component: PollutionWidget,
    decorators: [storybookWrapper],
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        pollutionData: {
            name: "Pollution Data",
            description: "Pollution data object.",
        },
    },
    args: {
        pollutionData: createPollutionMockData()["data"],
        sx: { maxWidth: 500 },
    },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
    render: (args) => {
        const { width, ...props } = args;
        return (
            <PollutionWidget
                {...props}
            />
        );
    },
};

export const Skeleton: Story = {
    args: {
        pollutionData: undefined,
    },
    render: (args) => {
        return (
            <PollutionWidget {...args} />
        );
    },
};
