"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../../logger/logger.service");
const color_service_1 = require("../../logger/color.service");
const template_loader_1 = require("./template.loader");
const asset_generator_1 = require("./asset.generator");
const tokens_generator_1 = require("./tokens.generator");
const template_replacer_1 = require("./template.replacer");
const asset_emitter_1 = require("./asset.emitter");
const module_loader_1 = require("./module.loader");
const module_register_1 = require("./module.register");
const module_emitter_1 = require("./module.emitter");
class GenerateHandler {
    constructor(logger = logger_service_1.LoggerService.getLogger(), templateLoader = new template_loader_1.TemplateLoader(), assetGenerator = new asset_generator_1.AssetGenerator(), tokensGenerator = new tokens_generator_1.TokensGenerator(), templateReplacer = new template_replacer_1.TemplateReplacer(), assetEmitter = new asset_emitter_1.AssetEmitter(), moduleLoader = new module_loader_1.ModuleLoader(), moduleRegister = new module_register_1.ModuleRegister(), moduleEmitter = new module_emitter_1.ModuleEmitter()) {
        this.logger = logger;
        this.templateLoader = templateLoader;
        this.assetGenerator = assetGenerator;
        this.tokensGenerator = tokensGenerator;
        this.templateReplacer = templateReplacer;
        this.assetEmitter = assetEmitter;
        this.moduleLoader = moduleLoader;
        this.moduleRegister = moduleRegister;
        this.moduleEmitter = moduleEmitter;
    }
    handle(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = 'ts';
            const templates = yield this.templateLoader.load(args.type, language);
            const assets = templates
                .map((template) => this.assetGenerator.generate({
                type: args.type,
                name: args.name,
                template
            }))
                .map((asset) => {
                const tokens = this.tokensGenerator.generate(asset);
                asset.template = Object.assign({}, this.templateReplacer.replace(asset.template, tokens));
                return asset;
            });
            for (const asset of assets) {
                yield this.assetEmitter.emit(asset);
            }
            const assetArr = assets.filter((asset) => asset.filename.indexOf('spec') === -1 && asset.filename.indexOf('module.') === -1);
            for (const item of assetArr) {
                const module = yield this.moduleLoader.load(item);
                const registeredModule = this.moduleRegister.register(item, module);
                yield this.moduleEmitter.emit(registeredModule);
            }
            this.logger.info(color_service_1.ColorService.blue(' generate success'));
        });
    }
}
exports.GenerateHandler = GenerateHandler;
