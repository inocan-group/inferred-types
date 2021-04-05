import type { PascalCase } from "../src/types";
import type { Expect, Equal } from "@type-challenges/utils";

type Snake = PascalCase<"hello_world_with_types">;
type UpperSnake = PascalCase<"HELLO_WORLD_WITH_TYPES">;
type Camel = PascalCase<"helloWorldWithTypes">;
type Dash = PascalCase<"hello-world-with-types">;

describe("PascalCase type modifier", () => {
  it("pascal_case is converted to proper PascalCase", () => {
    type cases = [
      Expect<Equal<Snake, "HelloWorldWithTypes">>,
      Expect<Equal<UpperSnake, "HelloWorldWithTypes">>,
      Expect<Equal<Camel, "HelloWorldWithTypes">>,
      Expect<Equal<Dash, "HelloWorldWithTypes">>
    ];
    const typeTests: cases = [true, true, true, true];
    expect(typeTests).toBe(typeTests);
  });
});
