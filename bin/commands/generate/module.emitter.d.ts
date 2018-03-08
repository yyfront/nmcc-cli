import { Asset } from './asset';
import { Logger } from '../../logger/logger.service';
export declare class ModuleEmitter {
    private logger;
    constructor(logger?: Logger);
    emit(module: Asset): Promise<{}>;
}
