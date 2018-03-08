import { ModuleImportRegister } from './module-import.register';
import { ModuleMetadataRegister } from './module-metadata.register';
import { Asset } from './asset';
import { Logger } from "../../logger/logger.service";
export declare class ModuleRegister {
    private logger;
    private importRegister;
    private metadataRegister;
    constructor(logger?: Logger, importRegister?: ModuleImportRegister, metadataRegister?: ModuleMetadataRegister);
    register(asset: Asset, module: Asset): Asset;
}
