import { describe, expect, it } from "vitest";
import type { EnsureLeading, Expect, Test } from "inferred-types/types";

import { ensureLeading } from "inferred-types/runtime";

describe("EnsureLeading", () => {

  it("use where TContent is a string", () => {
    type SuperWide = EnsureLeading<string, string>;
    type NumSuperWide = EnsureLeading<number, number>;

    type WideContent = EnsureLeading<string, "wide">;
    type WideLeading = EnsureLeading<"wide", string>;

    type NoChange = EnsureLeading<"FooBar", "Foo">;
    type FooBar = EnsureLeading<"Bar", "Foo">;
    type PrefixOne = EnsureLeading<5, 1>;

    type cases = [
      Expect<Test<SuperWide, "equals",  string>>,
      Expect<Test<NumSuperWide, "equals",  number>>,

      Expect<Test<WideContent, "equals",  `wide${string}`>>,
      Expect<Test<WideLeading, "equals",  `${string}wide`>>,

      Expect<Test<NoChange, "equals",  "FooBar">>,
      Expect<Test<FooBar, "equals",  "FooBar">>,

      Expect<Test<PrefixOne, "equals",  15>>,
    ];
  });

  it("use where TContent is a tuple", () => {
    type SuperWide = EnsureLeading<[string, number], string>;
    type Foo = EnsureLeading<["Foo", "Bar"], "Foo">;

    type cases = [
      Expect<Test<SuperWide, "equals", [string, number]>>,
      Expect<Test<Foo, "equals", ["Foo", "FooBar"]>>
    ];
  });
});

describe("ensureLeading()", () => {

  it("happy path", () => {
    const noChange = ensureLeading("FooBar", "Foo");
    const fooBar = ensureLeading("Bar", "Foo")

    expect(noChange).toEqual("FooBar");
    expect(fooBar).toEqual("FooBar");

    type cases = [
      Expect<Test<typeof noChange, "equals",  "FooBar">>,
      Expect<Test<typeof fooBar, "equals",  "FooBar">>,
    ];
  });

  it("brackets", () => {
    const square = ensureLeading("FooBar", "[[");
    const curly = ensureLeading("FooBar", "{{");
    const rounded = ensureLeading("FooBar", "((");

    expect(square).toEqual("[[FooBar");
    expect(curly).toEqual("{{FooBar");
    expect(rounded).toEqual("((FooBar");
  });

});
