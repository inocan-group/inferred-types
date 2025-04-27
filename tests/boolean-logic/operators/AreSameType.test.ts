import {
    AreSameType,
    Dictionary,
    Expect,
    Test,
    Tuple
} from "inferred-types/types";
import { describe, it } from "vitest";




describe("AreSameType<A,B>", () => {

    it("happy path", () => {
        type T1 = AreSameType<"foo", "bar">;
        type T2 = AreSameType<42, 56>;
        type T3 = AreSameType<42, number>;
        type T4 = AreSameType<true, false>;
        type T5 = AreSameType<{ foo: 1 }, { bar: 2 }>;
        type T6 = AreSameType<readonly string[], readonly (string | number)[]>;
        type T7 = AreSameType<() => "hi", () => string>;
        type T8 = AreSameType<Record<string, string>, Dictionary>;

        type F1 = AreSameType<"foo", 42>;
        type F2 = AreSameType<Dictionary, Tuple>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
            Expect<Test<T8, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,

        ];

    });

});

