import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {
    Err,
    FnProps,
    FromInputToken,
    FromStringInputToken,
    FromTupleInputToken,
} from "inferred-types/types";
import { Extends, TypedFunction } from "transpiled/types";

describe("FromInputToken<Token>", () => {
    it("atomic tokens with FromStringInputToken<...>", () => {
        type Str = FromStringInputToken<"string">;
        type Str2 = FromStringInputToken<"   string    ">;
        type Num = FromStringInputToken<"number">;
        type Unknown = FromStringInputToken<"unknown">;

        type cases = [
            Expect<Equal<Str, string>>,
            Expect<Equal<Str2, string>>,
            Expect<Equal<Num, number>>,
            Expect<Equal<Unknown, unknown>>,
        ];
    });

    it("atomic tokens with FromInputToken<...>", () => {
        type Str = FromInputToken<"string">;
        type Str2 = FromInputToken<"   string    ">;
        type Num = FromInputToken<"number">;
        type Unknown = FromInputToken<"unknown">;

        type cases = [
            Expect<Equal<Str, string>>,
            Expect<Equal<Str2, string>>,
            Expect<Equal<Num, number>>,
            Expect<Equal<Unknown, unknown>>,
        ];
    });

    it("unions with FromStringInputToken", () => {
        type U = FromStringInputToken<"number | String(bar)">;

        type cases = [
            Expect<Equal<U, number | "bar">>
        ];
    });


    it("union with 'unknown' as an element resolves to just 'unknown'", () => {
        type U = FromStringInputToken<"string | number | unknown">;

        type cases = [
            Expect<Equal<U, unknown>>
        ];
    });


    it("unions with FromInputToken", () => {
        type U = FromInputToken<"number | String(bar)">;

        type cases = [
            Expect<Equal<U, number | "bar">>
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

            Expect<Equal<Parameters<F>, [string, number, "red" | "blue"]>>,
            Expect<Equal<ReturnType<F>, string>>,
            Expect<Equal<FnProps<F>, { name: "foo" }>>,

            Expect<Equal<Parameters<FN>, [string, number, "red" | "blue"]>>,
            Expect<Equal<ReturnType<FN>, string>>,
            Expect<Equal<FnProps<FN>, { name: "foo" }>>,

            Expect<Equal<
                F,
                ((args_0: string, args_1: number, args_2: "red" | "blue") => string) & {
                    name: "foo";
                }
            >>,
            Expect<Equal<
                FN,
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


            Expect<Equal<Parameters<F>, [string, number, "red" | "blue"]>>,
            Expect<Equal<ReturnType<F>, Promise<string>>>,
            Expect<Equal<FnProps<F>, { name: "foo" }>>,

            Expect<Equal<Parameters<FN>, [string, number, "red" | "blue"]>>,
            Expect<Equal<ReturnType<FN>, Promise<string>>>,
            Expect<Equal<FnProps<FN>, { name: "foo" }>>,

            Expect<Equal<
                F,
                ((args_0: string, args_1: number, args_2: "red" | "blue") => Promise<string>) & {
                    name: "foo";
                }
            >>,
            Expect<Equal<
                FN,
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
            Expect<Equal<A1, () => "hi">>,
            Expect<Equal<A2, (name: string) => string>>,

            Expect<Equal<N1, (() => "hi") & { name: "greet" }>>,
            Expect<Equal<N2, ((name: string) => string) & { name: "greet" }>>,
        ];
    });


    it("Generator function using type syntax", () => {
        type G1 = FromInputToken<
            "Generator<number,string,boolean>"
        >;

        type cases = [
            /** type tests */
        ];
    });



    it("string object definition", () => {
        type O1 = FromInputToken<"{ foo: Number(1); bar: number }">;

        type cases = [
            Expect<Equal<O1, { foo: 1, bar: number }>>
        ];
    });


    it("string object definition accepts non-required props", () => {
        type O1 = FromInputToken<"{ foo?: Number(1); bar: number }">;
        type O2 = FromInputToken<"{ foo?: number, bar: string, baz?: String(baz) }">;
        type O3 = FromInputToken<"{ id: number; data: unknown }">;

        type cases = [
            Expect<Equal<O1, { foo?: 1, bar: number }>>,
            Expect<Equal<O2, { foo?: number, bar: string, baz?: "baz" }>>,
            Expect<Equal<O3, { id: number, data: unknown }>>
        ];
    });


    it("object definition as part of union type", () => {
        type O1 = FromInputToken<"{ foo?: number, bar: string, baz: String(baz) } | string">;

        type cases = [
            Expect<Equal<
                O1,
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
            Expect<Equal<U1, (() => string) | string>>,
            Expect<Equal<U2, (() => string | number) | string>>,
        ];
    });

    it("explicit function", () => {
        type FA = FromInputToken<"(name: string) =+> string">;
        type FNN = FromInputToken<"greet(name: string) -+> string">;

        type cases = [
            Expect<Equal<Parameters<FA>, [string]>>,
            Expect<Equal<ReturnType<FA>, string>>,
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
            Expect<Equal<R1, Record<string, string>>>
        ];
    });

    it("Array<...> token with FromInputToken", () => {
        type AS = FromInputToken<"  Array<string>">;
        type AN = FromInputToken<"Array<number>">;
        type AR = FromInputToken<"Array<Record<string,string>>">;
        type AU = FromInputToken<"Array<string | number>">;

        type Incomplete = FromInputToken<"Array<string">;

        type cases = [
            Expect<Equal<AS, string[]>>,
            Expect<Equal<AN, number[]>>,
            Expect<Equal<AR, Record<string, string>[]>>,
            Expect<Equal<AU, (string | number)[]>>,

            Expect<Extends<Incomplete, Err<"invalid-token/array">>>,
        ];
    });


    it("parse Set<..> type", () => {
        type S1 = FromInputToken<"Set<string>">;
        type S2 = FromInputToken<"Set<string | number>">;

        type cases = [
            /** type tests */
        ];
    });



    it("parse Map<k,v> type", () => {
        type M1 = FromInputToken<"Map<Object, Object>">;
        type M2 = FromInputToken<"Map<string, Object>">;
        type M3 = FromInputToken<"Map<string | number, Object>">;
        type M4 = FromInputToken<"Map<string | number, { id: number, data: unknown }>">;

        type cases = [
            Expect<Equal<M1, Map<object,object>>>,
            Expect<Equal<M2, Map<string,object>>>,
            Expect<Equal<M3, Map<string|number,object>>>,
            Expect<Equal<M4, Map<string|number, { id: number, data: unknown }>>>,
        ];
    });

    it("parse WeakMap type", () => {
        type M1 = FromInputToken<"WeakMap<Object, Object>">;
        type M2 = FromInputToken<"WeakMap<Object, string>">;
        type M3 = FromInputToken<"WeakMap<{id: number, data: Array<string>}, string>">;
        type M4 = FromInputToken<"WeakMap<Set<string>, string">;

        type cases = [
            Expect<Equal<M1, WeakMap<object,object>>>,
            Expect<Equal<M2, WeakMap<object,string>>>,
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
            Expect<Equal<T1, [ number, number, string ]>>,
            Expect<Equal<T2, [ string|number, boolean ]>>,
        ];
    });

    it("tuple with FromTupleInputToken", () => {
        type T = FromTupleInputToken<["number", "string", "true | Object"]>

        type cases = [
            Expect<Equal<T, [number, string, true | object]>>
        ];
    });

    it("tuple with FromInputToken", () => {
        type T = FromInputToken<["number", "string", "true | Object"]>

        type cases = [
            Expect<Equal<T, [number, string, true | object]>>
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
            Expect<Equal<D1, { foo: string; bar: number }>>,
            Expect<Equal<D2, { foo: (string | number)[]; bar: number }>>,
            Expect<Equal<D3, { foo: (string | number)[]; bar: () => "hi" }>>
        ];
    });

})
