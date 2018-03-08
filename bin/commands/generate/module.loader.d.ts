import { Asset } from './asset';
import { Logger } from "../../logger/logger.service";
export declare class ModuleLoader {
    private logger;
    constructor(logger?: Logger);
    load(asset: Asset): Promise<Asset>;
    private findModuleDirectoryFrom(directory, assetFilename);
    private read(directory);
    private isAModule(filename);
    private computeParentPathFrom(directory);
    private getModuleContent(moduleFilename);
}
