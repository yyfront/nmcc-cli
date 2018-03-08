/// <reference types="node" />
import * as fs from 'fs';
export declare class FileSystemUtils {
    static rmdir(name: string): Promise<string>;
    private static fsrmdir(dirname);
    static mkdir(target: string): Promise<string>;
    private static mkdirProcess(target);
    private static fsmkdir(target);
    static stat(filename: string): Promise<fs.Stats>;
    static readdir(dirname: string): Promise<string[]>;
    static rm(filename: string): Promise<string>;
    static readFile(filename: string): Promise<string>;
    static writeFile(filename: string, content: string): Promise<{}>;
}
