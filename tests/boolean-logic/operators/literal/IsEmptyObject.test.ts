import { describe, it } from "vitest";
import {
  Expect,
  IsEmptyObject,
  Test,
} from "inferred-types/types";

describe("IsEmptyObject", () => {
  it("should return true for empty object", () => {
    type T1 = IsEmptyObject<{}>;
    type T2 = IsEmptyObject<Record<string, never>>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
    ];
  });

  it("should return false for non-empty objects and primitives", () => {
    type F1 = IsEmptyObject<{ a: string }>;
    type F2 = IsEmptyObject<{ x: number; y: string }>;
    type F3 = IsEmptyObject<string>;
    type F4 = IsEmptyObject<number>;
    type F5 = IsEmptyObject<null>;
    type F6 = IsEmptyObject<undefined>;

    type cases = [
      Expect<Test<F1, "equals", false>>,
      Expect<Test<F2, "equals", false>>,
      Expect<Test<F3, "equals", false>>,
      Expect<Test<F4, "equals", false>>,
      Expect<Test<F5, "equals", false>>,
      Expect<Test<F6, "equals", false>>,
    ];
  });
});
