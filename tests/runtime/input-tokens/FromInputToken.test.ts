import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
    Contains,
    DefineObject,
    Err,
    FnKeyValue,
    FromInputToken,
    FromInputToken__String,
    FromInputToken__Tuple,
    GetInputToken,
    Test,
} from "inferred-types/types";
import { Extends, TypedFunction } from "inferred-types/types";
import { fromInputToken } from "inferred-types/runtime";

describe("FromInputToken__String<T>", () => {
    it("atomic tokens", () => {
        type Str = FromInputToken__String<"string">;
        type Str2 = FromInputToken__String<"   string    ">;
        type Num = FromInputToken__String<"number">;
        type Unknown = FromInputToken__String<"unknown">;

        type cases = [
            Expect<Test<Str, "equals",  string>>,
            Expect<Test<Str2, "equals",  string>>,
            Expect<Test<Num, "equals",  number>>,
            Expect<Test<Unknown, "equals",  unknown>>,
        ];
    });


    it("string literals", () => {
        type Foo = FromInputToken__String<`"foo"`>;
        type Foo2 = FromInputToken__String<`String(foo) `>;

        type FooBar = FromInputToken__String<`"foo" | "bar"`>;

        type cases = [
            Expect<Test<Foo, "equals", "foo">>,
            Expect<Test<Foo2, "equals", "foo">>,

            Expect<Test<FooBar, "equals", "foo" | "bar">>
        ];
    });

    it("numeric literals", () => {
        type Answer = FromInputToken__String<"42">;
        type Answer2 = FromInputToken__String<`Number(42) `>;

        type NumUnion = FromInputToken__String<`42 | 99`>;

        type cases = [
            Expect<Test<Answer, "equals", 42>>,
            Expect<Test<Answer2, "equals", 42>>,

            Expect<Test<NumUnion, "equals", 42 | 99>>
        ];
    });


    it("arrays", () => {
        type PostStr = FromInputToken__String<"string[]">;
        type PostStr2 = FromInputToken__String<"string[][]">;
        type PostNum = FromInputToken__String<"number[]">;

        type PostGroup = FromInputToken__String<"(string)[]">;
        type PostGroupUnion = FromInputToken__String<"(string | number)[]">;

        type BracketStr = FromInputToken__String<"Array<string>">;

        type cases = [
            Expect<Test<PostStr, "equals", string[]>>,
            Expect<Test<PostStr2, "equals", string[][]>>,
            Expect<Test<PostNum, "equals", number[]>>,

            Expect<Test<PostGroup, "equals", (string)[]>>,
            Expect<Test<PostGroupUnion, "equals", (string | number)[]>>,

            Expect<Test<BracketStr, "equals", string[]>>,
        ];
    });
})


