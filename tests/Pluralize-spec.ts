import type { Pluralize } from "../src/types";
import type { Expect, Equal } from "@type-challenges/utils";

type Bugs = Pluralize<"bug">;
type Cases = Pluralize<"case">;
type Bunnies = Pluralize<"bunny">;
type Elves = Pluralize<"elf">;
type People = Pluralize<"person">;

describe("Pluralization of a string literal", () => {
  it("test strings all converted to plural equivalent", () => {
    // @ts-ignore
    type cases = [
      Expect<Equal<Bugs, "bugs">>,
      Expect<Equal<Cases, "cases">>,
      Expect<Equal<Bunnies, "bunnies">>,
      Expect<Equal<Elves, "elves">>,
      Expect<Equal<People, "people">>
    ];
  });
});
