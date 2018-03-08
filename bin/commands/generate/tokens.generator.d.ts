import { Token } from './token';
import { Asset } from './asset';
export declare class TokensGenerator {
    constructor();
    generate(asset: Asset): Token[];
    private generateClassNameToken(asset);
    private generateSpecImportToken(asset);
    private generateServiceNameToken(asset);
    private generateServiceNameLowerToken(asset);
    private generateServicemportToken(asset);
}
