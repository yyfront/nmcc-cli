import { Logger } from '../../logger/logger.service';
import { Asset } from './asset';
import { AssetClassNameGenerator } from './asset-class-name.generator';
import { AssetDirectoryNameGenerator } from './asset-directory-name.generator';
import { AssetFileNameGenerator } from './asset-file-name.generator';
export declare class AssetGenerator {
    private logger;
    private className;
    private directory;
    private filename;
    constructor(logger?: Logger, className?: AssetClassNameGenerator, directory?: AssetDirectoryNameGenerator, filename?: AssetFileNameGenerator);
    generate(asset: Asset): Asset;
}
