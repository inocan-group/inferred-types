import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Abs } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Abs<T>", () => {

    it("happy path", () => {
        type Neg = Abs<-123>;
        type Pos = Abs<123>;
        type NegStr = Abs<"-123">;
        type PosStr = Abs<"123">;

        type cases = [
            Expect<Equal<Neg, 123>>,
            Expect<Equal<Pos, 123>>,
            Expect<Equal<NegStr, "123">>,
            Expect<Equal<PosStr, "123">>,
        ];
        const cases: cases = [true, true, true, true];
    });

});
