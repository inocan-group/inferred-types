import { describe, it } from "vitest";
import type { Expect, GetInputToken, IT_TakeArray, IT_Token, NestedSplit, Test } from "inferred-types/types";

describe("IT_TakeArray<T>", () => {

    it("postfix", () => {
        type StrTwo = IT_TakeArray<"string[][]">;
        type Str = IT_TakeArray<"string[]">;

        type cases = [
            Expect<Test<StrTwo, "extends", IT_Token<"array">>>,
            Expect<Test<StrTwo["token"], "equals", `string[][]`>>,
            Expect<Test<StrTwo["type"], "equals", string[][]>>,

            Expect<Test<Str, "extends", IT_Token<"array">>>,
            Expect<Test<Str["token"], "equals", `string[]`>>,
            Expect<Test<Str["type"], "equals", string[]>>,
        ];
    });

    it("postfix group", () => {
        type StrTwo = IT_TakeArray<"(string)[][]">;
        type Str = IT_TakeArray<"(string)[]">;
        type Union = IT_TakeArray<"(string | number)[]">;

        type cases = [
            Expect<Test<StrTwo, "extends", IT_Token<"array">>>,
            Expect<Test<Str, "extends", IT_Token<"array">>>,

            Expect<Test<StrTwo["token"], "equals", `(string)[][]`>>,
            Expect<Test<Str["token"], "equals", `(string)[]`>>,
            Expect<Test<Str["type"], "equals", string[]>>,
            Expect<Test<Union["type"], "equals", Array<string|number>>>
        ];
    });

    it("bracketed", () => {
        type Str = IT_TakeArray<"Array<string>">;
        type StrRemaining = IT_TakeArray<"Array<string>    | string">;
        type Invalid = IT_TakeArray<"Array<foobar>">;
        type X = GetInputToken<"foobar">; // =>

        type cases = [
           Expect<Test<Str["token"], "equals", "Array<string>">>,
           Expect<Test<Str["type"], "equals", Array<string>>>,

           Expect<Test<StrRemaining["token"], "equals", "Array<string>">>,
           Expect<Test<StrRemaining["type"], "equals", Array<string>>>,
           Expect<Test<StrRemaining["rest"], "equals", "| string">>,
           Expect<Test<Invalid, "isError", "malformed-token">>
        ];
    });

});
