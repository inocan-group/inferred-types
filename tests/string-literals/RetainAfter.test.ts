import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { RetainAfter, Whitespace } from "src/types/index";
import { retainAfter, retainAfterInclusive } from "src/runtime/index";
import { WHITESPACE_CHARS } from "src/constants/index";


describe("RetainAfter<TStr,TBreak>", () => {

  it("happy path", () => {
    type World = RetainAfter<"hello world", " ">;
    type WorldInc = RetainAfter<"hello world", " ", true>;

    type BarBaz = RetainAfter<"foo, bar, baz", ", ">;
    type WideBreak = RetainAfter<"hmmm", string>;
    type WideContent = RetainAfter<string, ",">;
    type BothWide = RetainAfter<string, string>;

    type Nada = RetainAfter<"foo, bar, baz", "!">;

    // @ts-ignore
    type cases = [
      Expect<Equal<World, "world">>,
      Expect<Equal<WorldInc, " world">>,

      Expect<Equal<BarBaz, "bar, baz">>,
      Expect<Equal<WideBreak, string>>,
      Expect<Equal<WideContent, string>>,
      Expect<Equal<BothWide, string>>,

      Expect<Equal<Nada, "">>,
    ];

  });


  it("using a union type to break", () => {
    type World = RetainAfter<"hello world", " " | "\t">;
    type WorldInc = RetainAfter<"hello world", " " | "\t", true>;

    type World2 = RetainAfter<"hello\tworld", " " | "\t">;
    type FooBarBaz = RetainAfter<"foo\tbar\nbaz", Whitespace>;
    type FooBarBazInc = RetainAfter<"foo\tbar\nbaz", Whitespace, true>;

    // @ts-ignore
    type cases = [
      Expect<Equal<World, "world">>,
      Expect<Equal<WorldInc, " world">>,
      Expect<Equal<World2, "world">>,
      Expect<Equal<FooBarBaz, "bar\nbaz">>,
      Expect<Equal<FooBarBazInc, "\tbar\nbaz">>,
    ];
  });

});

describe("retainAfter(contend,find) runtime utility", () => {

  it("happy path", () => {
    const world = retainAfter("hello world", " ");
    const world_inc = retainAfterInclusive("hello world", " ");
    const barBaz = retainAfter("foo, bar, baz", ", ");

    expect(world).toBe("world");
    expect(world_inc).toBe(" world");
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
