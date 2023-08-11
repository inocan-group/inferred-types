import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DropChars } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("DropChars<TContent,TDrop>", () => {

  it("happy path", () => {
    type Foobar = DropChars<"foobar", "fb">;
    type Foobarbaz = DropChars<"foo, bar, baz", " b">;
    type All = DropChars<"foo", "fo">;
    
    type cases = [
      Expect<Equal<Foobar, "ooar">>,
      Expect<Equal<Foobarbaz, "foo,ar,az">>,
      Expect<Equal<All, "">>,
    ];
    const cases: cases = [ true, true, true  ];
  });

});
