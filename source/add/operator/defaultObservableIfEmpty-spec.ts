/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-etc
 */
/*tslint:disable:no-unused-expression*/

import { Observable } from "rxjs/Observable";
import { marbles } from "rxjs-marbles";

import "./defaultObservableIfEmpty";

describe("operator/defaultObservableIfEmpty", () => {

    it("should return the source if not empty", marbles((m) => {

        const source =   m.cold("--a--b--c--|");
        const subs =            "^----------!";
        const def =      m.cold("--d--|");
        const expected = m.cold("--a--b--c--|");

        const destination = source.defaultObservableIfEmpty(def);
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
        m.expect(def).toHaveSubscriptions([]);
    }));

    it("should return the default if empty", marbles((m) => {

        const source =   m.cold("----|");
        const sourceSubs =      "^---!";
        const def =          m.cold("--d--|");
        const defSubs =         "----^----!";
        const expected = m.cold("------d--|");

        const destination = source.defaultObservableIfEmpty(def);
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(sourceSubs);
        m.expect(def).toHaveSubscriptions(defSubs);
    }));
});
