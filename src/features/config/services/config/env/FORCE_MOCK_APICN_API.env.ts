import { TypeStrings } from "@services/core/types/enums/type-strings.enum";
import { ConfigBuilder } from "@src/features/config/services/config.builder";
import { ConfigEnvConfig } from "@src/features/config/types/config.types";
import { Configs } from "@src/features/config/types/enums/configs.enums";
import { ConfigEnvironmentEntry } from "@src/features/config/types/interfaces/env.types";

export class FORCE_MOCK_APICN_API implements ConfigEnvironmentEntry {
    addEnvironment(configBuilder: ConfigBuilder): ConfigBuilder {
        const config: ConfigEnvConfig = {
            description: "Determines whether the APICN API endpoint should be forcefully mocked.",
            secret: false,
            type: TypeStrings.BOOLEAN
        };

        return configBuilder
            .addEnvKey(Configs.FORCE_MOCK_APICN_API, config);
    }
}
