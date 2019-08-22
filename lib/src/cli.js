#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: no-var-requires
const yargs = require("yargs");
const _1 = require(".");
const FormatOptions_1 = require("./enums/FormatOptions");
yargs
    .usage("Usage: $0 [options]")
    .options({
    gp: {
        alias: "globPath",
        demandOption: false,
        default: "./**/*.lang.yaml",
        describe: "Glob style path where to find the yaml lang files",
        type: "string"
    },
    outDir: {
        alias: "outputDirectory",
        demandOption: false,
        default: "./translations",
        describe: "Directory to output the translations",
        type: "string"
    },
    fmrt: {
        alias: "format",
        demandOption: false,
        default: "JSON",
        describe: "Compile output format",
        type: "string"
    },
    split: {
        alias: "splitFiles",
        demandOption: false,
        default: true,
        describe: "Compile to one file or separate by language",
        type: "boolean"
    },
    outName: {
        alias: "outputName",
        demandOption: false,
        default: "translations",
        describe: "Name of the output file, without the file extension. If splitFiles is true, this option is silently ignored.",
        type: "string"
    }
})
    .help();
if (yargs.argv.format.toUpperCase() !== "JS" &&
    yargs.argv.format.toUpperCase() !== "TS" &&
    yargs.argv.format.toUpperCase() !== "JSON") {
    console.error("Invalid format");
    process.exit(1);
}
const args = Object.assign({}, yargs.argv);
const options = {
    format: args.format.toUpperCase() === "JSON"
        ? FormatOptions_1.FormatOptions.JSON
        : args.format.toUpperCase() === "JS"
            ? FormatOptions_1.FormatOptions.JS
            : args.format.toUpperCase() === "JS_EXPORT_DEFAULT"
                ? FormatOptions_1.FormatOptions.JS_EXPORT_DEFAULT
                : FormatOptions_1.FormatOptions.TS,
    splitFiles: typeof args.splitFiles === "boolean" && args.splitFiles,
    outputName: typeof args.outputName === "string" && args.outputName
};
_1.compile(Object.assign({}, args, { options }))
    .then(() => {
    console.log("Compiled");
})
    .catch(() => {
    console.log("Compile error, try again");
});
//# sourceMappingURL=cli.js.map