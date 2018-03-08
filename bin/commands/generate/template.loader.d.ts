import { Template } from './template';
export declare class TemplateLoader {
    constructor();
    load(type: string, language: string): Promise<Template[]>;
    private addFileContent(type, filename, templates);
}
