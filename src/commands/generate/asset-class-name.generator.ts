import * as path from 'path';
import { StringUtils } from '../../utils/string.utils';
import { Asset } from './asset';

export class AssetClassNameGenerator {
  constructor() {}

  public generate(asset: Asset): string {
    let type = asset.type;
    if(asset.type === 'all') {
      type = this.extractAllType(asset.template.name);
    }
    return`${ StringUtils.capitalize(this.extract(asset.name)) }${ StringUtils.capitalize(type) }`;
  }

  private extractAllType(name: string):string {
    return name.split('.')[0];
  }

  private extract(name: string): string {
    if (name.indexOf(path.sep) !== -1) {
      return name.split(path.sep).pop();
    } else {
      return name;
    }
  }
}