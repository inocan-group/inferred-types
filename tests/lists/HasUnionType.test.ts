import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { HasUnionType } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("HasUnionType<T>", () => {

  it("happy path", () => {
    type T1 = HasUnionType<["foo", "bar", "baz"]>;
    type T2 = HasUnionType<["foo", "bar" | "baz"]>;
    
    type cases = [
      Expect<Equal<T1, false>>, //
      Expect<Equal<T2, true>>
    ];
    const cases: cases = [true, true];
  });

});
