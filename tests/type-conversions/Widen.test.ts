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
});
