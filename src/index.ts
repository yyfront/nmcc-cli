import * as program from 'caporal';
import { CreateCommand } from './commands/create/command';
import { GenerateCommand } from './commands/generate/command';
import { UpdateCommand } from './commands/update/command';

export class NestCliApplication {
  constructor() {}

  public static async start(version) {
    await this.run(version);
  }

  private static async run(version) {
    program
      .version(version)
      .help('Node project CLI for using nmcc');
    await new CreateCommand().init(program);
    await new GenerateCommand().init(program);
    await new UpdateCommand().init(program);
    program.parse(process.argv);
  }
}




