import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { EnsureLeading } from "src/types/index";
import { ensureLeading } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("EnsureLeading", () => {

  it("happy path", () => {
    type NoChange = EnsureLeading<"FooBar", "Foo">;
    type FooBar = EnsureLeading<"Bar", "Foo">;
    
    type cases = [
      Expect<Equal<NoChange, "FooBar">>,
      Expect<Equal<FooBar, "FooBar">>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("brackets", () => {
    type Square = EnsureLeading<"FooBar", "[[">;
    type Curly = EnsureLeading<"FooBar", "{{">;
    type Round = EnsureLeading<"FooBar", "((">;
    
    type cases = [
      Expect<Equal<Square, "[[FooBar">>,
      Expect<Equal<Curly, "{{FooBar">>,
      Expect<Equal<Round, "((FooBar">>,
    ];
    const cases: cases = [ true, true, true ];
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
