import { Equal, Expect } from "@type-challenges/utils";
import { Length } from "src/types";
import { describe, it } from "vitest";

describe("Length<T>", () => {
  it("happy-path", () => {
    const a1 = [1, 2, 3] as const;
    const a2 = [1, 2, 3, 4, 5, 6] as const;
    type A1 = typeof a1;
    type A2 = typeof a2;

    type cases = [
      //
      Expect<Equal<Length<A1>, 3>>,
      Expect<Equal<Length<A2>, 6>>
    ];
    const cases: cases = [true, true];
  });
});
