export interface GenerateArguments {
    type: string;
    name: string;
}
export declare class GenerateCommand {
    constructor();
    init(program: any): Promise<void>;
}
