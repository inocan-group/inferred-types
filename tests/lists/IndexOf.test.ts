import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { indexOf } from "src/runtime/index";
import type { DoesExtend, ErrorCondition, IndexOf } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IndexOf<T>", () => {

  it("type tests", () => {
    type Arr = IndexOf<[1,2,3], 1>;
    type ArrBadIdx = IndexOf<[1,2,3], 8>;
    // type Err1 = IndexOf<[1,2,3], "foo">;

    type Neg = IndexOf<[1,2,3], -1>;
    
    type Obj = IndexOf<{foo: 1; bar: 2; baz: 3}, "bar">;
    type Identity = IndexOf<"foo", null>;
    type Never = IndexOf<"foo", 1>;
    
    type cases = [
      Expect<Equal<Obj, 2>>,
      Expect<Equal<Arr, 2>>,
      Expect<Equal<Neg, 3>>,
      Expect<DoesExtend<
        ArrBadIdx, 
        ErrorCondition<"key-does-not-exist">
      >>,
      Expect<Equal<Identity, "foo">>,
      Expect<DoesExtend<Never, ErrorCondition<"invalid-index">>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

  
  it("type tests for negative offsets", () => {
    
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
    
  });
  

  
  it("runtime", () => {
    const arr = indexOf([1,2,3] as const, 1);
    const obj = indexOf({foo: 1, bar: 2, baz: 3 } as const, "bar");
    const identity = indexOf("foo", null);
    const invalidIndex = indexOf("foo", 1);

    expect(arr).toBe(2);
    expect(obj).toBe(2);
    expect(identity).toBe("foo");
    expect(invalidIndex, `Use of an invalid index: ${JSON.stringify(invalidIndex)}`).toEqual({ _type: "Constant", kind: "never"});
  });
  

});
