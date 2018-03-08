import { exec } from 'child_process';
import * as path from 'path';
import { Logger, LoggerService } from '../../logger/logger.service';
import { ColorService } from '../../logger/color.service';
import { FileSystemUtils } from '../../utils/file-system.utils';

export class GitRepository {
  constructor(
    private logger: Logger = LoggerService.getLogger()
  ) {}

  public async clone(remote: string, local: string, showList = true): Promise<void> {
    await this.gitClone(remote, local);
    await this.removeGitFolder(local);
    await this.removeGitIgnoreFile(local);
    await this.listCreatedFiles(local, showList);
  }

  private async gitClone(remote: string, local: string) {
    return new Promise<void>((resolve, reject) =>
      exec(`git clone ${ remote } ${ local }`, (error: Error) => {
        if (error !== undefined && error !== null) {
          reject();
        } else {
          resolve();
        }
      }));
  }

  private async removeGitFolder(local: string) {
    const gitFolderPath: string = path.resolve(local, '.git');
    await FileSystemUtils.rmdir(gitFolderPath);
  }

  private async removeGitIgnoreFile(local: string) {
    const gitIgnorePath: string = path.resolve(local, '.gitignore');
    try {
      await FileSystemUtils.rm(gitIgnorePath);
    } catch (e) {}
  }

  private async listCreatedFiles(local: string, showList: boolean) {
    if (!showList) return;
    const files: string[] = await FileSystemUtils.readdir(path.join(process.cwd(), local));
    files.forEach((file) => this.logger.info(ColorService.green('create'), file));
  }
}
