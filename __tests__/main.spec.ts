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

test('generated files are equal to expected files', done => {
  try {
    fs.unlinkSync('./__tests__/output/en-US.json');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  try {
    fs.unlinkSync('./__tests__/output/pt-BR.json');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  translateCompile('**/*.tm', './__tests__/output').then(() => {
    const fileEnUs = fs.readFileSync('./__tests__/output/en-US.json', 'utf8');
    const filePtBr = fs.readFileSync('./__tests__/output/pt-BR.json', 'utf8');
    const expectedEnUs = fs.readFileSync(
      './__tests__/output/en-US.expected.json',
      'utf8',
    );
    const expectedPtBr = fs.readFileSync(
      './__tests__/output/pt-BR.expected.json',
      'utf8',
    );

    expect(fileEnUs).toBe(expectedEnUs);
    expect(filePtBr).toBe(expectedPtBr);

    done();
  });
});
