/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

"use strict";

const browserify = require("browserify");
const fs = require("fs");

const shims = {
    "rxjs/add/observable/combineLatest": "Rx.unused",
    "rxjs/add/observable/from": "Rx.unused",
    "rxjs/add/observable/of": "Rx.unused",
    "rxjs/add/operator/concat": "Rx.unused",
    "rxjs/add/operator/dematerialize": "Rx.unused",
    "rxjs/add/operator/let": "Rx.unused",
    "rxjs/add/operator/map": "Rx.unused",
    "rxjs/add/operator/mapTo": "Rx.unused",
    "rxjs/add/operator/materialize": "Rx.unused",
    "rxjs/add/operator/switchMap": "Rx.unused",
    "rxjs/add/operator/toArray": "Rx.unused",
    "rxjs/add/operator/toPromise": "Rx.unused",
    "rxjs/BehaviorSubject": "Rx",
    "rxjs/Notification": "Rx",
    "rxjs/Observable": "Rx",
    "rxjs/Subject": "Rx",
    "rxjs/Subscriber": "Rx",
    "rxjs/symbol/rxSubscriber": "Rx.Symbol"
};

module.exports = function (options) {

    const writeStream = fs.createWriteStream(options.bundle);

    let bundler = browserify({
        entries: options.entry,
        fullPaths: false,
        standalone: options.name
    });
    if (options.useGlobal) {
        bundler = bundler.transform(require("browserify-global-shim").configure(shims));
        writeStream.on("close", () => { verify(options.bundle); });
    }
    bundler.bundle().pipe(writeStream);
}

function verify(path) {

    const content = fs.readFileSync(path).toString();
    if (/require\s*\(\s*['"]rxjs/.test(content)) {
        throw new Error(`Found an unshimmed require in ${path}`);
    }
}
