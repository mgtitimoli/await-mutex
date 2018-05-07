import assert from "assert";

import Mutex from "../src/mutex";

describe("Mutex", () => {

    it("should return an instance of Mutex on creation", () => {

        let mutex = new Mutex();

        assert(mutex instanceof Mutex);
    });

    it("should be initially unlocked", () => {

        let mutex = new Mutex();

        assert(!mutex.isLocked());
    });

    it("should be locked inmediately after calling lock", () => {

        let mutex = new Mutex();

        mutex.lock();

        assert(mutex.isLocked());
    });

    it("should return an unlock function on lock", async () => {

        let mutex = new Mutex();

        let unlock = await mutex.lock();

        assert(typeof unlock === "function");
    });

    it("should unlock after calling unlock function returned by lock", async () => {

        let mutex = new Mutex();

        let unlock = await mutex.lock();

        setTimeout(unlock, 0);

        await mutex.lock();
    });

    it("isLocked should return true as long there is an ongoing lock", async () => {

        let mutex = new Mutex();

        let unlock = await mutex.lock();

        setTimeout(unlock, 0);

        await mutex.lock();

        assert(mutex.isLocked());
    });
});
