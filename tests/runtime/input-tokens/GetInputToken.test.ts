import { describe, it } from "vitest";
import {
    Expect,
    GetInputToken,
    IT_Token,
    Test,
    Err
} from "inferred-types/types";

describe("GetInputToken<T>", () => {

    it("atomics", () => {
        type Str = GetInputToken<"string">;
        type Num = GetInputToken<"number">;
        type Null = GetInputToken<"null">;
        type Undef = GetInputToken<"undefined">;

        type cases = [
            Expect<Test<Str["type"], "equals", string>>,
            Expect<Test<Num["type"], "equals", number>>,
            Expect<Test<Null["type"], "equals", null>>,
            Expect<Test<Undef["type"], "equals", undefined>>,
        ];
    });


    it("string literals", () => {
        type Foo = GetInputToken<`"foo"`>;
        type Foo2 = GetInputToken<`String(foo) `>;

        type FooBar = GetInputToken<`"foo" | "bar"`>;

        type cases = [
            Expect<Test<Foo["type"], "equals", "foo">>,
            Expect<Test<Foo2["type"], "equals", "foo">>,
        ];
    });

    it("numeric literals", () => {
        type Answer = GetInputToken<"42">;
        type Answer2 = GetInputToken<`Number(42) `>;

        type NumUnion = GetInputToken<`42 | 99`>;

        type cases = [
            Expect<Test<Answer["type"], "equals", 42>>,
            Expect<Test<Answer2["type"], "equals", 42>>,

            Expect<Test<NumUnion["type"], "equals", 42 | 99>>
        ];
    });


    it("arrays", () => {
        type StrArr = GetInputToken<`string[]`>;
        type StrArr2 = GetInputToken<`string[][]`>;

        type ObjArray = GetInputToken<` object[]  `>;

        type cases = [
            Expect<Test<StrArr["type"], "equals", string[]>>,
            Expect<Test<StrArr2["type"], "equals", string[][]>>,
            Expect<Test<ObjArray["type"], "equals", object[]>>,
        ];
    });


    it("KV Objects", () => {
        type Rec1 = GetInputToken<"Record<string, string>">;
        type Rec2 = GetInputToken<"Record<string, number | boolean>">;

        type Map1 = GetInputToken<"Map<string, number>">;
        type Map2 = GetInputToken<"Map<string, Record<string,string>>">;

        type cases = [
            Expect<Test<Rec1["type"], "equals", Record<string, string>>>,
            Expect<Test<Rec2["type"], "equals", Record<string, number | boolean>>>,

            Expect<Test<Map1["type"], "equals", Map<string, number>>>,
        ];
    });


    it("Sets", () => {
        type Set1 = GetInputToken<"Set<string>">;
        type Set2 = GetInputToken<"Set<Record<string,string>>">;
        type Invalid = GetInputToken<"Set<foobar>">;

        type cases = [
            Expect<Test<Set1, "extends", IT_Token<"set">>>,
            Expect<Test<Set2, "extends", IT_Token<"set">>>,
            Expect<Test<Invalid, "extends", Err<"malformed-token">>>,
        ];
    });


    it("Functions", () => {
        type ArrowFn = GetInputToken<"() => string">;
        type NamedFn = GetInputToken<"function greet(hi: string) => string">;

        type cases = [
            Expect<Test<ArrowFn, "equals", () => string>>,
            Expect<Test<NamedFn, "equals",  ((hi: string) => string) & {name: "greet"}>>,
        ];
    });



    it("Incomplete Parse", () => {
        type Inc = GetInputToken<"Array<string | boolean> && trailing ">;

        type cases = [
            Expect<Test<Inc, "extends", Err<"incomplete-parse">>>,
            Expect<Test<Inc["parsedType"], "equals", Array<string | boolean>>>,
            Expect<Test<Inc["rest"], "equals", "&& trailing">>,
        ];
    });


    it("Multiple Combinators", () => {
        type Multi = GetInputToken<"string | number & boolean">;

        type cases = [
            /** type tests */
        ];
    });





});
