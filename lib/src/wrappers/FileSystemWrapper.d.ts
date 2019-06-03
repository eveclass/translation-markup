export declare class FileSystemWrapper {
    readAsync({ filePath }: {
        filePath: string;
    }): Promise<string>;
    writeFileAsync({ filePath, content }: {
        filePath: string;
        content: string;
    }): Promise<void>;
}
