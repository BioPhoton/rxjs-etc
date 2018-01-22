/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */

import { Observable } from "rxjs/Observable";
import { doIndex } from "../../operator/doIndex";

Observable.prototype.doIndex = doIndex;

declare module "rxjs/Observable" {
    interface Observable<T> {
        doIndex: typeof doIndex;
    }
}
