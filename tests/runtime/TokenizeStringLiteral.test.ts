import { Equal, Expect } from "@type-challenges/utils";
import { FromLiteralTokens, TokenizeStringLiteral } from "src/types/index";

import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("TokenizeStringLiteral<T>", () => {

  it("happy path", () => {
    type L1 = [number, 42, "foo", false, string];
    // convert to tokens
    type T1 = TokenizeStringLiteral<L1>;
    // convert back to a string literal defn
    type T2 = FromLiteralTokens<T1>;
    
    type cases = [
      Expect<Equal<
        T1,
        [ "<number>", "literal:42", "literal:foo", "literal:false", "<string>" ]
      >>,
      Expect<Equal<T2, `${number}42foofalse${string}`>>
    ];
    const cases: cases = [ true, true ];
  });

});
