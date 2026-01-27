import { ConfigSources } from "@services/config/types/enums/config-sources.enum";

export interface ConfigAttributeSettings {
    required?: boolean
    secret?: boolean
    source: ConfigSources
    type: "boolean" | "number" | "string"
}
