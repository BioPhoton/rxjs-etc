/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";

export function pluck<T, K extends keyof T>(key: K): (source: Observable<T>) => Observable<T[K]> {

    return (source) => source.map((value) => value[key]);
}
