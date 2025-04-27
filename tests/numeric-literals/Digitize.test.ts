import {
    Expect,
    Digital,
    DigitalLiteral,
    DoesExtend,
    Digitize,
    NumericSign,
    Digit,
    NumericChar,
    Test
} from "inferred-types/types";
import { describe, it } from "vitest";



describe("Digitize<T>", () => {

    it("happy path", () => {
        type Num = Digitize<123>;
        type Str = Digitize<"123">;
        type Neg = Digitize<-123>;
        type NegStr = Digitize<"-123">;

        type WideNum = Digitize<number>;
        type WideStr = Digitize<`${number}`>;

        type cases = [
            Expect<Test<Num, "equals",  ["+", [1, 2, 3]]>>,
            Expect<Test<Str, "equals",  ["+", ["1", "2", "3"]]>>,
            Expect<Test<Neg, "equals",  ["-", [1, 2, 3]]>>,
            Expect<Test<NegStr, "equals",  ["-", ["1", "2", "3"]]>>,

            Expect<Test<WideNum, "equals",  [NumericSign, Digit[]]>>,
            Expect<Test<WideStr, "equals",  [NumericSign, NumericChar[]]>>,

            // extends base type
            DoesExtend<Num, Digital>,
            DoesExtend<Str, DigitalLiteral>
        ];
    });

});
