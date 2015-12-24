# await-mutex

Promised based Mutex for cases where you need to synchronize sequentially the access to a single resource from multiple locations.

A typical use case for a mutex is when multiple asynchronous processes are fired and all of them have to execute another, **but the same**, asynchronous process as they arrive, one at a time, waiting for previous call (if any) to finish before calling it again.

[![build status](https://secure.travis-ci.org/substack/node-mkdirp.png)](http://travis-ci.org/substack/node-mkdirp)

## Examples

### file-appender.js

Let's you create an object to append to a certain file **one at a time**.

```js
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
```

## API

```js
import Mutex from "mutex";
```

### Mutex

Creates an instance of Mutex (can not be called without **new**).

```js
let mutex = new Mutex();
```

## Mutex.prototype.isLocked

Returns if the mutex instance is (true) or not locked (false).

```js
let unlock = await mutex.lock();

console.log(mutex.isLocked()); // prints true
```

## Mutex.prototype.lock: Promise

- Waits until the mutex is unlocked and then locks it.
- It returns an [ES2015 standard Promise](https://tc39.github.io/ecma262/#sec-promise-objects) (this allows the use of [async/await](http://tc39.github.io/ecmascript-asyncawait/)) which gets resolved once the mutex is unlocked.
- The promise resolution value is an **unlock function** that has to be called once the mutex needs to be unlocked.

```js
async function someFunc(mutex) {

    let unlock = await mutex.lock(); // wait until mutex is unlocked

    setTimeout(unlock, 3000);

    console.log(someFunc.name);
}

async function someOtherFunc(mutex) {

    let unlock = await mutex.lock(); // wait until mutex is unlocked

    console.log(someOtherFunc.name);
}

let mutex = new Mutex();

someFunc(mutex); // prints SomeFunc inmediately
someOtherFunc(mutex); // waits 3 secs for mutex to be unlocked and then prints SomeOtherFunc
```

## Installation

With [npm](http://npmjs.org) do:

```
npm install --save await-mutex
```

## Contributing

### Contributors

- [Mauro Titimoli](https://github.com/mgtitimoli)

### How to

Take a look to the [Contributing Guide](CONTRIBUTING.md)

## license

[Unlicense](http://unlicense.org/).
