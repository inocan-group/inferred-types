import { describe, it } from "vitest";
import type { Expect, IsLiteralScalar, Test } from "inferred-types/types";

describe("IsLiteralScalar<T>", () => {

    it("happy path - literal scalars", () => {
        type T1 = IsLiteralScalar<"foo">;
        type T2 = IsLiteralScalar<42>;
        type T3 = IsLiteralScalar<true>;
        type T4 = IsLiteralScalar<false>;
        type T5 = IsLiteralScalar<null>;
        type T6 = IsLiteralScalar<undefined>;
        type T7 = IsLiteralScalar<123n>; // bigint literal

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
        ];
    });

    it("rejects wide scalar types", () => {
        type F1 = IsLiteralScalar<string>;
        type F2 = IsLiteralScalar<number>;
        type F3 = IsLiteralScalar<boolean>;
        type F4 = IsLiteralScalar<bigint>;
        type F5 = IsLiteralScalar<symbol>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
        ];
    });

    it("rejects non-scalar types", () => {
        type F1 = IsLiteralScalar<{ foo: 1 }>;
        type F2 = IsLiteralScalar<[1, 2, 3]>;
        type F3 = IsLiteralScalar<string[]>;
        type F4 = IsLiteralScalar<() => void>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
        ];
    });

    it("rejects boundary types", () => {
        type F1 = IsLiteralScalar<any>;
        type F2 = IsLiteralScalar<never>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

});
