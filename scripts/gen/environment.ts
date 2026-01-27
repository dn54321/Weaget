import { logCommand } from "@project/src/utils/cli";
import { filter2 } from "@project/src/utils/math";
import crypto from "crypto";
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = await yargs(hideBin(process.argv))
    .command(
        "[OPTION]... <file>", 
        "Generates an environment file from the template"
    )
    .positional("files", {
        array: true,
        demandOption: true,
        describe: "The file name to generate the environment file",
        type: "string"
    })
    .example("env 'local'", "Generates a starter environment file and/or updates an environment file.")
    .parse();

main(argv);

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

async function main(args: typeof argv) {
    logCommand(args);

    const template = parseFile("./.env.template");
    const [realFiles, fakeFiles] = filter2(args["_"] as Array<string>, fs.existsSync);

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