import {  ExpectTrue, Expect, Equal } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { CaseInsensitive, IsEqual } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("CaseInsensitive<T>", () => {

  it("happy path using string input", () => {
    type F = CaseInsensitive<"F">;
    type Foobar = CaseInsensitive<"Foobar">;
    type FooBar = CaseInsensitive<"FooBar">;
    
    type cases = [
      ExpectTrue<IsEqual<F, "F" | "f">>,
      ExpectTrue<IsEqual<Foobar, "Foobar" | "foobar">>,
      ExpectTrue<IsEqual<FooBar, "FooBar" | "fooBar" | "Foobar" | "foobar">>
    ];
    const cases: cases = [ true, true, true ];
  });

  
  it("happy with using tuple input", () => {
    type Empty = CaseInsensitive<[]>;
    type FooAndBar = CaseInsensitive<["foo", "bar"]>;

    type cases = [
      Expect<Equal<Empty, []>>,
      Expect<Equal<FooAndBar, ["foo" | "Foo", "bar" | "Bar"]>>
    ];
    const cases: cases = [ true, true ];
    
  });
  

});
