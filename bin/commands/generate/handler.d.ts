import { GenerateArguments } from './command';
import { Logger } from '../../logger/logger.service';
import { TemplateLoader } from './template.loader';
import { AssetGenerator } from './asset.generator';
import { TokensGenerator } from './tokens.generator';
import { TemplateReplacer } from './template.replacer';
import { AssetEmitter } from './asset.emitter';
import { ModuleLoader } from './module.loader';
import { ModuleRegister } from './module.register';
import { ModuleEmitter } from './module.emitter';
export declare class GenerateHandler {
    private logger;
    private templateLoader;
    private assetGenerator;
    private tokensGenerator;
    private templateReplacer;
    private assetEmitter;
    private moduleLoader;
    private moduleRegister;
    private moduleEmitter;
    constructor(logger?: Logger, templateLoader?: TemplateLoader, assetGenerator?: AssetGenerator, tokensGenerator?: TokensGenerator, templateReplacer?: TemplateReplacer, assetEmitter?: AssetEmitter, moduleLoader?: ModuleLoader, moduleRegister?: ModuleRegister, moduleEmitter?: ModuleEmitter);
    handle(args: GenerateArguments): Promise<void>;
}
