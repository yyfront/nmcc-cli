import { Asset } from './asset';
import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { Logger, LoggerService } from '../../logger/logger.service';
import { ColorService } from '../../logger/color.service';

export class AssetEmitter {
  constructor(private logger: Logger = LoggerService.getLogger()) { }

  public async emit(asset: Asset) {
    await this.createRecursiveDirectory(asset.directory);
    await this.emitFile(asset);
  }

  private async createRecursiveDirectory(folder: string) {
    return new Promise(async (resovle, reject) => {
      try {
        await fse.mkdirs(folder);
        resovle();
      } catch (err) {
        reject(err);
      }
    });

  }

  private async emitFile(asset: Asset) {
    return new Promise((resolve, reject) => {
      const filename: string = path.join(asset.directory, asset.filename);
      fs.writeFile(filename, asset.template.content, (error: NodeJS.ErrnoException) => {
        if (error !== undefined && error !== null) {
          return reject(error);
        } else {
          this.logger.info(ColorService.green(' create'), filename);
          return resolve();
        }
      });
    });
  }
}