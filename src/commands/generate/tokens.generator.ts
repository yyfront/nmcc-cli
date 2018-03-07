import { Token } from './token';
import { Asset } from './asset';
import { TokenName } from './tokens-name';
import { StringUtils } from '../../utils/string.utils';

export class TokensGenerator {
  constructor() {}

  public generate(asset: Asset): Token[] {
    return [
      this.generateClassNameToken(asset),
      this.generateSpecImportToken(asset),
      this.generateServiceNameToken(asset),
      this.generateServicemportToken(asset),
      this.generateServiceNameLowerToken(asset)
    ];
  }

  private generateClassNameToken(asset: Asset): Token {
    return {
      name: TokenName.CLASS_NAME,
      value: asset.className
    };
  }

  private generateSpecImportToken(asset: Asset): Token {
    return {
      name: TokenName.SPEC_IMPORT,
      value: `./${ asset.filename.replace('.spec', '').replace(/.(ts|js)/, '') }`
    };
  }

  private generateServiceNameToken(asset: Asset): Token {
    return {
      name: TokenName.SERVICE_NAME,
      value: `${StringUtils.capitalize(asset.name)}Service`
    };
  }

  private generateServiceNameLowerToken(asset: Asset): Token {
    let result = this.generateServiceNameToken(asset);
    // 首字母小写
    result.value = result.value[0].toLowerCase() + result.value.slice(1);
    result.name = TokenName.SERVICE_NAME_LOWER;
    return result;
  }

  private generateServicemportToken(asset: Asset): Token {
    return {
      name: TokenName.SERVICE_IMPORT,
      value: `./${asset.name}.service`
    };
  }
}