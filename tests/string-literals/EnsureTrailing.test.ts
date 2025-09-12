import { ensureTrailing } from "inferred-types/runtime";
import type { EnsureTrailing, Expect, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

describe("EnsureTrailing", () => {

  it("happy path", () => {
    type SuperWide = EnsureTrailing<string, string>;
    type NumSuperWide = EnsureTrailing<number, number>;

    type WideContent = EnsureTrailing<string, "wide">;
    type WideTrailer = EnsureTrailing<"wide", string>;

    type NoChange = EnsureTrailing<"FooBar", "Bar">;
    type FooBar = EnsureTrailing<"Foo", "Bar">;

    type PostfixOne = EnsureTrailing<5, 1>;

    type cases = [
      Expect<Test<SuperWide, "equals",  string>>,
      Expect<Test<NumSuperWide, "equals",  number>>,

      Expect<Test<WideContent, "equals",  `${string}wide`>>,
      Expect<Test<WideTrailer, "equals",  `wide${string}`>>,

      Expect<Test<NoChange, "equals",  "FooBar">>,
      Expect<Test<FooBar, "equals",  "FooBar">>,

      Expect<Test<PostfixOne, "equals",  51>>
    ];

  });

});

describe("ensureTrailing()", () => {

  it("happy path", () => {
    const noChange = ensureTrailing("FooBar", "Bar");
    const fooBar = ensureTrailing("Foo", "Bar")

    expect(noChange).toEqual("FooBar");
    expect(fooBar).toEqual("FooBar");

    type cases = [
      Expect<Test<typeof noChange, "equals",  "FooBar">>,
      Expect<Test<typeof fooBar, "equals",  "FooBar">>,
    ];
  });

  it("brackets", () => {
    const square = ensureTrailing("FooBar", "]]");
    const curly = ensureTrailing("FooBar", "}}");
    const rounded = ensureTrailing("FooBar", "))");

    expect(square).toEqual("FooBar]]");
    expect(curly).toEqual("FooBar}}");
    expect(rounded).toEqual("FooBar))");
  });

});
