/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { ErrorCondition } from "src/types";
import { ConvertSet } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ConvertSet<TSet, TConversions", () => {
  type Set1 = ["blue", "green", ErrorCondition<"invalid-dot-path", "The 'color' segment of the dotpath is invalid with additional segments still remaining", "get(val, key)", {}>];
  type ConvertToNever = [ErrorCondition<"invalid-dot-path">, never];

  it("type testing", () => {
    
    type T1 = ConvertSet<Set1, ConvertToNever>;

    type cases = [
      Expect<Equal<T1, ["blue", "green", never]>>
    ];
    const cases: cases = [ true ];
  });

});
