import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { EnsureLeading } from "@inferred-types/types";
import { ensureLeading } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("EnsureLeading", () => {

  it("use where TContent is a string", () => {
    type SuperWide  = EnsureLeading<string, string>;
    type NumSuperWide = EnsureLeading<number, number>;

    type WideContent = EnsureLeading<string, "wide">;
    type WideLeading = EnsureLeading<"wide", string>;

    type NoChange = EnsureLeading<"FooBar", "Foo">;
    type FooBar = EnsureLeading<"Bar", "Foo">;
    type PrefixOne = EnsureLeading<5,1>;

    type cases = [
      Expect<Equal<SuperWide, string>>,
      Expect<Equal<NumSuperWide, number>>,

      Expect<Equal<WideContent, `wide${string}`>>,
      Expect<Equal<WideLeading, `${string}wide`>>,

      Expect<Equal<NoChange, "FooBar">>,
      Expect<Equal<FooBar, "FooBar">>,

      Expect<Equal<PrefixOne, 15>>,
    ];
    const cases: cases = [
      true, true,
      true, true,
      true, true,
      true
    ];
  });


  it("use where TContent is a tuple", () => {
    type SuperWide = EnsureLeading<[string, number], string>;
    type Foo = EnsureLeading<["Foo", "Bar"], "Foo">;

    type cases = [
      Expect<Equal<SuperWide, [string, number]>>,
      Expect<Equal<Foo, ["Foo", "FooBar"]>>
    ];
    const cases: cases = [true, true ];
  });
});

describe("ensureLeading()", () => {

  it("happy path", () => {
    const noChange = ensureLeading("FooBar", "Foo");
    const fooBar = ensureLeading("Bar", "Foo")

    expect(noChange).toEqual("FooBar");
    expect(fooBar).toEqual("FooBar");

    type cases = [
      Expect<Equal<typeof noChange, "FooBar">>,
      Expect<Equal<typeof fooBar, "FooBar">>,
    ];
    const cases: cases = [ true, true ]
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
