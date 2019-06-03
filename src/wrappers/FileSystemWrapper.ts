//import fs from 'fs';
//import path from 'path';
//const path = require('path');
import * as fs from 'fs';

/**
 * Wrapper class to use file system with promises
 */
export class FileSystemWrapper {
  public readAsync({ filePath }: { filePath: string }): Promise<string> {
    return new Promise<string>(
      (
        resolve: (value?: string | PromiseLike<string>) => void,
        reject: (reason?: any) => void
      ) => {
        fs.readFile(
          filePath,
          { encoding: 'utf8' },
          (error: NodeJS.ErrnoException, data: string) => {
            if (error) {
              reject(error);
            }

            resolve(data);
          }
        );
      }
    );
  }

  public async writeFileAsync({
    filePath,
    content
  }: {
    filePath: string;
    content: string;
  }): Promise<void> {
    return new Promise<void>(
      (
        resolve: (value?: void | PromiseLike<void>) => void,
        reject: (reason?: any) => void
      ) => {
        fs.writeFile(filePath, content, (error: NodeJS.ErrnoException) => {
          if (error) {
            if (error.errno === -2) {
              fs.mkdir(
                filePath.slice(0, filePath.lastIndexOf('/')),
                { recursive: true },
                async (err: NodeJS.ErrnoException) => {
                  if (err) {
                    reject(err);
                  }

                  this.writeFileAsync({ filePath, content }).then(resolve);
                }
              );
            } else {
              reject(error);
            }
          } else {
            resolve();
          }
        });
      }
    );
  }
}
