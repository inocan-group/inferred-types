import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {
    Err,
    FnProps,
    FromInputToken,
    FromStringInputToken,
    FromTupleInputToken,
    Test,
} from "inferred-types/types";
import { Extends, TypedFunction } from "inferred-types/types";

describe("FromInputToken<Token>", () => {
    it("atomic tokens with FromStringInputToken<...>", () => {
        type Str = FromStringInputToken<"string">;
        type Str2 = FromStringInputToken<"   string    ">;
        type Num = FromStringInputToken<"number">;
        type Unknown = FromStringInputToken<"unknown">;

        type cases = [
            Expect<Test<Str, "equals",  string>>,
            Expect<Test<Str2, "equals",  string>>,
            Expect<Test<Num, "equals",  number>>,
            Expect<Test<Unknown, "equals",  unknown>>,
        ];
    });

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
        type U = FromStringInputToken<"number | String(bar)">;

        type cases = [
            Expect<Test<U, "equals",  number | "bar">>
        ];
    });


    it("union with 'unknown' as an element resolves to just 'unknown'", () => {
        type U = FromStringInputToken<"string | number | unknown">;

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
            "foo(name: string, age: number, color: String(red) | String(blue)) => string"
        >;
        type FN = FromInputToken<
            "foo(name: string, age: number, color: String(red) | String(blue)) -> string"
        >;

        type cases = [
            Expect<Extends<F, TypedFunction>>,
            Expect<Extends<FN, TypedFunction>>,

            Expect<Test<Parameters<F>, "equals", [
                string, number,  "red" | "blue"
            ]>>,
            Expect<Test<ReturnType<F>, "equals",  string>>,
            Expect<Test<FnProps<F>,  "equals", { name: "foo" }>>,

            Expect<Test<Parameters<FN>, "equals", [
                string, number, "red" | "blue"
            ]>>,
            Expect<Test<ReturnType<FN>, "equals",  string>>,
            Expect<Test<FnProps<FN>, "equals",  { name: "foo" }>>,

            Expect<Test<
                F,
                "equals",
                ((args_0: string, args_1: number, args_2: "red" | "blue") => string) & {
                    name: "foo";
                }
            >>,
            Expect<Test<
                FN,
                "equals",
                (<T extends [string, number, "red" | "blue"]>(...args: T) => string) & {
                    name: "foo";
                }
            >>,
        ];
    });

    it("named async function", () => {
        type F = FromInputToken<
            "async foo(name: string, age: number, color: String(red) | String(blue)) => string"
        >;
        type FN = FromInputToken<
            "async foo(name: string, age: number, color: String(red) | String(blue)) -> string"
        >;

        type cases = [
            Expect<Extends<F, TypedFunction>>,
            Expect<Extends<FN, TypedFunction>>,


            Expect<Test<
                "equals",
                Parameters<F>,
                [string, number, "equals",  "red" | "blue"]
            >>,
            Expect<Test<ReturnType<F>, "equals",  Promise<string>>>,
            Expect<Test<FnProps<F>, "equals",  { name: "foo" }>>,

            Expect<Test<
                "equals",
                Parameters<FN>,
                [string, number, "equals",  "red" | "blue"]
            >>,
            Expect<Test<ReturnType<FN>, "equals",  Promise<string>>>,
            Expect<Test<FnProps<FN>, "equals",  { name: "foo" }>>,

            Expect<Test<
                F,
                "equals",
                ((args_0: string, args_1: number, args_2: "red" | "blue") => Promise<string>) & {
                    name: "foo";
                }
            >>,
            Expect<Test<
                FN,
                "equals",
                (<T extends [string, number, "red" | "blue"]>(...args: T) => Promise<string>) & {
                    name: "foo";
                }
            >>,
        ];
    });

    it("functions with parenthesis around them work too", () => {
        type A1 = FromInputToken<"(() => String(hi))">;
        type A2 = FromInputToken<"((name: string) => string)">;

        type N1 = FromInputToken<"(greet() => String(hi))">;
        type N2 = FromInputToken<"(greet(name: string) => string)">;

        type cases = [
            Expect<Test<A1, "equals", () => "hi">>,
            Expect<Test<A2, "equals", (name: string) => string>>,

            Expect<Test<N1, "equals", (() => "hi") & { name: "greet" }>>,
            Expect<Test<N2, "equals", ((name: string) => string) & { name: "greet" }>>,
        ];
    });


    it("Generator function using type syntax", () => {
        type G1 = FromInputToken<
            "Generator<number,string,boolean>"
        >;
        type G2 = FromInputToken<
            "AsyncGenerator<number,void,string>"
        >;

        type cases = [
            Expect<Test<
                G1,
                "equals",
                Generator<number, string, boolean>
            >>,
            Expect<Test<
                G2,
                "equals",
                AsyncGenerator<number, void, string>
            >>,
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
            Expect<Test<O1,  "equals",  { foo?: 1,bar: number }>>,
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
        type E = FromInputToken<"{ foo: 1">;

        type cases = [
            Expect<Extends<E, Err<"invalid-token/object">>>,
        ];
    });




    it("error when function with leading parenthesis is unmatched", () => {
        type E = FromInputToken<"(() => string">;

        type cases = [
            Expect<Extends<E, Err<"invalid-token/function">>>
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

    it("explicit function", () => {
        type FA = FromInputToken<"(name: string) =+> string">;
        type FNN = FromInputToken<"greet(name: string) -+> string">;

        type cases = [
            Expect<Test<Parameters<FA>, "equals",  [string]>>,
            Expect<Test<ReturnType<FA>, "equals",  string>>,
            Expect<Equal<FnProps<FA>, {
                name: "";
                parameters: [{ name: "name", type: string }];
                returns: string
            }>>,

            Expect<Equal<FnProps<FNN>, {
                name: "greet";
                parameters: [{ name: "name", type: string }];
                returns: string
            }>>,
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

            Expect<Extends<Incomplete, Err<"invalid-token/array">>>,
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
            Expect<Test<M1, WeakMap<object, "equals", object>>>,
            Expect<Test<M2, WeakMap<object, "equals", string>>>,
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
            Expect<Extends<E, Err<"invalid-token/array">>>
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
        type T = FromTupleInputToken<["number", "string", "true | Object"]>

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
