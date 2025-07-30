import { describe, it } from "vitest";
import {
  Expect,
  IsUnknown,
  Test,
} from "inferred-types/types";
import { EmptyObject } from "inferred-types";

describe("IsUnknown", () => {
  it("should return true for unknown type", () => {
    type T1 = IsUnknown<unknown>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
    ];
  });

  it("should return false for non-unknown types", () => {
    type T1 = IsUnknown<string>;
    type T2 = IsUnknown<number>;
    type T3 = IsUnknown<null>;
    type T4 = IsUnknown<undefined>;
    type T5 = IsUnknown<never>;
    type T6 = IsUnknown<any>;
    type T7 = IsUnknown<EmptyObject>;
    type T8 = IsUnknown<[]>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
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
