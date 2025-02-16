import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsNegativeNumber, NumberLike } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsNegativeNumber<T>", () => {

    it("Happy Path", () => {
        type T1 = IsNegativeNumber<-1>;
        type T2 = IsNegativeNumber<"-1">;

        type F1 = IsNegativeNumber<1>;
        type F2 = IsNegativeNumber<"1">;

        type M1 = IsNegativeNumber<number>;
        type M2 = IsNegativeNumber<NumberLike>;

        type cases = [
            ExpectTrue<T1>,
            ExpectTrue<T2>,
            ExpectFalse<F1>,
            ExpectFalse<F2>,
            // if the input to the utility is wide we can only know
            // if it's negative at runtime.
            Expect<Equal<M1, boolean>>,
            Expect<Equal<M2, boolean>>,
        ];

        const cases: cases = [
            true, true,
            false, false,
            true, true
        ];
    });

});
