/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { EmptyObject, Dictionary,  Widen } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

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
    type MapForced = Widen<Map<string, number>, true>;
    type TupleForced = Widen<readonly string[], true>;

    type Fn = Widen<() => "hi">;
    type NarrowFn = Widen<<T extends string>(name: T) => `hi ${T}`>;
    type FnWithProps = Widen<(() => "hi") & { foo: 1; bar: 2}>;
    type FnAsProp = Widen<{foo: () => "hi"}>;
    type FnWithPropAsProp = Widen<{foo: (() => "hi") & { bar: 1}}>;

    type cases = [
      Expect<Equal<NumLiteral, number>>, //
      Expect<Equal<StrLiteral, string>>, 

      Expect<Equal<LiteralObj, { foo: number; bar: string}>>, 
      Expect<Equal<WideObj, { foo: number; bar: string}>>, 
      Expect<Equal<ObjInObj, { foo: { bar: number; baz: number}}>>,
      Expect<Equal<KeyValue, EmptyObject>>,
      Expect<Equal<Obj, object>>,

      Expect<Equal<Arr, [string, boolean, number]>>,
      Expect<Equal<ArrInObj, {foo: [string, string]; bar: number}>>,
      Expect<Equal<WideArr, string[]>>,

      Expect<Equal<Union, string | number>>,

      Expect<Equal<DictForced, Dictionary>>,
      Expect<Equal<ObjLitForced, Dictionary>>,
      Expect<Equal<MapForced, Map<unknown,unknown>>>,
      Expect<Equal<TupleForced, readonly unknown[]>>,

      Expect<Equal<Fn, () => string>>,
      Expect<Equal<NarrowFn, <T extends [name: string]>(...args: T) => string>>,
      Expect<Equal<FnWithProps, (()=> string) & {foo: number; bar: number}>>,
      Expect<Equal<FnAsProp, {foo: () => string}>>,
      Expect<Equal<FnWithPropAsProp, {foo: (() => string) & {bar: number}}>>
    ];
    const cases: cases = [
      true, true, 
      true, true, true, true,true,
      true, true,true,
      true,
      true, true, true, true,
      true, true, true, true, true
    ];
  });

});

