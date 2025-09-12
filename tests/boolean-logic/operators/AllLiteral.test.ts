import { describe, it } from "vitest";
import type { AllLiteral, Expect, Test } from "inferred-types/types";

describe("AllLiteral<T>", () => {

    it("happy path", () => {
        type T1 = AllLiteral<[1, 2, 3]>;
        type T2 = AllLiteral<["foo", "bar", "baz"]>;
        type T3 = AllLiteral<[{ foo: 1; bar: number }]>;
        type T4 = AllLiteral<[true, false, 42]>;

        type F1 = AllLiteral<[1, 2, number]>;
        type F2 = AllLiteral<[string, string, string]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,

        ];

    });

});
