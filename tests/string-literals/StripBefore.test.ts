import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { StripBefore } from "src/types/index";
import { stripBefore } from "src/runtime/index";

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
    const world = stripBefore("hello world", " ");
    const barBaz = stripBefore("foo, bar, baz", ", ");

    expect(world).toBe("world");
    expect(barBaz).toBe("bar, baz");

    type cases = [
      Expect<Equal<typeof world, "world">>, //
      Expect<Equal<typeof barBaz, "bar, baz">>, //
      
    ];
    const cases: cases = [ true, true ];

  });

});
