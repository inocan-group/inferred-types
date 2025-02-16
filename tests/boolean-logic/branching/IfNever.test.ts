import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsNever, IfNever, Something, Nothing } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
            Expect<Equal<B1, "yup">>,
            Expect<Equal<B2, "nope">>,
        ];
        const cases: cases = [true, true];

    });

});
