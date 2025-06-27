import { describe, it } from "vitest";
import { Expect, Abs, Test } from "inferred-types/types";



describe("Abs<T>", () => {

    it("happy path", () => {
        type Neg = Abs<-123>;
        type Pos = Abs<123>;
        type NegStr = Abs<"-123">;
        type PosStr = Abs<"123">;

        type cases = [
            Expect<Test<Neg, "equals",  123>>,
            Expect<Test<Pos, "equals",  123>>,
            Expect<Test<NegStr, "equals",  "123">>,
            Expect<Test<PosStr, "equals",  "123">>,
        ];
    });

});
