
import { describe, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";

import { Concat, Digit, MapType, TokenizeStringLiteral } from "src/types";
import { createTypeMapRule , stripLeading, kind } from "src/runtime";
// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("String Literal testing", () => {

  const opString = createTypeMapRule(["Equals", "<string>"], ["AsString"]);
  const opNumber = createTypeMapRule(["Equals", "<number>"], ["AsNumericString"]);
  const opBoolean = createTypeMapRule(["Equals", "<boolean>"], ["AsBooleanString"]);
  const opDigit = createTypeMapRule(["Equals", "<digit>"], ["As", "5" as Digit]);
  const numbers = createTypeMapRule(["Extends", kind.number()], ["ToString"]);

  type T1 = MapType<
    readonly ["<number>", number, "<string>", 42, "<boolean>"], 
    readonly [typeof numbers, typeof opString, typeof opNumber, typeof opDigit, typeof opBoolean ]
  >;
  type TC1 = Concat<T1>;
  
  type T4 = MapType<
    readonly ["literal:Hello ", "<string>", "literal: world. ", 42],
    typeof mapStringLiterals
  >;

  const fn = <T extends `literal:${string}`>(v: T) => stripLeading(v, "literal:");
  type Fn = ReturnType<typeof fn>;
  const a = fn("literal:Hello world");

  const mapper = mapType(...mapStringLiterals);
  const t1 = mapper("literal:Hello ", "<string>", ", how are you?");
  const t2 = mapper("hi");
  
  it.skip("createTypeMatcher", () => {
    const n = createTypeMapRule(["Equals", "<number>"], ["Identity"]);
    const b = createTypeMapRule(["Equals", "<boolean>"], ["Identity"]);
    const d = createTypeMapRule(["Equals", "<digit>"], ["Identity"]);
    const l = createTypeMapRule(["StartsWith", "literal:"], ["StripLeading", "literal:"]);


    type cases = [
      // identity tests for matchers
      Expect<Equal<typeof n, Matcher<["Equals", "<number>"], ["Identity"]>>>
    ];
    const cases: cases = [true];
    
  });
  

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

    type L1 = ToStringLiteral<typeof t1>;
    type L2 = ToStringLiteral<typeof t2>;
    type L3 = ToStringLiteral<typeof t3>;
    
    type cases = [
      Expect<Equal<T1, ["literal:Hello ", "<string>", "literal:42"]>>,
      Expect<Equal<T2, ["literal:Hello ", "literal:world"]>>,
      Expect<Equal<T3, ["<string>", "literal:-", "<letter>"]>>,
    ];
    const cases: cases = [true,true,true ];
  });

});
