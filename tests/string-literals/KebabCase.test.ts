import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { toKebabCase } from "inferred-types/runtime";

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
      Expect<Equal<typeof kebab1, "one-two-three">>,
      Expect<Equal<typeof kebab2, "one-two-three">>,
      Expect<Equal<typeof kebab3, "one-two-three">>,
      Expect<Equal<typeof kebab4, "one-two-three">>,
      Expect<Equal<typeof kebab5, "one-two-three">>,
    ];
    const cases: cases = [true, true, true, true, true];

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
      Expect<Equal<ADash, TARGET>>,
      Expect<Equal<ASnake, TARGET>>,
      Expect<Equal<APascal, TARGET>>,
      // that includes those which need no transformation
      Expect<Equal<ACamel, TARGET>>,
      // with a white spaced input, the default is to trim it
      Expect<Equal<AWhiteTrimmed, TARGET>>,
      Expect<Equal<AWhiteHybridTrimmed, TARGET>>,
      // but whitespace can be preserved too
      Expect<Equal<AWhite, "  one-two-three  ">>,
      Expect<Equal<AWhiteHybrid, "\n  one-two-three \t">>,
    ];

    const c: cases = [true, true, true, true, true, true, true, true];
    expect(c).toEqual(c);
  });

});

