import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { ToNumber } from "src/types/index";
import { narrow, toNumber } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ToNumber<T>", () => {

  it("happy path for scalars", () => {
    type Num = ToNumber<42>;
    type StrNum = ToNumber<"42">;
    type True = ToNumber<true>;
    type False = ToNumber<false>;
    type Bool = ToNumber<boolean>;
    type Nada = ToNumber<null>;
    type Nada2 = ToNumber<undefined>;
    type Nan = ToNumber<"foobar">;

    type cases = [
      Expect<Equal<Num, 42>>,
      Expect<Equal<StrNum, 42>>,
      Expect<Equal<True, 1>>,
      Expect<Equal<False, 0>>,
      Expect<Equal<Bool, 1 | 0>>,
      Expect<Equal<Nada, never>>,
      Expect<Equal<Nada2, never>>,
      Expect<Equal<Nan, never>>,
    ];
    const cases: cases = [
      true,true,true,
      true,true, true,
      true,true
    ];
  });


  it("happy path for tuples and arrays", () => {
    type NumericArray = ToNumber<[1,2,3]>;
    type RoNumericArray = ToNumber<readonly [1,2,3]>;
    type StrNum = ToNumber<["1", "2", "3"]>;
    type RoStrNum = ToNumber<readonly ["1", "2", "3"]>;

    type PartBad = ToNumber<["1", 2, "foobar"]>;
    type AllBad = ToNumber<[null, undefined, "shit"]>;
    type Empty = ToNumber<[]>;

    type Bool = ToNumber<[boolean, boolean, boolean]>;
    type TrueFalse = ToNumber<[true, true, false]>;

    type cases = [
      Expect<Equal<NumericArray,  [1,2,3]>>,
      Expect<Equal<RoNumericArray, readonly [1,2,3]>>,
      Expect<Equal<StrNum,  [1,2,3]>>,
      Expect<Equal<RoStrNum,  readonly [1,2,3]>>,

      Expect<Equal<PartBad,  [1,2,never]>>,
      Expect<Equal<AllBad, [never,never,never]>>,
      Expect<Equal<Empty,  []>>,

      Expect<Equal<Bool,  [0|1,0|1,0|1]>>,
      Expect<Equal<TrueFalse,  [1,1,0]>>,

    ];
    const cases: cases = [
      true, true,true, true,
      true, true,true,
      true, true
    ];

  });


  it("runtime tests of toNumber()", () => {
    const str = toNumber("42");
    expect(str).toBe(42);
    const passthrough = toNumber(42);
    expect(passthrough).toBe(42);

    const emptyArr = toNumber([] as string[]);
    expect(emptyArr).toEqual([]);
    const goodArr = toNumber(narrow(["1", "2", "3"]));
    expect(goodArr).toEqual([1,2,3]);
    const mixedArr = toNumber(["1", "foo", "2"] as const);
    expect(mixedArr).toEqual([1,NaN,2]);

    type GoodArr = typeof goodArr;

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof str, 42>>,
      Expect<Equal<typeof passthrough, 42>>,
      Expect<Equal<typeof emptyArr,  readonly number[]>>,
      Expect<Equal<GoodArr, readonly [1,2,3]>>,
      Expect<Equal<typeof mixedArr, readonly [1,never,2]>>,
    ];
  });

});
