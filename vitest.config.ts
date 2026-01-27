import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        coverage: {
            provider: "v8", // properly covers type files
            exclude: [
                "**/__mocks__/**",
                "**/*.stories.tsx",
                "**/*.styles.tsx",
                ...coverageConfigDefaults.exclude,
                "src/utils/wrappers.tsx", // Used only for tests and development
            ],
            include: [
                "src/**/*.{ts,tsx}",
                "app/**/*.{ts,tsx}",
            ],
            reporter: ["text", "json", "html"],
            thresholds: {
                branches: 95,
                functions: 95,
                lines: 95,
                statements: 95,
            },
        },
        css: true,
        environment: "jsdom",
        setupFiles: ["vitest-setup.ts"],
    },
});
