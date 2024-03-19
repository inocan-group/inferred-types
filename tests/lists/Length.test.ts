/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";

import {  KV, Length } from "src/types/index";
import { describe, it } from "vitest";

describe("Length<T>", () => {
  it("happy-path", () => {
    const a1 = [1, 2, 3] as const;
    const a2 = [1, 2, 3, 4, 5, 6] as const;
    type A1 = typeof a1;
    type A2 = typeof a2;

    type StringArray = Length<string[]>;
    type StrLit = Length<"foo">;
    type NumericLit = Length<1234>;
    type WideStr = Length<string>;
    type WideNum = Length<number>;

    type ObjLit = Length<{foo: 1}>;
    type ObjLit2 = Length<{foo: 1; bar: 2}>;
    type WideObj = Length<KV>;
    type EmptyObj = Length<{}>;

    type cases = [
      //
      Expect<Equal<Length<A1>, 3>>,
      Expect<Equal<Length<A2>, 6>>,
      Expect<Equal<Length<[1,2,3,4,5]>, 5>>,
      Expect<Equal<Length<string[]>, number>>,
      Expect<Equal<Length<readonly []>, 0>>,
      Expect<Equal<Length<[]>, 0>>,
      Expect<Equal<StringArray, number>>,
      Expect<Equal<StrLit, 3>>,
      Expect<Equal<WideStr, number>>,
      Expect<Equal<NumericLit, 4>>,
      Expect<Equal<WideNum, number>>,
      Expect<Equal<ObjLit, 1>>,
      Expect<Equal<ObjLit2, 2>>,
      Expect<Equal<WideObj, number>>,
      Expect<Equal<EmptyObj, 0>>,
    ];
    const cases: cases = [
      true, true, true, true, 
      true, true, true, true, 
      true, true, true, true,
      true, true, true
    ];
  });
});
