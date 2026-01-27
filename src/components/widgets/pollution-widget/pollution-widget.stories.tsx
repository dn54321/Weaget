import { createPollutionMockData } from "@src/apis/weaget/pollution/__mocks__/pollution.mock";
import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { PollutionWidget, type PollutionWidgetProps } from ".";
type StoryType = PollutionWidgetProps & { width: number };

const meta: Meta<StoryType> = {
    args: {
        pollutionData: createPollutionMockData()["data"],
        sx: { maxWidth: 500 }
    },
    argTypes: {
        pollutionData: {
            description: "Pollution data object.",
            name: "Pollution Data"
        }
    },
    component: PollutionWidget,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    title: "Widgets/Pollution Widget"
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
    }
};

export const Skeleton: Story = {
    args: {
        pollutionData: undefined
    },
    render: (args) => {
        return (
            <PollutionWidget {...args} />
        );
    }
};
