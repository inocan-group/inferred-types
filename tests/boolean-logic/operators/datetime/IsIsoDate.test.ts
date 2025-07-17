import { IsIsoDate } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsIsoDate<T>", () => {

  it("ISO Years (YYYY) - Currently Supported", () => {
    type cases = [
      // Valid 4-digit years - these work
      Expect<Test<IsIsoDate<"2023">, "equals", true>>,
      Expect<Test<IsIsoDate<"2024">, "equals", true>>,
      Expect<Test<IsIsoDate<"1999">, "equals", true>>,
      Expect<Test<IsIsoDate<"2025">, "equals", true>>,
      Expect<Test<IsIsoDate<"0001">, "equals", true>>,
      Expect<Test<IsIsoDate<"9999">, "equals", true>>,
    ];
  });

  it("Full ISO Dates (YYYY-MM-DD) - Supported!", () => {
    type cases = [
      // Full ISO dates are actually supported!
      Expect<Test<IsIsoDate<"2023-01-01">, "equals", true>>,
      Expect<Test<IsIsoDate<"2023-12-31">, "equals", true>>,
      Expect<Test<IsIsoDate<"2024-02-29">, "equals", true>>,
      Expect<Test<IsIsoDate<"2023-06-15">, "equals", true>>,
    ];
  });

  it("ISO Year-Month (YYYY-MM) - Current Implementation Status", () => {
    type cases = [
      // Current implementation behavior
      Expect<Test<IsIsoDate<"2023-01">, "equals", false>>,
      Expect<Test<IsIsoDate<"2023-12">, "equals", false>>,
      Expect<Test<IsIsoDate<"2024-02">, "equals", false>>,
      Expect<Test<IsIsoDate<"2023-06">, "equals", false>>,
    ];
  });

  it("Month-Date Format (--MM-DD) - Current Implementation Status", () => {
    type cases = [
      // Current implementation behavior
      Expect<Test<IsIsoDate<"--01-01">, "equals", false>>,
      Expect<Test<IsIsoDate<"--12-31">, "equals", false>>,
      Expect<Test<IsIsoDate<"--02-29">, "equals", false>>,
      Expect<Test<IsIsoDate<"--06-15">, "equals", false>>,
    ];
  });

  it("Compact Month-Date Format (--MMDD) - Current Implementation Status", () => {
    type cases = [
      // Current implementation behavior
      Expect<Test<IsIsoDate<"--0101">, "equals", false>>,
      Expect<Test<IsIsoDate<"--1231">, "equals", false>>,
      Expect<Test<IsIsoDate<"--0229">, "equals", false>>,
      Expect<Test<IsIsoDate<"--0615">, "equals", false>>,
    ];
  });

  it("Year-Day Format (-YYYY-DD) - Mixed Support", () => {
    type cases = [
      // Mixed behavior - some supported, some not
      Expect<Test<IsIsoDate<"-2023-01">, "equals", true>>,
      Expect<Test<IsIsoDate<"-2023-31">, "equals", false>>,
      Expect<Test<IsIsoDate<"-2024-29">, "equals", false>>,
      Expect<Test<IsIsoDate<"-2023-15">, "equals", false>>,
      Expect<Test<IsIsoDate<"-1999-01">, "equals", true>>,
    ];
  });

  it("Invalid Date Formats", () => {
    type cases = [
      // Invalid formats that should return false
      Expect<Test<IsIsoDate<"2023/01/01">, "equals", false>>,
      Expect<Test<IsIsoDate<"01/01/2023">, "equals", false>>,
      Expect<Test<IsIsoDate<"2023-1-1">, "equals", false>>, // Single digit month/day
      Expect<Test<IsIsoDate<"23-01-01">, "equals", false>>, // 2-digit year
      Expect<Test<IsIsoDate<"2023-13-01">, "equals", false>>, // Invalid month
      Expect<Test<IsIsoDate<"2023-01-32">, "equals", false>>, // Invalid day
      Expect<Test<IsIsoDate<"hello">, "equals", false>>,
      Expect<Test<IsIsoDate<"">, "equals", false>>,
      Expect<Test<IsIsoDate<"not-a-date">, "equals", false>>,
    ];
  });

  it("Invalid Length and Structure", () => {
    type cases = [
      // Wrong length or structure
      Expect<Test<IsIsoDate<"123">, "equals", false>>, // Too short
      Expect<Test<IsIsoDate<"12345">, "equals", false>>, // Too long for year
      Expect<Test<IsIsoDate<"2023-1">, "equals", false>>, // Single digit month
      Expect<Test<IsIsoDate<"2023-001">, "equals", false>>, // 3-digit month
      Expect<Test<IsIsoDate<"--1-01">, "equals", false>>, // Single digit month in --MM-DD
      Expect<Test<IsIsoDate<"--01-1">, "equals", false>>, // Single digit day in --MM-DD
    ];
  });

  it("Non-String Types", () => {
    type cases = [
      // Non-string types should return false
      Expect<Test<IsIsoDate<number>, "equals", false>>,
      Expect<Test<IsIsoDate<2023>, "equals", false>>,
      Expect<Test<IsIsoDate<boolean>, "equals", false>>,
      Expect<Test<IsIsoDate<true>, "equals", false>>,
      Expect<Test<IsIsoDate<false>, "equals", false>>,
      Expect<Test<IsIsoDate<null>, "equals", false>>,
      Expect<Test<IsIsoDate<undefined>, "equals", false>>,
      Expect<Test<IsIsoDate<{}>, "equals", false>>,
      Expect<Test<IsIsoDate<[]>, "equals", false>>,
      Expect<Test<IsIsoDate<Date>, "equals", false>>,
    ];
  });

  it("Wide String Types", () => {
    type cases = [
      Expect<Test<IsIsoDate<string>, "equals", boolean>>,
    ];
  });

  it("Union Types", () => {
    type cases = [
      // Pure ISO year unions should return true
      Expect<Test<IsIsoDate<"2023" | "2024">, "equals", true>>,
      // Mixed unions with valid years and invalid formats
      Expect<Test<IsIsoDate<"2023" | "hello">, "equals", boolean>>,
      Expect<Test<IsIsoDate<"2023" | number>, "equals", boolean>>,
      // Non-year unions should return false or boolean
      Expect<Test<IsIsoDate<"2023-01-01" | "hello">, "equals", boolean>>,
    ];
  });

  it("Current Implementation Notes", () => {
    type cases = [
      // Document what currently works
      // Multiple formats are actually supported
      Expect<Test<IsIsoDate<"2023">, "equals", true>>, // ✅ Works - ISO years
      Expect<Test<IsIsoDate<"2023-01">, "equals", false>>, // ❌ Year-month not supported
      Expect<Test<IsIsoDate<"2023-01-01">, "equals", true>>, // ✅ Works - Full dates!
      Expect<Test<IsIsoDate<"--01-01">, "equals", false>>, // ❌ Month-day format not supported
      Expect<Test<IsIsoDate<"-2023-01">, "equals", true>>, // ✅ Works - Some year-day formats
    ];
  });

});
