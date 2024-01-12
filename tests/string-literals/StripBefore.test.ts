import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { StripBefore } from "src/types";
import { stripBefore } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("StripBefore<TStr,TBreak>", () => {

  it("happy path", () => {
    type Hello = StripBefore<"hello world", " ">;
    type Foo = StripBefore<"foo, bar, baz", ", ">;
    type WideBreak = StripBefore<"hmmm", string>;
    type WideContent = StripBefore<string, ",">;
    type BothWide = StripBefore<string, string>;
    
    type cases = [
      Expect<Equal<Hello, "world">>,
      Expect<Equal<Foo, "bar, baz">>,
      Expect<Equal<WideBreak, string>>,
      Expect<Equal<WideContent, string>>,
      Expect<Equal<BothWide, string>>,
    ];

    const cases: cases = [ true, true, true, true, true ];
  });

});

describe("StripBefore(contend,find) runtime utility", () => {

  it("happy path", () => {
    const hello = stripBefore("hello world", " ");
    const foo = stripBefore("foo, bar, baz", ", ");

    expect(hello).toBe("world");
    expect(foo).toBe("bar, baz");

    type cases = [
      Expect<Equal<typeof hello, "world">>, //
      Expect<Equal<typeof foo, "bar, baz">>, //
      
    ];
    const cases: cases = [ true, true ];

  });

});
