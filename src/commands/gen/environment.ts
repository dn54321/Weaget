import {Args, Command, Flags} from "@oclif/core";
import { filter2 } from "@utils/math";
import * as crypto from "crypto";
import * as fs from "fs";

type CommentNode = {
    key: string,
    type: "COMMENT",
    value: string,
};

type EnvNode = {
    key: string,
    type: "ENV_KEY", 
    value: string,
};


type FileNode = CommentNode | EnvNode;

export default class GenEnvironment extends Command {
    static override args = {
        file: Args.file({
            description: "the file to create or update the environment file.",
            required: true
        })
    };
    static override description = "Generates or updates new environment keys to an environment file.";
    static override examples = [
        "<%= config.bin %> <%= command.id %> dev",
        "<%= config.bin %> <%= command.id %> prod",
        {
            command: "<%= config.bin %> <%= command.id %> dev",
            description: "Creates an environment file '.env.dev'"
        },
        {
            command: "<%= config.bin %> <%= command.id %> --raw .env.prod",
            description: "Creates an environment file '.env.prod'"
        },
        {
            command: "<%= config.bin %> <%= command.id %> -r .env.test",
            description: "Creates an environment file '.env.test'"
        } 
    ];
    static override flags = {
        raw: Flags.boolean({char: "r", description: "Does not prepend .env. to the files."})
    };

    public async run(): Promise<void> {
        const {argv, flags} = await this.parse(GenEnvironment);
        main({
            files: argv as string[],
            raw: flags.raw
        });
    }
}

async function main(args: {files: Array<string>, raw: boolean}) {
    const template = parseFile("./.env.template");
    let files = args.files;

    if (!args.raw) {
        files = args.files.map(file => `.env.${file}`);
    }

    const [realFiles, fakeFiles] = filter2(files, fs.existsSync);

    for (const file of realFiles) {
        const tree = parseFile(file);
        const superTree = mergeTrees(tree, template);
        const content = treeToString(superTree);
        fs.writeFileSync(file, content);
    }

    for (const file of fakeFiles) {
        const content = treeToString(template);
        fs.writeFileSync(file, content);
    }

}

function mergeTrees(tree1: Array<FileNode>, tree2: Array<FileNode>): Array<FileNode> {
    const result: Array<FileNode> = [];
    const missed: Array<FileNode> = [];

    const tree1Map = tree1
        .map(v => v.key)
        .reduce((obj, v, idx) => Object.assign(obj, {[v]: idx}), {}) as Record<string, number>;
    const tree2Map = tree2
        .map(v => v.key)
        .reduce((obj, v, idx) => Object.assign(obj, {[v]: idx}), {}) as Record<string, number>;

    let pt1 = 0;
    let pt2 = 0;

    while (pt1 !== tree1.length && pt2 !== tree2.length) {
        if (pt1 === tree1.length) {
            result.push(tree2[pt2++]);
            continue;
        }

        if (pt2 === tree2.length) {
            result.push(tree1[pt1++]);
            continue;
        }

        if (tree1[pt1].key === tree2[pt2].key) {
            result.push(tree1[pt1++]);
            ++pt2;
            continue;
        }

        if (tree2[pt2].key in tree1Map) {
            if (tree1Map[tree2[pt2].key] < pt1) {
                ++pt2;
                continue;
            }

            result.push(tree1[pt1++]);
            continue;
        }

        if (tree1[pt1].key in tree2Map) {
            if (tree2Map[tree1[pt1].key] < pt2) {
                missed.push(tree1[pt1++]);
                continue;
            }
            result.push(tree2[pt2++]);
            continue;
        }

        result.push(tree1[pt1++]);
        result.push(tree2[pt2++]);
    }
   
    pt1 = 0;
    pt2 = 0;
    while (pt1 < missed.length && pt2 < result.length) {
        if  (missed[pt1].key === result[pt2].key) {
            result[pt2].value = missed[pt1++].value;
        }
        ++pt2;
    }

    return result;
}

function parseFile(filePath: string): Array<FileNode> {
    const text = fs.readFileSync(filePath, { encoding: "utf-8" });
    const fileNodes = text.split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            if (line.startsWith("#")) {
                return {
                    key: crypto.createHash("sha1").update(line).digest("hex"),
                    type: "COMMENT",
                    value: line
                } as CommentNode;
            }
            else {
                const [key, ...value] = line.split("=");
                return {
                    key: key,
                    type: "ENV_KEY",
                    value: value.join("=")
                } as EnvNode;
            }   
        });
    
    return fileNodes;
}

function treeToString(tree: Array<FileNode>) {
    let previousNodeType: string | undefined;
    return tree
        .map((node) => {
            if (node.type === "COMMENT") {
                const text = (previousNodeType === "ENV_KEY") ? `\n${node.value}` : node.value;
                previousNodeType = node.type;
                return text;
            }
            if (node.type === "ENV_KEY") {
                previousNodeType = node.type;
                return `${node.key}=${node.value}`;
            }
        })
        .join("\n");
}