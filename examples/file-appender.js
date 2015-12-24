/* eslint-env node */
import * as fs from "fs";
import Mutex from "mutex";

export default class FileAppender {

    constructor(filename) {

        this._filename = filename;
        this._mutex = new Mutex();
    }

    async append(data, options = undefined) {

        let unlock = await this._mutex.lock();

        fs.appendFile(this._filename, data, options, error => {

            unlock();

            if (error) {
                throw error;
            }
        });
    }
}
