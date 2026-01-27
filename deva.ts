import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
    .
    .description("Dev Automation CLI tools for developer productivity");
    

program.command("barrel")
    .description("Automagically generates export for your index files")
    .option("-w", "--watch", "Runs the command in watch mode", false)
    .argument("<..files|..dirs>", "a list of files and directories to generate barrels for");
program.parse();