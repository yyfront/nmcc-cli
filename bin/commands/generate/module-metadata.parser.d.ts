import { Logger } from "../../logger/logger.service";
export interface ModuleMetadata {
    modules?: string[];
    controllers?: string[];
    components?: string[];
    exports?: string[];
}
export declare class ModuleMetadataParser {
    private logger;
    METADATA_REGEX: RegExp;
    constructor(logger?: Logger);
    parse(content: string): ModuleMetadata;
    private format(content);
    private extractMetadataText(content);
}
