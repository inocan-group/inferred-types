import { describe, expect, it } from "vitest";
import {
    Expect,
    GetInputToken,
    IT_Token,
    Test,
    Err,
    IT_TakeTokenGenerics
} from "inferred-types/types";
import { getInputToken } from "inferred-types/runtime";
import { IT_TakeUnion } from "../../../modules/types/dist";

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
describe("getInputToken", () => {

    it("atomic types", () => {
        const result1 = getInputToken("string");
        const result2 = getInputToken("number");
        const result3 = getInputToken("boolean");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("atomic");
            expect(result1.token).toBe("string");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("atomic");
            expect(result2.token).toBe("number");
            expect(result2.rest).toBe("");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("atomic");
            expect(result3.token).toBe("boolean");
            expect(result3.rest).toBe("");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"atomic">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"atomic">>>,
            Expect<Test<typeof result3, "extends", IT_Token<"atomic">>>,
        ];
    });

    it("string literals", () => {
        const result1 = getInputToken('"foo"');
        const result2 = getInputToken("'bar'");
        const result3 = getInputToken("`baz`");
        const result4 = getInputToken("String(qux)");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);
        expect(isErr(result4)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("literal");
            expect(result1.token).toBe('"foo"');
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("literal");
            expect(result2.token).toBe("'bar'");
            expect(result2.rest).toBe("");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("literal");
            expect(result3.token).toBe("`baz`");
            expect(result3.rest).toBe("");
        }

        if (!isErr(result4)) {
            expect(result4.kind).toBe("literal");
            expect(result4.token).toBe("String(qux)");
            expect(result4.rest).toBe("");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"literal">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"literal">>>,
            Expect<Test<typeof result3, "extends", IT_Token<"literal">>>,
            Expect<Test<typeof result4, "extends", IT_Token<"literal">>>,
        ];
    });

    it("numeric literals", () => {
        const result1 = getInputToken("42");
        const result2 = getInputToken("Number(99)");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("literal");
            expect(result1.token).toBe("42");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("literal");
            expect(result2.token).toBe("Number(99)");
            expect(result2.rest).toBe("");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"literal">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"literal">>>,
        ];
    });

    it("array types", () => {
        const result1 = getInputToken("string[]");
        const result2 = getInputToken("Array<number>");
        const result3 = getInputToken("(string | number)[]");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("array");
            expect(result1.token).toBe("string[]");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("array");
            expect(result2.token).toBe("Array<number>");
            expect(result2.rest).toBe("");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("array");
            expect(result3.token).toBe("(string | number)[]");
            expect(result3.rest).toBe("");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result3, "extends", IT_Token<"array">>>,
        ];
    });

    it("grouped expressions", () => {
        const result1 = getInputToken("(string)");
        const result2 = getInputToken("(string | number)");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("group");
            expect(result1.token).toBe("(string)");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("group");
            expect(result2.token).toBe("(string | number)");
            expect(result2.rest).toBe("");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"group">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"group">>>,
        ];
    });

    it("union types", () => {
        const result1 = getInputToken("string | number");
        const result2 = getInputToken("string | number | boolean");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("union");
            expect(result1.token).toBe("string | number");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("union");
            expect(result2.token).toBe("string | number | boolean");
            expect(result2.rest).toBe("");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"union">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"union">>>,
        ];
    });

    it("intersection types", () => {
        const result1 = getInputToken("string & number");
        const result2 = getInputToken("string & number & boolean");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("intersection");
            expect(result1.token).toBe("string & number");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("intersection");
            expect(result2.token).toBe("string & number & boolean");
            expect(result2.rest).toBe("");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"intersection">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"intersection">>>,
        ];
    });

    it("complex expressions with rest", () => {
        const result1 = getInputToken("string[] | number");
        const result2 = getInputToken("Array<string> & boolean");
        const result3 = getInputToken("(string | number)[] | boolean");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("array");
            expect(result1.token).toBe("string[]");
            expect(result1.rest).toBe("| number");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("array");
            expect(result2.token).toBe("Array<string>");
            expect(result2.rest).toBe("& boolean");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("array");
            expect(result3.token).toBe("(string | number)[]");
            expect(result3.rest).toBe("| boolean");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result3, "extends", IT_Token<"array">>>,
        ];
    });

    it("wrong handler cases", () => {
        const result1 = getInputToken("invalid-type");
        const result2 = getInputToken("not-a-token");

        expect(isErr(result1, "unparsed")).toBe(true);
        expect(isErr(result2, "unparsed")).toBe(true);
    });

it("whitespace handling", () => {
        const result1 = getInputToken("  string  ");
        const result2 = getInputToken("  Array<number>  ");
        const result3 = getInputToken("  (string | number)[]  ");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("atomic");
            expect(result1.token).toBe("string");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("array");
            expect(result2.token).toBe("Array<number>");
            expect(result2.rest).toBe("");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("array");
            expect(result3.token).toBe("(string | number)[]");
            expect(result3.rest).toBe("");
        }
    });

    it("empty token", () => {
        const result = getInputToken("");

        expect(isErr(result, "malformed-token")).toBe(true);
    });
});
