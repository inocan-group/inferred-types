import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsString, Something } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AsString<T>", () => {

  it("happy path", () => {
    type Foobar = AsString<"Foobar">;
    type WideStr = AsString<string>;
    type U1 = AsString<string | readonly string[]>;
    type U2 = AsString<Something>;
    type SU = AsString<"foobar" | null>;

    type Num = AsString<42>;
    type NU = AsString<42 | null>;

    type B1 = AsString<true>;
    type BU = AsString<boolean>;
    
    type cases = [
      Expect<Equal<Foobar, "Foobar">>,
      Expect<Equal<WideStr, string>>,
      Expect<Equal<U1, string>>,
      Expect<Equal<U2, string>>,
      Expect<Equal<SU, "foobar">>,

      Expect<Equal<Num, "42">>,
      Expect<Equal<NU, "42">>,

      Expect<Equal<B1, "true">>,
      Expect<Equal<BU, "true" | "false">>,

      Expect<Equal<AsString<string[]>, never>>,
      Expect<Equal<AsString<null>, never>>,
      Expect<Equal<AsString<undefined>, never>>,

    ];
    const cases: cases = [ 
      true, true, 
      true, true, true,
      true, true,
      true, true,
      true, true, true
   ];
  });

});
