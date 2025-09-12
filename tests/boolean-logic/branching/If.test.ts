
import { describe, it } from "vitest";
import type { Expect, If, Test } from "inferred-types/types";

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
            Expect<Test<True, "equals",  true>>,
            Expect<Test<False, "equals",  false>>,
            Expect<Test<Yes, "equals",  "yes">>,
            Expect<Test<No, "equals",  "no">>,

            Expect<Test<BaseMaybe, "equals",  boolean>>,
            Expect<Test<Maybe, "equals",  "maybe">>,

            Expect<Test<YesNo, "equals",  "yes" | "no">>,
            Expect<Test<InvalidUnion, "equals",  never>>,
        ];
    });

});

