import { Meta, StoryObj } from "@storybook/react";
import { PollutionWidget, type PollutionWidgetProps } from ".";
import { createPollutionMockData } from "@features/weaget/__mocks__/pollution.mock";
import { storybookWrapper } from "@utils/wrappers";
type StoryType = PollutionWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    argTypes: {
        pollutionData: {
            description: "Pollution data object.",
            name: "Pollution Data",
        },
    },
    args: {
        pollutionData: createPollutionMockData()["data"],
        sx: { maxWidth: 500 },
    },
    component: PollutionWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "Widgets/Pollution Widget",
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
    render: (args) => {
        return (
            <PollutionWidget
                {...args}
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
