"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const flat = require("flat");
const jsYaml = require("js-yaml");
const FileSystemWrapper_1 = require("../wrappers/FileSystemWrapper");
class Translator {
    constructor() {
        this.fileSystemWrapper = new FileSystemWrapper_1.FileSystemWrapper();
    }
    generateYamlFileTranslationsArray({ filePath }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const yamlContent = yield this.fileSystemWrapper.readAsync({ filePath });
            const languagesResults = this.getLanguageResultArrayFromYamlContent({
                yamlContent
            });
            return languagesResults;
        });
    }
    getLanguageResultArrayFromYamlContent({ yamlContent }) {
        const _a = jsYaml.safeLoad(yamlContent), { LANGUAGES: languages } = _a, yamlObject = tslib_1.__rest(_a, ["LANGUAGES"]);
        const flatYamlObject = flat(yamlObject);
        const objectKeys = Object.keys(flatYamlObject);
        const result = Object.keys(languages).map((key) => {
            const languageKeys = objectKeys.filter((objKey) => objKey.includes(key));
            const languageResult = {};
            languageKeys.forEach((languageKey) => {
                const resultLanguageKey = `${languages[key]}.${languageKey.slice(0, languageKey.lastIndexOf('.'))}`;
                languageResult[resultLanguageKey] = flatYamlObject[languageKey];
            });
            return flat.unflatten(languageResult);
        });
        return result;
    }
}
exports.Translator = Translator;
//# sourceMappingURL=Translator.js.map