import { Command } from "@project/src/types/command.types";
import { logCommand } from "@project/src/utils/cli";
import { xand2 } from "@project/src/utils/math";
import { flattenObject, unflattenObject } from "@project/src/utils/object";
import fg from "fast-glob";
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const TRANSLATION_DIRECTORY = "src/i18n/locales";
const SOURCE_LANGUAGE = "en";
const argv = await yargs(hideBin(process.argv))
    .command(
        "[OPTION]... [FILE]...", 
        "Validates that all translations keys exists for other languages besides english."
    )
    .option("fix", {
        default: false,
        describe: "Runs the command in watch mode",
        type: "boolean"
    })
    .example("translint --fix", "Automatically detects and fixes missing translation keys")
    .parse();

export interface CommandArgs extends Command {
    fix?: boolean;
};

main(argv);

type Translation = {
    detectedSourceLanguage: "string",
    translatedText: "string",
};



function getTranslationKeys(filePath: string) {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const jsonObject = JSON.parse(fileContents);
    const flattenedObject = flattenObject(jsonObject);
    return flattenedObject;
}

async function getTranslations(translations: Array<string>, target: string) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_APIKEY}`, {
        body: JSON.stringify({
            "q": translations,
            "target": target
        }),
        method: "POST"
    }).then(res => res.json());

    return response.data.translations as Array<Translation>;
}

async function main(args: typeof argv) {
    logCommand(args);
    
    const langs = await fg("**", {
        cwd: TRANSLATION_DIRECTORY,
        onlyDirectories: true
    });

    if (args.fix && process.env.GOOGLE_APIKEY === undefined) {
        throw new Error("You must set the GOOGLE_APIKEY environment variable to run this script with '--fix' flag.");
    }

    const languages = langs.filter(lang => lang !== SOURCE_LANGUAGE);
    const translationFiles = langs.reduce((acc, lang) => Object.assign(acc, {
        [lang]: getTranslationKeys(`${TRANSLATION_DIRECTORY}/${lang}/common.json`)
    }), {} as Record<string, Record<string, string>>);

    const masterTranslationKeys = Object.keys(translationFiles[SOURCE_LANGUAGE]);
    const malformedLanguages = {} as Record<string, {extraKeys: Array<string>, missingKeys: Array<string>}>;
    for (const language of languages) {
        const langTranslationKeys = Object.keys(translationFiles[language]);
        const [missingKeys, extraKeys] = xand2(masterTranslationKeys, langTranslationKeys);
        if (missingKeys.length === 0 && extraKeys.length === 0) {
            continue;
        }
        malformedLanguages[language] = {
            extraKeys,
            missingKeys
        };
    }
    
    if (Object.keys(malformedLanguages).length > 0 && !args.fix) {
        throw new Error(`Found malformed keys. Please fix them to continue.\n ${JSON.stringify(malformedLanguages, null, 2)}`);
    }

    else if (Object.keys(malformedLanguages).length === 0) {
        console.log("No malformed keys found.");
        return;
    }

    console.log("Found malformed data, will attempt to fix...");
    for (const [lang, {extraKeys, missingKeys}] of Object.entries(malformedLanguages)) {
        const englishTranslations = missingKeys.map((key) => translationFiles[SOURCE_LANGUAGE][key]);
        const translations = await getTranslations(englishTranslations, lang);
        if (extraKeys.length > 0) {
            extraKeys.forEach(key => delete translationFiles[lang][key]);
        }
        
        if (missingKeys.length > 0) {
            missingKeys.forEach((key, idx) => translationFiles[lang][key] = translations[idx].translatedText);
        }

        const unflatMap = unflattenObject(translationFiles[lang]);
        const file = JSON.stringify(unflatMap, null, 2);
        fs.writeFile(`${TRANSLATION_DIRECTORY}/${lang}/common.json`, file, "utf8", (err) => {
            if (err) {
                console.error(`Error updating language file: ${lang}. ${err}`);
            }
            else {
                console.log(`Successfully updated language file: ${lang}`);
                extraKeys.forEach((key) => {
                    console.log(`Removed excess key:  "${key}".`);
                });
                missingKeys.forEach((key, idx) => {
                    console.log(`Added missing translation to "${key}" => "${translations[idx].translatedText}".`);
                });
            }
        });
    }
}