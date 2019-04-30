// import { Delays, greeter } from '../src/main';

// describe('greeter function', () => {
//   // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
//   jest.useFakeTimers();

//   const name: string = 'John';

//   let hello: string;

//   // Act before assertions
//   beforeAll(async () => {
//     const p: Promise<string> = greeter(name);
//     jest.runOnlyPendingTimers();
//     hello = await p;
//   });

//   // Assert if setTimeout was called properly
//   it('delays the greeting by 2 seconds', () => {
//     expect(setTimeout).toHaveBeenCalledTimes(1);
//     expect(((setTimeout as Function) as jest.Mock).mock.calls[0][1]).toBe(
//       Delays.Long,
//     );
//   });

//   // Assert greeter result
//   it('greets a user with `Hello, {name}` message', () => {
//     expect(hello).toBe(`Hello, ${name}`);
//   });
// });

import * as fs from 'fs';

import translateCompile from '../src/main';
import { tmToYaml } from '../src/main';

describe('translate-markup to YAML function', () => {
  it('converts multiple files from .tm to .yaml correctly', () => {
    for (let i = 0; i < 2; i++) {
      try {
        fs.unlinkSync(`./__tests__/input/translation${i}.yaml`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }

    for (let i = 0; i < 2; i++) {
      const fileTm = fs.readFileSync(
        `./__tests__/input/translation${i}.tm`,
        'utf8',
      );
      const fileYaml = tmToYaml(fileTm);
      const expectedYaml = fs.readFileSync(
        `./__tests__/input/translation${i}.expected.yaml`,
        'utf8',
      );

      expect(fileYaml).toBe(expectedYaml);
    }
  });
});

describe('main function', () => {
  it('generates files equal to the expected files', done => {
    const filenames = ['enUS', 'esES', 'ptBR', 'en-US', 'pt-BR'];

    for (const filename of filenames) {
      try {
        fs.unlinkSync(`./__tests__/output/${filename}.json`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }

    translateCompile('**/*.tm', './__tests__/output').then(() => {
      for (const filename of filenames) {
        const file = fs.readFileSync(
          `./__tests__/output/${filename}.json`,
          'utf8',
        );
        const expected = fs.readFileSync(
          `./__tests__/output/${filename}.expected.json`,
          'utf8',
        );

        expect(file).toBe(expected);
      }

      done();
    });
  });
});
