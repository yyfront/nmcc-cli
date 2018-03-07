import * as program from 'caporal';
import { ConfigurationLoader } from './configuration/configuration.loader';
import { ColorService } from './logger/color.service';
import { CreateCommand } from './commands/create/command';
import { InfoCommand } from './commands/info/command';
import { ServeCommand } from './commands/serve/command';
import { GenerateCommand } from './commands/generate/command';
import { UpdateCommand } from './commands/update/command';
import { DevCommand } from './commands/dev/command';
import { BuildCommand } from './commands/build/command';

export class NestCliApplication {
  constructor() {}

  public static async start(version) {
    await this.run(version);
  }

  private static async run(version) {
    program
      .version(version)
      .help('Node project CLI for using Nest.js');
    await new CreateCommand().init(program);
    await new InfoCommand().init(program);
    await new ServeCommand().init(program);
    await new GenerateCommand().init(program);
    await new UpdateCommand().init(program);
    await new DevCommand().init(program);
    await new BuildCommand().init(program);
    program.parse(process.argv);
  }
}




