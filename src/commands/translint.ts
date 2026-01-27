import { Args, Command, Flags} from "@oclif/core";
import { xand2 } from "@utils/math";
import { flattenObject, unflattenObject } from "@utils/object";
import fg from "fast-glob";
import * as fs from "fs";

const TRANSLATION_DIRECTORY = "src/i18n/locales";
const SOURCE_LANGUAGE = "en";

type Translation = {
    detectedSourceLanguage: "string",
    translatedText: "string",
};

export default class TranslintEnvironment extends Command {
    static override args = {
        files: Args.file({
            description: "the translate file locales to translate. (DEFAULT: ALL)."
        })
    };
    static override description = "Validates that all translations keys exists for other languages besides english.";
    static override examples = [
        {
            command: "<%= config.bin %> <%= command.id %>",
            description: "Lists all the missing translation keys for each of the respective translation key."
        },
        {
            command: "<%= config.bin %> <%= command.id %> --fix",
            description: "Fills in missing translation keys using google translate."
        }
    ];
    static override flags = {
        fix: Flags.boolean({
            description: "Uses google translate API to translate and fill missing translation keys.",
            required: false
        })
    };
    static strict = false;

    public async run(): Promise<void> {
        const {argv, flags} = await this.parse(TranslintEnvironment);
        main({
            files: argv as string[],
            fix: Boolean(flags.fix)
        });
    }
}

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

async function main(args: {files?: Array<string>; fix: boolean,}) {

    const langs = await fg("**", {
        cwd: TRANSLATION_DIRECTORY,
        onlyDirectories: true
    });

    if (args.fix && process.env.GOOGLE_APIKEY === undefined) {
        throw new Error("You must set the GOOGLE_APIKEY environment variable to run this script with '--fix' flag.");
    }

    const candidateLanguages = langs.filter(lang => lang !== SOURCE_LANGUAGE);
    let languages = [...candidateLanguages];


    if (args.files) {
        const set = new Set(languages);
        languages = args.files.filter(lang => set.has(lang));
    }

    if (args.files && languages.length !== args.files.length) {
        const set = new Set(languages);
        const invalidLang = args.files.filter(lang => !set.has(lang));
        console.warn(`Languages not found: \n - ${invalidLang.map(x => `"${x}"`).join("\n - ")}\n`);
        console.warn("The above list will be skipped.");
        console.warn(`Valid languages are: ${candidateLanguages.map(x => `"${x}"`)}.\n`);
    }

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