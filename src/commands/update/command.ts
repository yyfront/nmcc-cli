import { LoggerService } from '../../logger/logger.service';
import { UpdateHandler} from './handler';

export class UpdateCommand {
  constructor() {}

  public async init(program) {
    program
      .command('update', 'Update the Nest project')
      .action(async (args, options, logger) => {
        LoggerService.setLogger(logger);
        logger.info('Inside update command handler');
        await new UpdateHandler().handle();
      });
  }
}
