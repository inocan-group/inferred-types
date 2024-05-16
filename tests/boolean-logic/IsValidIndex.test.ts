import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { 
  IsValidIndex,  
  KV, 
  ExplicitlyEmptyObject, 
  EmptyObject 
} from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsValidKey<T>", () => {

  it("happy path", () => {
    type T1 = IsValidIndex<[1,2,3], 0>;
    type T2 = IsValidIndex<[1,2,3], 2>;
    type T3 = IsValidIndex<{foo: 1; bar: 2}, "foo">;
    type T4 = IsValidIndex<[1,2,3], -1>;

    type F1 = IsValidIndex<[1,2,3], 10>;
    type F2 = IsValidIndex<{foo: 1; bar: 2}, "baz">;
    type F3 = IsValidIndex<ExplicitlyEmptyObject, "foo">;
    type F4 = IsValidIndex<[1,2,3], -10>;
    type F5 = IsValidIndex<[1,2,3], "foo">;
    
    type B1 = IsValidIndex<string[], 0>;
    type BF1 = IsValidIndex<string[], "foo">;
    type B2 = IsValidIndex<KV, "foo">;
    type BF2 = IsValidIndex<KV, 0>;
    type BF3 = IsValidIndex<EmptyObject, "foo">;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, true>>,

      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
      Expect<Equal<F4, false>>,
      Expect<Equal<F5, false>>,

      Expect<Equal<B1, boolean>>,
      Expect<Equal<BF1, boolean>>,

      Expect<Equal<B2, boolean>>,
      Expect<Equal<BF2, boolean>>,
      Expect<Equal<BF3, boolean>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true,true, true, true,
      true, true, 
      true, true, true
    ];
  });

});
