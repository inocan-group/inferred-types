import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsArray } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsArray<T>", () => {

  it("happy path", () => {
    type Str = IsArray<"foo">;
    type Num = IsArray<42>;
    type Obj = IsArray<{ foo: 1 }>;
    type Arr = IsArray<[1,2,3]>;
    type Arr2 = IsArray<string[]>;
    
    type cases = [
      Expect<Equal<Str, false>>, //
      Expect<Equal<Num, false>>,
      Expect<Equal<Obj, false>>,
      Expect<Equal<Arr, true>>,
      Expect<Equal<Arr2, true>>,
    ];
    const cases: cases = [ true, true, true, true, true ];
  });

});
