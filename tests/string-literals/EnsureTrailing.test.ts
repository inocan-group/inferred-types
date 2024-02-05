import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { EnsureTrailing, ensureTrailing } from "../../src/inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("EnsureTrailing", () => {

  it("happy path", () => {
    type NoChange = EnsureTrailing<"FooBar", "Bar">;
    type FooBar = EnsureTrailing<"Foo", "Bar">;
    
    type cases = [
      Expect<Equal<NoChange, "FooBar">>,
      Expect<Equal<FooBar, "FooBar">>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("brackets", () => {
    type Square = EnsureTrailing<"FooBar", "]]">;
    type Curly = EnsureTrailing<"FooBar", "}}">;
    type Round = EnsureTrailing<"FooBar", "))">;
    
    type cases = [
      Expect<Equal<Square,"FooBar]]">>,
      Expect<Equal<Curly, "FooBar}}">>,
      Expect<Equal<Round, "FooBar))">>,
    ];
    const cases: cases = [ true, true, true ];
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
