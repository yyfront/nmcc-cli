import { Asset } from './asset';
import { Logger } from '../../logger/logger.service';
export declare class AssetEmitter {
    private logger;
    constructor(logger?: Logger);
    emit(asset: Asset): Promise<void>;
    private createRecursiveDirectory(folder);
    private emitFile(asset);
}
