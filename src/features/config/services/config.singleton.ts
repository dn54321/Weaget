import { ConfigEntries } from "@services/config/entities/config-entries.entity";
import { TypeStrings } from "@services/core/types/enums/type-strings.enum";
import { ConfigMapping } from "@src/features/config/types/config-mapping.types";
import chalk from "chalk";

import { ConfigDirector } from "./config.director";

export class ConfigSingleton {
    private static _instance: ConfigSingleton;
    private configDirector: ConfigDirector;
    private configEntries: ConfigEntries;
    private constructor(
        configDirector?: ConfigDirector,
        configEntries?: ConfigEntries
    ) {
        this.configDirector = configDirector ?? new ConfigDirector();
        this.configEntries = configEntries ?? new ConfigEntries();
    }

    public static getInstance() {
        if (!ConfigSingleton._instance) {
            ConfigSingleton._instance = new ConfigSingleton();
            const config = ConfigSingleton._instance.configDirector.getConfig().make();
            ConfigSingleton._instance.setConfig(config);
        }

        return ConfigSingleton._instance;
    }

    get<T extends keyof ConfigMapping>(key: T): ConfigMapping[T] {
        return this.configEntries.get(key);
    }

    getAllEntries() {
        return this.configEntries;
    }

    prettyPrintConfig() {
        console.log(chalk.underline.whiteBright("Environment Variables\n"));
        console.log("Environment Key".padEnd(32) +  "Value");
        console.log("=".repeat(42));
        const records = this.configEntries.getAllRecords();
        for (const [key, entry] of Object.entries(records)) {
            const line = chalk.cyan(key.padEnd(32));
            if (entry.required && entry.value === undefined) {
                console.log(line + chalk.redBright("<MISSING>"));
            }
            else if (!entry.required && entry.value === undefined) {
                console.log(line + chalk.yellow("<MISSING>"));
            }
            else if (entry.secret === true) {
                console.log(line + chalk.yellow("<REDACTED>"));
            }
            else if (entry.type === TypeStrings.BOOLEAN) {
                console.log(line + (entry.value ? chalk.green("True") : chalk.red("False")));
            }
            else {
                console.log(chalk.cyan(key.padEnd(32)) + entry.value);
            }
        }
    }

    setConfig(configEntries: ConfigEntries) {
        this.configEntries = configEntries;
    }
}
