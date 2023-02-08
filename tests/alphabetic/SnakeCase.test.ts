import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";

import { toSnakeCase } from "../../src/runtime";
import type { SnakeCase } from "../../src/types";

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
      Expect<Equal<SnakeCase<typeof dash>, "one_two_three">>,
      Expect<Equal<SnakeCase<typeof snake>, "one_two_three">>,
      Expect<Equal<SnakeCase<typeof pascal>, "one_two_three">>,
      Expect<Equal<SnakeCase<typeof camel>, "one_two_three">>,
      Expect<Equal<SnakeCase<typeof white>, "one_two_three">>,
      Expect<Equal<SnakeCase<typeof whiteHybrid>, "one_two_three">>,

      Expect<Equal<SnakeCase<typeof white, true>, "  one_two_three  ">>,
      Expect<Equal<SnakeCase<typeof whiteHybrid, true>, "\n  one_two_three \t">>,
    ];
    const cases: cases = [ true, true, true, true, true, true, true, true];
    
  });
  

});

