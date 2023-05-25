import { Equal, Expect } from "@type-challenges/utils";
import { toUppercase } from "src/runtime";
import {  ifUppercaseChar } from "src/runtime/literals/ifUppercase";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ifUppercase()", () => {
  
  it("ifUpperCaseChar()", () => {
    const lower = ifUppercaseChar("l", () => "was upper", () => "was lower");
    const upper = ifUppercaseChar("U", () => "was upper", () => "was lower");
    const capLower = ifUppercaseChar("h", v => v, v => toUppercase(v));
    const capUpper = ifUppercaseChar("H", v => v, v => toUppercase(v));
    
    type cases = [
      Expect<Equal<typeof lower, "was lower">>,
      Expect<Equal<typeof upper, "was upper">>,
      Expect<Equal<typeof capLower, "H">>,
      Expect<Equal<typeof capUpper, "H">>,
    ];
    const cases: cases = [ true, true, true, true];
  });

  // it("testing ifUppercase() with a character", () => {
  //   const lower = ifUppercase("l", () => "was upper", () => "was lower");
  //   const upper = ifUppercase("U", () => "was upper", () => "was lower");
  //   const capLower = ifUppercase("h", v => v, v => toUppercase(v));
  //   const capUpper = ifUppercase("H", v => v, v => toUppercase(v));
    
  //   type cases = [
  //     Expect<Equal<typeof lower, "was lower">>,
  //     Expect<Equal<typeof upper, "was upper">>,
  //     Expect<Equal<typeof capLower, "H">>,
  //     Expect<Equal<typeof capUpper, "H">>,
  //   ];
  //   const cases: cases = [ true, true, true, true];
  // });

  
  // it("testing with a string", () => {
  //   const fooBar = ifUppercase("fooBar", () => "P", v => v);
  //   expect(fooBar).toBe("fooPar");
    
  //   type cases = [
  //     Expect<Equal<typeof fooBar, "fooPar">>,
  //   ];
  //   const cases: cases = [ true ];
    
  // });
  

});
