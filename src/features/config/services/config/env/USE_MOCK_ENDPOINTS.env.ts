import { TypeStrings } from "@services/core/types/enums/type-strings.enum";
import { ConfigBuilder } from "@src/features/config/services/config.builder";
import { ConfigEnvConfig } from "@src/features/config/types/config.types";
import { Configs } from "@src/features/config/types/enums/configs.enums";
import { ConfigEnvironmentEntry } from "@src/features/config/types/interfaces/env.types";

export class MOCK_INVALID_APIS implements ConfigEnvironmentEntry {
    addEnvironment(configBuilder: ConfigBuilder): ConfigBuilder {
        const config: ConfigEnvConfig = {
            description: "Whether to mock endpoints for api endpoints without api-keys.",
            secret: false,
            type: TypeStrings.BOOLEAN
        };

        return configBuilder
            .addEnvKey(Configs.MOCK_INVALID_APIS, config);
    }
}
