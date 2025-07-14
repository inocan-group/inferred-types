import { IsAfter } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsAfter<A, B>", () => {

  it("ISO Year Comparisons - After", () => {
    type cases = [
      // Basic after comparisons
      Expect<Test<IsAfter<"2021", "2020">, "equals", true>>,
      Expect<Test<IsAfter<"2023", "2022">, "equals", true>>,
      Expect<Test<IsAfter<"2025", "2024">, "equals", true>>,
      // Century boundaries
      Expect<Test<IsAfter<"2000", "1999">, "equals", true>>,
      Expect<Test<IsAfter<"2100", "2099">, "equals", true>>,
    ];
  });

  it("ISO Year Comparisons - Before", () => {
    type cases = [
      // Basic before comparisons
      Expect<Test<IsAfter<"2020", "2021">, "equals", false>>,
      Expect<Test<IsAfter<"2022", "2023">, "equals", false>>,
      Expect<Test<IsAfter<"2024", "2025">, "equals", false>>,
      // Century boundaries
      Expect<Test<IsAfter<"1999", "2000">, "equals", false>>,
      Expect<Test<IsAfter<"2099", "2100">, "equals", false>>,
    ];
  });

  it("ISO Year Comparisons - Equal", () => {
    type cases = [
      // Equal years should return false (not after)
      Expect<Test<IsAfter<"2021", "2021">, "equals", false>>,
      Expect<Test<IsAfter<"2023", "2023">, "equals", false>>,
      Expect<Test<IsAfter<"2000", "2000">, "equals", false>>,
      Expect<Test<IsAfter<"1999", "1999">, "equals", false>>,
    ];
  });

  it("ISO Date Comparisons - After", () => {
    type cases = [
      // Basic date after comparisons
      Expect<Test<IsAfter<"2023-12-31", "2023-01-01">, "equals", true>>,
      Expect<Test<IsAfter<"2023-06-15", "2023-06-14">, "equals", true>>,
      Expect<Test<IsAfter<"2023-02-28", "2023-02-27">, "equals", true>>,
      // Month boundaries
      Expect<Test<IsAfter<"2023-07-01", "2023-06-30">, "equals", true>>,
      Expect<Test<IsAfter<"2023-03-01", "2023-02-28">, "equals", true>>,
      // Year boundaries with dates
      Expect<Test<IsAfter<"2024-01-01", "2023-12-31">, "equals", true>>,
    ];
  });

  it("ISO Date Comparisons - Before", () => {
    type cases = [
      // Basic date before comparisons
      Expect<Test<IsAfter<"2023-01-01", "2023-12-31">, "equals", false>>,
      Expect<Test<IsAfter<"2023-06-14", "2023-06-15">, "equals", false>>,
      Expect<Test<IsAfter<"2023-02-27", "2023-02-28">, "equals", false>>,
      // Month boundaries
      Expect<Test<IsAfter<"2023-06-30", "2023-07-01">, "equals", false>>,
      Expect<Test<IsAfter<"2023-02-28", "2023-03-01">, "equals", false>>,
      // Year boundaries with dates
      Expect<Test<IsAfter<"2023-12-31", "2024-01-01">, "equals", false>>,
    ];
  });

  it("ISO Date Comparisons - Equal", () => {
    type cases = [
      // Equal dates should return false (not after)
      Expect<Test<IsAfter<"2023-01-01", "2023-01-01">, "equals", false>>,
      Expect<Test<IsAfter<"2023-12-25", "2023-12-25">, "equals", false>>,
      Expect<Test<IsAfter<"2023-02-28", "2023-02-28">, "equals", false>>,
    ];
  });

  it("ISO DateTime Comparisons - After", () => {
    type cases = [
      // Basic datetime after comparisons
      Expect<Test<IsAfter<"2023-01-01T01:00:00Z", "2023-01-01T00:00:00Z">, "equals", true>>,
      Expect<Test<IsAfter<"2023-01-01T12:30:00Z", "2023-01-01T12:29:59Z">, "equals", true>>,
      Expect<Test<IsAfter<"2023-01-01T23:59:59Z", "2023-01-01T00:00:00Z">, "equals", true>>,
      // Cross-day boundaries
      Expect<Test<IsAfter<"2023-01-02T00:00:00Z", "2023-01-01T23:59:59Z">, "equals", true>>,
      // Different timezone indicators but same UTC time equivalence
      Expect<Test<IsAfter<"2023-01-01T13:00:00Z", "2023-01-01T12:00:00Z">, "equals", true>>,
    ];
  });

  it("ISO DateTime Comparisons - Before", () => {
    type cases = [
      // Basic datetime before comparisons
      Expect<Test<IsAfter<"2023-01-01T00:00:00Z", "2023-01-01T01:00:00Z">, "equals", false>>,
      Expect<Test<IsAfter<"2023-01-01T12:29:59Z", "2023-01-01T12:30:00Z">, "equals", false>>,
      Expect<Test<IsAfter<"2023-01-01T00:00:00Z", "2023-01-01T23:59:59Z">, "equals", false>>,
      // Cross-day boundaries
      Expect<Test<IsAfter<"2023-01-01T23:59:59Z", "2023-01-02T00:00:00Z">, "equals", false>>,
    ];
  });

  it("ISO DateTime Comparisons - Equal", () => {
    type cases = [
      // Equal DateTimes should return false (not after)
      Expect<Test<IsAfter<"2023-01-01T00:00:00Z", "2023-01-01T00:00:00Z">, "equals", false>>,
      Expect<Test<IsAfter<"2023-12-25T12:30:45Z", "2023-12-25T12:30:45Z">, "equals", false>>,
      Expect<Test<IsAfter<"2023-06-15T23:59:59Z", "2023-06-15T23:59:59Z">, "equals", false>>,
    ];
  });

  it("Wide Type Handling", () => {
    type cases = [
      // When either type is wide, return boolean
      Expect<Test<IsAfter<number, 2023>, "equals", boolean>>,
      Expect<Test<IsAfter<2023, number>, "equals", boolean>>,
    ];
  });

  it("Mixed DateLike Type Comparisons", () => {
    type cases = [
      // Some year vs date comparisons can be determined at compile time
      Expect<Test<IsAfter<"2024", "2023-01-01">, "equals", true>>,
      Expect<Test<IsAfter<"2023-01-01", "2024">, "equals", false>>,
      // Different format types that can't be directly compared return boolean
      Expect<Test<IsAfter<"2024", "2023-01-01T00:00:00Z">, "equals", boolean>>,
      Expect<Test<IsAfter<"2023-01-01T00:00:00Z", "2024">, "equals", boolean>>,
      Expect<Test<IsAfter<"2023-01-01", "2023-01-01T00:00:00Z">, "equals", boolean>>,
      Expect<Test<IsAfter<"2023-01-01T00:00:00Z", "2023-01-01">, "equals", boolean>>,
    ];
  });

  it("Advanced DateTime Format Tests", () => {
    type cases = [
      // Complex datetime scenarios with different precision
      Expect<Test<IsAfter<"2023-01-01T12:00:01Z", "2023-01-01T12:00:00Z">, "equals", true>>,
      Expect<Test<IsAfter<"2023-01-01T12:00:00.001Z", "2023-01-01T12:00:00.000Z">, "equals", true>>,
      Expect<Test<IsAfter<"2023-01-01T12:00:00Z", "2023-01-01T12:00:01Z">, "equals", false>>,
      // New Year transitions
      Expect<Test<IsAfter<"2024-01-01T00:00:00Z", "2023-12-31T23:59:59Z">, "equals", true>>,
      Expect<Test<IsAfter<"2023-12-31T23:59:59Z", "2024-01-01T00:00:00Z">, "equals", false>>,
    ];
  });

  it("Edge Cases and Boundary Conditions", () => {
    type cases = [
      // Year boundaries
      Expect<Test<IsAfter<"2000", "1999">, "equals", true>>,
      Expect<Test<IsAfter<"1999", "2000">, "equals", false>>,
      // Leap year scenarios
      Expect<Test<IsAfter<"2024-02-29", "2024-02-28">, "equals", true>>,
      Expect<Test<IsAfter<"2024-03-01", "2024-02-29">, "equals", true>>,
      // Month end boundaries
      Expect<Test<IsAfter<"2023-04-01", "2023-03-31">, "equals", true>>,
      Expect<Test<IsAfter<"2023-03-31", "2023-04-01">, "equals", false>>,
    ];
  });

  it("Multiple Sequential Comparisons", () => {
    type cases = [
      // Testing transitivity and consistency
      Expect<Test<IsAfter<"2025", "2024">, "equals", true>>,
      Expect<Test<IsAfter<"2024", "2023">, "equals", true>>,
      Expect<Test<IsAfter<"2023", "2022">, "equals", true>>,
      // Reverse direction
      Expect<Test<IsAfter<"2022", "2023">, "equals", false>>,
      Expect<Test<IsAfter<"2023", "2024">, "equals", false>>,
      Expect<Test<IsAfter<"2024", "2025">, "equals", false>>,
    ];
  });

});
