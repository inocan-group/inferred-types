import { describe, it } from "vitest";
import {
    Expect,
    IT_TakeArray,
    IT_Token,
    Test,
} from "inferred-types/types";

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

        type cases = [
            Expect<Test<StrTwo, "extends", IT_Token<"array">>>,
            Expect<Test<StrTwo["token"], "equals", `string[][]`>>,
            Expect<Test<StrTwo["type"], "equals", string[][]>>,

            Expect<Test<Str, "extends", IT_Token<"array">>>,
            Expect<Test<Str["token"], "equals", `string[]`>>,
            Expect<Test<Str["type"], "equals", string[]>>,
        ];
    });



    it("bracketed", () => {
        type Str = IT_TakeArray<"Array<string>">;
        type StrRemaining = IT_TakeArray<"Array<string>    | string">;

        type cases = [
           Expect<Test<Str["token"], "equals", "Array<string>">>,
           Expect<Test<Str["type"], "equals", Array<string>>>,

           Expect<Test<StrRemaining["token"], "equals", "Array<string>">>,
           Expect<Test<StrRemaining["type"], "equals", Array<string>>>,
           Expect<Test<StrRemaining["rest"], "equals", "| string">>,
        ];
    });


});
