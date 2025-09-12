import { describe, it, expect } from "vitest";
import { toPascalCase } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("toPascalCase() function", () => {
  it("camelCase is converted correctly", () => {
    expect(toPascalCase("camelCase")).toEqual("CamelCase");
    expect(toPascalCase(" camelCase ", true)).toEqual(" CamelCase ");
    expect(toPascalCase(" camelCase ")).toEqual("CamelCase");
    expect(toPascalCase("onceUponATime")).toEqual("OnceUponATime");
    expect(toPascalCase("78camelCaseIsNotGreat9")).toEqual("78CamelCaseIsNotGreat9");
  });

  it("snake_case is converted correctly", () => {
    expect(toPascalCase("snake_case")).toEqual("SnakeCase");
    expect(toPascalCase("snake_case_in_rust")).toEqual("SnakeCaseInRust");
    expect(toPascalCase(" snake_case ", true)).toEqual(" SnakeCase ");
  });

  it("PascalCase is converted correctly", () => {
    expect(toPascalCase("dash-me")).toEqual("DashMe");
    expect(toPascalCase("dash_me")).toEqual("DashMe");
    expect(toPascalCase("dash-for-css")).toEqual("DashForCss");
    expect(toPascalCase(" dash-me ", true)).toEqual(" DashMe ");
  });

  it("Bastar*d Case is converted correctly", () => {
    expect(toPascalCase(" camelCase is not PascalCase ", true)).toEqual(" CamelCaseIsNotPascalCase ");
    expect(toPascalCase(" --fooBar--batShit--Crazy-", true)).toEqual(" FooBarBatShitCrazy");
    expect(toPascalCase(" --fooBar--batShit--Crazy-", false)).toEqual("FooBarBatShitCrazy");
  });

  // type checks

  it(`Using wide "string" type, type is preserved`, () => {
    const bDash = "one-two-three";
    const bSnake = "one_two_three";
    const bWhite = "  one-two-three  ";
    const aDash = toPascalCase(bDash);
    const aSnake = toPascalCase(bSnake);
    const aWhiteTrimmed = toPascalCase(bWhite);
    const aWhite = toPascalCase(bWhite, true);

    type ADash = typeof aDash;
    type ASnake = typeof aSnake;
    type AWhiteTrimmed = typeof aWhiteTrimmed;
    type AWhite = typeof aWhite;

    type cases = [
      Expect<Test<ADash, "equals",  "OneTwoThree">>,
      Expect<Test<ASnake, "equals",  "OneTwoThree">>,
      Expect<Test<AWhiteTrimmed, "equals",  "OneTwoThree">>,
      Expect<Test<AWhite, "equals",  "  OneTwoThree  ">>
    ];
  });

  it(`Using "string literal", type is modified appropriately`, () => {
    const dash = "one-two-three";
    const snake = "one_two_three";
    const pascal = "OneTwoThree";
    const white = "  one-two-three  ";
    const white2 = "\n  one-two-three  \t";

    const aDash = toPascalCase(dash);
    const aSnake = toPascalCase(snake);
    const aPascal = toPascalCase(pascal);

    const aWhiteTrimmed = toPascalCase(white);
    const aWhitePreserved = toPascalCase(white, true);

    const aWhiteTrimmed2 = toPascalCase(white2, false);
    const aWhite2Preserved = toPascalCase(white2, true);

    type ADash = typeof aDash;
    type ASnake = typeof aSnake;
    type APascal = typeof aPascal;
    type AWhiteTrimmed = typeof aWhiteTrimmed;
    type AWhitePreserved = typeof aWhitePreserved;

    type AWhiteTrimmed2 = typeof aWhiteTrimmed2;
    type AWhitePreserved2 = typeof aWhite2Preserved;

    type cases = [
      // All non-white spaced versions of a string are converted to correct string literal
      Expect<Test<ADash, "equals",  "OneTwoThree">>,
      Expect<Test<ASnake, "equals",  "OneTwoThree">>,
      // that includes those which need no transformation
      Expect<Test<APascal, "equals",  "OneTwoThree">>,
      // with a white spaced input, the default is to trim it
      Expect<Test<AWhiteTrimmed, "equals",  "OneTwoThree">>,
      Expect<Test<AWhiteTrimmed2, "equals",  "OneTwoThree">>,
      // but whitespace can be preserved too
      Expect<Test<AWhitePreserved, "equals",  "  OneTwoThree  ">>,
      Expect<Test<AWhitePreserved2, "equals",  "\n  OneTwoThree  \t">>
    ];
  });

});

