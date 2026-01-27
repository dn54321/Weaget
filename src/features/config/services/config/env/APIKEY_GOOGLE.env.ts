import { TypeStrings } from "@services/core/types/enums/type-strings.enum";
import { ConfigBuilder } from "@src/features/config/services/config.builder";
import { ConfigEnvConfig } from "@src/features/config/types/config.types";
import { Configs } from "@src/features/config/types/enums/configs.enums";
import { ConfigEnvironmentEntry } from "@src/features/config/types/interfaces/env.types";

export class APIKEY_GOOGLE implements ConfigEnvironmentEntry {
    addEnvironment(configBuilder: ConfigBuilder): ConfigBuilder {
        const config: ConfigEnvConfig = {
            description: "API key for google's developer services. (https://developers.google.com/)",
            required: !process.env[Configs.USE_MOCK_ENDPOINTS],
            secret: true,
            type: TypeStrings.STRING
        };

        return configBuilder
            .addEnvKey(Configs.APIKEY_GOOGLE, config);
    }
}
