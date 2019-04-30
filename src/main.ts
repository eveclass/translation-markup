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
      const filteredJson = JSON.stringify(filteredObject, null, 2);
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

/**
 * Convert a TM file content (as string) to YAML format (also as string).
 * @param translateMarkup A .tm file content.
 * @returns A .yaml file content.
 */
export function tmToYaml(translateMarkup: string): string {
  const lines = translateMarkup.split('\n');

  // Add a colon to every line that is not empty and doesn't have a colon.
  // Add spaces after colon if there isn't one.
  const yamlLines = lines.map(line => {
    if (line === '' || line.includes(': ')) {
      return line;
    }

    if (line.includes(':')) {
      return line.replace(':', ': ');
    }

    return line + ':';
  });

  return yamlLines.join('\n');
}

export default async function translateCompile(
  globPath: string,
  outDir?: string,
  options: IOptions = { format: FormatOptions.JSON, splitFiles: true },
) {
  try {
    // Get list of input .tm filenames.
    const filenames = await globPromises(globPath);

    // Default outDir is current directory.
    // If there is an outDir, remove trailing slash.
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
