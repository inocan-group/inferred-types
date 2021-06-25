import { SnakeCase } from "../src/types";
import { Expect, Equal } from "@type-challenges/utils";

type Pascal = SnakeCase<"HelloWorldWithTypes">;
type Camel = SnakeCase<"helloWorldWithTypes">;
type Snake = SnakeCase<"hello_world_with_types">;
type Dash = SnakeCase<"hello-world-with-types">;

describe("SnakeCase type modifier", () => {
  it("other naming conventions are converted to kebab-case", () => {
    //@ts-ignore
    type cases = [
      Expect<Equal<Pascal, "hello_world_with_types">>,
      Expect<Equal<Camel, "hello_world_with_types">>,
      Expect<Equal<Snake, "hello_world_with_types">>,
      Expect<Equal<Dash, "hello_world_with_types">>
    ];
  });
});
