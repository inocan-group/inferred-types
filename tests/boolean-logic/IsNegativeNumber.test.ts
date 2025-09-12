
import { describe, it } from "vitest";
import type { Expect, IsNegativeNumber, Test } from "inferred-types/types";

describe("IsNegativeNumber", () => {

    it("happy path", () => {
        type Neg = IsNegativeNumber<-1>;
        type NegStr = IsNegativeNumber<"-1">;
        type Pos = IsNegativeNumber<1>;
        type PosStr = IsNegativeNumber<"1">;
        type Bool = IsNegativeNumber<number>;

        type cases = [
            Expect<Test<Neg, "equals",  true>>,
            Expect<Test<NegStr, "equals",  true>>,
            Expect<Test<Pos, "equals",  false>>,
            Expect<Test<PosStr, "equals",  false>>,
            Expect<Test<Bool, "equals",  boolean>>,
        ];
    });

});
