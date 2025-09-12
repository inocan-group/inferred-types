import { describe, expect, it } from "vitest";
import {
    Expect,
    GetInputToken,
    IT_Token,
    Test,
    Err,
    IT_TakeTokenGenerics
} from "inferred-types/types";

describe("GetInputToken<T>", () => {

    it("atomics", () => {
        type Str = GetInputToken<"string">;
        type Num = GetInputToken<"number">;
        type Null = GetInputToken<"null">;
        type Undef = GetInputToken<"undefined">;

        type cases = [
            Expect<Test<Str, "extends", IT_Token<"atomic">>>,
            Expect<Test<Num, "extends", IT_Token<"atomic">>>,
            Expect<Test<Null, "extends", IT_Token<"atomic">>>,
            Expect<Test<Undef, "extends", IT_Token<"atomic">>>,

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
            Expect<Test<Foo, "extends", IT_Token<"literal">>>,
            Expect<Test<Foo2, "extends", IT_Token<"literal">>>,
            Expect<Test<FooBar, "extends", IT_Token<"union">>>,

            Expect<Test<Foo["type"], "equals", "foo">>,
            Expect<Test<Foo2["type"], "equals", "foo">>,
        ];
    });

    it("numeric literals", () => {
        type Answer = GetInputToken<"42">;
        type Answer2 = GetInputToken<`Number(42) `>;

        type NumUnion = GetInputToken<`42 | 99`>;

        type cases = [
            Expect<Test<Answer, "extends", IT_Token<"literal">>>,
            Expect<Test<Answer2, "extends", IT_Token<"literal">>>,
            Expect<Test<NumUnion, "extends", IT_Token<"union">>>,

            Expect<Test<Answer["type"], "equals", 42>>,
            Expect<Test<Answer2["type"], "equals", 42>>,

            Expect<Test<NumUnion["type"], "equals", 42 | 99>>
        ];
    });


    it("arrays", () => {
        type StrArr = GetInputToken<`string[]`>;
        type StrArr2 = GetInputToken<`string[][]`>;

        type ObjArray = GetInputToken<` object[]  `>;

        type ArrOfUnion = GetInputToken<"Array<string|number>">;
        type ArrOfUnion2 = GetInputToken<"(string|number)[]">;
        type ArrOfUnion3 = GetInputToken<"(string | number)[]">;

        type Invalid = GetInputToken<"(foobar)[]">;


        type cases = [
            Expect<Test<StrArr, "extends", IT_Token<"array">>>,
            Expect<Test<StrArr2, "extends", IT_Token<"array">>>,
            Expect<Test<ObjArray, "extends", IT_Token<"array">>>,
            Expect<Test<ArrOfUnion, "extends", IT_Token<"array">>>,
            Expect<Test<ArrOfUnion2, "extends", IT_Token<"array">>>,

            Expect<Test<StrArr["type"], "equals", string[]>>,
            Expect<Test<StrArr2["type"], "equals", string[][]>>,
            Expect<Test<ObjArray["type"], "equals", object[]>>,
            Expect<Test<ArrOfUnion["type"], "equals", Array<string|number>>>,
            Expect<Test<ArrOfUnion2["type"], "equals", Array<string|number>>>,
            Expect<Test<ArrOfUnion3["type"], "equals", Array<string|number>>>,

            Expect<Test<Invalid, "isError", "malformed-token">>
        ];
    });


    it("unions", () => {
        type U1 = GetInputToken<"string | number">;
        type U2 = GetInputToken<"string | Record<string, string | number>">;


        type cases = [
            Expect<Test<U1, "extends", IT_Token<"union">>>,
            Expect<Test<U2, "extends", IT_Token<"union">>>,

            Expect<Test<U1["type"], "equals", string | number>>,
            Expect<Test<U2["type"], "equals", string | Record<string, string | number>>>,
        ];
    });


    it("KV Objects", () => {
        type Rec1 = GetInputToken<"Record<string, string>">;
        type Rec2 = GetInputToken<"Record<string, number | boolean>">;

        type Map1 = GetInputToken<"Map<string, number>">;
        type Map2 = GetInputToken<"Map<string, Record<string,string>>">;

        type cases = [
            Expect<Test<Rec1, "extends", IT_Token<"kv">>>,
            Expect<Test<Rec2, "extends", IT_Token<"kv">>>,
            Expect<Test<Map1, "extends", IT_Token<"kv">>>,
            Expect<Test<Map2, "extends", IT_Token<"kv">>>,

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
        // named functions use ':' to separate params from return type
        type NamedFn = GetInputToken<"function greet(hi: string): string">;

        type cases = [
            Expect<Test<ArrowFn, "extends", IT_Token<"function">>>,
            Expect<Test<ArrowFn["type"], "equals", () => string>>,


            Expect<Test<
                NamedFn["type"],
                "equals",
                (<T extends readonly [string]>(...args: T) => string) & { name: "greet" }
            >>,
        ];
    });

    it("Generics", () => {
        type Multi = IT_TakeTokenGenerics<"<T extends string, S extends number>">;

        type cases = [
            Expect<Test<
                Multi, "equals",
                {
                    generics: [{
                        name: "T";
                        token: "string";
                        type: string;
                    }, {
                        name: "S";
                        token: "number";
                        type: number;
                    }];
                    rest: "";
                }
            >>,
        ];
    })


    it("Functions with Generics", () => {
        type ArrowFnWithGenerics = GetInputToken<"<T extends string>(name: T) => 'Hi {{string}}'">;
        type T1 = ArrowFnWithGenerics["type"];

        // here we have a generic which _effects_ the return type
        // we need to show some mapping of generic parameter types and output
        // this example is maybe a bit less clear then one which has more than one generic
        // so I'll add another one below. For this example AND the one below remember that the quote marks
        // around the return type are used to bound the string literal but the quotes should be in the
        // resultant type
        type ArrowFnWithGenericsImpactReturn = GetInputToken<"<T extends string>(name: T) => 'Hi ${T}'">;

        // it's important that the generic names -- which can convey context -- are retained in some fashion
        type ArrowFnWithMultiGenericsImpactReturn = GetInputToken<
            "<TName extends string, TAge extends number>(name: TName, age: TAge) => 'Hi ${TName}; you are ${TAge} years old'"
        >;


        type cases = [
            Expect<Test<ArrowFnWithGenerics, "extends", IT_Token<"function">>>,
            Expect<Test<ArrowFnWithGenericsImpactReturn, "extends", IT_Token<"function">>>,
            Expect<Test<ArrowFnWithMultiGenericsImpactReturn, "extends", IT_Token<"function">>>,

            // Due to TypeScript limitations, parameter generics are
            // represented as a single tuple generic for narrowing.
            Expect<Test<
                ArrowFnWithGenerics["type"],
                "equals",
                <T extends readonly [string]>(...args: T) => `Hi ${string}`
            >>,
            Expect<Test<
                ArrowFnWithMultiGenericsImpactReturn["type"],
                "equals",
                <T extends readonly [string, number]>(...args: T) => `Hi ${string}; you are ${number} years old`
            >>,
        ];
    });




    it("Edge Cases", () => {
        type Inc = GetInputToken<"Array<string | boolean> & trailing ">;

        type cases = [
            Expect<Test<Inc, "isError", "malformed-token/intersection">>,
        ];
    });


    it("Multiple Combinators", () => {
        // (number & boolean) => never, so when in union with `string` the type is just `string`
        type Multi = GetInputToken<"string | number & boolean">;
        type MultiExplicit = GetInputToken<"string | (number & boolean)">;

        type Maybe = GetInputToken<"string | number | undefined">;

        type cases = [
            Expect<Test<Multi["type"], "equals", string>>,
            Expect<Test<MultiExplicit["type"], "equals", string>>,
            Expect<Test<Maybe["type"], "equals", string | number | undefined>>,
        ];
    });

});


describe.todo("getInputToken(token)");
