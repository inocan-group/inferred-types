import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DoesExtend, ErrorCondition, IsValidKey } from "src/types";
import { IfValidKey } from "src/types/boolean-logic/branching/IfValidKey";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsValidKey<T>", () => {

  it("happy path", () => {
    type T1 = IsValidKey<[1,2,3], 0>;
    type T2 = IsValidKey<[1,2,3], 2>;
    type T3 = IsValidKey<{foo: 1; bar: 2}, "foo">;

    type F1 = IsValidKey<[1,2,3], 10>;
    type F2 = IsValidKey<{foo: 1; bar: 2}, "baz">;

    type B1 = IsValidKey<string[], 0>;
    type BF1 = IsValidKey<string[], "foo">;
    type B2 = IsValidKey<object, "foo">;
    type BF2 = IsValidKey<object, 0>;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,

      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,

      Expect<Equal<B1, boolean>>,
      Expect<Equal<BF1, false>>,

      Expect<Equal<B2, boolean>>,
      Expect<Equal<BF2, false>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true,
      true, true, true, true
    ];
  });

});

describe("IfValidKey", () => {

  it("happy path", () => {
    type Yes = IfValidKey<[1,2,3], 0, "yes", "no">;
    type No = IfValidKey<[1,2,3], 10, "yes", "no">;
    
    type InvKeyType = IfValidKey<[1,2,3], "foo", "yes">;
    type InvBounds = IfValidKey<[1,2,3], 25, "yes">;
    type InvObjKey = IfValidKey<{foo:1}, "bar", "yes">;

    type TakeObjKey = IfValidKey<{foo:1}, "foo">;
    type TakeArrKey = IfValidKey<[1,2,3], 0>;

    type cases = [
      Expect<Equal<Yes, "yes">>,
      Expect<Equal<No, "no">>, 
    
      Expect<DoesExtend<InvKeyType, ErrorCondition<"invalid-key-type">>>, 
      Expect<DoesExtend<InvBounds, ErrorCondition<"key-does-not-exist">>>, 
      Expect<DoesExtend<InvObjKey, ErrorCondition<"key-does-not-exist">>>, 

      Expect<Equal<TakeObjKey, 1>>, 
      Expect<Equal<TakeArrKey, 1>>, 
    ];
    const cases: cases = [ 
      true, true, 
      true, true, true,
      true, true
    ];
  });

});

