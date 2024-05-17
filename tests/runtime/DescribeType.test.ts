import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DescribeType, Dictionary, Extends, Nothing } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("DescribeType<T>", () => {

  it("happy path", () => {
    type Str = DescribeType<string>;
    type StrLiteral = DescribeType<"foo">;
    type StrUnion = DescribeType<"foo" | "bar">;
    type Num = DescribeType<number>;
    type NumLiteral = DescribeType<42>;
    type Bool = DescribeType<boolean>;
    type True = DescribeType<true>;
    type False = DescribeType<false>;
    type Obj = DescribeType<object>;
    type KeyValue = DescribeType<Dictionary>;
    type RecStr = DescribeType<Record<string, string>>;
    type RecNum = DescribeType<Record<string, number>>;
    type ObjLiteral = DescribeType<{foo: 1; bar: 2}>;
    type Arr = DescribeType<string[]>;
    type ArrLiteral = DescribeType<[1,2,3]>;

    type MyMap = DescribeType<Map<string, string>>;
    type MyWeakMap = DescribeType<WeakMap<{foo: 1}, string>>;
    type MyWeakWideMap = DescribeType<WeakMap<object, string>>;
    type SetTheory = DescribeType<Set<string>>;

    type Nada = DescribeType<Nothing>;
    type Null = DescribeType<null>;
    type Undefined = DescribeType<undefined>;
    type Never = DescribeType<never>;
    type Unknown = DescribeType<unknown>;

    type MixedUnion = DescribeType<"foo" | 42>;
    
    type cases = [
      Expect<Equal<Str, "string">>,
      Expect<Equal<StrLiteral, "'foo'">>,
      Expect<Equal<StrUnion, "'foo' | 'bar'">>,

      Expect<Equal<Num, "number">>,
      Expect<Equal<NumLiteral, "42">>,

      Expect<Equal<Bool, "boolean">>,
      Expect<Equal<True, "true">>,
      Expect<Equal<False, "false">>,

      Expect<Equal<Obj, "object">>,
      Expect<Equal<KeyValue, "Record<string | symbol, unknown>">>,
      Expect<Equal<RecStr, "Record<string, string>">>,
      Expect<Equal<RecNum, "Record<string, number>">>,
      Expect<Equal<ObjLiteral, "{ foo: 1; bar: 2 }">>,

      Expect<Equal<Arr, "string[]">>,
      Expect<Equal<ArrLiteral, "[1, 2, 3]">>,

      Expect<Equal<MyMap, "Map<string, string>">>,
      Expect<Equal<MyWeakMap, "WeakMap<{ foo: 1 }, string>">>,
      Expect<Equal<MyWeakWideMap, "WeakMap<object, string>">>,
      Expect<Equal<SetTheory, "Set<string>">>,

      Expect<Equal<Nada, "undefined | null">>,
      Expect<Equal<Null, "null">>,
      Expect<Equal<Undefined, "undefined">>,
      Expect<Equal<Never, "never">>,
      Expect<Equal<Unknown, "unknown">>,

      Expect<Extends<MixedUnion, "'foo' | 42" | "42 | 'foo'">>
    ];
    const cases: cases = [
      true, true, true,
      true, true,
      true, true, true,
      true, true, true, true, true,
      true, true,
      true, true, true, true,
      true, true, true, true, true,
      true
    ];
  });

});


