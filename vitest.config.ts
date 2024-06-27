import react from '@vitejs/plugin-react'
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        setupFiles: ['test-setup.ts'],
        environment: 'jsdom',
        coverage: {
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80
            },
            reporter: ['text', 'json', 'html'],
            include: [
                'src/**/*.{ts,tsx}', 
                'app/**/*.{ts,tsx}', 
            ],
            exclude: [
                '**/__mocks__/**', 
                ...coverageConfigDefaults.exclude
            ]
        },
    },
});