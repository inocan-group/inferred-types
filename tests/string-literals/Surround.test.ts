import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Surround } from "@inferred-types/types";
import { SurroundWith, surround } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Surround<TContent,TPre,TPost>", () => {

  it("with singular content", () => {
    type Bracket = Surround<"foobar", "[", "]">;
    type Angles = Surround<"foobar", "<", ">">;
    type NumBracket = Surround<42, "[", "]">;
    type NumAngles = Surround<42, "<", ">">;

    type cases = [
      Expect<Equal<Bracket, "[foobar]">>,
      Expect<Equal<Angles, "<foobar>">>,
      Expect<Equal<NumBracket, "[42]">>,
      Expect<Equal<NumAngles, "<42>">>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  it("with array content", () => {
    type FooBar = Surround<["foo", "bar"], "(", ")">;
    type OneTwo = Surround<[1,2], "(", ")">;

    type cases = [
      Expect<Equal<FooBar, ["(foo)", "(bar)"]>>,
      Expect<Equal<OneTwo, ["(1)", "(2)"]>>,
    ];
    const cases: cases = [ true, true ];
  });

});

describe("surround() runtime utility", () => {

  it("happy path", () => {
    const partial = surround("(", ")");
    const completed = partial("foobar");

    expect(completed).toBe("(foobar)");

    type cases = [
      Expect<Equal<typeof partial, SurroundWith<"(",")">>>,
      Expect<Equal<typeof completed, "(foobar)">>
    ];
    const cases: cases = [ true, true ];
  });

});

