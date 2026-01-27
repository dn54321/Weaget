import { TypeStrings } from "@services/core/types/enums/type-strings.enum";
import { TypeMap } from "@src/features/core/types/type-map.type";

import { ConfigEntryAlerts } from "./enums/config-entry-alerts.enum";
import { ConfigSources } from "./enums/config-sources.enum";

export interface ConfigEntriesAlert<T = ConfigEntryAlerts, M = ConfigEntriesAlertPayloadMap> {
    key: string
    payload?: T extends keyof M ? M[T] : undefined
    type: T
}

export interface ConfigEntriesAlertPayloadMap {
    [ConfigEntryAlerts.INVALID_DEFAULT_VALUE_KEY_TYPE]: ConfigEntriesInvalidTypeKeyPayload
    [ConfigEntryAlerts.INVALID_KEY_TYPE]: ConfigEntriesInvalidTypeKeyPayload
}

export interface ConfigEntriesExceptions<T = ConfigEntryAlerts, M = ConfigEntriesAlertPayloadMap> {
    key: string
    payload?: T extends keyof M ? M[T] : undefined
    type: T
}

export interface ConfigEntriesInvalidTypeKeyPayload {
    expected: TypeStrings
    received: string
}

export type ConfigEntry<T extends keyof TypeMap = TypeStrings> = {
    /**
     * Whethere the key is loaded from. e.g. ENVIRONMENT, FILE, etc.
     */
    description?: string
    /**
     * Whether the key is required or not. (default: true)
     */
    required?: boolean
    /**
     * Used for logging to display or obfucsate the value. (default: true)
     */
    secret?: boolean
    /**
     * The type of the value.(default: Types.STRING)
     */
    source: ConfigSources
    type: TypeStrings
    value?: TypeMap[T]
};

export type ConfigEnvConfig = Omit<ConfigEntry, "source" | "value" >;
