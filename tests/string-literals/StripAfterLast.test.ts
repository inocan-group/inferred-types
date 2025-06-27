import { describe, expect, it } from "vitest";
import { Expect, StripAfterLast, Test } from "inferred-types/types";
import { stripAfterLast } from "inferred-types/runtime";


describe("StripAfterLast<TStr,TBreak>", () => {

  it("happy path", () => {
    type HelloWorld = StripAfterLast<"hello world monkey", " ">;
    type FooBar = StripAfterLast<"foo, bar, baz", ", ">;
    type WideBreak = StripAfterLast<"hmmm", string>;
    type WideContent = StripAfterLast<string, ",">;
    type BothWide = StripAfterLast<string, string>;

    type cases = [
      Expect<Test<HelloWorld, "equals",  "hello world">>,
      Expect<Test<FooBar, "equals", "foo, bar">>,
      Expect<Test<WideBreak, "equals",  string>>,
      Expect<Test<WideContent, "equals",  string>>,
      Expect<Test<BothWide, "equals",  string>>,
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
      Expect<Test<typeof hello, "equals",  "hello world">>, //
      Expect<Test<typeof foo, "equals", "foo, bar">>,
      Expect<Test<typeof justOne, "equals",  "foo">>,
      Expect<Test<typeof twice, "equals",  "foo[">>,
    ];

  });

});
