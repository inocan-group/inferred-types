import { describe, it } from "vitest";
import type { Expect, HasWideValues, Test } from "inferred-types/types";

describe("HasWideValues<T>", () => {
  it("should return true for tuples with wide values", () => {
    type WideTuple = [string, number, boolean];
    type T1 = HasWideValues<WideTuple>;

    type MixedTuple = ["hello", number, "world"];
    type T2 = HasWideValues<MixedTuple>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
    ];
  });

  it("should return false for tuples with only literal values", () => {
    type LiteralTuple = ["hello", 42, true];
    type T1 = HasWideValues<LiteralTuple>;

    type EmptyTuple = [];
    type T2 = HasWideValues<EmptyTuple>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
    ];
  });

  it("should handle single element tuples", () => {
    type WideSingle = [string];
    type T1 = HasWideValues<WideSingle>;

    type LiteralSingle = ["hello"];
    type T2 = HasWideValues<LiteralSingle>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", false>>,
    ];
  });
});