describe("FromInputToken<Token>", () => {

    it("atomic tokens with FromInputToken<...>", () => {
        type Str = FromInputToken<"string">;
        type Str2 = FromInputToken<"   string    ">;
        type Num = FromInputToken<"number">;
        type Unknown = FromInputToken<"unknown">;

        type cases = [
            Expect<Test<Str, "equals",  string>>,
            Expect<Test<Str2, "equals",  string>>,
            Expect<Test<Num, "equals",  number>>,
            Expect<Test<Unknown, "equals",  unknown>>,
        ];
    });

    it("unions with FromStringInputToken", () => {
        type U = FromInputToken__String<"number | String(bar)">;

        type cases = [
            Expect<Test<U, "equals",  number | "bar">>
        ];
    });


    it("union with 'unknown' as an element resolves to just 'unknown'", () => {
        type U = FromInputToken__String<"string | number | unknown">;

        type cases = [
            Expect<Test<U, "equals",  unknown>>
        ];
    });


    it("unions with FromInputToken", () => {
        type U = FromInputToken<"number | String(bar)">;

        type cases = [
            Expect<Test<U, "equals",  number | "bar">>
        ];
    });


    it("named function", () => {
        type F = FromInputToken<
            "function foo(name: string, age: number, color: 'red' | 'blue'): string"
        >;
        type FN = FromInputToken<
            "function foo(name: string, age: number, color: 'red' | 'blue'): string"
        >;

        type cases = [
            Expect<Extends<F, TypedFunction>>,
            Expect<Extends<FN, TypedFunction>>,

            Expect<Test<Parameters<F>, "equals", [
                string, number,  "red" | "blue"
            ]>>,
            Expect<Test<ReturnType<F>, "equals",  string>>,
            Expect<Test<FnKeyValue<F>,  "equals", { name: "foo" }>>,

            Expect<Test<Parameters<FN>, "equals", [
                string, number, "red" | "blue"
            ]>>,
            Expect<Test<ReturnType<FN>, "equals",  string>>,
            Expect<Test<FnKeyValue<FN>, "equals",  { name: "foo" }>>,

            Expect<Test<
                F,
                "equals",
                (<T extends readonly [string, number, "red" | "blue"]>(...args: T) => string) & {
                    name: "foo";
                }
            >>,
            Expect<Test<
                FN,
                "equals",
                (<T extends readonly [string, number, "red" | "blue"]>(...args: T) => string) & {
                    name: "foo";
                }
            >>,
        ];
    });

    it("named async function", () => {
        type F = FromInputToken<
            "async function foo(name: string, age: number, color: 'red' | 'blue'): Promise<string>"
        >;
        type FN = FromInputToken<
            "async function foo(name: string, age: number, color: 'red' | 'blue'): Promise<string>"
        >;
        // invalid because the return type MUST be a promise!
        type Invalid = FromInputToken<
            "async function foo(name: string, age: number, color: 'red' | 'blue'): string"
        >

        type cases = [
            Expect<Extends<F, TypedFunction>>,
            Expect<Extends<FN, TypedFunction>>,


            Expect<Test<
                Parameters<F>, "equals",
                [string, number, "red" | "blue"]
            >>,
            Expect<Test<ReturnType<F>, "equals",  Promise<string>>>,
            Expect<Test<FnKeyValue<F>, "equals",  { name: "foo" }>>,

            Expect<Test<
                Parameters<FN>, "equals",
                [string, number,  "red" | "blue"]
            >>,
            Expect<Test<ReturnType<FN>, "equals",  Promise<string>>>,
            Expect<Test<FnKeyValue<FN>, "equals",  { name: "foo" }>>,

            Expect<Test<
                F,
                "equals",
                (<T extends readonly [string, number, "red" | "blue"]>(...args: T) => Promise<string>) & {
                    name: "foo";
                }
            >>,
            Expect<Test<
                FN,
                "equals",
                (<T extends readonly [string, number, "red" | "blue"]>(...args: T) => Promise<string>) & {
                    name: "foo";
                }
            >>,
            Expect<Test<
                Invalid,
                "isError",
                "malformed-token"
            >>
        ];
    });

    it("generator functions", () => {
        // sync named generator
        type G1 = FromInputToken<
            "function* iterate(count: number): Generator<number, void, unknown>"
        >;
        // sync named generator with generics in params and return type
        type G2 = FromInputToken<
            "function* <T extends number>(arr: Array<T>): IterableIterator<T>"
        >;
        // async named generator
        type AG1 = FromInputToken<
            "async function* stream(url: string): AsyncGenerator<string, number, unknown>"
        >;
        // async anonymous generator with generic used in return type
        type AG2 = FromInputToken<
            "async function* <T>(v: T): AsyncIterableIterator<T>"
        >;

        type cases = [
            // sync
            Expect<Test<G1, "equals", Generator<number, void, unknown>>>,
            Expect<Test<G2, "equals", IterableIterator<number>>>,

            // async
            Expect<Test<AG1, "equals", AsyncGenerator<string, number, unknown>>>,
            // no constraint on T => unknown
            Expect<Test<AG2, "equals", AsyncIterableIterator<unknown>>>,
        ];
    });

    it("generator functions with group + intersection", () => {
        type Tok = FromInputToken<
            "(function* (name: string): Generator<string, void, unknown>) & { foo: 1; bar: 2 }"
        >;

        type cases = [
            Expect<Test<
                Tok,
                "equals",
                (Generator<string, void, unknown>) & { foo: 1; bar: 2 }
            >>,
        ];
    });

    it("generator function errors", () => {
        // sync generator returning async type
        type Bad1 = FromInputToken<
            "function* g(): AsyncGenerator<string, void, unknown>"
        >;
        // async generator returning sync type
        type Bad2 = FromInputToken<
            "async function* g(): Generator<string, void, unknown>"
        >;

        type cases = [
            Expect<Test<Bad1, "isError", "malformed-token">>,
            Expect<Test<Bad2, "isError", "malformed-token">>,
        ];
    });

    it("functions with parenthesis around them work too", () => {
        // should use IT_TakeGroup<T> and then IT_TakeFunction<T>
        type A1 = FromInputToken<"(() => 'hi')">;
        type A2 = FromInputToken<"((name: string) => string)">;

        type N1 = FromInputToken<"(function greet(): 'String(hi)')">;
        type N2 = FromInputToken<"(function greet(name: string): string)">;

        type cases = [
            Expect<Test<A1, "equals", () => "hi">>,
            Expect<Test<A2, "equals", <T extends readonly [string]>(...args: T) => string>>,

            Expect<Test<N1, "equals", (() => "String(hi)") & {
                name: "greet";
            }>>,
            Expect<Test<N2, "equals", (<T extends readonly [string]>(...args: T) => string) & {
                name: "greet";
            }>>,
        ];
    });

    it("function errors", () => {
        // named functions should declare return type after `:` not `=>`
        type NamedWithArrow = FromInputToken<"function greet() => 'String(hi)'">;
        type NamedWithArrowInParenthesis = FromInputToken<"(function greet() => 'String(hi)')">;


        type cases = [
            Expect<Test<NamedWithArrow, "isError", "malformed-token/named-function">>,
            Expect<Test<NamedWithArrowInParenthesis, "isError", "malformed-token/group">>,
        ];
    });




    it("string object definition", () => {
        type O1 = FromInputToken<"{ foo: Number(1); bar: number }">;

        type cases = [
            Expect<Test<O1, "equals", { foo: 1, bar: number }>>
        ];
    });


    it("string object definition accepts non-required props", () => {
        type O1 = FromInputToken<"{ foo?: Number(1); bar: number }">;
        type O2 = FromInputToken<"{ foo?: number, bar: string, baz?: String(baz) }">;
        type O3 = FromInputToken<"{ id: number; data: unknown }">;

        type cases = [
            Expect<Test<O1, "equals",  { foo?: 1,bar: number }>>,
            Expect<Test<O2, "equals",  { foo?: number, bar: string, baz?: "baz" }>>,
            Expect<Test<O3, "equals",  { id: number, data: unknown }>>
        ];
    });


    it("object definition as part of union type", () => {
        type O1 = FromInputToken<"{ foo?: number, bar: string, baz: String(baz) } | string">;

        type cases = [
            Expect<Test<
                O1,
                "equals",
                { foo?: number, bar: string, baz: "baz" } | string
            >>
        ];
    });


    it("a '{' character -- indicate an object -- but with no terminal '}' character produces an error", () => {
        // the object literal definition is missing the terminating `}`
        type E = FromInputToken<"{ foo: 1">;
        type E2 = GetInputToken<"{ foo: 1">;

        type cases = [
            Expect<Test<E, "isError", "malformed-token/object-literal">>,
            Expect<Contains<E["message"], `terminating '}' character`>>
        ];
    });


    it("error when function with leading parenthesis is unmatched", () => {
        // missing the terminating `)` character for the group
        type E = FromInputToken<"(() => string">;

        type cases = [
            Expect<Extends<E, Err<"malformed-token/group">>>,
            Expect<Contains<E["message"], `terminating ')'`>>,
        ];
    });


    it("union type starting with function", () => {
        type U1 = FromInputToken<"(() => string) | string">;
        type U2 = FromInputToken<"(() => string | number) | string">;

        type cases = [
            Expect<Test<U1, "equals",  (() => string) | string>>,
            Expect<Test<U2, "equals",  (() => string | number) | string>>,
        ];
    });



    it("Record token with FromInputToken", () => {
        type R1 = FromInputToken<"Record<string,string>">;

        type cases = [
            Expect<Test<R1, "equals", Record<string, string>>>
        ];
    });

    it("Array<...> token with FromInputToken", () => {
        type AS = FromInputToken<"  Array<string>">;
        type AN = FromInputToken<"Array<number>">;
        type AR = FromInputToken<"Array<Record<string,string>>">;
        type AU = FromInputToken<"Array<string | number>">;
        type AB = FromInputToken<"Array<boolean>">;

        type Incomplete = FromInputToken<"Array<string">;

        type cases = [
            Expect<Test<AS, "equals",  string[]>>,
            Expect<Test<AN, "equals",  number[]>>,
            Expect<Test<AR, "equals",  Record<string, string>[]>>,
            Expect<Test<AU, "equals",  (string | number)[]>>,
            Expect<Test<AB, "equals",  boolean[]>>,

            Expect<Test<Incomplete, "isError", "malformed-token">>,
        ];
    });


    it("Array<...> as part of union", () => {
        type AU1 = FromInputToken<"Array<boolean> | false">;
        type AU2 = FromInputToken<"Array<boolean> | string">;

        type AU3 = FromInputToken<"false | Array<boolean>">;

        type cases = [
            Expect<Test<AU1, "equals",  false | boolean[]>>,
            Expect<Test<AU2, "equals",  string | boolean[]>>,
            Expect<Test<AU3, "equals",  false | boolean[]>>,
        ];
    });


    it("parse Set<..> type", () => {
        type S1 = FromInputToken<"Set<string>">;
        type S2 = FromInputToken<"Set<string | number>">;

        type cases = [
            Expect<Test<S1, "equals",  Set<string>>>,
            Expect<Test<S2, "equals",  Set<string | number>>>,
        ];
    });

    it("parse Map<k,v> type", () => {
        type M1 = FromInputToken<"Map<Object, Object>">;
        type M2 = FromInputToken<"Map<string, Object>">;
        type M3 = FromInputToken<"Map<string | number, Object>">;
        type M4 = FromInputToken<"Map<string | number, { id: number, data: unknown }>">;

        type cases = [
            Expect<Test<M1, "equals", Map<object, object>>>,
            Expect<Test<M2, "equals", Map<string, object>>>,
            Expect<Test<M3, "equals", Map<string|number, object>>>,
            Expect<Test<
                M4, "equals",
                Map<string|number, { id: number,  data: unknown }>
            >>,
        ];
    });

    it("parse WeakMap type", () => {
        type M1 = FromInputToken<"WeakMap<Object, Object>">;
        type M2 = FromInputToken<"WeakMap<Object, string>">;
        type M3 = FromInputToken<"WeakMap<{id: number, data: Array<string>}, string>">;
        type M4 = FromInputToken<"WeakMap<Set<string>, string">;

        type cases = [
            Expect<Test<M1, "equals", WeakMap<object, object>>>,
            Expect<Test<M2, "equals", WeakMap<object, string>>>,
            Expect<Equal<M3, WeakMap<
                {id: number, data: string[]},
                string
            >>>,
            Expect<Equal<M4, WeakMap<
                Set<string>,
                string
            >>>,
        ];
    });


    it("Array beginning but without a terminating '>' character", () => {
        type E = FromInputToken<"Array<string">;

        type cases = [
            Expect<Test<E, "isError", "malformed-token">>
        ]
    })


    it("string-based tuple token", () => {
        type T1 = FromInputToken<"[ number, number, string ]">;
        type T2 = FromInputToken<"[string|number,boolean]">;

        type cases = [
            Expect<Test<T1, "equals", [ number, number, string ]>>,
            Expect<Test<T2, "equals", [ string|number, boolean ]>>,
        ];
    });

    it("tuple with FromTupleInputToken", () => {
        type T = FromInputToken__Tuple<["number", "string", "true | Object"]>

        type cases = [
            Expect<Test<T, "equals",  [number, string, true | object]>>
        ];
    });

    it("tuple with FromInputToken", () => {
        type T = FromInputToken<["number", "string", "true | Object"]>

        type cases = [
            Expect<Test<T, "equals",  [number, string, true | object]>>
        ];
    });

    it("dictionary from FromInputToken", () => {

        type D1 = FromInputToken<{ foo: "string", bar: "number" }>;

        type D2 = FromInputToken<{
            foo: "Array<string|number>",
            bar: "number"
        }>;

        type D2b = FromInputToken<{
            foo: "(string|number)[]",
            bar: "number"
        }>

        type D3 = FromInputToken<{
            foo: "Array<string|number>",
            bar: "() => String(hi)"
        }>;

        type cases = [
            Expect<Test<
                D1, "equals",
                { foo: string; bar: number }
            >>,
            Expect<Test<
                D2, "equals",
                { foo: (string | number)[]; bar: number }
            >>,
            Expect<Test<
                D3, "equals",
                { foo: (string | number)[]; bar: () => "hi" }
            >>
        ];
    });

})


describe("fromInputToken(token)", () => {


    it("simple types", () => {
        const t1 = fromInputToken("Array<boolean>");
        const t2 = fromInputToken("string | number");

        expect(t1).toBe("Array<boolean>");

        type cases = [
            Expect<Test<typeof t1, "equals", boolean[]>>,
            Expect<Test<typeof t2, "equals", string | number>>,
        ];
    });


})
