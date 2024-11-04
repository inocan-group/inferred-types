import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { StripAfter } from "@inferred-types/types";
import { stripAfter } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StripAfter<TStr,TBreak>", () => {

  it("happy path", () => {
    type Hello = StripAfter<"hello world", " ">;
    type Foo = StripAfter<"foo, bar, baz", ", ">;
    type WideBreak = StripAfter<"hmmm", string>;
    type WideContent = StripAfter<string, ",">;
    type BothWide = StripAfter<string, string>;

    type cases = [
      Expect<Equal<Hello, "hello">>,
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<WideBreak, string>>,
      Expect<Equal<WideContent, string>>,
      Expect<Equal<BothWide, string>>,
    ];

    const cases: cases = [ true, true, true, true, true ];
  });

});

describe("stripAfter(contend,find) runtime utility", () => {

  it("happy path", () => {
    const hello = stripAfter("hello world", " ");
    const foo = stripAfter("foo, bar, baz", ", ");
    const bracket = stripAfter("foo[bar]","[");
    const twice = stripAfter("foo[[bar]]", "[");
    const multi = stripAfter("foo[{bar}]", "[{");

    expect(hello).toBe("hello");
    expect(foo).toBe("foo");
    expect(bracket).toBe("foo");
    expect(twice).toBe("foo");
    expect(multi).toBe("foo");

    type cases = [
      Expect<Equal<typeof hello, "hello">>, //
      Expect<Equal<typeof foo, "foo">>, //

    ];
    const cases: cases = [ true, true ];

  });

});
