import { ConfigMapping } from "@src/features/config/types/config-mapping.types";
import { ConfigEntry } from "@src/features/config/types/config.types";

export class ConfigEntries {
    private configEntryRecord: Record<string, ConfigEntry>;
    constructor() {
        this.configEntryRecord = {};
    }

    get<T extends keyof ConfigMapping>(key: T): ConfigMapping[T] {
        return this.configEntryRecord[key].value as ConfigMapping[T];
    }

    getAllRecords() {
        return this.configEntryRecord;
    }

    getRecord(key: string) {
        return this.configEntryRecord[key];
    }

    remove(key: string) {
        delete this.configEntryRecord[key];
    }

    set(key: string, entry: ConfigEntry) {
        this.configEntryRecord[key] = entry;
    }
}
