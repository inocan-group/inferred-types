import {
    Expect,
    EmptyObject,
    Dictionary,
    Widen,
    Test
} from "inferred-types/types";
import { describe, it } from "vitest";



describe("Widen<T>", () => {

  it("happy path", () => {
    type NumLiteral = Widen<42>; // number
    type StrLiteral = Widen<"foo">; // string

    type LiteralObj = Widen<{ foo: 42; bar: "baz" }>;
    type WideObj = Widen<{ foo: number; bar: string }>; // already wide
    type ObjInObj = Widen<{foo: {bar: 1; baz: 2}}>;
    type KeyValue = Widen<Dictionary>;

    type Obj = Widen<object>;

    type Arr = Widen<["foo", false, 42]>;
    type ArrInObj = Widen<{foo: ["foo","bar"]; bar: 42}>;
    type WideArr = Widen<string[]>;

    type Union = Widen<"foo" | 42>;

    type DictForced = Widen<Dictionary, true>;
    type ObjLitForced = Widen<{foo: 1}, true>;
    type TupleForced = Widen<readonly string[], true>;

    type Fn = Widen<() => "hi">;
    type NarrowFnReturn = Widen<
        <T extends string>(name: T) => `hi ${T}`
    >;
    type NarrowFnParams = Widen<
        <T extends "Bob" | "Nancy">(name: T) => `hi ${T}`
    >;
    type FnWithProps = Widen<(() => "hi") & { foo: 1; bar: 2}>;
    type FnAsProp = Widen<{foo: () => "hi"}>;
    type FnWithPropAsProp = Widen<{foo: (() => "hi") & { bar: 1}}>;

    // @ts-ignore
    type cases = [
      Expect<Test<NumLiteral, "equals",  number>>, //
      Expect<Test<StrLiteral, "equals",  string>>,

      Expect<Test<LiteralObj, "equals",  { foo: number; bar: string}>>,
      Expect<Test<WideObj, "equals",  { foo: number; bar: string}>>,
      Expect<Test<ObjInObj, "equals",  { foo: { bar: number; baz: number}}>>,
      Expect<Test<KeyValue, "equals",  EmptyObject>>,
      Expect<Test<Obj, "equals",  object>>,

      Expect<Test<Arr, "equals", [string, boolean, number]>>,
      Expect<Test<ArrInObj, "equals", {foo: [string, string]; bar: number}>>,
      Expect<Test<WideArr, "equals",  string[]>>,

      Expect<Test<Union, "equals",  string | number>>,

      Expect<Test<DictForced, "equals",  Dictionary>>,
      Expect<Test<ObjLitForced, "equals",  Dictionary>>,
      Expect<Test<MapForced, "equals", Map<unknown, unknown>>>,
      Expect<Test<TupleForced, "equals",  readonly unknown[]>>,

      Expect<Test<Fn, "equals",  () => string>>,
      Expect<Test<
        NarrowFnReturn, "equals",
        <T extends readonly [name: string]>(...args: T) => string>>,
      // this was unexpected by the `ReturnType` utility can't handle the union type
      // in the params
      Expect<Test<
        NarrowFnParams, "equals",
            <T extends [name: string]>(...args: T) => unknown
        >>,
        Expect<Test<
            FnWithProps, "equals",
            (()=> string) & {foo: number; bar: number}
        >>,
        Expect<Test<
            FnAsProp, "equals",
            {foo: () => string}
        >>,
        Expect<Test<
            FnWithPropAsProp, "equals",
            {foo: (() => string) & {bar: number}}
        >>
    ];

  });

});
