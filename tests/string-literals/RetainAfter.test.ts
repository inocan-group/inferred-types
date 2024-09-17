import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { RetainAfter, Whitespace } from "src/types/index";
import { retainAfter } from "src/runtime/index";
import { WHITESPACE_CHARS } from "src/constants/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("RetainAfter<TStr,TBreak>", () => {

  it("happy path", () => {
    type World = RetainAfter<"hello world", " ">;
    type BarBaz = RetainAfter<"foo, bar, baz", ", ">;
    type WideBreak = RetainAfter<"hmmm", string>;
    type WideContent = RetainAfter<string, ",">;
    type BothWide = RetainAfter<string, string>;

    type cases = [
      Expect<Equal<World, "world">>,
      Expect<Equal<BarBaz, "bar, baz">>,
      Expect<Equal<WideBreak, string>>,
      Expect<Equal<WideContent, string>>,
      Expect<Equal<BothWide, string>>,
    ];

    const cases: cases = [ true, true, true, true, true ];
  });


  it("using a union type to break", () => {
    type World = RetainAfter<"hello world", " " | "\t">;
    type World2 = RetainAfter<"hello\tworld", " " | "\t">;
    type FooBarBaz = RetainAfter<"foo\tbar\nbaz", Whitespace>;


    // @ts-ignore
    type cases = [
      Expect<Equal<World, "world">>,
      Expect<Equal<World2, "world">>,
      Expect<Equal<FooBarBaz, "bar\nbaz">>,
    ];

  });


});

describe("retainAfter(contend,find) runtime utility", () => {

  it("happy path", () => {
    const world = retainAfter("hello world", " ");
    const barBaz = retainAfter("foo, bar, baz", ", ");

    expect(world).toBe("world");
    expect(barBaz).toBe("bar, baz");

    type cases = [
      Expect<Equal<typeof world, "world">>, //
      Expect<Equal<typeof barBaz, "bar, baz">>, //

    ];
    const cases: cases = [ true, true ];
  });


  it("using an array of value for breaking", () => {
    const barBaz = retainAfter("foo\nbar\tbaz", ...WHITESPACE_CHARS);

    expect(barBaz).toEqual("bar\tbaz");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof barBaz, "bar\tbaz">>
    ];

  });


});
