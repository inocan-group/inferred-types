import { describe, it } from "vitest";
import type { Expect, IsAny, Test } from "inferred-types/types";

describe("IsAny", () => {
  it("should return true for any type", () => {
    type T1 = IsAny<any>;
    type T2 = IsAny<unknown>;
    type T3 = IsAny<string>;
    type T4 = IsAny<number>;
    type T5 = IsAny<object>;
    type T6 = IsAny<null>;
    type T7 = IsAny<undefined>;
    type T8 = IsAny<never>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
      Expect<Test<T6, "equals", false>>,
      Expect<Test<T7, "equals", false>>,
      Expect<Test<T8, "equals", false>>,
    ];
  });
});
