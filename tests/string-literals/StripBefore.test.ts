import { describe, expect, it } from "vitest";
import { Expect, StripBefore, Test } from "inferred-types/types";
import { stripBefore } from "inferred-types/runtime";



describe("StripBefore<TStr,TBreak>", () => {

  it("happy path", () => {
    type Hello = StripBefore<"hello world", " ">;
    type Foo = StripBefore<"foo, bar, baz", ", ">;
    type WideBreak = StripBefore<"hmmm", string>;
    type WideContent = StripBefore<string, ",">;
    type BothWide = StripBefore<string, string>;

    type cases = [
      Expect<Test<Hello,"equals",   "world">>,
      Expect<Test<Foo,"equals",   "bar, baz">>,
      Expect<Test<WideBreak,"equals",   string>>,
      Expect<Test<WideContent,"equals",   string>>,
      Expect<Test<BothWide, "equals", string>>,
    ];

  });

});

describe("StripBefore(contend,find) runtime utility", () => {

  it("happy path", () => {
    const world = stripBefore("hello world", " ");
    const barBaz = stripBefore("foo, bar, baz", ", ");

    expect(world).toBe("world");
    expect(barBaz).toBe("bar, baz");

    type cases = [
      Expect<Test<typeof world, "equals", "world">>, //
      Expect<Test<typeof barBaz, "equals", "bar, baz">>, //

    ];
  });

});
