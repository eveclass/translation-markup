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

/**
 * Convert a TM file content (as string) to YAML format (also as string).
 * @param translateMarkup A .tl file content.
 * @returns A .yaml file content.
 */
export function tmToYaml(translateMarkup: string): string {
  const lines = translateMarkup.split('\n');

  // Add a colon to every line that is not empty and doesn't have a colon.
  // Add spaces after colon if there isn't one.
  const yamlLines = lines.map(line => {
    if (line === '' || line.includes(': ')) return line;
    if (line.includes(':')) return line.replace(':', ': ');
    return line + ':';
  });

  return yamlLines.join('\n');
}

async function splitFile(filename: string, outDir: string) {
  try {
    const translateMarkup = fs.readFileSync(filename, 'utf-8');
    const yamlDoc = tmToYaml(translateMarkup);
    const yamlObject = yaml.safeLoad(yamlDoc);
    const outputFiles = [];
    for (const index in yamlObject.LANGUAGES) {
      const language = yamlObject.LANGUAGES[index];
      const { LANGUAGES, ...object } = yamlObject;
      const flattenedObject = flatten(object);

      // Separate comma keys: specific to our syntax.
      const separatedFlattenedObject = {};
      for (const key in flattenedObject) {
        const commaMatch = key.match(/\d+(,\d+)+/g);
        if (!commaMatch) {
          separatedFlattenedObject[key] = flattenedObject[key];
          continue;
        }

        const indices = commaMatch[0].split(',');
        indices.forEach(index => {
          const props = key.split('.');
          props[props.length - 1] = index;
          const newKey = props.join('.');
          separatedFlattenedObject[newKey] = flattenedObject[key];
        });
      }

      const filteredFlattenedObject = _.mapKeys(
        _.pickBy(separatedFlattenedObject, (_value, key) => {
          const keys = key.split('.');
          return keys[keys.length - 1] == index;
        }),
        (_value, key) => {
          const props = key.split('.');
          return props.slice(0, props.length - 1).join('.');
        },
      );
      const filteredObject = flatten.unflatten(filteredFlattenedObject);

      // Check if file already exists: if yes, merge the two together.
      let previousObject = {};
      try {
        previousObject = JSON.parse(
          await fsPromises.readFile(`${outDir}/${language}.json`, 'utf8'),
        );
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      const mergedObject = _.merge(previousObject, filteredObject);

      const translationsJson = JSON.stringify(mergedObject, null, 2);
      outputFiles.push(
        fsPromises.writeFile(
          `${outDir}/${language}.json`,
          translationsJson,
          'utf8',
        ),
      );
    }
    await Promise.all(outputFiles);
  } catch (err) {
    throw err;
  }
}

/**
 * Compile translate-markup files to JSON or JavaScript files.
 * @param globPath A glob path of the .tl files to compile.
 * @param outDir Directory to output the compiled JSON/JS files.
 * @param options The compiler options.
 */
export default async function translateCompile(
  globPath: string = '**/*.tl',
  outDir: string = '.',
  _options: IOptions = { format: FormatOptions.JSON, splitFiles: true },
) {
  try {
    // Get list of input .tl filenames.
    const filenames = await globPromises(globPath);

    // If there is a trailing slash in outDir, remove it.
    if (outDir.substr(-1) == '/' && outDir.length > 1) {
      outDir = outDir.slice(0, outDir.length - 1);
    }

    for (const filename of filenames) {
      await splitFile(filename, outDir);
    }
  } catch (err) {
    throw err;
  }
}
