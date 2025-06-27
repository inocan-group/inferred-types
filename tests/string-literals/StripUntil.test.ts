import { Equal,  } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Expect, NumericChar, StripUntil, StripWhile, Test, Whitespace } from "inferred-types/types";



describe("StripUntil<TContent,TComparator>", () => {

    it("happy path", () => {
        type UntilNum = StripUntil<"Hello World456", NumericChar>;

        type cases = [
            Expect<Test<UntilNum, "equals",  "456">>,
        ];
    });

});

describe("StripWhile<TContent,TComparator>", () => {

    it("happy path", () => {
        type Num = StripWhile<"   \n42", Whitespace>;

        type cases = [
            Expect<Test<Num, "equals",  "42">>,
        ];
    });

});
