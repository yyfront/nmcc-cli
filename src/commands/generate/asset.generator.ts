import { Logger, LoggerService } from '../../logger/logger.service';
import { ColorService } from '../../logger/color.service';
import { Asset } from './asset';
import { AssetClassNameGenerator } from './asset-class-name.generator';
import { AssetDirectoryNameGenerator } from './asset-directory-name.generator';
import { AssetFileNameGenerator } from './asset-file-name.generator';

export class AssetGenerator {
  constructor(
    private logger: Logger = LoggerService.getLogger(),
    private className: AssetClassNameGenerator = new AssetClassNameGenerator(),
    private directory: AssetDirectoryNameGenerator = new AssetDirectoryNameGenerator(),
    private filename: AssetFileNameGenerator = new AssetFileNameGenerator()
  ) {}

  public generate(asset: Asset): Asset {
    return Object.assign({
      className: this.className.generate(asset),
      directory: this.directory.generate(asset),
      filename : this.filename.generate(asset)
    }, asset);
  }

}