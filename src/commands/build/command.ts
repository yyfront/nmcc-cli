import { exec } from 'child_process';
import { LoggerService } from '../../logger/logger.service';

export class BuildCommand {
    public async init(program) {
        program
            .command('build', 'build nest application')
            .action(async (args, options, logger) => {
                LoggerService.setLogger(logger);
                exec('npm run build', function(err,stdout,stderr){
                    if(err) {
                        logger.error('error');
                    } else {
                        logger.info('build success');
                    }
                });
            });
    }
}
