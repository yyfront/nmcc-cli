"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateReplacer {
    constructor() { }
    replace(template, tokens) {
        return {
            name: template.name,
            content: this.replaceTokens(template.content, tokens)
        };
    }
    replaceTokens(content, tokens) {
        return tokens
            .reduce((currentContent, token) => currentContent.replace(new RegExp(token.name, 'g'), token.value), content);
    }
}
exports.TemplateReplacer = TemplateReplacer;
