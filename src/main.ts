/**
 * Some predefined delays (in milliseconds).
 */
// export enum Delays {
//   Short = 500,
//   Medium = 2000,
//   Long = 5000,
// }

// /**
//  * Returns a Promise<string> that resolves after given time.
//  *
//  * @param {string} name - A name.
//  * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
//  * @returns {Promise<string>}
//  */
// function delayedHello(
//   name: string,
//   delay: number = Delays.Medium,
// ): Promise<string> {
//   return new Promise((resolve: (value?: string) => void) =>
//     setTimeout(() => resolve(`Hello, ${name}`), delay),
//   );
// }

// // Below are examples of using TSLint errors suppression
// // Here it is suppressing missing type definitions for greeter function

// // tslint:disable-next-line typedef
// export async function greeter(name) {
//   // tslint:disable-next-line no-unsafe-any no-return-await
//   return await delayedHello(name, Delays.Long);
// }
import * as fs from 'fs';
const fsPromises = fs.promises;

import * as util from 'util';
import * as glob from 'glob';
import * as yaml from 'js-yaml';
import * as flatten from 'flat';
import * as _ from 'lodash';

const globPromises = util.promisify(glob);

enum FormatOptions {
  JSON = 'JSON',
  JS = 'JS',
}

interface IOptions {
  format: FormatOptions;
  splitFiles: boolean;
}

async function splitFile(filename: string, outDir: string) {
  try {
    const doc = yaml.safeLoad(fs.readFileSync(filename, 'utf-8'));
    const outputFiles = [];
    for (const index in doc.LANGUAGES) {
      const language = doc.LANGUAGES[index];
      const { LANGUAGES, ...newDoc } = doc;
      const flattenedNewDoc = flatten(newDoc);
      const filteredFlattenedNewDoc = _.mapKeys(
        _.pickBy(flattenedNewDoc, (_value, key) => {
          const keys = key.split('.');
          return keys[keys.length - 1] == index;
        }),
        (_value, key) => {
          const props = key.split('.');
          return props.slice(0, props.length - 1).join('.');
        },
      );
      const filteredNewDoc = flatten.unflatten(filteredFlattenedNewDoc);
      const filteredJson = JSON.stringify(filteredNewDoc, null, 2);
      outputFiles.push(
        fsPromises.writeFile(
          `${outDir}/${language}.json`,
          filteredJson,
          'utf8',
        ),
      );
    }
    await Promise.all(outputFiles);
  } catch (err) {
    throw err;
  }
}

async function splitFiles(filenames: string[], outDir: string) {
  const files = [];
  filenames.forEach(filename => {
    files.push(splitFile(filename, outDir));
  });

  await Promise.all(files);
}

export default async function translateCompile(
  globPath: string,
  outDir?: string,
  options: IOptions = { format: FormatOptions.JSON, splitFiles: true },
) {
  try {
    // Get list of input .tm filenames.
    const filenames = await globPromises(globPath);
    if (!outDir) {
      outDir = '.';
    } else if (outDir.substr(-1) == '/' && outDir.length > 1) {
      outDir = outDir.slice(0, outDir.length - 1);
    }

    // Split files. (later: or not)
    if (options.splitFiles) {
      await splitFiles(filenames, outDir);
    }
  } catch (err) {
    throw err;
  }
}
