import { describe, it } from "vitest";

import {
    Expect,
    IsValidIndex,
    Dictionary,
    ExplicitlyEmptyObject,
    EmptyObject,
    Test
} from "inferred-types/types";



describe("IsValidKey<T>", () => {

    it("happy path", () => {
        type T1 = IsValidIndex<[1, 2, 3], 0>;
        type T2 = IsValidIndex<[1, 2, 3], 2>;
        type T3 = IsValidIndex<{ foo: 1; bar: 2 }, "foo">;
        type T4 = IsValidIndex<[1, 2, 3], -1>;

        type F1 = IsValidIndex<[1, 2, 3], 10>;
        type F2 = IsValidIndex<{ foo: 1; bar: 2 }, "baz">;
        type F3 = IsValidIndex<ExplicitlyEmptyObject, "foo">;
        type F4 = IsValidIndex<[1, 2, 3], -10>;
        type F5 = IsValidIndex<[1, 2, 3], "foo">;

        type B1 = IsValidIndex<string[], 0>;
        type BF1 = IsValidIndex<string[], "foo">;
        type B2 = IsValidIndex<Dictionary, "foo">;
        type BF2 = IsValidIndex<Dictionary, 0>;
        type BF3 = IsValidIndex<EmptyObject, "foo">;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<F4, "equals",  false>>,
            Expect<Test<F5, "equals",  false>>,

            Expect<Test<B1, "equals",  boolean>>,
            Expect<Test<BF1, "equals",  boolean>>,

            Expect<Test<B2, "equals",  boolean>>,
            Expect<Test<BF2, "equals",  boolean>>,
            Expect<Test<BF3, "equals",  boolean>>,
        ];

    });

});
