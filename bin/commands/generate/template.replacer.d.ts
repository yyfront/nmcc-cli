import { Template } from './template';
import { Token } from './token';
export declare class TemplateReplacer {
    constructor();
    replace(template: Template, tokens: Token[]): Template;
    private replaceTokens(content, tokens);
}
