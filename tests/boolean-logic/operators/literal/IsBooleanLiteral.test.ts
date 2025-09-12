import { describe, it } from "vitest";
import type { Expect, IsBooleanLiteral, Test } from "inferred-types/types";

describe("IsBooleanLiteral<T>", () => {
  it("should return true for boolean literals", () => {
    type cases = [
      Expect<Test<IsBooleanLiteral<true>, "equals", true>>,
      Expect<Test<IsBooleanLiteral<false>, "equals", true>>,
    ];
  });

  it("should return false for non-boolean literals", () => {
    type cases = [
      Expect<Test<IsBooleanLiteral<boolean>, "equals", false>>,
      Expect<Test<IsBooleanLiteral<"hello">, "equals", false>>,
      Expect<Test<IsBooleanLiteral<123>, "equals", false>>,
    ];
  });
});
