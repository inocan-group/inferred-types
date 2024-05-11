import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DoesExtend, ErrorCondition, IsValidIndex, IfValidKey, KV, ExplicitlyEmptyObject, EmptyObject } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsValidKey<T>", () => {

  it("happy path", () => {
    type T1 = IsValidIndex<[1,2,3], 0>;
    type T2 = IsValidIndex<[1,2,3], 2>;
    type T3 = IsValidIndex<{foo: 1; bar: 2}, "foo">;

    type F1 = IsValidIndex<[1,2,3], 10>;
    type F2 = IsValidIndex<{foo: 1; bar: 2}, "baz">;
    type F3 = IsValidIndex<ExplicitlyEmptyObject, "foo">;
    
    type B1 = IsValidIndex<string[], 0>;
    type BF1 = IsValidIndex<string[], "foo">;
    type B2 = IsValidIndex<KV, "foo">;
    type BF2 = IsValidIndex<KV, 0>;
    type BF3 = IsValidIndex<EmptyObject, "foo">;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,

      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,

      Expect<Equal<B1, boolean>>,
      Expect<Equal<BF1, boolean>>,

      Expect<Equal<B2, boolean>>,
      Expect<Equal<BF2, boolean>>,
      Expect<Equal<BF3, boolean>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true,true,
      true, true, 
      true, true, true
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

