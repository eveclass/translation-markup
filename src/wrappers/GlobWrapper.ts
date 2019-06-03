import * as glob from 'glob';

/**
 * Wrapper class to use glob methods as promises
 */
export class GlobWrapper {
  /**
   * Perform a asynchronus file glob search
   * @param {string} pattern Glob path pattern
   */
  public globAsync({ pattern }: { pattern: string }) {
    return new Promise<string[]>(
      (
        resolve: (value?: string[] | PromiseLike<string[]>) => void,
        reject: (reason?: any) => void
      ) => {
        glob(pattern, (error: Error, data: string[]) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      }
    );
  }
}
