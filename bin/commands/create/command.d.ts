export interface CreateArguments {
    name: string;
    destination?: string;
}
export interface CreateOptions {
    repository: string;
}
export declare class CreateCommand {
    constructor();
    init(program: any): Promise<void>;
}
