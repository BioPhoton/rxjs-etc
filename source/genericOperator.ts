/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable, OperatorFunction } from "rxjs";

export function genericOperator<I, O>(
    operator: OperatorFunction<I, O>
): {} extends I & O ? <T>(source: Observable<T>) => Observable<T> : never {
    return operator as any;
}
