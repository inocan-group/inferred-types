
import { describe, it } from "vitest";
import type { Expect, Negative, Test } from "inferred-types/types";

describe("Negative<T>", () => {

    it("happy path", () => {
        type Neg = Negative<-42>;
        type Pos = Negative<42>;
        type NegStr = Negative<"-42">;
        type PosStr = Negative<"42">;

        type cases = [
            Expect<Test<Neg, "equals",  -42>>,
            Expect<Test<Pos, "equals",  -42>>,
            Expect<Test<NegStr, "equals",  "-42">>,
            Expect<Test<PosStr, "equals",  "-42">>,
        ];
    });

});
