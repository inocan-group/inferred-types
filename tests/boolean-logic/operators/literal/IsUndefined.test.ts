import { describe, it } from "vitest";
import {
  Expect,
  IsUndefined,
  Test,
} from "inferred-types/types";

describe("IsUndefined", () => {
  it("should return true for undefined type", () => {
    type T1 = IsUndefined<undefined>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
    ];
  });

  it("should return false for non-undefined types", () => {
    type T1 = IsUndefined<string>;
    type T2 = IsUndefined<number>;
    type T3 = IsUndefined<null>;
    type T4 = IsUndefined<never>;
    type T5 = IsUndefined<{}>;
    type T6 = IsUndefined<[]>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
      Expect<Test<T6, "equals", false>>,
    ];
  });
});
