import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeStringLiteral,
    Test,
} from "inferred-types/types";
import { IT_TakeNumericLiteral } from "types/runtime-types/type-defn/input-tokens/IT_TakeNumericLiteral";

describe("IT_TakeNumericLiteral<T>", () => {

    it("bare numeric literal", () => {
        type Num = IT_TakeNumericLiteral<"42">;
        type NumRemaining = IT_TakeNumericLiteral<"42 | 56">;

        type cases = [
            Expect<Test<Num["type"], "equals", 42>>,
            Expect<Test<NumRemaining["type"], "equals", 42>>,
            Expect<Test<NumRemaining["rest"], "equals", "| 56">>,
        ];
    });


    it("Numeric constructor", () => {
        type Num = IT_TakeNumericLiteral<"Number(42)">;
        type NumRemaining = IT_TakeNumericLiteral<"Number(42) | Number(56)">;

        type cases = [
            Expect<Test<Num["type"], "equals", 42>>,
            Expect<Test<NumRemaining["type"], "equals", 42>>,
            Expect<Test<NumRemaining["rest"], "equals", "| Number(56)">>,
        ];
    });


});
