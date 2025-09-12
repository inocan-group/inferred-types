import { describe, it } from "vitest";
import type { Expect, IfLength, Length, Test } from "inferred-types/types";

import {
    narrow,
    ifLength
} from "inferred-types/runtime";

describe("IfLength<TCompareTo,TVal,IF,ELSE>", () => {

    it("evaluating a tuple", () => {
        type Tup1 = [1, 2, 3];
        type Tup2 = [3, 4, 5];

        type E1 = IfLength<Tup1, Length<Tup2>, "yes", "no">;
        type E2 = IfLength<Tup1, 3, "yes", "no">;
        type NE1 = IfLength<Tup1, 5, "yes", "no">;

        type cases = [
            Expect<Test<E1, "equals", "yes">>, //
            Expect<Test<E2, "equals", "yes">>, //
            Expect<Test<NE1, "equals", "no">>, //
        ];
    });

});

it("evaluating a string", () => {
    type E1 = IfLength<"Foobar", 6, "yes", "no">;
    type NE1 = IfLength<"Foobar", 3, "yes", "no">;

    type cases = [
        Expect<Test<E1, "equals", "yes">>, //
        Expect<Test<NE1, "equals", "no">>, //Expect<Equal<E1, "equals",  "yes">>, //
    ];

});

describe("ifLength(val,len,if,else)", () => {

    it("happy path", () => {
        const tuple1 = narrow([1, 2, 3]);
        const tuple2 = narrow(["foo", "bar", "baz"]);

        const t1 = ifLength(tuple1, 3, () => "yes", () => "no");
        const t2 = ifLength(tuple1, tuple2.length, () => "yes", () => "no");

        const f1 = ifLength(tuple1, 1, () => "yes", () => "no");

        type cases = [
            Expect<Test<typeof t1, "equals", "yes">>,
            Expect<Test<typeof t2, "equals", "yes">>,
            Expect<Test<typeof f1, "equals", "no">>,
        ];
    });

});
