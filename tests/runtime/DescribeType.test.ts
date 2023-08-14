import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DescribeType, Nothing } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("DescribeType<T>", () => {

  it("happy path", () => {
    type Str = DescribeType<string>;
    type StrLiteral = DescribeType<"literal">;
    type StrUnion = DescribeType<"foo" | "bar">;
    type Num = DescribeType<number>;
    type NumLiteral = DescribeType<42>;
    type Bool = DescribeType<boolean>;
    type True = DescribeType<true>;
    type False = DescribeType<false>;
    type Obj = DescribeType<object>;
    type ObjLiteral = DescribeType<{foo: 1; bar: 2}>;
    type Arr = DescribeType<string[]>;
    type ArrLiteral = DescribeType<[1,2,3]>;

    type Nada = DescribeType<Nothing>;
    type Null = DescribeType<null>;
    type Undefined = DescribeType<undefined>;
    type Never = DescribeType<never>;
    type Unknown = DescribeType<unknown>;

    type MixedUnion = DescribeType<"foo" | 42>;
    
    type cases = [
      Expect<Equal<Str, "string">>,
      Expect<Equal<StrLiteral, "string">>,
      Expect<Equal<StrUnion, "string">>,

      Expect<Equal<Num, "number">>,
      Expect<Equal<NumLiteral, "number">>,

      Expect<Equal<Bool, "boolean">>,
      Expect<Equal<True, "boolean">>,
      Expect<Equal<False, "boolean">>,

      Expect<Equal<Obj, "object">>,
      Expect<Equal<ObjLiteral, "object">>,

      Expect<Equal<Arr, "array">>,
      Expect<Equal<ArrLiteral, "array">>,

      Expect<Equal<Nada, "nothing">>,
      Expect<Equal<Null, "null">>,
      Expect<Equal<Undefined, "undefined">>,
      Expect<Equal<Never, "never">>,
      Expect<Equal<Unknown, "unknown">>,

      Expect<Equal<MixedUnion, "union(string | number)">>
    ];
    const cases: cases = [
      true, true, true,
      true, true,
      true, true, true,
      true, true,
      true, true,
      true, true, true, true, true,
      true
    ];
  });

});


