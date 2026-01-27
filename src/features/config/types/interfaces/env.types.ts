import { ConfigBuilder } from "@src/features/config/services/config.builder";

export interface ConfigEnvironmentEntry {
    addEnvironment(configBuilder: ConfigBuilder): ConfigBuilder
}
