import { GitRepository} from './git.repository';
import { CreateArguments, CreateOptions } from './command';
import { Logger, LoggerService } from '../../logger/logger.service';

export class CreateHandler {
  private DEFAULT_REMOTE = 'https://github.com/yyfront/nmcc-app.git';

  constructor(
    private logger: Logger = LoggerService.getLogger(),
    private repository: GitRepository = new GitRepository(),
  ) {}

  public async handle(args: CreateArguments, options?: CreateOptions) {
    await this.repository.clone(this.computeRepository(options), args.name);
  }

  private computeRepository(options: CreateOptions): string {
    if ((options !== undefined && options !== null) && (options.repository !== undefined && options.repository !== null)) {
      return options.repository;
    } else {
      return this.DEFAULT_REMOTE;
    }
  }
}
