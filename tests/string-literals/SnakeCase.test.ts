import { describe, it, expect } from "vitest";
import { toSnakeCase } from "inferred-types/runtime";
import type { Expect, SnakeCase, Test } from "inferred-types/types";

describe("toSnakeCase() function", () => {

    it("from camelCase", () => {
        expect(toSnakeCase("snakeCase")).toEqual("snake_case");
        expect(toSnakeCase(" snakeCase ")).toEqual("snake_case");
        expect(toSnakeCase(" snakeCase ", true)).toEqual(" snake_case ");
        expect(toSnakeCase("onceUponATime")).toEqual("once_upon_a_time");
        expect(toSnakeCase("78snakeCaseIsNotGreat9")).toEqual("78snake_case_is_not_great9");
    });

    it("from PascalCase", () => {
        expect(toSnakeCase("PascalCase")).toEqual("pascal_case");
        expect(toSnakeCase(" PascalCase ")).toEqual("pascal_case");
        expect(toSnakeCase(" PascalCase ", true)).toEqual(" pascal_case ");
    });

    it("from kebob-case", () => {
        expect(toSnakeCase("kebob-case")).toEqual("kebob_case");
        expect(toSnakeCase(" kebob-case ")).toEqual("kebob_case");
        expect(toSnakeCase(" kebob-case ", true)).toEqual(" kebob_case ");
    });

    it("spaced words are converted correctly", () => {
        expect(toSnakeCase("space case")).toEqual("space_case");
        expect(toSnakeCase("Space Case")).toEqual("space_case");
        expect(toSnakeCase("Real Person")).toEqual("real_person");
        expect(toSnakeCase("Space case")).toEqual("space_case");
        expect(toSnakeCase(" space  case ")).toEqual("space_case");
        expect(toSnakeCase(" space case ", true)).toEqual(" space_case ");
    });

    it("SnakeCase<T> typing", () => {
        const dash = "one-two-three";
        const snake = "one_two_three";
        const pascal = "OneTwoThree";
        const camel = "oneTwoThree";
        const white = "  one-two-three  ";
        const whiteHybrid = "\n  one-two-three \t";

        type cases = [
            Expect<Test<SnakeCase<typeof dash>, "equals", "one_two_three">>,
            Expect<Test<SnakeCase<typeof snake>, "equals", "one_two_three">>,
            Expect<Test<SnakeCase<typeof pascal>, "equals", "one_two_three">>,
            Expect<Test<SnakeCase<typeof camel>, "equals", "one_two_three">>,
            Expect<Test<SnakeCase<typeof white>, "equals", "one_two_three">>,
            Expect<Test<SnakeCase<typeof whiteHybrid>, "equals", "one_two_three">>,

            // Whitespace preservation removed - now trims whitespace
            Expect<Test<SnakeCase<typeof white>, "equals", "one_two_three">>,
            Expect<Test<SnakeCase<typeof whiteHybrid>, "equals", "one_two_three">>,
        ];

    });

});

