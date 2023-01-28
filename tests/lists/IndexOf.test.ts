import { Equal, Expect } from "@type-challenges/utils";
import { indexOf } from "src/runtime/lists/indexOf";
import { Never } from "src/runtime/runtime/Never";
import { IndexOf } from "src/types/lists/IndexOf";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IndexOf<T>", () => {

  it("type tests", () => {
    type Arr = IndexOf<[1,2,3], 1>;
    type Obj = IndexOf<{foo: 1; bar: 2; baz: 3}, "bar">;
    type Identity = IndexOf<"foo", null>;
    type Never = IndexOf<"foo", 1>;
    
    type cases = [
      Expect<Equal<Obj, 2>>,
      Expect<Equal<Arr, 2>>,
      Expect<Equal<Identity, "foo">>,
      Expect<Equal<Never, never>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  
  it("runtime", () => {
    const arr = indexOf([1,2,3] as const, 1);
    const obj = indexOf({foo: 1, bar: 2, baz: 3 } as const, "bar");
    const identity = indexOf("foo", null);
    const never = indexOf("foo", 1);

    expect(arr).toBe(2);
    expect(obj).toBe(2);
    expect(identity).toBe("foo");
    expect(never).toBe(Never);
  });
  

});
