import { describe, it } from "vitest";
import type { Expect, IsMixedUnion, Test } from "inferred-types/types";

describe("IsMixedUnion<T>", () => {
    it("positive tests", () => {
        type T1 = IsMixedUnion<"red" | "green" | "blue" | number>;
        type T2 = IsMixedUnion<1 | 2 | 3 | 42 | string>;
        type T3 = IsMixedUnion<4 | object>;
        type T4 = IsMixedUnion<readonly unknown[] | "foo">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = IsMixedUnion<"hello">;
        type F2 = IsMixedUnion<string>;
        type F3 = IsMixedUnion<1|2|3>;
        type F4 = IsMixedUnion<string|number>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
        ];
    });

    it("edge cases", () => {
        type Unknown = IsMixedUnion<unknown>;
        type Any = IsMixedUnion<any>;
        type Never = IsMixedUnion<never>;

        type cases = [
            Expect<Test<Unknown, "equals", boolean>>,
            Expect<Test<Any, "equals", false>>,
            Expect<Test<Never, "equals", false>>,
        ];
    });

});
