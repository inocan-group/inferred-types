import { describe, it } from "vitest";
import {
    Expect,
    GetInputToken,
    IsInputToken,
    Test,
} from "inferred-types/types";

describe("IsInputToken<T>", () => {

    it("scalar tokens -> positive", () => {
        type Str = IsInputToken<"string">;
        type StrLit = IsInputToken<`"foo"`>;
        type Num = IsInputToken<"number">;
        type True = IsInputToken<"true">;
        type Null = IsInputToken<"null">;
        type Undef = IsInputToken<"undefined">;

        type cases = [
            Expect<Test<Str, "equals", true>>,
            Expect<Test<StrLit, "equals", true>>,
            Expect<Test<Num, "equals", true>>,
            Expect<Test<True, "equals", true>>,
            Expect<Test<Null, "equals", true>>,
            Expect<Test<Undef, "equals", true>>,
        ];
    });

    it("kv tokens -> positive", () => {
        type Rec = IsInputToken<"Record<string, string>">;
        type Map = IsInputToken<"Map<string,number>">;
        type Weak = IsInputToken<"WeakMap<object, string>">;

        type cases = [
            Expect<Test<Rec, "equals", true>>,
            Expect<Test<Map, "equals", true>>,
            Expect<Test<Weak, "equals", true>>,
        ]
    });


    it("kv tokens -> negative", () => {
        type Weak = IsInputToken<"WeakMap<string, number>">; // weakmap's must have an object key
        type Rec = IsInputToken<"Record<string, number2>">; // bad value
        type Map = IsInputToken<"Map<stringy, number>">; // bad key

        type cases = [
            Expect<Test<Weak, "equals", false>>,
            Expect<Test<Rec, "equals", false>>,
            Expect<Test<Map, "equals", false>>,
        ];
    });

    it("array tokens", () => {
        type Str = IsInputToken<"string[]">;
        type Num = IsInputToken<"number[]">;
        type GroupedUnion = IsInputToken<"(string | number)[]">;
        type Bracket = IsInputToken<"Array<string>">;
        type BracketUnion = IsInputToken<"Array<string | number>">;

        type cases = [
            Expect<Test<Str, "equals", true>>,
            Expect<Test<Num, "equals", true>>,
            Expect<Test<GroupedUnion, "equals", true>>,
            Expect<Test<Bracket, "equals", true>>,
            Expect<Test<BracketUnion, "equals", true>>,
        ]
    })


});
