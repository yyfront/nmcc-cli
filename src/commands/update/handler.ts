import { Logger, LoggerService } from '../../logger/logger.service';
import { ColorService } from '../../logger/color.service';
import { GitRepository } from '../create/git.repository';
import { FileSystemUtils } from '../../utils/file-system.utils';
import * as fse from 'fs-extra';
import * as path from 'path';


export class UpdateHandler {

    private DEFAULT_REMOTE = 'https://github.com/idea100/nest-app.git';
    private TEMP_UPDATE_FOLDER = 'tempUpdate';

    constructor(
        private logger: Logger = LoggerService.getLogger(),
        private repository: GitRepository = new GitRepository(),
    ) { }

    public async handle() {
        await this.repository.clone(this.DEFAULT_REMOTE, this.TEMP_UPDATE_FOLDER, false);
        await this.deleteOldModule();
        await this.updateModule();
        await this.deleteTempUpdate();
        this.logger.info(ColorService.blue('update success'));
    }

    private async deleteTempUpdate() {
        return new Promise(async (resolve, reject) => {
            try {
                await fse.remove(path.resolve(this.TEMP_UPDATE_FOLDER));
                resolve();
            } catch (err) {
                reject(err)
            }
        })
    }

    private async deleteOldModule() {
        return new Promise(async (resolve, reject) => {
            try {
                const originModule = path.resolve('src/modules');
                let moduleArr = await FileSystemUtils.readdir(originModule);
                moduleArr = moduleArr.filter((item) => item.indexOf('$') >= 0);

                for (let module of moduleArr) {
                    await fse.remove(path.resolve('src/modules', module));
                }
                resolve();
            } catch (err) {
                reject(err)
            }
        })
    }


    private async updateModule() {
        return new Promise(async (resolve, reject) => {
            try {
                const updateModule = path.resolve(this.TEMP_UPDATE_FOLDER, 'src/modules');
                const originModule = path.resolve('src/modules');

                let moduleArr = await FileSystemUtils.readdir(updateModule);
                moduleArr = moduleArr.filter((item) => item.indexOf('$') >= 0);

                for (let module of moduleArr) {
                    const destination = path.resolve(this.TEMP_UPDATE_FOLDER, 'src/modules', module);
                    await fse.copy(destination, path.resolve(originModule, module));
                    this.logger.info(ColorService.yellow('update'), path.resolve(originModule, module));
                }
                resolve();
            } catch (err) {
                reject(err);
            }


        });

    }
}