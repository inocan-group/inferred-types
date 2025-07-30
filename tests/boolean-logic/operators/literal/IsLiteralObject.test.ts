import { describe, it } from "vitest";
import {
    Expect,
    IsLiteralObject,
    Test,
} from "inferred-types/types";
import { EmptyObject } from "inferred-types";

describe("IsLiteralObject<T>", () => {
  it("should return true for literal objects", () => {
    type T1 = IsLiteralObject<{ foo: "bar"; baz: 42 }>;

    type T2 = IsLiteralObject<EmptyObject>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
    ];
  });

  it("should return false for non-literal objects", () => {
    type RegularObj = { foo: string; bar: number };
    type T1 = IsLiteralObject<RegularObj>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
    ];
  });
});
