import { Logger } from '../../logger/logger.service';
export declare class GitRepository {
    private logger;
    constructor(logger?: Logger);
    clone(remote: string, local: string, showList?: boolean): Promise<void>;
    private gitClone(remote, local);
    private removeGitFolder(local);
    private removeGitIgnoreFile(local);
    private listCreatedFiles(local, showList);
}
