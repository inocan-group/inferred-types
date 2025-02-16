import { Equal, Expect } from "@type-challenges/utils";
import { If } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("If<T,TIf,TElse,TMaybe>", () => {

    it("happy path", () => {
        type True = If<true>;
        type False = If<false>;
        type Yes = If<true, "yes", "no">;
        type No = If<false, "yes", "no">;
        type BaseMaybe = If<boolean>;
        type Maybe = If<boolean, "yes", "no", "maybe">;
        type YesNo = If<boolean, "yes", "no">;

        type InvalidUnion = If<"foo" | "bar">;

        type cases = [
            Expect<Equal<True, true>>,
            Expect<Equal<False, false>>,
            Expect<Equal<Yes, "yes">>,
            Expect<Equal<No, "no">>,

            Expect<Equal<BaseMaybe, boolean>>,
            Expect<Equal<Maybe, "maybe">>,

            Expect<Equal<YesNo, "yes" | "no">>,
            Expect<Equal<InvalidUnion, never>>,
        ];
        const cases: cases = [
            true, true, true, true,
            true, true,
            true, true
        ];
    });

});

