// deno-lint-ignore-file no-explicit-any
import type {
    IsNarrowingFn,
    Dictionary,
    EmptyObject,
    Expect,
    Test,
    Widen,
    WidenFunction,
    Returns,
    FnMeta,
    WidenFunc,
} from "inferred-types/types";

import { describe, it } from "vitest";

describe("Widen<T>", () => {
    it("widen function", () => {
        // a narrowing function which uses the generic to specify the return
        type BobNancy = <T extends "Bob" | "Nancy">(name: T) => `hi ${T}`;

        // Typescript's built-in ReturnType<T> utility has some surprising
        // limits; in this case it returns `any` when ideally it would be
        // `hi ${string}` or at least `string`!
        type X = ReturnType<BobNancy>;
        // however the FnMeta utility does a better job; not perfect maybe
        // but at least we get back `string`!
        type Y = FnMeta<BobNancy>["returns"];

        // `IsNarrowingFn` now correctly reports `true` for a union-constrained
        // generic whose type parameter is woven into a template-literal return
        // (previously the `any`-collapse of `ReturnType` made it report `false`).
        type Narrowing = IsNarrowingFn<BobNancy>;

        // `WidenFunction` is **deprecated**. It is handed the already-widened
        // constituent parts of the function — crucially `ReturnType<BobNancy>`,
        // which TypeScript has collapsed to `any`. With the template return
        // already destroyed and the parameter pre-widened to `string`, the best
        // it can produce is `<T extends readonly [string]>(...args: T) => string`.
        // Prefer `WidenFunc`, which receives the whole function.
        type W1 = WidenFunction<
            true,
            Parameters<BobNancy>,
            ReturnType<BobNancy>,
            EmptyObject
        >;

        // The `WidenFunc` utility is both more ergonomic AND more correct: it
        // keeps the narrow input constraint (`"Bob" | "Nancy"`), rebuilds the
        // single-parameter narrowing form, and recovers the template-literal
        // return as `hi ${string}` (via the shared prefix of the recovered
        // `"hi Bob" | "hi Nancy"` union).
        type W2 = WidenFunc<BobNancy>;

        // we CAN determine the length of the parameters which is how
        // `WidenFunc` rebuilds the correct single-parameter arity
        type Num = FnMeta<BobNancy>["params"]["length"];

        type cases = [
            Expect<Test<Narrowing, "equals", true>>,
            Expect<Test<Num, "equals", 1>>,
            // deprecated `WidenFunction`: lossy result from pre-split inputs
            Expect<
                Test<
                    W1,
                    "equals",
                    <T extends readonly [string]>(...args: T) => string
                >
            >,
            // `WidenFunc`: ergonomic, arity-correct, template return recovered
            Expect<
                Test<
                    W2,
                    "equals",
                    <T extends "Bob" | "Nancy">(x: T) => `hi ${string}`
                >
            >,
        ];
    });

    it("happy path", () => {
        type NumLiteral = Widen<42>; // number
        type StrLiteral = Widen<"foo">; // string

        type LiteralObj = Widen<{ foo: 42; bar: "baz" }>;
        type WideObj = Widen<{ foo: number; bar: string }>; // already wide
        type ObjInObj = Widen<{ foo: { bar: 1; baz: 2 } }>;
        type KeyValue = Widen<Dictionary>;

        type Obj = Widen<object>;

        type Arr = Widen<["foo", false, 42]>;
        type ArrInObj = Widen<{ foo: ["foo", "bar"]; bar: 42 }>;
        type WideArr = Widen<string[]>;

        type Union = Widen<"foo" | 42>;

        type DictForced = Widen<Dictionary, true>;
        type ObjLitForced = Widen<{ foo: 1 }, true>;
        type MapForced = Widen<Map<string, number>, true>;
        type TupleForced = Widen<readonly string[], true>;

        type Fn = Widen<() => "hi">;
        type NarrowFnReturn = Widen<<T extends string>(name: T) => `hi ${T}`>;

        type NarrowFnParams = Widen<
            (name: "Bob" | "Nancy") => `hi ${typeof name}`
        >;
        type FnWithProps = Widen<(() => "hi") & { foo: 1; bar: 2 }>;
        type FnAsProp = Widen<{ foo: () => "hi" }>;
        type FnWithPropAsProp = Widen<{ foo: (() => "hi") & { bar: 1 } }>;

        type cases = [
            Expect<Test<NumLiteral, "equals", number>>, //
            Expect<Test<StrLiteral, "equals", string>>,

            Expect<Test<LiteralObj, "equals", { foo: number; bar: string }>>,
            Expect<Test<WideObj, "equals", { foo: number; bar: string }>>,
            Expect<
                Test<ObjInObj, "equals", { foo: { bar: number; baz: number } }>
            >,
            Expect<Test<KeyValue, "equals", EmptyObject>>,
            Expect<Test<Obj, "equals", object>>,

            Expect<Test<Arr, "equals", [string, boolean, number]>>,
            Expect<
                Test<ArrInObj, "equals", { foo: [string, string]; bar: number }>
            >,
            Expect<Test<WideArr, "equals", string[]>>,

            Expect<Test<Union, "equals", string | number>>,

            Expect<Test<DictForced, "equals", Dictionary>>,
            Expect<Test<ObjLitForced, "equals", Dictionary>>,
            Expect<Test<MapForced, "equals", Map<any, any>>>,
            Expect<Test<TupleForced, "equals", readonly unknown[]>>,

            Expect<Test<Fn, "equals", () => string>>,
            Expect<
                Test<
                    NarrowFnReturn,
                    "equals",
                    <T extends readonly [string]>(...args: T) => string
                >
            >,
            Expect<
                Test<
                    NarrowFnParams,
                    "equals",
                    <T extends readonly [string]>(...args: T) => string
                >
            >,
            Expect<
                Test<
                    FnWithProps,
                    "equals",
                    (() => string) & { foo: number; bar: number }
                >
            >,
            Expect<Test<FnAsProp, "equals", { foo: () => string }>>,
            Expect<
                Test<
                    FnWithPropAsProp,
                    "equals",
                    { foo: (() => string) & { bar: number } }
                >
            >,
        ];
    });

    it("functions", () => {
        // a named function declaration; at the type level `typeof named` is
        // structurally identical to the equivalent arrow function.
        function named(_a: 1, _b: "x"): "hi" {
            return "hi";
        }

        // Any function *with parameters* is widened into the narrowing form
        // `<T extends readonly [...]>(...args: T) => R`; arrow and named
        // functions resolve identically.
        type ArrowNoGen = Widen<(a: 1, b: "x") => "hi">;
        type Named = Widen<typeof named>;

        // A parameter-less function stays a plain function (only the return
        // value is widened).
        type NoParams = Widen<() => "hi">;

        // A single-parameter generic. Note that `Widen` (unlike `WidenFunc`)
        // routes through `FnFrom`, so it widens the input constraint away to
        // `string` and cannot recover the template return — this is the very
        // fidelity gap that motivates preferring `WidenFunc`.
        type GenSingle = Widen<<T extends "Bob" | "Nancy">(name: T) => `hi ${T}`>;

        // The `readonly` modifier on the generic constraint DIRECTLY impacts
        // fidelity of the widened return: the tuple's `readonly`-ness is
        // preserved through widening.
        //   readonly constraint → readonly return
        type GenRo = Widen<<T extends readonly [string, 1 | 2 | 3]>(...x: T) => T>;
        //   mutable  constraint → mutable  return
        type GenMut = Widen<<T extends [string, 1 | 2 | 3]>(...x: T) => T>;

        type cases = [
            Expect<
                Test<
                    ArrowNoGen,
                    "equals",
                    <T extends readonly [number, string]>(...args: T) => string
                >
            >,
            Expect<
                Test<
                    Named,
                    "equals",
                    <T extends readonly [number, string]>(...args: T) => string
                >
            >,
            Expect<Test<NoParams, "equals", () => string>>,
            Expect<
                Test<
                    GenSingle,
                    "equals",
                    <T extends readonly [string]>(...args: T) => string
                >
            >,
            // readonly constraint is preserved as a readonly return tuple
            Expect<
                Test<
                    GenRo,
                    "equals",
                    <T extends readonly [string, number]>(
                        ...args: T
                    ) => readonly [string, number]
                >
            >,
            // mutable constraint yields a mutable return tuple
            Expect<
                Test<
                    GenMut,
                    "equals",
                    <T extends readonly [string, number]>(
                        ...args: T
                    ) => [string, number]
                >
            >,
        ];
    });

    it("numeric", () => {
        type NumLit = Widen<42>;
        type NumUnion = Widen<1 | 2 | 3>;
        type WideNum = Widen<number>;
        // bigint is a distinct scalar and widens to `bigint` (not `number`)
        type BigLit = Widen<1n>;
        type WideBig = Widen<bigint>;
        // a mixed number/bigint union widens each member to its own wide type
        type MixedNumeric = Widen<1 | 2n>;

        type cases = [
            Expect<Test<NumLit, "equals", number>>,
            Expect<Test<NumUnion, "equals", number>>,
            Expect<Test<WideNum, "equals", number>>,
            Expect<Test<BigLit, "equals", bigint>>,
            Expect<Test<WideBig, "equals", bigint>>,
            Expect<Test<MixedNumeric, "equals", number | bigint>>,
        ];
    });

    it("string", () => {
        type StrLit = Widen<"foo">;
        type StrUnion = Widen<"foo" | "bar">;
        type WideStr = Widen<string>;
        // template literals are already "wide-ish" strings and collapse to `string`
        type TemplateSuffix = Widen<`hi ${string}`>;
        type TemplateNumeric = Widen<`${number}px`>;

        type cases = [
            Expect<Test<StrLit, "equals", string>>,
            Expect<Test<StrUnion, "equals", string>>,
            Expect<Test<WideStr, "equals", string>>,
            Expect<Test<TemplateSuffix, "equals", string>>,
            Expect<Test<TemplateNumeric, "equals", string>>,
        ];
    });

    it("boolean", () => {
        type TrueLit = Widen<true>;
        type FalseLit = Widen<false>;
        type WideBool = Widen<boolean>;

        type cases = [
            Expect<Test<TrueLit, "equals", boolean>>,
            Expect<Test<FalseLit, "equals", boolean>>,
            Expect<Test<WideBool, "equals", boolean>>,
        ];
    });

    it("unions", () => {
        // every member of the union is widened independently
        type MixedScalar = Widen<"foo" | 42>;
        type TriScalar = Widen<1 | "a" | true>;
        // a union whose members all widen to the same type collapses to it
        type AllStrings = Widen<"a" | "b" | "c">;
        // an already-wide member is left untouched alongside widened literals
        type WideAndLiteral = Widen<string | 42>;

        type cases = [
            Expect<Test<MixedScalar, "equals", string | number>>,
            Expect<Test<TriScalar, "equals", string | number | boolean>>,
            Expect<Test<AllStrings, "equals", string>>,
            Expect<Test<WideAndLiteral, "equals", string | number>>,
        ];
    });

    it("intersections", () => {
        // an object intersection is treated as a single object and each value
        // is widened (the intersection is flattened into one shape)
        type ObjSameValues = Widen<{ foo: 1 } & { bar: 2 }>;
        type ObjMixedValues = Widen<{ a: 1 } & { b: "x" }>;
        // a function intersected with props widens both the function and props
        // while preserving the intersection form
        type FnWithProps = Widen<(() => "hi") & { foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<ObjSameValues, "equals", { foo: number; bar: number }>>,
            Expect<Test<ObjMixedValues, "equals", { a: number; b: string }>>,
            Expect<
                Test<
                    FnWithProps,
                    "equals",
                    (() => string) & { foo: number; bar: number }
                >
            >,
        ];
    });
});
