import { UserConfig } from "i18next-parser";
import { SystemLocale } from "@src/types/system.types";
export default {
    indentation: 4,
    defaultNamespace: "common",
    locales: Object.values(SystemLocale),

} as UserConfig;
