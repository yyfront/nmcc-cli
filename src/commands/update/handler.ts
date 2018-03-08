import { Logger, LoggerService } from '../../logger/logger.service';
import { ColorService } from '../../logger/color.service';
import { GitRepository } from '../create/git.repository';
import { FileSystemUtils } from '../../utils/file-system.utils';
import * as fse from 'fs-extra';
import * as path from 'path';


export class UpdateHandler {
    private DEFAULT_REMOTE = 'https://github.com/yyfront/nmcc-app.git';
    private TEMP_UPDATE_FOLDER = 'tempUpdate';
    private MODULE_LOCATION = 'src/modules';

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

    private async filterModule(src, filter) {
        const originModule = path.resolve(src);
        let moduleArr = await FileSystemUtils.readdir(originModule);
        return moduleArr.filter((item) => item.indexOf(filter) >= 0);
    }

    private async deleteOldModule() {
        return new Promise(async (resolve, reject) => {
            try {
                const originModule = path.resolve(this.MODULE_LOCATION);
                let moduleArr = await this.filterModule(originModule, '$');

                for (let module of moduleArr) {
                    await fse.remove(path.resolve(this.MODULE_LOCATION, module));
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
                const updateModule = path.resolve(this.TEMP_UPDATE_FOLDER, this.MODULE_LOCATION);
                const originModule = path.resolve(this.MODULE_LOCATION);

                let moduleArr = await this.filterModule(updateModule, '$');

                for (let module of moduleArr) {
                    const destination = path.resolve(this.TEMP_UPDATE_FOLDER, this.MODULE_LOCATION, module);
                    const updateDes = path.resolve(originModule, module);
                    await fse.copy(destination, updateDes);
                    this.logger.info(ColorService.yellow('update'), updateDes);
                }
                resolve();
            } catch (err) {
                reject(err);
            }


        });

    }
}