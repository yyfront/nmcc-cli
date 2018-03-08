import { ModuleMetadataParser } from './module-metadata.parser';
import { Asset } from './asset';
import { Logger } from "../../logger/logger.service";
export declare class ModuleMetadataRegister {
    private logger;
    private parser;
    constructor(logger?: Logger, parser?: ModuleMetadataParser);
    register(asset: Asset, module: Asset): Asset;
    private updateMetadata(metadata, asset);
    private extractAllType(name);
    private updateModule(updatedMetadata, module);
}
