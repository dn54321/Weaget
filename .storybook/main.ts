import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [],
    framework: {
        name: "@storybook/nextjs-vite",
        options: {},
    },
    staticDirs: ["../public"],
    async viteFinal(config) {
        return mergeConfig(config, {
            plugins: [tsconfigPaths()],
        });
    },
};
export default config;
