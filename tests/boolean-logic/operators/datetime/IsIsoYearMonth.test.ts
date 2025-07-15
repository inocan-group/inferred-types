import { IsIsoYearMonth } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsIsoYearMonth<T>", () => {

  it("Valid ISO Year-Month Format (YYYY-MM)", () => {
    type T1 = IsIsoYearMonth<"-2023-01">
    type T2 = IsIsoYearMonth<"-2023-12">
    type T3 = IsIsoYearMonth<"-2024-02">
    type T4 = IsIsoYearMonth<"-2023-06">
    type T5 = IsIsoYearMonth<"-1999-01">
    type T6 = IsIsoYearMonth<"-2025-07">

    type cases = [
      // Standard year-month format
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
      Expect<Test<T4, "equals", true>>,
      Expect<Test<T5, "equals", true>>,
      Expect<Test<T6, "equals", true>>,
    ];
  });

  it("All Valid Months", () => {
    type cases = [
      // Test all 12 months
      Expect<Test<IsIsoYearMonth<"-2023-01">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-02">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-03">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-04">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-05">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-06">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-07">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-08">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-09">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-10">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-11">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-12">, "equals", true>>,
    ];
  });

  it("Invalid Months", () => {
    type cases = [
      // Invalid month values
      Expect<Test<IsIsoYearMonth<"-2023-00">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"-2023-13">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"-2023-14">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"-2023-99">, "equals", false>>,
    ];
  });

  it("Single Digit Months (Invalid)", () => {
    type cases = [
      // Single digit months should be invalid
      Expect<Test<IsIsoYearMonth<"-2023-1">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"-2023-2">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"-2023-9">, "equals", false>>,
    ];
  });

  it("Year-Only and Full Dates (Invalid)", () => {
    type cases = [
      // Year-only should not match
      Expect<Test<IsIsoYearMonth<"-2023">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"-2024">, "equals", false>>,
      // Full dates should not match
      Expect<Test<IsIsoYearMonth<"2023-01-01">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"2023-12-31">, "equals", false>>,
    ];
  });

  it("Different Year Formats", () => {
    type cases = [
      // Two-digit years should be invalid
      Expect<Test<IsIsoYearMonth<"23-01">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"99-12">, "equals", false>>,
      // Three-digit years should be invalid
      Expect<Test<IsIsoYearMonth<"123-01">, "equals", false>>,
      // Five-digit years should be invalid
      Expect<Test<IsIsoYearMonth<"12345-01">, "equals", false>>,
    ];
  });

  it("Invalid Separators and Formats", () => {
    type cases = [
      // Wrong separators
      Expect<Test<IsIsoYearMonth<"2023/01">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"2023.01">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"2023_01">, "equals", false>>,
      Expect<Test<IsIsoYearMonth<"2023 01">, "equals", false>>,
      // No separator
      Expect<Test<IsIsoYearMonth<"202301">, "equals", false>>, // Should be invalid without separator
    ];
  });

  it("Edge Year Cases", () => {
    type cases = [
      // Edge years
      Expect<Test<IsIsoYearMonth<"-0001-01">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-9999-12">, "equals", true>>,
      // Historical years
      Expect<Test<IsIsoYearMonth<"-1000-01">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-1776-07">, "equals", true>>,
      // Future years
      Expect<Test<IsIsoYearMonth<"-2100-01">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-3000-12">, "equals", true>>,
    ];
  });

  it("Non-String Types", () => {
    type cases = [
      // Non-string types should return false
      Expect<Test<IsIsoYearMonth<number>, "equals", false>>,
      Expect<Test<IsIsoYearMonth<2023>, "equals", false>>,
      Expect<Test<IsIsoYearMonth<boolean>, "equals", false>>,
      Expect<Test<IsIsoYearMonth<null>, "equals", false>>,
      Expect<Test<IsIsoYearMonth<undefined>, "equals", false>>,
      Expect<Test<IsIsoYearMonth<Date>, "equals", false>>,
    ];
  });

  it("Wide String Types", () => {
    type cases = [
      // Wide string should return boolean
      Expect<Test<IsIsoYearMonth<string>, "equals", boolean>>,
    ];
  });

  it("Union Types", () => {
    type cases = [
      // Pure year-month unions
      Expect<Test<IsIsoYearMonth<"-2023-01" | "-2023-12">, "equals", true>>,
      Expect<Test<IsIsoYearMonth<"-2023-06" | "-2024-06">, "equals", true>>,
      // Mixed unions
      Expect<Test<IsIsoYearMonth<"-2023-01" | "hello">, "equals", boolean>>,
      Expect<Test<IsIsoYearMonth<"-2023-01" | "2023">, "equals", boolean>>,
    ];
  });

});
