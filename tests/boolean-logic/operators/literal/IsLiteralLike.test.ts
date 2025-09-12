import { describe, it } from "vitest";
import type { Expect, IsLiteralLike, Test } from "inferred-types/types";

describe("IsLiteralLike<T>", () => {

    it("includes all literal types", () => {
        type T1 = IsLiteralLike<"foo">;
        type T2 = IsLiteralLike<42>;
        type T3 = IsLiteralLike<true>;
        type T4 = IsLiteralLike<{ foo: 1 }>;
        type T5 = IsLiteralLike<["foo", 42]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
        ];
    });

    it("literal-like objects with mixed value types", () => {
        type T1 = IsLiteralLike<{ foo: 1; bar: string }>;
        type T2 = IsLiteralLike<{ foo: number; bar: string }>;
        type T3 = IsLiteralLike<Record<"foo"|"bar"|"baz", string>>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("literal unions", () => {
        type T1 = IsLiteralLike<"foo" | "bar">;
        type T2 = IsLiteralLike<1 | 2 | 3>;
        type T3 = IsLiteralLike<true | false>;
        type T4 = IsLiteralLike<boolean>;
        type T5 = IsLiteralLike<true>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
        ];
    });

    it("rejects wide types", () => {
        type F1 = IsLiteralLike<string>;
        type F2 = IsLiteralLike<number>;

        type F4 = IsLiteralLike<object>;
        type F5 = IsLiteralLike<Record<string,string>>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
        ];
    });

    it("excludes boundary types by default", () => {
        type F1 = IsLiteralLike<any>;
        type F2 = IsLiteralLike<never>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

    it("rejects mixed unions (literal + wide)", () => {
        type F1 = IsLiteralLike<"foo" | "bar" | number>;
        type F2 = IsLiteralLike<1 | 2 | string>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

});
