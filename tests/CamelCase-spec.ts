import { CamelCase } from "../src/types";
import { Expect, Equal } from "@type-challenges/utils";

type camelCase1 = CamelCase<"hello_world_with_types">;
type camelCase2 = CamelCase<"HELLO_WORLD_WITH_TYPES">;
type Dash = CamelCase<"hello-world-with-types">;

describe("CamelCase type modifier", () => {
  it("camel_case is converted to proper CamelCase", () => {
    type cases = [
      Expect<Equal<camelCase1, "helloWorldWithTypes">>,
      Expect<Equal<camelCase2, "helloWorldWithTypes">>,
      Expect<Equal<Dash, "helloWorldWithTypes">>
    ];
    const typeTests: cases = [true, true, true];
    expect(typeTests).toBe(typeTests);
  });
});
