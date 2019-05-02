import * as fs from 'fs';

import translateCompile from '../src/main';
import { tmToYaml } from '../src/main';

describe('translate-markup to YAML function', () => {
  it('converts multiple files from .tl to .yaml correctly', () => {
    const filenames = ['hello', 'creditCard'];
    for (const filename of filenames) {
      try {
        fs.unlinkSync(`./__tests__/input/${filename}.yaml`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }

    for (const filename of filenames) {
      const fileTm = fs.readFileSync(
        `./__tests__/input/${filename}.tl`,
        'utf8',
      );
      const fileYaml = tmToYaml(fileTm);
      const expectedYaml = fs.readFileSync(
        `./__tests__/input/${filename}.expected.yaml`,
        'utf8',
      );

      expect(fileYaml).toBe(expectedYaml);
    }
  });
});

describe('main function', () => {
  it('generates files equal to the expected files', done => {
    const filenames = ['deutsch', 'english', 'enUS', 'esES', 'ptBR'];

    for (const filename of filenames) {
      try {
        fs.unlinkSync(`./__tests__/output/${filename}.json`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }

    translateCompile('**/*.tl', './__tests__/output').then(() => {
      for (const filename of filenames) {
        const file = fs.readFileSync(
          `./__tests__/output/${filename}.json`,
          'utf8',
        );
        const expected = fs.readFileSync(
          `./__tests__/output/${filename}.expected.json`,
          'utf8',
        );

        // Check if the two JSON files are equivalent.
        expect(JSON.parse(file)).toEqual(JSON.parse(expected));

        fs.unlinkSync(`./__tests__/output/${filename}.json`);
      }

      done();
    });
  });

  it('generates a single file equal to the expected file', done => {
    try {
      fs.unlinkSync(`./__tests__/output/translations.json`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    translateCompile('**/hello.tl', './__tests__/output', {
      splitFiles: false,
    }).then(() => {
      const file = fs.readFileSync(
        './__tests__/output/translations.json',
        'utf8',
      );
      const expected = fs.readFileSync(
        './__tests__/output/translations.expected.json',
        'utf8',
      );

      // Check if the two JSON files are equivalent.
      expect(JSON.parse(file)).toEqual(JSON.parse(expected));

      fs.unlinkSync(`./__tests__/output/translations.json`);

      done();
    });
  });
});
