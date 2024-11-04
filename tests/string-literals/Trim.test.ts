import { Equal, Expect } from "@type-challenges/utils";
import { trim, trimEnd, trimStart } from "inferred-types";
import { describe, expect, it } from "vitest";
import { Trim, TrimLeft, TrimRight } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Trim<T> and trim()", () => {

  it("type tests", () => {
    type Leading = Trim<"  foobar">;
    type Trailing = Trim<"foobar  ">;
    type BothSides = Trim<"  foobar    ">;
    type Special = Trim<"\n\t foobar\n">;
    type Empty = Trim<"">;
    type Wide = Trim<string>;

    type cases = [
      Expect<Equal<Leading, "foobar">>,
      Expect<Equal<Trailing, "foobar">>,
      Expect<Equal<BothSides, "foobar">>,
      Expect<Equal<Special, "foobar">>,
      Expect<Equal<Empty, "">>,
      Expect<Equal<Wide, string>>,
    ];
    const cases: cases = [ true, true, true, true, true, true  ];
  });


  it("runtime tests", () => {
    const foobar = trim("  foobar  ");

    expect(foobar).toBe("foobar");

    type cases = [
      Expect<Equal<typeof foobar, "foobar">>
    ];
    const cases: cases = [ true ];
  });


});


describe("TrimLeft<T>", () => {

  it("type tests", () => {
    type Leading = TrimLeft<"  foobar">;
    type Trailing = TrimLeft<"foobar ">;
    type BothSides = TrimLeft<"  foobar ">;

    type cases = [
      Expect<Equal<Leading, "foobar">>,
      Expect<Equal<Trailing, "foobar ">>,
      Expect<Equal<BothSides, "foobar ">>,
    ];
    const cases: cases = [ true, true, true ];
  });


  it("runtime tests", () => {
    const foobar = trimStart("  foobar ");
    const foobar2 = trimStart("  foobar ");

    expect(foobar).toBe("foobar ");
    expect(foobar2).toBe("foobar ");

    type cases = [
      Expect<Equal<typeof foobar, "foobar ">>,
      Expect<Equal<typeof foobar2, "foobar ">>,
    ];
    const cases: cases = [ true, true ];
  });


});

describe("TrimRight<T>", () => {

  it("type tests", () => {
    type Leading = TrimRight<" foobar">;
    type Trailing = TrimRight<"foobar  ">;
    type BothSides = TrimRight<" foobar    ">;

    type cases = [
      Expect<Equal<Leading, " foobar">>,
      Expect<Equal<Trailing, "foobar">>,
      Expect<Equal<BothSides, " foobar">>,
    ];
    const cases: cases = [ true, true, true ];
  });


  it("runtime tests", () => {
    const foobar = trimEnd(" foobar ");

    expect(foobar).toBe(" foobar");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof foobar, " foobar">>,
    ];
  });


});
