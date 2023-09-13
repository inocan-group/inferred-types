import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { FirstOfEach, Split, Chars, IsLiteral } from "../../src/types/base";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FirstOfEach<TList>", () => {

  it("with an Tuple of array elements", () => {
    type Arr = FirstOfEach<[ ["foo", 1], ["bar", 2] ]>;
    type FooBar = Chars<"FooBar">;
    type X = IsLiteral<FooBar>;
    type Foo = FirstOfEach<FooBar>;
    
    
    type cases = [
      Expect<Equal<Arr, "foo" | "bar">>,
      Expect<Equal<Foo, "F" | "o" | "B" | "a" | "r" >>,
    ];
    const cases: cases = [ true ];
  });

});
