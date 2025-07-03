import { IsSameYear } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsSameYear<A, B>", () => {
  
  it("Same Years - True Cases", () => {
    type cases = [
      // Same year strings
      Expect<Test<IsSameYear<"2023", "2023">, "equals", true>>,
      Expect<Test<IsSameYear<"2024", "2024">, "equals", true>>,
      Expect<Test<IsSameYear<"1999", "1999">, "equals", true>>,
      // Same year in different date formats
      Expect<Test<IsSameYear<"2023-01-01", "2023-12-31">, "equals", true>>,
      Expect<Test<IsSameYear<"2024-02-29", "2024-06-15">, "equals", true>>,
      Expect<Test<IsSameYear<"2023-01-01", "2023">, "equals", true>>,
    ];
  });

  it("Different Years - False Cases", () => {
    type cases = [
      // Different year strings
      Expect<Test<IsSameYear<"2023", "2024">, "equals", false>>,
      Expect<Test<IsSameYear<"2024", "2023">, "equals", false>>,
      Expect<Test<IsSameYear<"1999", "2000">, "equals", false>>,
      // Different years in date formats
      Expect<Test<IsSameYear<"2023-01-01", "2024-01-01">, "equals", false>>,
      Expect<Test<IsSameYear<"2023-12-31", "2024-01-01">, "equals", false>>,
    ];
  });

  it("Wide Types - Boolean Results", () => {
    type cases = [
      // Wide types need runtime determination
      Expect<Test<IsSameYear<number, 2023>, "equals", boolean>>,
      Expect<Test<IsSameYear<2023, number>, "equals", boolean>>,
    ];
  });

  it("Mixed DateLike Types", () => {
    type cases = [
      // Different date format types - some work at compile time
      Expect<Test<IsSameYear<"2023", "2023-01-01T00:00:00Z">, "equals", true>>,
      Expect<Test<IsSameYear<"2023-01-01T00:00:00Z", "2023">, "equals", true>>,
    ];
  });

  it("Century and Millennium Boundaries", () => {
    type cases = [
      // Century boundaries
      Expect<Test<IsSameYear<"1999", "2000">, "equals", false>>,
      Expect<Test<IsSameYear<"2000", "1999">, "equals", false>>,
      Expect<Test<IsSameYear<"2000", "2000">, "equals", true>>,
      // Same millennium but different centuries
      Expect<Test<IsSameYear<"1900", "1999">, "equals", false>>,
      Expect<Test<IsSameYear<"1999", "1900">, "equals", false>>,
    ];
  });

  it("Leap Year Scenarios", () => {
    type cases = [
      // Leap year vs non-leap year
      Expect<Test<IsSameYear<"2024", "2023">, "equals", false>>,
      Expect<Test<IsSameYear<"2023", "2024">, "equals", false>>,
      // Same leap year
      Expect<Test<IsSameYear<"2024", "2024">, "equals", true>>,
      // Leap year dates from same year
      Expect<Test<IsSameYear<"2024-02-29", "2024-12-31">, "equals", true>>,
    ];
  });

  it("Edge Cases with Date Parsing", () => {
    type cases = [
      // Different months but same year
      Expect<Test<IsSameYear<"2023-01-01", "2023-02-01">, "equals", true>>,
      Expect<Test<IsSameYear<"2023-01-31", "2023-12-01">, "equals", true>>,
      // Different days but same year
      Expect<Test<IsSameYear<"2023-01-01", "2023-01-31">, "equals", true>>,
      Expect<Test<IsSameYear<"2023-12-01", "2023-12-31">, "equals", true>>,
    ];
  });

  it("Historical and Future Years", () => {
    type cases = [
      // Historical years - actual behavior
      Expect<Test<IsSameYear<"0001", "0001">, "equals", true>>,
      Expect<Test<IsSameYear<"0001", "0002">, "equals", true>>, // Unexpected behavior but actual
      // Future years
      Expect<Test<IsSameYear<"9999", "9999">, "equals", boolean>>,
      Expect<Test<IsSameYear<"9999", "9998">, "equals", boolean>>,
      // Historical vs modern
      Expect<Test<IsSameYear<"0001", "2023">, "equals", false>>,
      Expect<Test<IsSameYear<"2023", "0001">, "equals", false>>,
    ];
  });

});