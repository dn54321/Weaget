import { ConfigEntriesExceptions } from "@src/features/config/types/config.types";
interface ConfigMalformedExceptionPayload {
    errors: Array<ConfigEntriesExceptions>
    msg: string
}

export class ConfigMalformedException extends Error {
    constructor(payload: ConfigMalformedExceptionPayload) {
        super(payload.msg + "\nConfig Entry Errors:\n " + JSON.stringify(payload.errors, null, 2));
        Object.setPrototypeOf(this, ConfigMalformedException.prototype);
    }
}
