import { Asset } from './asset';
export declare class AssetFileNameGenerator {
    constructor();
    generate(asset: Asset): string;
    private extractName(name);
    private addSpec(name);
    private extractAllType(name);
    private extractLanguage(name);
}
