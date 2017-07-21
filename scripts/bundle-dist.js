/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

"use strict";

require("./bundle-common")({
    bundle: "./bundles/rxjs-etc.umd.js",
    entry: "./dist/index.js",
    name: "RxExtra",
    useGlobal: true
});
