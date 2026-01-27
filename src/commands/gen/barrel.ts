import {Args, Command, Flags} from "@oclif/core";
import chokidar from "chokidar";
import fg from "fast-glob";
import * as fs from "fs";
import ora from "ora";
import path from "path";

export default class GenBarrel extends Command {
    static override args = {
        files: Args.file({
            default: "src/features",
            description: "the file or folder locate and update index files."
        })
    };
    static override description = "Detects missing exports and automatically updates index files and folders with them.";
    static override examples = [
        "<%= config.bin %> <%= command.id %>"
    ];
    static override flags = {
        watch: Flags.boolean({char: "w"})
    };
    static strict = false;

    public async run(): Promise<void> {
        const {argv, flags} = await this.parse(GenBarrel);
        main({
            file: argv as string[],
            watch: Boolean(flags.watch)
        });
    }
}

function barrelAddFile(filePath: string) {
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath, ".ts");
    const indexFilePath = `${dir}/index.ts`;
    if (!fs.existsSync(indexFilePath)) {
        return;
    }

    const spinner = ora(`Adding ${fileName}.ts to index file (${indexFilePath})`).start();
    const stream =  fs.createWriteStream(indexFilePath, {flags:"a"});
    stream.write(`export * from "./${fileName}";\n`);
    stream.close();
    spinner.succeed(`Added ${fileName}.ts to index file`);
}

function barrelCheckFile(filePath: string): boolean {
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath, ".ts");
    const indexFilePath = `${dir}/index.ts`;
    let result = true;
    if (!fs.existsSync(indexFilePath)) {
        return true;
    }

    fs.readFile(indexFilePath, "utf8", (err, data) => {
        if (err) {
            return;
        }

        const fileExists = data
            .split("\n")
            .some(line => line.includes(`export * from './${fileName}'`));

        result = fileExists;
    });

    return result;
}

function barrelRemoveFile(filePath: string) {
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath, ".ts");
    const indexFilePath = `${dir}/index.ts`;
    if (!fs.existsSync(indexFilePath)) {
        return;
    }

    const spinner = ora(`Removing ${fileName} from index file`).start();
    fs.readFile(indexFilePath, "utf8", (err, data) => {
        const updatedFile = data
            .split("\n")
            .filter(line => line !== `export * from './${fileName}'`)
            .join("\n");

        fs.writeFile(indexFilePath, updatedFile, "utf8", () => {
            if (err) {
                spinner.fail(`Failed to remove '${fileName}' from index file.`);
            } else {
                spinner.succeed(`Successfully removed '${fileName}' from index file.`);
            }
        });
    });
}


async function barrelSyncIndex(indexPath: string) {
    const dir = path.dirname(indexPath);
    const fileName = path.basename(indexPath, ".ts");

    if (fileName !== "index") {
        throw new Error(`Expected index file but received: ${indexPath}`);
    }

    const spinner = ora(`Checking barrel file: ${indexPath}.`).start();
    const contents = fs.readFileSync(indexPath,"utf8");
    const importedFiles = contents
        .split("\n")
        .filter(line => line.startsWith("export * from \"./"))
        .map(line => line.match(/(?<=".\/).+?(?=")/)?.toString());
    
    const files = await fg("*.ts", {
        cwd: dir,
        ignore: ["index.ts"],
        onlyFiles: true
    }).then(
        files => files.map(file => file.replace(/\.[^/.]+$/, ""))
    );

    const importedFileSet = new Set(importedFiles);
    const unimportedFiles = files.filter(file => !importedFileSet.has(file));
    if (unimportedFiles.length  ===  0 ) {
        spinner.succeed(`Index file checked. No changes required. (${indexPath})`);
        return;
    }
    const stream =  fs.createWriteStream(indexPath, {flags:"a"});
    for (const unimportedFile of unimportedFiles) {
        stream.write(`export * from "./${unimportedFile}";\n`);
    }
    stream.close();
    spinner.succeed(`Index file checked. Added ${unimportedFiles.length} items to index. (${indexPath})`);
}

async function main(args: {file: Array<string>, watch?: boolean}) {
    const globs = args.file.map((file) => {
        if (!file.endsWith(".ts")) {
            return `./${file}/**/index.ts`;
        } 
        return file;
    });

    const paths = await fg(globs);

    await Promise.all(paths.map(async (file) => await barrelSyncIndex(file)));

    if (args.watch) {
        const files = args.file.map((file) => {
            if (!file.endsWith(".ts")) {
                return `./${file}/**/*.ts`;
            } 
            return file;
        });
        console.debug(files);

        chokidar.watch("./src/features", {
            ignored: (file) => file.endsWith(".index.ts"),
            ignoreInitial: true
        })
            .on("add", (path) => {console.log(path); barrelAddFile(path);})
            .on("change", (path) => !barrelCheckFile(path) && barrelAddFile(path))
            .on("unlink", (path) => barrelRemoveFile(path));
    }
}