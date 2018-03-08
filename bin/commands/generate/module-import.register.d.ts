import { Asset } from './asset';
import { Logger } from "../../logger/logger.service";
export declare class ModuleImportRegister {
    private logger;
    constructor(logger?: Logger);
    register(asset: Asset, module: Asset): Asset;
    private buildLineToInsert(asset, module);
    private removeExtension(filename);
}
