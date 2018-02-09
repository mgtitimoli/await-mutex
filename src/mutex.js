export default class Mutex {

    constructor() {

        this._locking = Promise.resolve();
        this._locked = 0;
    }

    isLocked() {

        return 0 !== this._locked;
    }

    lock() {

        ++this._locked;

        let unlockNext;

        let willLock = new Promise(resolve => unlockNext = resolve);

        willLock.then(() => --this._locked);

        let willUnlock = this._locking.then(() => unlockNext);

        this._locking = this._locking.then(() => willLock);

        return willUnlock;
    }
}
