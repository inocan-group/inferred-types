import { IsSameMonthYear } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsSameMonthYear<A, B>", () => {
  
  it("Same Month and Year - True Cases", () => {
    type cases = [
      // Same month-year, different days
      Expect<Test<IsSameMonthYear<"2023-01-01", "2023-01-31">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-02-01", "2023-02-28">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2024-02-01", "2024-02-29">, "equals", true>>, // Leap year
      Expect<Test<IsSameMonthYear<"2023-12-01", "2023-12-25">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-06-15", "2023-06-30">, "equals", true>>,
    ];
  });

  it("Same Month Different Year - False Cases", () => {
    type cases = [
      // Same month, different years
      Expect<Test<IsSameMonthYear<"2023-01-01", "2024-01-01">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2023-02-15", "2024-02-15">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2023-12-31", "2024-12-31">, "equals", false>>,
    ];
  });

  it("Same Year Different Month - False Cases", () => {
    type cases = [
      // Same year, different months
      Expect<Test<IsSameMonthYear<"2023-01-01", "2023-02-01">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2023-06-15", "2023-07-15">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2023-11-30", "2023-12-01">, "equals", false>>,
    ];
  });

  it("Different Month and Year - False Cases", () => {
    type cases = [
      // Different both month and year
      Expect<Test<IsSameMonthYear<"2023-01-01", "2024-02-01">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2023-12-31", "2024-01-01">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2022-06-15", "2023-07-15">, "equals", false>>,
    ];
  });

  it("Leap Year February", () => {
    type cases = [
      // Same February in leap vs non-leap year
      Expect<Test<IsSameMonthYear<"2024-02-29", "2023-02-28">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2024-02-01", "2024-02-29">, "equals", true>>, // Same leap year February
    ];
  });

  it("Month Boundaries", () => {
    type cases = [
      // Adjacent days across month boundaries
      Expect<Test<IsSameMonthYear<"2023-01-31", "2023-02-01">, "equals", false>>,
      Expect<Test<IsSameMonthYear<"2023-11-30", "2023-12-01">, "equals", false>>,
      // Year boundaries
      Expect<Test<IsSameMonthYear<"2023-12-31", "2024-01-01">, "equals", false>>,
    ];
  });

  it("Wide Types - Boolean Results", () => {
    type cases = [
      // Wide types need runtime determination
      Expect<Test<IsSameMonthYear<string, "2023-01-01">, "equals", boolean>>,
      Expect<Test<IsSameMonthYear<"2023-01-01", string>, "equals", boolean>>,
      Expect<Test<IsSameMonthYear<number, "2023-01-01">, "equals", boolean>>,
      Expect<Test<IsSameMonthYear<"2023-01-01", number>, "equals", boolean>>,
    ];
  });

  it("Mixed DateLike Types", () => {
    type cases = [
      // Different format combinations might need runtime determination
      Expect<Test<IsSameMonthYear<"2023-01", "2023-01-15">, "equals", boolean>>,
      Expect<Test<IsSameMonthYear<"2023", "2023-01-01">, "equals", boolean>>,
      Expect<Test<IsSameMonthYear<"2023-01-01T12:00:00Z", "2023-01-15">, "equals", boolean>>,
    ];
  });

  it("All Months in Same Year", () => {
    type cases = [
      // Testing each month within the same year
      Expect<Test<IsSameMonthYear<"2023-01-01", "2023-01-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-02-01", "2023-02-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-03-01", "2023-03-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-04-01", "2023-04-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-05-01", "2023-05-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-06-01", "2023-06-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-07-01", "2023-07-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-08-01", "2023-08-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-09-01", "2023-09-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-10-01", "2023-10-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-11-01", "2023-11-15">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-12-01", "2023-12-15">, "equals", true>>,
    ];
  });

});