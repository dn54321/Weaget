import "three-dots/dist/three-dots.css";
import "@styles/globals.css";
import { MeasurementScale } from "@project/src/types/measurement.types";
import type { Preview } from "@storybook/react";
import { SystemTheme } from "@project/src/types/system.types";
import { TemperatureScale } from "@project/src/types/weather.types";

const preview: Preview = {
    globalTypes: {
        theme: {
            description: "System Theme",
            defaultValue: SystemTheme.SYSTEM,

            toolbar: {
                title: "Theme",
                icon: "circlehollow",
                items: [SystemTheme.SYSTEM, SystemTheme.LIGHT, SystemTheme.DARK],
                dynamicTitle: true,
            },
        },
        measurementScale: {
            description: "Measurement Scale",
            defaultValue: MeasurementScale.METRIC,
            toolbar: {
                title: "Measurement",
                icon: "ruler",
                items: [MeasurementScale.METRIC, MeasurementScale.IMPERIAL],
                dynamicTitle: true,
            },
        },
        temperatureScale: {
            description: "Temperature Scale",
            defaultValue: TemperatureScale.CELSIUS,
            toolbar: {
                title: "Temperature",
                icon: "lightning",
                items: [TemperatureScale.CELSIUS, TemperatureScale.FAHRENHEIT, TemperatureScale.KELVIN],
                dynamicTitle: true,
            },
        },
    },
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
