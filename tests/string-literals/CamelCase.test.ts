import { toCamelCase } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

import { describe, it, expect } from "vitest";

describe("CamelCase<T>", () => {
    it("from PascalCase", () => {
        expect(toCamelCase("PascalCase")).toEqual("pascalCase");
        expect(toCamelCase("OnceUponATime")).toEqual("onceUponATime");
        expect(toCamelCase("78CamelCaseIsNotGreat9")).toEqual("78camelCaseIsNotGreat9");
    });

    it("from snake_case", () => {
        expect(toCamelCase("snake_case")).toEqual("snakeCase");
        expect(toCamelCase("snake_case_in_rust")).toEqual("snakeCaseInRust");
    });

    it("from kebab-case", () => {
        expect(toCamelCase("dash-me")).toEqual("dashMe");
        expect(toCamelCase("dash_me")).toEqual("dashMe");
        expect(toCamelCase("dash-for-css")).toEqual("dashForCss");
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
        const aWhiteHybridTrimmed = toCamelCase(whiteHybrid);

        // target type
        type TARGET = "oneTwoThree";
        // types of transformed strings
        type ADash = typeof aDash;
        type ASnake = typeof aSnake;
        type ACamel = typeof aCamel;
        type APascal = typeof aPascal;
        type AWhiteTrimmed = typeof aWhiteTrimmed;
        type AWhiteHybridTrimmed = typeof aWhiteHybridTrimmed;

        type cases = [
            // All non-white spaced versions of a string are converted to correct string literal
            Expect<Test<ADash, "equals", TARGET>>,
            Expect<Test<ASnake, "equals", TARGET>>,
            Expect<Test<APascal, "equals", TARGET>>,
            // that includes those which need no transformation
            Expect<Test<ACamel, "equals", TARGET>>,
            // with a white spaced input, the default is to trim it
            Expect<Test<AWhiteTrimmed, "equals", TARGET>>,
            Expect<Test<AWhiteHybridTrimmed, "equals", TARGET>>,
        ];

    });

});

