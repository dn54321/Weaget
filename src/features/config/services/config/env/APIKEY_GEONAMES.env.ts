import { TypeStrings } from "@services/core/types/enums/type-strings.enum";
import { ConfigBuilder } from "@src/features/config/services/config.builder";
import { ConfigEnvConfig } from "@src/features/config/types/config.types";
import { Configs } from "@src/features/config/types/enums/configs.enums";
import { ConfigEnvironmentEntry } from "@src/features/config/types/interfaces/env.types";

export class APIKEY_GEONAMES implements ConfigEnvironmentEntry {
    addEnvironment(configBuilder: ConfigBuilder): ConfigBuilder {
        const config: ConfigEnvConfig = {
            description: "API key for geonames API services. (https://www.geonames.org/)",
            required: !process.env[Configs.USE_MOCK_ENDPOINTS],
            secret: true,
            type: TypeStrings.STRING
        };

        return configBuilder
            .addEnvKey(Configs.APIKEY_GEONAMES, config);
    }
}
