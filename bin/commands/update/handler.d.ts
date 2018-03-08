import { Logger } from '../../logger/logger.service';
import { GitRepository } from '../create/git.repository';
export declare class UpdateHandler {
    private logger;
    private repository;
    private DEFAULT_REMOTE;
    private TEMP_UPDATE_FOLDER;
    private MODULE_LOCATION;
    constructor(logger?: Logger, repository?: GitRepository);
    handle(): Promise<void>;
    private deleteTempUpdate();
    private filterModule(src, filter);
    private deleteOldModule();
    private updateModule();
}
