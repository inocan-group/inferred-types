import { describe, it, expect } from "vitest";
import { toKebabCase } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";

describe("toKebabCase() function", () => {

  it("camelCase is converted correctly", () => {
    expect(toKebabCase("camelCase")).toEqual("camel-case");
    expect(toKebabCase(" camelCase ")).toEqual(" camel-case ");
    expect(toKebabCase("onceUponATime")).toEqual("once-upon-a-time");
    expect(toKebabCase("78camelCaseIsNotGreat9")).toEqual("78camel-case-is-not-great9");
  });

  it("snake_case is converted correctly", () => {
    expect(toKebabCase("snake_case")).toEqual("snake-case");
    expect(toKebabCase("snake_case_in_rust")).toEqual("snake-case-in-rust");
    expect(toKebabCase(" snake_case ")).toEqual(" snake-case ");
  });

  it("PascalCase is converted correctly", () => {
    expect(toKebabCase("PascalCase")).toEqual("pascal-case");
    expect(toKebabCase("PascalCaseForClasses")).toEqual("pascal-case-for-classes");
    expect(toKebabCase(" PascalCase ")).toEqual(" pascal-case ");
  });

  it("Bastar*d Case is converted correctly", () => {
    expect(toKebabCase(" PascalCase is not camelCase ")).toEqual(" pascal-case-is-not-camel-case ");
    expect(toKebabCase(" --fooBar--batShit--Crazy-")).toEqual(" foo-bar-bat-shit-crazy");
  });

  it("Type and runtime both convert to kebab case", () => {
    const kebab1 = toKebabCase("one_two_three");
    expect(kebab1).toEqual("one-two-three");

    const kebab2 = toKebabCase("OneTwoThree");
    expect(kebab2).toEqual("one-two-three");

    const kebab3 = toKebabCase("oneTwoThree");
    expect(kebab3).toEqual("one-two-three");

    const kebab4 = toKebabCase("one_two_three");
    expect(kebab4).toEqual("one-two-three");
    const kebab5 = toKebabCase("one_two_Three");
    expect(kebab5).toEqual("one-two-three");

    type cases = [
      Expect<Test<typeof kebab1, "equals",  "one-two-three">>,
      Expect<Test<typeof kebab2, "equals",  "one-two-three">>,
      Expect<Test<typeof kebab3, "equals",  "one-two-three">>,
      Expect<Test<typeof kebab4, "equals",  "one-two-three">>,
      Expect<Test<typeof kebab5, "equals",  "one-two-three">>,
    ];
  });

  it(`Using "string literal", type is modified appropriately`, () => {
    const dash = "one-two-three";
    const snake = "one_two_three";
    const pascal = "OneTwoThree";
    const camel = "oneTwoThree";

    const white = "  one-two-three  ";
    const whiteHybrid = "\n  one-two-three \t";
    // runtime vars after being transformed
    const aDash = toKebabCase(dash);
    const aSnake = toKebabCase(snake);
    const aCamel = toKebabCase(camel);
    const aPascal = toKebabCase(pascal);

    const aWhiteTrimmed = toKebabCase(white);
    const aWhite = toKebabCase(white, true);
    const aWhiteHybridTrimmed = toKebabCase(whiteHybrid);
    const aWhiteHybrid = toKebabCase(whiteHybrid, true);

    // target type
    type TARGET = "one-two-three";
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
      Expect<Test<ADash, "equals",  TARGET>>,
      Expect<Test<ASnake, "equals",  TARGET>>,
      Expect<Test<APascal, "equals",  TARGET>>,
      // that includes those which need no transformation
      Expect<Test<ACamel, "equals",  TARGET>>,
      // with a white spaced input, the default is to trim it
      Expect<Test<AWhiteTrimmed, "equals",  TARGET>>,
      Expect<Test<AWhiteHybridTrimmed, "equals",  TARGET>>,
      // but whitespace can be preserved too
      Expect<Test<AWhite, "equals",  "  one-two-three  ">>,
      Expect<Test<AWhiteHybrid, "equals",  "\n  one-two-three \t">>,
    ];
  });

});

