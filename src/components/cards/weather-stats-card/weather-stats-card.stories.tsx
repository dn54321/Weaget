import { Meta, StoryObj } from "@storybook/react";
import { storybookWrapper } from "@utils/wrappers";

import { WeatherStatsCard, type WeatherStatsCardProps } from ".";
import { createWeatherStatsCardStatMockData } from "./__mocks__/weather-stats-card.mock";

type StoryType = WeatherStatsCardProps & {
    skeleton?: boolean
    statsCount?: number
};

const meta: Meta<StoryType> = {
    args: {
        skeleton: false,
        stats: createWeatherStatsCardStatMockData(),
        sx: { maxWidth: 800 },
        transparent: false
    },
    argTypes: {
        skeleton: {
            defaultValue: undefined,
            description: "Displays a skeleton card.",
            name: "Skeleton",
            type: { name: "boolean", required: false }
        },
        stats: {
            description: "Stats to display.",
            if: { arg: "skeleton", truthy: false },
            name: "Stats"
        },
        statsCount: {
            control: {
                max: 10,
                min: 0,
                step: 1,
                type: "range"
            },
            defaultValue: 8,
            description: "Number of stats to display.",
            if: { arg: "skeleton", truthy: true },
            name: "Stats Count",
            type: { name: "number", required: false }
        },
        transparent: {
            defaultValue: false,
            description: "Makes the card transparent.",
            if: { arg: "skeleton", truthy: false },
            name: "Transparent Card",
            type: { name: "boolean", required: false }
        }
    },
    component: WeatherStatsCard,
    decorators: [storybookWrapper],
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    title: "Cards/Weather Stats Card"
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Transparent: Story = {
    args: {
        ...Primary.args,
        transparent: true
    }
};

export const SkeletonPrimary: Story = {
    args: {
        skeleton: true,
        statsCount: 8
    },
    name: "Skeleton (Primary)"
};

export const SkeletonTransparent: Story = {
    args: {
        transparent: true,
        ...SkeletonPrimary.args
    },
    name: "Skeleton (Transparent)"
};
