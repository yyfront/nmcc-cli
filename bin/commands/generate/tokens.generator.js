"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_name_1 = require("./tokens-name");
const string_utils_1 = require("../../utils/string.utils");
class TokensGenerator {
    constructor() { }
    generate(asset) {
        return [
            this.generateClassNameToken(asset),
            this.generateSpecImportToken(asset),
            this.generateServiceNameToken(asset),
            this.generateServicemportToken(asset),
            this.generateServiceNameLowerToken(asset)
        ];
    }
    generateClassNameToken(asset) {
        return {
            name: tokens_name_1.TokenName.CLASS_NAME,
            value: asset.className
        };
    }
    generateSpecImportToken(asset) {
        return {
            name: tokens_name_1.TokenName.SPEC_IMPORT,
            value: `./${asset.filename.replace('.spec', '').replace(/.(ts|js)$/, '')}`
        };
    }
    generateServiceNameToken(asset) {
        return {
            name: tokens_name_1.TokenName.SERVICE_NAME,
            value: `${string_utils_1.StringUtils.capitalize(asset.name)}Service`
        };
    }
    generateServiceNameLowerToken(asset) {
        let result = this.generateServiceNameToken(asset);
        result.value = result.value[0].toLowerCase() + result.value.slice(1);
        result.name = tokens_name_1.TokenName.SERVICE_NAME_LOWER;
        return result;
    }
    generateServicemportToken(asset) {
        return {
            name: tokens_name_1.TokenName.SERVICE_IMPORT,
            value: `./${asset.name}.service`
        };
    }
}
exports.TokensGenerator = TokensGenerator;
