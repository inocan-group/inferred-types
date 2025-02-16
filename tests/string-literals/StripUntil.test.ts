import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { NumericChar, StripUntil, StripWhile, Whitespace } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StripUntil<TContent,TComparator>", () => {

    it("happy path", () => {
        type UntilNum = StripUntil<"Hello World456", NumericChar>;

        type cases = [
            Expect<Equal<UntilNum, "456">>,
        ];
        const cases: cases = [
            true
        ];
    });

});

describe("StripWhile<TContent,TComparator>", () => {

    it("happy path", () => {
        type Num = StripWhile<"   \n42", Whitespace>;


        type cases = [
            Expect<Equal<Num, "42">>,
        ];
        const cases: cases = [
            true
        ];
    });

});
