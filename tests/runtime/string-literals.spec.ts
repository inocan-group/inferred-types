import { Equal, Expect } from "@type-challenges/utils";
import {  TokenizeStringLiteral, ToStringLiteral } from "src/types/runtime-types/api/stringLiteral";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("String Literal testing", () => {

  it("Parse Tokens", () => {
    const builder = <T extends readonly (string | number | boolean)[]>(
      ...tokens: T
    ) => {
      return tokens;
    };

    const t1 = builder("literal:Hello ", "<string>", 42);
    const t2 = builder("Hello ", "world");
    const t3 = builder("<string>","literal:-", "<letter>", );

    type T1 = TokenizeStringLiteral<typeof t1>;
    type T2 = TokenizeStringLiteral<typeof t2>;
    type T3 = TokenizeStringLiteral<typeof t3>;

    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });

});
