
import { ConfigEnvironmentEntry } from "@src/features/config/types/interfaces/env.types";

import { ConfigBuilder } from "./config.builder";
import * as envClasses from "./config/env";

type ConfigEntryClass = {
    new(): ConfigEnvironmentEntry
};

export class ConfigDirector {
    private configBuilder: ConfigBuilder;

    constructor(configBuilder?: ConfigBuilder) {
        this.configBuilder = configBuilder ?? new ConfigBuilder();
    }

    getConfig(): ConfigBuilder {
        const entries = Object.values(envClasses);
        entries.forEach(async (Entry: ConfigEntryClass) => {
            const envClass = new Entry() as ConfigEnvironmentEntry;
            this.configBuilder = envClass.addEnvironment(this.configBuilder);
        });

        return this.configBuilder;
    }
}
