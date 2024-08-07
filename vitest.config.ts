import react from "@vitejs/plugin-react";
import { coverageConfigDefaults, defineConfig, UserConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()] as UserConfig["plugins"],
    test: {
        setupFiles: ["vitest-setup.ts"],
        environment: "jsdom",
        coverage: {
            thresholds: {
                lines: 95,
                functions: 95,
                branches: 95,
                statements: 95,
            },
            reporter: ["text", "json", "html"],
            include: [
                "src/**/*.{ts,tsx}",
                "app/**/*.{ts,tsx}",
            ],
            exclude: [
                "**/__mocks__/**",
                "**/*.stories.tsx",
                ...coverageConfigDefaults.exclude,
            ],
        },
    },
});
