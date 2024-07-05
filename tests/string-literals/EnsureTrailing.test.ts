import { Equal, Expect } from "@type-challenges/utils";
import { ensureTrailing } from "src/runtime/index";
import { EnsureTrailing } from "src/types/index";
import { describe, expect, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("EnsureTrailing", () => {

  it("happy path", () => {
    type SuperWide = EnsureTrailing<string, string>;
    type NumSuperWide = EnsureTrailing<number, number>;

    type WideContent = EnsureTrailing<string, "wide">;
    type WideTrailer = EnsureTrailing<"wide", string>;

    type NoChange = EnsureTrailing<"FooBar", "Bar">;
    type FooBar = EnsureTrailing<"Foo", "Bar">;

    type PostfixOne = EnsureTrailing<5,1>;

    type cases = [
      Expect<Equal<SuperWide, string>>,
      Expect<Equal<NumSuperWide, number>>,

      Expect<Equal<WideContent, `${string}wide`>>,
      Expect<Equal<WideTrailer, `wide${string}`>>,

      Expect<Equal<NoChange, "FooBar">>,
      Expect<Equal<FooBar, "FooBar">>,

      Expect<Equal<PostfixOne, 51>>
    ];
    const cases: cases = [
      true, true,
      true, true,
      true, true,
      true
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
      Expect<Equal<typeof noChange, "FooBar">>,
      Expect<Equal<typeof fooBar, "FooBar">>,
    ];
    const cases: cases = [ true, true ]
  });

  it("brackets", () => {
    const square = ensureTrailing("FooBar", "]]");
    const curly =  ensureTrailing("FooBar", "}}");
    const rounded =ensureTrailing("FooBar", "))");

    expect(square).toEqual("FooBar]]");
    expect(curly).toEqual("FooBar}}");
    expect(rounded).toEqual("FooBar))");
  });

});
