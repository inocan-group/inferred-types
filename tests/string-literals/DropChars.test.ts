import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { DropChars, UpperAlphaChar } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("DropChars<TContent,TDrop>", () => {
  it("dropping using a single string sequence", () => {
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

  
  it("dropping with a union type", () => {
    type FooBarBaz = DropChars<"foo, bar, baz", "b" | "f">;
    type FooBarBaz2 = DropChars<"Foo, Bar, Baz", UpperAlphaChar>;
    
    type cases = [
      Expect<Equal<FooBarBaz, "oo, ar, az">>,
      Expect<Equal<FooBarBaz2, "oo, ar, az">>,
    ];
    const cases: cases = [ true, true ];
  });
});
