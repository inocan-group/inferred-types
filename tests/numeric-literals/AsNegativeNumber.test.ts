import { Expect, AsNegativeNumber, Test } from "inferred-types/types";
import { describe, it } from "vitest";


describe("AsNegativeNumber<T>", () => {

    it("testing with numbers", () => {
        type T1 = AsNegativeNumber<-1>;
        type T2 = AsNegativeNumber<1>;
        type T3 = AsNegativeNumber<500>;

        type cases = [
            Expect<Test<T1, "equals",  -1>>,
            Expect<Test<T2, "equals",  -1>>,
            Expect<Test<T3, "equals",  -500>>,
        ];
    });


    it("testing with numeric strings", () => {
        type T1 = AsNegativeNumber<"-1">;
        type T2 = AsNegativeNumber<"1">;
        type T3 = AsNegativeNumber<"500">;

        type cases = [
            Expect<Test<T1, "equals",  "-1">>,
            Expect<Test<T2, "equals",  "-1">>,
            Expect<Test<T3, "equals",  "-500">>,
        ];
    });


});
