import { describe, it } from "vitest";
import type { Contains, Expect, GetInputToken, IT_TakeUnion, IT_Token, Test } from "inferred-types/types";

describe("IT_TakeUnion", () => {

    it("happy path", () => {
        type Token = GetInputToken<"string">;
        type Union = IT_TakeUnion<"| number", Token>;
        //    ^?

        type cases = [
            Expect<Test<Union, "extends", IT_Token<"union">>>,

            Expect<Test<Union["type"], "equals", string | number>>
        ];
    });

    it("literals", () => {
        type Token = GetInputToken<`'foo'`>;
        type Union = IT_TakeUnion<"| 'bar' | 'baz'", Token>;

        type cases = [
            Expect<Test<Union, "extends", IT_Token<"union">>>,

            Expect<Test<Union["type"], "equals", "foo" | "bar" | "baz">>
        ];
    });

    it("union member can be an intersection", () => {
        type Token = GetInputToken<"string">;
        type Union = IT_TakeUnion<"| number & boolean", Token>;

        type cases = [
            Expect<Test<Union, "extends", IT_Token<"union">>>,
            Expect<Test<Union["type"], "equals", string>>,
        ];
    });

    it("leading | character", () => {
        type Union = IT_TakeUnion<"| number", undefined>;

        type cases = [
            Expect<Test<Union, "isError", "malformed-token/union">>,
            Expect<Contains<Union["message"], "was found at the beginning of the parse string">>,
        ];
    });

    it("trailing | character", () => {
        type Token = GetInputToken<"string">;
        type Union = IT_TakeUnion<"| number |", Token>;

        type cases = [
            Expect<Test<Union, "isError", "malformed-token/union">>,
            Expect<Contains<Union["message"], "was found at the end of the parse string">>,
        ];
    });

    it("double '|' character", () => {
        type Token = GetInputToken<"string">;
        type Union = IT_TakeUnion<"| number || boolean", Token>;
        type Union2 = IT_TakeUnion<"| number | | boolean", Token>;

        type cases = [
            Expect<Test<Union, "isError", "malformed-token/union">>,
            Expect<Contains<Union["message"], "The union operator '|' was found next to another '|' operator">>,

            Expect<Test<Union2, "isError", "malformed-token/union">>,
            Expect<Contains<Union2["message"], "The union operator '|' was found next to another '|' operator">>
        ];
    });

});
