import { IsSameMonth } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsSameMonth<A, B>", () => {
  
  it("Same Month - True Cases", () => {
    type cases = [
      // Same month in different years
      Expect<Test<IsSameMonth<"2023-01-01", "2024-01-15">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-02-01", "2024-02-29">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-12-01", "2024-12-31">, "equals", true>>,
      // Same month, same year, different days
      Expect<Test<IsSameMonth<"2023-01-01", "2023-01-31">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-06-15", "2023-06-30">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-12-01", "2023-12-25">, "equals", true>>,
    ];
  });

  it("Different Months - False Cases", () => {
    type cases = [
      // Different months, same year
      Expect<Test<IsSameMonth<"2023-01-01", "2023-02-01">, "equals", false>>,
      Expect<Test<IsSameMonth<"2023-06-15", "2023-07-15">, "equals", false>>,
      Expect<Test<IsSameMonth<"2023-11-30", "2023-12-01">, "equals", false>>,
      // Different months, different years
      Expect<Test<IsSameMonth<"2023-01-01", "2024-02-01">, "equals", false>>,
      Expect<Test<IsSameMonth<"2023-12-31", "2024-01-01">, "equals", false>>,
    ];
  });

  it("Month Boundaries", () => {
    type cases = [
      // Adjacent months
      Expect<Test<IsSameMonth<"2023-01-31", "2023-02-01">, "equals", false>>,
      Expect<Test<IsSameMonth<"2023-02-28", "2023-03-01">, "equals", false>>,
      Expect<Test<IsSameMonth<"2023-11-30", "2023-12-01">, "equals", false>>,
      // Year boundaries
      Expect<Test<IsSameMonth<"2023-12-31", "2024-01-01">, "equals", false>>,
      Expect<Test<IsSameMonth<"2023-12-01", "2024-12-01">, "equals", true>>, // Same month different years
    ];
  });

  it("Leap Year February", () => {
    type cases = [
      // February in leap year vs non-leap year
      Expect<Test<IsSameMonth<"2024-02-29", "2023-02-28">, "equals", true>>, // Same month
      Expect<Test<IsSameMonth<"2024-02-01", "2023-02-15">, "equals", true>>, // Same month
      Expect<Test<IsSameMonth<"2024-02-29", "2024-03-01">, "equals", false>>, // Different months
    ];
  });

  it("Wide Types - Boolean Results", () => {
    type cases = [
      // Wide types need runtime determination
      Expect<Test<IsSameMonth<string, "2023-01-01">, "equals", boolean>>,
      Expect<Test<IsSameMonth<"2023-01-01", string>, "equals", boolean>>,
      Expect<Test<IsSameMonth<number, "2023-01-01">, "equals", boolean>>,
      Expect<Test<IsSameMonth<"2023-01-01", number>, "equals", boolean>>,
    ];
  });

  it("Mixed DateLike Types", () => {
    type cases = [
      // Different format combinations might need runtime determination
      Expect<Test<IsSameMonth<"2023-01", "2023-01-15">, "equals", boolean>>,
      Expect<Test<IsSameMonth<"2023", "2023-01-01">, "equals", boolean>>,
      Expect<Test<IsSameMonth<"2023-01-01T12:00:00Z", "2023-01-15">, "equals", boolean>>,
    ];
  });

  it("All Twelve Months", () => {
    type cases = [
      // Testing all months for consistency
      Expect<Test<IsSameMonth<"2023-01-01", "2024-01-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-02-01", "2024-02-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-03-01", "2024-03-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-04-01", "2024-04-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-05-01", "2024-05-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-06-01", "2024-06-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-07-01", "2024-07-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-08-01", "2024-08-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-09-01", "2024-09-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-10-01", "2024-10-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-11-01", "2024-11-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"2023-12-01", "2024-12-01">, "equals", true>>,
    ];
  });

  it("Edge Cases", () => {
    type cases = [
      // Month comparison across different centuries
      Expect<Test<IsSameMonth<"1999-01-01", "2000-01-01">, "equals", true>>,
      Expect<Test<IsSameMonth<"1999-12-31", "2000-01-01">, "equals", false>>,
      // Same month in far apart years
      Expect<Test<IsSameMonth<"2000-06-15", "2099-06-20">, "equals", true>>,
      Expect<Test<IsSameMonth<"2000-06-15", "2099-07-15">, "equals", false>>,
    ];
  });

});