import { exec } from 'child_process';
import { LoggerService } from '../../logger/logger.service';

export class DevCommand {
    public async init(program) {
        program
            .command('dev', 'start nest application')
            .action(async (args, options, logger) => {
                LoggerService.setLogger(logger);
                exec('npm start', function(err,stdout,stderr){
                    if(err) {
                        logger.error('error');
                    } else {
                        logger.info('run success');
                    }
                });
            });
    }
}
