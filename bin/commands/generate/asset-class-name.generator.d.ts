import { Asset } from './asset';
export declare class AssetClassNameGenerator {
    constructor();
    generate(asset: Asset): string;
    private extractAllType(name);
    private extract(name);
}
