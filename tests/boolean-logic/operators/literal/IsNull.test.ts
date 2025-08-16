import { describe, it } from "vitest";
import {
  Expect,
  IsNull,
  Test,
} from "inferred-types/types";

describe("IsNull", () => {
  it("should return true for null type", () => {
    type T1 = IsNull<null>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
    ];
  });

  it("should return false for non-null types", () => {
    type T1 = IsNull<string>;
    type T2 = IsNull<number>;
    type T3 = IsNull<undefined>;
    type T4 = IsNull<never>;
    type T5 = IsNull<any>;
    type T6 = IsNull<unknown>;
    type T7 = IsNull<{}>;
    type T8 = IsNull<[]>;

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
