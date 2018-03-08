import { ColorService } from "../../logger/color.service";
import { Logger, LoggerService } from "../../logger/logger.service";

export interface ModuleMetadata {
  modules?: string[];
  controllers?: string[];
  components?: string[];
  exports?: string[];
}

export class ModuleMetadataParser {
  public METADATA_REGEX = new RegExp('@Module\\(([\\s\\S]*?)\\)');

  constructor(
    private logger: Logger = LoggerService.getLogger()
  ) {}

  public parse(content: string): ModuleMetadata {
    return <ModuleMetadata> JSON.parse(this.format(this.extractMetadataText(content)));
  }

  private format(content: string): string {
    const contentFormat = content
      .replace(/([a-zA-Z]+)/g, '"$1"')
      .replace(/(,)(\n})/, '$2');
    return contentFormat;
  }

  private extractMetadataText(content: string): string {
    const text = this.METADATA_REGEX.exec(content)[ 1 ];
    return text;
  }
}