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
import * as util from 'util';
import * as globFunc from 'glob';
import * as yaml from 'js-yaml';
import * as flatten from 'flat';
import * as _ from 'lodash';

const glob = util.promisify(globFunc);

enum FormatOptions {
  JSON = 'JSON',
  JS = 'JS',
}

interface IOptions {
  format: FormatOptions;
  splitFiles: boolean;
}

function splitFile(filename: string) {
  try {
    const doc = yaml.safeLoad(fs.readFileSync(filename, 'utf-8'));
    for (const index in doc.LANGUAGES) {
      const language = doc.LANGUAGES[index];
      const { LANGUAGES, ...newDoc } = doc;
      const flattenedNewDoc = flatten(newDoc);
      const filteredFlattenedNewDoc = _.pickBy(
        flattenedNewDoc,
        (value, key) => {
          const keys = key.split('.');
          return keys[keys.length - 1] == index;
        },
      );
      console.log(flatten.unflatten(filteredFlattenedNewDoc));
      // TODO: Escrever YAML filtrado para um arquivo.
    }
    return doc;
  } catch (err) {
    throw err;
  }
}

function splitFiles(filenames: string[]) {
  const files = [];
  filenames.forEach(filename => {
    files.push(splitFile(filename));
  });

  return [];
}

export default async function translateCompile(
  globPath: string,
  outDir?: string,
  options: IOptions = { format: FormatOptions.JSON, splitFiles: true },
) {
  try {
    // Get list of input .tm filenames.
    const filenames = await glob(globPath);
    console.log(filenames);

    // Split files. (later: or not)
    let splittedFiles = [];
    if (options.splitFiles) {
      splittedFiles = splitFiles(filenames);
    }

    // Convert each file of the list to JSON. (later: or JS)
  } catch (err) {
    throw err;
  }
}
