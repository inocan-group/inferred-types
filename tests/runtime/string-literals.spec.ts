import { Equal, Expect } from "@type-challenges/utils";
import { Concat } from "src/runtime/lists/Concat";
import { stripLeading } from "src/runtime/literals/stripLeading";
import { wide } from "src/runtime/literals/wide";
import { createTypeMapper } from "src/runtime/runtime/createTypeMatcher";
import { Digit } from "src/types/Numeric";
import { mapStringLiterals } from "src/types/runtime-types/api/literalTokens";
import {  TokenizeStringLiteral, ToStringLiteral } from "src/types/runtime-types/api/stringLiteral";
import { mapType } from "src/types/runtime-types/mapType";
import { MapType } from "src/types/type-conversion/MapType";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("String Literal testing", () => {

  const opString = createTypeMapper("equals", "<string>", "AsString");
  const opNumber = createTypeMapper("equals", "<number>", "AsNumericString");
  const opBoolean = createTypeMapper("equals", "<boolean>", "AsBooleanString");
  const opDigit = createTypeMapper("equals", "<digit>", ["As", "0" as `${Digit}`]);
  const numbers = createTypeMapper("extends", wide.number, "ToString");

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
  
  it("convert tokens", () => {

    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
    
  });
  

  
  it("createTypeMatcher", () => {
    const n = createTypeMapper("equals", "<number>");
    const b = createTypeMapper("equals", "<boolean>");
    const d = createTypeMapper("equals", "<digit>");
    const l = createTypeMapper("startsWith", "literal:", <V extends string>(v: V) => stripLeading(v, "literal:"));

    type List1 = ["Hello ", "<string>", ""]

    type cases = [
      // identity tests for matchers
      Expect<Equal<typeof n, Matcher<"equals", "<number>", 
    ];
    const cases: cases = [];
    
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
    const cases: cases = [true ];
  });

});
