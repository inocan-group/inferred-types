import { Equal, Expect } from "@type-challenges/utils";
import { toCamelCase } from "src/runtime/index";
import { describe, it, expect } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("CamelCase<T>", () => {
  it("from PascalCase", () => {
    expect(toCamelCase("PascalCase")).toEqual("pascalCase");
    expect(toCamelCase(" PascalCase ", false)).toEqual("pascalCase");
    expect(toCamelCase(" PascalCase ", true)).toEqual(" pascalCase ");
    expect(toCamelCase("OnceUponATime")).toEqual("onceUponATime");
    expect(toCamelCase("78CamelCaseIsNotGreat9")).toEqual("78camelCaseIsNotGreat9");
  });
  
  it("from snake_case", () => {
    expect(toCamelCase("snake_case")).toEqual("snakeCase");
    expect(toCamelCase(" snake_case ", true)).toEqual(" snakeCase ");
    expect(toCamelCase("snake_case_in_rust")).toEqual("snakeCaseInRust");
  });
  
  it("from kebab-case", () => {
    expect(toCamelCase("dash-me")).toEqual("dashMe");
    expect(toCamelCase("dash_me")).toEqual("dashMe");
    expect(toCamelCase("dash-for-css")).toEqual("dashForCss");
    expect(toCamelCase(" dash-me ", true)).toEqual(" dashMe ");
  });
  
  it("from Bastar*d Case", () => {
    expect(toCamelCase(" CamelCase is not PascalCase ", true)).toEqual(" camelCaseIsNotPascalCase ");
    expect(toCamelCase(" --fooBar--batShit--Crazy-", true)).toEqual(" fooBarBatShitCrazy");
  });
  
  
  it(`Using "string literal", type is modified appropriately`, () => {
    const dash = "one-two-three";
    const snake = "one_two_three";
    const pascal = "OneTwoThree";
    const camel = "oneTwoThree";
  
    const white = "  one-two-three  ";
    const whiteHybrid = "\n  one-two-three \t";
    // runtime vars after being transformed
    const aDash = toCamelCase(dash);
    const aSnake = toCamelCase(snake);
    const aCamel = toCamelCase(camel);
    const aPascal = toCamelCase(pascal);
  
    const aWhiteTrimmed = toCamelCase(white);
    const aWhite = toCamelCase(white, true);
    const aWhiteHybridTrimmed = toCamelCase(whiteHybrid);
    const aWhiteHybrid = toCamelCase(whiteHybrid, true);
  
    // target type
    type TARGET = "oneTwoThree";
    // types of transformed strings
    type ADash = typeof aDash;
    type ASnake = typeof aSnake;
    type ACamel = typeof aCamel;
    type APascal = typeof aPascal;
    type AWhiteTrimmed = typeof aWhiteTrimmed;
    type AWhiteHybridTrimmed = typeof aWhiteHybridTrimmed;
    type AWhite = typeof aWhite;
    type AWhiteHybrid = typeof aWhiteHybrid;
  
    type cases = [
      // All non-white spaced versions of a string are converted to correct string literal
      Expect<Equal<ADash, TARGET>>,
      Expect<Equal<ASnake, TARGET>>,
      Expect<Equal<APascal, TARGET>>,
      // that includes those which need no transformation
      Expect<Equal<ACamel, TARGET>>,
      // with a white spaced input, the default is to trim it
      Expect<Equal<AWhiteTrimmed, TARGET>>,
      Expect<Equal<AWhiteHybridTrimmed, TARGET>>,
      // but whitespace can be preserved too
      Expect<Equal<AWhite, "  oneTwoThree  ">>,
      Expect<Equal<AWhiteHybrid, "\n  oneTwoThree \t">>
    ];
  
    const c: cases = [true, true, true, true, true, true, true, true];
    expect(c).toEqual(c);
  });

});


