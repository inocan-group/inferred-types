import { Equal, Expect } from "@type-challenges/utils";
import { IfMaybeTrue, IfTrue } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IfTrue", () => {

  it("happy path", () => {
    // clearly a bonanza
    type T1 = IfTrue<true, "bonanza", "mortality">;
    // clearly a mortality
    type T2 = IfTrue<false, "bonanza", "mortality">;
    // we are _strictly_ looking for `true` so this results in mortality
    type T3 = IfTrue<boolean, "bonanza", "mortality">;
    // non-booleans are not allowed
    // type T4 = IfTrue<"foobar", "bonanza", "mortality">;
    
    type cases = [
      Expect<Equal<T1, "bonanza">>, //
      Expect<Equal<T2, "mortality">>,
      Expect<Equal<T3, "mortality">>,
    ];
    const cases: cases = [ true, true, true];
  });

});

describe("IfSoftTrue", () => {

  it("happy path", () => {
    // clearly a bonanza
    type T1 = IfMaybeTrue<true, "bonanza", "mortality">;
    // clearly a mortality
    type T2 = IfMaybeTrue<false, "bonanza", "mortality">;
    // a wide boolean results in a union of IF | ELSE
    type T3 = IfMaybeTrue<boolean, "bonanza", "mortality">;
    // non-booleans are allowed and result never
    type T4 = IfMaybeTrue<"foobar", "bonanza", "mortality">;
    
    type cases = [
      Expect<Equal<T1, "bonanza">>, //
      Expect<Equal<T2, "mortality">>,
      Expect<Equal<T3, "bonanza" | "mortality">>,
      Expect<Equal<T4, never>>,
    ];
    const cases: cases = [ true, true, true, true];
  });

});
