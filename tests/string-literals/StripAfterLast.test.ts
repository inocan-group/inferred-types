import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { StripAfterLast } from "inferred-types/types";
import { stripAfterLast } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StripAfterLast<TStr,TBreak>", () => {

  it("happy path", () => {
    type HelloWorld = StripAfterLast<"hello world monkey", " ">;
    type FooBar = StripAfterLast<"foo, bar, baz", ", ">;
    type WideBreak = StripAfterLast<"hmmm", string>;
    type WideContent = StripAfterLast<string, ",">;
    type BothWide = StripAfterLast<string, string>;

    type cases = [
      Expect<Equal<HelloWorld, "hello world">>,
      Expect<Equal<FooBar, "foo, bar">>,
      Expect<Equal<WideBreak, string>>,
      Expect<Equal<WideContent, string>>,
      Expect<Equal<BothWide, string>>,
    ];

  });

});

describe("stripAfterLast(contend,find) runtime utility", () => {

  it("happy path", () => {
    const hello = stripAfterLast("hello world monkey", " ");
    const foo = stripAfterLast("foo, bar, baz", ", ");
    const justOne = stripAfterLast("foo[bar]", "[");
    const twice = stripAfterLast("foo[[bar]]", "[");

    expect(hello).toBe("hello world");
    expect(foo).toBe("foo, bar");
    expect(justOne).toBe("foo");
    expect(twice).toBe("foo[");

    type cases = [
      Expect<Equal<typeof hello, "hello world">>, //
      Expect<Equal<typeof foo, "foo, bar">>, //
      Expect<Equal<typeof justOne, "foo">>, //
      Expect<Equal<typeof twice, "foo[">>, //
    ];

  });

});
