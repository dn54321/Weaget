import { ConfigSources } from "@services/config/types/enums/config-sources.enum";
import { Configs } from "@services/config/types/enums/configs.enums";
import { ConfigEntries } from "@src/features/config/entities/config-entries.entity";
import { ConfigMalformedException } from "@src/features/config/errors/config-exception.error";
import { ConfigEntriesAlert, ConfigEntry, ConfigEnvConfig } from "@src/features/config/types/config.types";
import { ConfigEntryAlerts } from "@src/features/config/types/enums/config-entry-alerts.enum";
import { InvalidCastException } from "@src/features/core/errors/invalid-cast-exception.error";
import { TypeCastFactory } from "@src/features/core/services/type-cast.factory";

export class ConfigBuilder {
    private configEntries: ConfigEntries;
    private configEntryErrors: Array<ConfigEntriesAlert>;
    private typeCastFactory: TypeCastFactory;
    constructor() {
        this.configEntries = new ConfigEntries();
        this.configEntryErrors = [];
        this.typeCastFactory = new TypeCastFactory();
    }

    addEnvKey<K extends Configs = Configs>(
        key: K,
        settings: ConfigEnvConfig
    ): ConfigBuilder {
        const envSettings = {
            key: key,
            required: true,
            secret: true,
            source: ConfigSources.ENVIRONMENT,
            ...settings
        };

        const value = process.env[key];

        if (typeof key !== "string") {
            throw new Error(`Config key can only be of type string. Received '${key}'.`);
        }

        // This can happen if your node version is old.
        if (typeof value !== "string" && value !== undefined) {
            throw new Error(`Environment variable '${key}' must be a string. Received type '${typeof value}'.`);
        }

        if (envSettings.required && value === undefined) {
            this.configEntryErrors.push({ key: key, type: ConfigEntryAlerts.MISSING_KEY });
            return this;
        }

        else if (value === undefined) {
            this.configEntries.set(key, { ...envSettings, value: undefined });
            return this;
        }

        try {
            const typeCastedValue = this.typeCastFactory
                .get(envSettings.type)
                .cast(value);

            this.configEntries.set(key, {
                ...envSettings,
                value: typeCastedValue as ConfigEntry["value"]
            });
        }
        catch (err) {
            if (err instanceof InvalidCastException) {
                this.configEntryErrors.push({
                    key: key,
                    payload: { 
                        expected: envSettings.type,
                        received: envSettings.secret ? "<REDACTED>" : value
                    },
                    type: ConfigEntryAlerts.INVALID_KEY_TYPE
                });
            }
            else {
                throw err;
            }
        }

        return this;
    }

    make() {
        if (this.configEntryErrors.length > 0) {
            throw new ConfigMalformedException({
                errors: this.configEntryErrors,
                msg: "Received malformed config entries."
            });
        }

        const response = this.configEntries;
        this.reset();
        return response;
    }

    reset() {
        this.configEntries = new ConfigEntries();
        this.configEntryErrors = [];
    }
}
