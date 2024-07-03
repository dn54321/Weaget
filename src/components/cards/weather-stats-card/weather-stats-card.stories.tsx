import { Meta, StoryObj } from "@storybook/react";
import { WeatherStatsCard, type WeatherStatsCardProps } from ".";
import { storybookWrapper } from "@utils/wrappers";
import { createWeatherStatsCardStatMockData } from "./__mocks__/weather-stats-card.mock";

type StoryType = WeatherStatsCardProps & {
    skeleton?: boolean;
    statsCount?: number;
};

const meta: Meta<StoryType> = {
    title: "Cards/Weather Stats Card",
    component: WeatherStatsCard,
    decorators: [storybookWrapper],
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        stats: {
            if: { arg: "skeleton", truthy: false },
            name: "Stats",
            description: "Stats to display.",
        },
        transparent: {
            if: { arg: "skeleton", truthy: false },
            name: "Transparent Card",
            description: "Makes the card transparent.",
            type: { name: "boolean", required: false },
            defaultValue: false,
        },
        skeleton: {
            name: "Skeleton",
            description: "Displays a skeleton card.",
            type: { name: "boolean", required: false },
            defaultValue: undefined,
        },
        statsCount: {
            if: { arg: "skeleton", truthy: true },
            name: "Stats Count",
            description: "Number of stats to display.",
            type: { name: "number", required: false },
            control: {
                type: "range",
                min: 0,
                max: 10,
                step: 1,
            },
            defaultValue: 8,
        },
    },
    args: {
        sx: { maxWidth: 800 },
        stats: createWeatherStatsCardStatMockData(),
        skeleton: false,
        transparent: false,
    },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Transparent: Story = {
    args: {
        ...Primary.args,
        transparent: true,
    },
};

export const SkeletonPrimary: Story = {
    name: "Skeleton (Primary)",
    args: {
        skeleton: true,
        statsCount: 8,
    },
};

export const SkeletonTransparent: Story = {
    name: "Skeleton (Transparent)",
    args: {
        transparent: true,
        ...SkeletonPrimary.args,
    },
};
