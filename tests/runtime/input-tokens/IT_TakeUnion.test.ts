import { describe, it } from "vitest";
import {
    Contains,
    Expect,
    GetInputToken,
    IT_TakeUnion,
    IT_Token,
    Test,
} from "inferred-types/types";

describe("IT_TakeUnion", () => {

    it("happy path", () => {
        type Token = GetInputToken<"string">;
        type Union = IT_TakeUnion<Token, "| number">;
        //    ^?

        type cases = [
            Expect<Test<Union, "extends", IT_Token<"union">>>,

            Expect<Test<Union["type"], "equals", string | number>>
        ];
    });

    it("literals", () => {
        type Token = GetInputToken<`'foo'`>;
        type Union = IT_TakeUnion<Token, "| 'bar' | 'baz'">;

        type cases = [
            Expect<Test<Union, "extends", IT_Token<"union">>>,

            Expect<Test<Union["type"], "equals", "foo" | "bar" | "baz">>
        ];
    });


    it("leading | character", () => {
        type Union = IT_TakeUnion<undefined, "| number">;

        type cases = [
            Expect<Test<Union, "isError", "malformed-token/union">>,
            Expect<Contains<Union["message"], "was found at the beginning of the parse string">>,
        ];
    });


    it("trailing | character", () => {
        type Token = GetInputToken<"string">;
        type Union = IT_TakeUnion<Token, "| number |">;

        type cases = [
            Expect<Test<Union, "isError", "malformed-token/union">>,
            Expect<Contains<Union["message"], "was found at the end of the parse string">>,
        ];
    });


    it("double '|' character", () => {
        type Token = GetInputToken<"string">;
        type Union = IT_TakeUnion<Token, "| number || boolean">;
        type Union2 = IT_TakeUnion<Token, "| number | | boolean">;

        type cases = [
            Expect<Test<Union, "isError", "malformed-token/union">>,
            Expect<Contains<Union["message"], "The union operator '|' was found next to another '|' operator">>,

            Expect<Test<Union2, "isError", "malformed-token/union">>,
            Expect<Contains<Union2["message"], "The union operator '|' was found next to another '|' operator">>
        ];
    });






});
