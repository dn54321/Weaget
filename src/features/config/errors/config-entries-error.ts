import { ConfigEntriesAlert } from "@src/features/config/types/config.types";

class ConfigEntriesError extends Error {
    private alerts: Array<ConfigEntriesAlert>;
    constructor(alerts: Array<ConfigEntriesAlert>) {
        super();
        this.name = new.target.name;
        this.alerts = alerts;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
