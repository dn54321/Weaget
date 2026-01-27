import chalk from "chalk";

export function logCommand(args: object & {"$0": string}) {
    const name = args["$0"].split("/")[1];
    const capitalisedName = String(name).charAt(0).toUpperCase() + String(name).slice(1);
    console.log(chalk.bgYellowBright.bold(`> Running ${capitalisedName} Script \n`));

    console.log(`${chalk.white.bgGreen.bold("| Arguments |")}\n`);
    for (const [key, value] of Object.entries(args)) {
        if (key.length === 1 || key === "$0") {
            continue;
        }

        const keyString = chalk.cyan(" " + key.toUpperCase().padEnd(10));

        if (typeof value === "boolean") {
            console.log(`${keyString} ${chalk.bold(`${value}`.toUpperCase().padEnd(15))}`);
        }
        else if (typeof value === "string") {
            console.log(`${keyString} ${chalk.bold(`"${value}"`.padEnd(15))}`);
        }
        else if (Array.isArray(value)) {
            const arrString = (value as Array<unknown>).map(v => `${v}`);
            console.log(`${keyString} ${chalk.bold(`"${arrString.join(", ")}"`.padEnd(15))}`);
        }
    }

    console.log(`\n${chalk.bgGreen.bold("| Script |")}\n`);
}

