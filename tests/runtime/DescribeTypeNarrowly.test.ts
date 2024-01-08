import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DescribeTypeNarrowly, Nothing } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("DescribeTypeNarrowly<T>", () => {

  it("happy path", () => {
    type Str = DescribeTypeNarrowly<string>;
    type StrLiteral = DescribeTypeNarrowly<"foobar">;
    type StrUnion = DescribeTypeNarrowly<"foo" | "bar">;
    type Num = DescribeTypeNarrowly<number>;
    type NumLiteral = DescribeTypeNarrowly<42>;
    type Bool = DescribeTypeNarrowly<boolean>;
    type True = DescribeTypeNarrowly<true>;
    type False = DescribeTypeNarrowly<false>;
    type Obj = DescribeTypeNarrowly<object>;
    type ObjLiteral = DescribeTypeNarrowly<{foo: 1; bar: 2}>;
    type Arr = DescribeTypeNarrowly<string[]>;
    type ArrLiteral = DescribeTypeNarrowly<[1,2,3]>;

    type Nada = DescribeTypeNarrowly<Nothing>;
    type Null = DescribeTypeNarrowly<null>;
    type Undefined = DescribeTypeNarrowly<undefined>;
    type Never = DescribeTypeNarrowly<never>;
    type Unknown = DescribeTypeNarrowly<unknown>;

    type MixedUnion = DescribeTypeNarrowly<"foo" | 42>;
    
    type cases = [
      Expect<Equal<Str, "string">>,
      Expect<Equal<StrLiteral, "string-literal(foobar)">>,
      Expect<Equal<StrUnion, "union(string-literal(foo) | string-literal(bar))">>,

      Expect<Equal<Num, "number">>,
      Expect<Equal<NumLiteral, "numeric-literal(42)">>,

      Expect<Equal<Bool, "boolean">>,
      Expect<Equal<True, "true">>,
      Expect<Equal<False, "false">>,

      Expect<Equal<Obj, "object">>,
      Expect<Equal<ObjLiteral, "object-literal">>,

      Expect<Equal<Arr, "array">>,
      Expect<Equal<ArrLiteral, "tuple">>,

      Expect<Equal<Nada, "nothing">>,
      Expect<Equal<Null, "null">>,
      Expect<Equal<Undefined, "undefined">>,
      Expect<Equal<Never, "never">>,
      Expect<Equal<Unknown, "unknown">>,

      Expect<Equal<MixedUnion, "union(string-literal(foo) | numeric-literal(42))">>
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


