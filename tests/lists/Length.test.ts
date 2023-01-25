import { Equal, Expect } from "@type-challenges/utils";
import { ErrorCondition } from "runtime/literals/ErrorCondition";
import { Length } from "src/types";
import { describe, it } from "vitest";

describe("Length<T>", () => {
  it("happy-path", () => {
    const a1 = [1, 2, 3] as const;
    const a2 = [1, 2, 3, 4, 5, 6] as const;
    type A1 = typeof a1;
    type A2 = typeof a2;

    type StringArray = Length<string[]>;
    type Invalid = Length<"foo">;

    type cases = [
      //
      Expect<Equal<Length<A1>, 3>>,
      Expect<Equal<Length<A2>, 6>>,
      Expect<Equal<Length<[1,2,3,4,5]>, 5>>,
      Expect<Equal<Length<string[]>, number>>,
      Expect<Equal<Length<readonly []>, 0>>,
      Expect<Equal<Length<[]>, 0>>,
      Expect<Equal<StringArray, number>>,
      Expect<Equal<Invalid, ErrorCondition<"Length<T> used on non-array element: foo">>>,
    ];
    const cases: cases = [true, true, true, true, true, true, true, true ];
  });
});
