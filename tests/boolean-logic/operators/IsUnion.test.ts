import { describe, it } from "vitest";
import { Expect, IsUnion, Test } from "inferred-types/types";



describe("IsUnion<T>", () => {

    it("happy path", () => {
        type T1 = IsUnion<"foo" | "bar">;
        type T2 = IsUnion<string | number>;
        type T3 = IsUnion<boolean | 42>;

        type F1 = IsUnion<"foo">;
        type F2 = IsUnion<boolean>;
        type F3 = IsUnion<true>;
        type F4 = IsUnion<string>;
        type F5 = IsUnion<number>;
        type F6 = IsUnion<string[]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
        ];

    });

});

