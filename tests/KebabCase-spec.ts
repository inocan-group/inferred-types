import type { KebabCase } from "../src/types";
import type { Expect, Equal } from "@type-challenges/utils";

type Pascal = KebabCase<"HelloWorldWithTypes">;
type Camel = KebabCase<"helloWorldWithTypes">;
type Snake = KebabCase<"hello_world_with_types">;
type Dash = KebabCase<"hello-world-with-types">;

describe("KebabCase type modifier", () => {
  it("other naming conventions are converted to kebab-case", () => {
    //@ts-ignore
    type cases = [
      Expect<Equal<Pascal, "hello-world-with-types">>,
      Expect<Equal<Camel, "hello-world-with-types">>,
      Expect<Equal<Snake, "hello-world-with-types">>,
      Expect<Equal<Dash, "hello-world-with-types">>
    ];
  });
});
