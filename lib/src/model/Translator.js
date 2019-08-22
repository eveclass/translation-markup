"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const flat_1 = tslib_1.__importDefault(require("flat"));
const js_yaml_1 = tslib_1.__importDefault(require("js-yaml"));
const FileSystemWrapper_1 = require("../wrappers/FileSystemWrapper");
/**
 * Translator class does the yaml -> json translation
 */
class Translator {
    constructor() {
        this.fileSystemWrapper = new FileSystemWrapper_1.FileSystemWrapper();
    }
    /**
     * Generates a translation array from yaml file
     * @method generateYamlFileTranslationsArray
     * @param  yamlData object containing yaml filePath or yaml fileContent, if you provide both, the fileContent will always take precedent
     */
    generateYamlFileTranslationsArray(yamlData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let yamlContent;
            if ('filePath' in yamlData && !('fileContent' in yamlData)) {
                const { filePath } = yamlData;
                yamlContent = yield this.fileSystemWrapper.readAsync({
                    filePath
                });
            }
            if ('fileContent' in yamlData) {
                const { fileContent } = yamlData;
                yamlContent = fileContent;
            }
            const languagesResults = this.getLanguageResultArrayFromYamlContent({
                yamlContent
            });
            return languagesResults;
        });
    }
    getLanguageResultArrayFromYamlContent({ yamlContent }) {
        //Transform yamlContent into 2 objects
        const _a = js_yaml_1.default.safeLoad(yamlContent), { LANGUAGES: languages } = _a, yamlObject = tslib_1.__rest(_a, ["LANGUAGES"]);
        //flaten yamlObject
        const flatYamlObject = flat_1.default(yamlObject);
        //Get every possible flat yaml object key in a array
        const objectKeys = Object.keys(flatYamlObject);
        //Save every language translation object in a array
        const result = Object.keys(languages).map((key) => {
            //Get every key that contains this language translation
            const languageKeys = objectKeys.filter((objKey) => objKey.includes(key));
            //Save every language result and ajust the key removing the number and adding the language
            const languageResult = {};
            languageKeys.forEach((languageKey) => {
                //Remove key number and add language
                const resultLanguageKey = `${languages[key]}.${languageKey.slice(0, languageKey.lastIndexOf('.'))}`;
                //save result object
                languageResult[resultLanguageKey] = flatYamlObject[languageKey];
            });
            //apeend unflattened languageResult to result array
            return flat_1.default.unflatten(languageResult);
        });
        return result;
    }
}
exports.Translator = Translator;
//# sourceMappingURL=Translator.js.map