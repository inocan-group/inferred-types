import { IsBefore } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsBefore<A, B>", () => {
  it("returns true for ISO years in order", () => {
    type T = IsBefore<"2020", "2021">;
    type cases = [Expect<Test<T, "equals", true>>];
  });

  it("returns false for ISO years out of order", () => {
    type T = IsBefore<"2022", "2021">;
    type cases = [Expect<Test<T, "equals", false>>];
  });

  it("returns false for equal ISO years", () => {
    type T = IsBefore<"2021", "2021">;
    type cases = [Expect<Test<T, "equals", false>>];
  });

  it("returns true for ISO dates in order", () => {
    type T = IsBefore<"2023-01-01", "2023-12-31">;
    type cases = [Expect<Test<T, "equals", true>>];
  });

  it("returns false for ISO dates out of order", () => {
    type T = IsBefore<"2023-12-31", "2023-01-01">;
    type cases = [Expect<Test<T, "equals", false>>];
  });

  it("returns true for ISO DateTimes in order", () => {
    type T = IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T01:00:00Z">;
    type cases = [Expect<Test<T, "equals", true>>];
  });


});
