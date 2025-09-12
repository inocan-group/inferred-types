import { Equal, Expect } from "@type-challenges/utils";
import {  ifUppercaseChar, toAllCaps } from "inferred-types/runtime";
import type { Test } from "inferred-types/types";

import { describe, it } from "vitest";

describe("ifUppercase()", () => {

  it("ifUpperCaseChar()", () => {
    const lower = ifUppercaseChar("l", () => "was upper", () => "was lower");
    const upper = ifUppercaseChar("U", () => "was upper", () => "was lower");
    const capLower = ifUppercaseChar("h", v => v, v => toAllCaps(v));
    const capUpper = ifUppercaseChar("H", v => v, v => toAllCaps(v));

    type cases = [
      Expect<Test<typeof lower, "equals",  "was lower">>,
      Expect<Test<typeof upper, "equals",  "was upper">>,
      Expect<Test<typeof capLower, "equals",  "H">>,
      Expect<Test<typeof capUpper, "equals",  "H">>,
    ];

  });

  // it("testing ifUppercase() with a character", () => {
  //   const lower = ifUppercase("l", () => "was upper", () => "was lower");
  //   const upper = ifUppercase("U", () => "was upper", () => "was lower");
  //   const capLower = ifUppercase("h", v => v, v => toUppercase(v));
  //   const capUpper = ifUppercase("H", v => v, v => toUppercase(v));

  //   type cases = [
  //     Expect<Test<typeof lower, "equals",  "was lower">>,
  //     Expect<Test<typeof upper, "equals",  "was upper">>,
  //     Expect<Test<typeof capLower, "equals",  "H">>,
  //     Expect<Test<typeof capUpper, "equals",  "H">>,
  //   ];
  //   const cases: cases = [ true, true, true, true];
  // });

  // it("testing with a string", () => {
  //   const fooBar = ifUppercase("fooBar", () => "P", v => v);
  //   expect(fooBar).toBe("fooPar");

  //   type cases = [
  //     Expect<Test<typeof fooBar, "equals",  "fooPar">>,
  //   ];
  //   const cases: cases = [ true ];

  // });

});
