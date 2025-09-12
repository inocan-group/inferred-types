import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { Expect, IfNever, IsNever, Nothing, Something, Test } from "inferred-types/types";

describe("IsNever<T>", () => {

    it("false tests", () => {
        type F1 = IsNever<false>;
        type F2 = IsNever<"foo">;
        type F3 = IsNever<42>;
        type F4 = IsNever<undefined>;
        type F5 = IsNever<Something>;
        type F6 = IsNever<Nothing>;

        type cases = [
            ExpectFalse<F1>,
            ExpectFalse<F2>,
            ExpectFalse<F3>,
            ExpectFalse<F4>,
            ExpectFalse<F5>,
            ExpectFalse<F6>,
        ];
        const cases: cases = [false, false, false, false, false, false];
    });

    it("positive tests", () => {
        type T1 = IsNever<never>;

        type cases = [
            ExpectTrue<T1>,
        ];
        const cases: cases = [true];
    });

    it("IfTrue<T,IF,ELSE> branching", () => {
        type B1 = IfNever<never, "yup", "nope">;
        type B2 = IfNever<true, "yup", "nope">;

        type cases = [
            Expect<Test<B1, "equals",  "yup">>,
            Expect<Test<B2, "equals",  "nope">>,
        ];
        const cases: cases = [true, true];

    });

});
