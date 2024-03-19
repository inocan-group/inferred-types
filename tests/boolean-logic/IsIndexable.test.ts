/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { EmptyObject, IsIndexable } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsIndexable<T>", () => {

  it("happy path", () => {
    type Str = IsIndexable<"foo">;
    type Num = IsIndexable<42>;;
    type Obj = IsIndexable<{ foo: 1 }>;
    type Arr = IsIndexable<[ 1, 2 , 3 ]>;
    
    type cases = [
      Expect<Equal<Str, false>>,
      Expect<Equal<Num, false>>,
      Expect<Equal<EmptyObject, false>>,
      Expect<Equal<Obj, true>>,
      Expect<Equal<Arr, true>>
    ];
    const cases: cases = [ true, true, true, true, true ];
  });

});
