import { ConfigMapping } from "@src/features/config/types/config-mapping.types";

import { ConfigSingleton } from "./config.singleton";


export class ConfigService {
    private config: ConfigSingleton;

    private constructor() {
        this.config = ConfigSingleton.getInstance();
    }

    getConfig<T extends keyof ConfigMapping>(key: T): ConfigMapping[T] {
        return this.config.get(key);
    }

    prettyPrintConfig() {
        return this.config.prettyPrintConfig();
    }
} 