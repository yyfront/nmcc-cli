import { GitRepository } from './git.repository';
import { CreateArguments, CreateOptions } from './command';
import { Logger } from '../../logger/logger.service';
export declare class CreateHandler {
    private logger;
    private repository;
    private DEFAULT_REMOTE;
    constructor(logger?: Logger, repository?: GitRepository);
    handle(args: CreateArguments, options?: CreateOptions): Promise<void>;
    private computeRepository(options);
}
