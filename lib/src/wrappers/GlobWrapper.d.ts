/**
 * Wrapper class to use glob methods as promises
 */
export declare class GlobWrapper {
    /**
     * Perform a asynchronus file glob search
     * @param {string} pattern Glob path pattern
     */
    globAsync({ pattern }: {
        pattern: string;
    }): Promise<string[]>;
}
