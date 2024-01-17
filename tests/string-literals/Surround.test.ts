import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Surround } from "src/types/index";
import { SurroundWith, surround } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Surround<TContent,TPre,TPost>", () => {

  it("with singular content", () => {
    type Bracket1 = Surround<"foobar", "[", "]">;
    type Bracket2 = Surround<"foobar", "<", ">">;
    
    type cases = [
      Expect<Equal<Bracket1, "[foobar]">>,
      Expect<Equal<Bracket2, "<foobar>">>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("with array content", () => {
    type FooBar = Surround<["foo", "bar"], "(", ")">;
    
    type cases = [
      Expect<Equal<FooBar, ["(foo)", "(bar)"]>>
    ];
    const cases: cases = [ true ];
  });
  

});

describe("surround() runtime utility", () => {

  it("happy path", () => {
    const partial = surround("(", ")");
    const completed = partial("foobar");

    expect(completed).toBe("(foobar)");
    
    type cases = [
      Expect<Equal<typeof partial, SurroundWith<"(",")">>>,
      Expect<Equal<typeof completed, "(foobar)">>
    ];
    const cases: cases = [ true, true ];
  });

});

