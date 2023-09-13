import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Tuple } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Tuple<T,N>", () => {

  it("happy path", () => {
    type Default = Tuple;
    type FixedLength = Tuple<string, 4>;
    type FixedWithOptional = Tuple<string, [4,2]>;
    type Expandable = Tuple<string, "3+">;
    type Explicit = Tuple<[string, number, boolean]>;
    
    type cases = [
      Expect<Equal<Default, readonly unknown[]>>,
      Expect<Equal<FixedLength, readonly [string, string, string, string]>>,
      Expect<Equal<
        FixedWithOptional, 
        readonly [string, string, string, string, string|undefined, string|undefined]
      >>,
      Expect<Equal<Expandable,readonly [string, string, string, ...string[]]>>,
      Expect<Equal<Explicit, readonly [string, number, boolean]>>,
    ];
    const cases: cases = [ true, true, true, true, true ];
  });

});
