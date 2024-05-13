/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { EmptyObject, KV,  Widen } from "src/types/index";
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
    type KeyValue = Widen<KV>;
    type Obj = Widen<object>;

    type Arr = Widen<["foo", false, 42]>; 
    type WideArr = Widen<string[]>;

    type Union = Widen<"foo" | 42>;


    type cases = [
      Expect<Equal<NumLiteral, number>>, //
      Expect<Equal<StrLiteral, string>>, 

      Expect<Equal<LiteralObj, { foo: number; bar: string}>>, 
      Expect<Equal<WideObj, { foo: number; bar: string}>>, 
      Expect<Equal<KeyValue, EmptyObject>>,
      Expect<Equal<Obj, object>>,

      Expect<Equal<Arr, [string, boolean, number]>>,
      Expect<Equal<WideArr, string[]>>,

      Expect<Equal<Union, string | number>>
    ];
    const cases: cases = [
      true, true, 
      true, true, true, true,
      true, true,
      true
    ];
  });

});

