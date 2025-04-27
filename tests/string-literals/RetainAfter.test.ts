import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { RetainAfter, Whitespace } from "inferred-types/types";
import { retainAfter, retainAfterInclusive } from "inferred-types/runtime";
import { WHITESPACE_CHARS } from "inferred-types/constants";


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
      Expect<Test<World, "equals",  "world">>,
      Expect<Test<WorldInc, "equals",  " world">>,

      Expect<Test<BarBaz, "bar, "equals",  baz">>,
      Expect<Test<WideBreak, "equals",  string>>,
      Expect<Test<WideContent, "equals",  string>>,
      Expect<Test<BothWide, "equals",  string>>,

      Expect<Test<Nada, "equals",  "">>,
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
      Expect<Test<World, "equals",  "world">>,
      Expect<Test<WorldInc, "equals",  " world">>,
      Expect<Test<World2, "equals",  "world">>,
      Expect<Test<FooBarBaz, "equals",  "bar\nbaz">>,
      Expect<Test<FooBarBazInc, "equals",  "\tbar\nbaz">>,
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
      Expect<Test<typeof world, "equals",  "world">>, //
      Expect<Test<typeof barBaz, "bar, "equals",  baz">>, //

    ];
    const cases: cases = [true, true];
  });


  it("using an array of value for breaking", () => {
    const barBaz = retainAfter("foo\nbar\tbaz", ...WHITESPACE_CHARS);

    expect(barBaz).toEqual("bar\tbaz");


    // @ts-ignore
    type cases = [
      Expect<Test<typeof barBaz, "equals",  "bar\tbaz">>
    ];

  });


});
