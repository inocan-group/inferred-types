import { IsBefore } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IsBefore<A, B>", () => {
  
  describe("ISO Year Comparisons", () => {
    it("returns true when first year is before second year", () => {
      type cases = [
        Expect<Test<IsBefore<"2020", "2021">, "equals", true>>,
        Expect<Test<IsBefore<"1999", "2000">, "equals", true>>,
        Expect<Test<IsBefore<"2023", "2024">, "equals", true>>,
      ];
    });

    it("returns false when first year is after second year", () => {
      type cases = [
        Expect<Test<IsBefore<"2022", "2021">, "equals", false>>,
        Expect<Test<IsBefore<"2001", "2000">, "equals", false>>,
        Expect<Test<IsBefore<"2025", "2024">, "equals", false>>,
      ];
    });

    it("returns false when years are equal", () => {
      type cases = [
        Expect<Test<IsBefore<"2021", "2021">, "equals", false>>,
        Expect<Test<IsBefore<"2000", "2000">, "equals", false>>,
        Expect<Test<IsBefore<"1995", "1995">, "equals", false>>,
      ];
    });
  });

  describe("ISO Date Comparisons", () => {
    it("returns true when first date is before second date", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-01-01", "2023-12-31">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01", "2023-01-02">, "equals", true>>,
        Expect<Test<IsBefore<"2022-12-31", "2023-01-01">, "equals", true>>,
        Expect<Test<IsBefore<"2023-05-15", "2023-05-16">, "equals", true>>,
      ];
    });

    it("returns false when first date is after second date", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-12-31", "2023-01-01">, "equals", false>>,
        Expect<Test<IsBefore<"2023-01-02", "2023-01-01">, "equals", false>>,
        Expect<Test<IsBefore<"2023-01-01", "2022-12-31">, "equals", false>>,
        Expect<Test<IsBefore<"2023-05-16", "2023-05-15">, "equals", false>>,
      ];
    });

    it("returns false when dates are equal", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-01-01", "2023-01-01">, "equals", false>>,
        Expect<Test<IsBefore<"2023-12-31", "2023-12-31">, "equals", false>>,
        Expect<Test<IsBefore<"2023-06-15", "2023-06-15">, "equals", false>>,
      ];
    });
  });

  describe("ISO DateTime Comparisons", () => {
    it("returns true when first datetime is before second datetime", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T01:00:00Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T00:00:01Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T23:59:59Z", "2023-01-02T00:00:00Z">, "equals", true>>,
        Expect<Test<IsBefore<"2022-12-31T23:59:59Z", "2023-01-01T00:00:00Z">, "equals", true>>,
      ];
    });

    it("returns false when first datetime is after second datetime", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-01-01T01:00:00Z", "2023-01-01T00:00:00Z">, "equals", false>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:01Z", "2023-01-01T00:00:00Z">, "equals", false>>,
        Expect<Test<IsBefore<"2023-01-02T00:00:00Z", "2023-01-01T23:59:59Z">, "equals", false>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2022-12-31T23:59:59Z">, "equals", false>>,
      ];
    });

    it("returns false when datetimes are equal", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T00:00:00Z">, "equals", false>>,
        Expect<Test<IsBefore<"2023-01-01T12:30:45Z", "2023-01-01T12:30:45Z">, "equals", false>>,
        Expect<Test<IsBefore<"2023-12-31T23:59:59Z", "2023-12-31T23:59:59Z">, "equals", false>>,
      ];
    });
  });

  describe("Wide Type Handling", () => {
    it("returns boolean for wide DateLike types", () => {
      type cases = [
        // Number type (DateLike but wide) should return boolean due to IsWideType check
        Expect<Test<IsBefore<number, "2023">, "equals", boolean>>,
        Expect<Test<IsBefore<"2023", number>, "equals", boolean>>,
        Expect<Test<IsBefore<number, number>, "equals", boolean>>,
      ];
    });
  });

  describe("Advanced ISO Format Tests", () => {
    it("handles different ISO datetime formats", () => {
      type cases = [
        // Different timezone indicators in datetimes
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T00:00:01Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:01Z", "2023-01-01T00:00:00Z">, "equals", false>>,
        // Same datetimes should be equal (false for "before")
        Expect<Test<IsBefore<"2023-01-01T12:00:00Z", "2023-01-01T12:00:00Z">, "equals", false>>,
      ];
    });

    it("works correctly across year boundaries", () => {
      type cases = [
        // New Year's Eve to New Year's Day
        Expect<Test<IsBefore<"2022-12-31", "2023-01-01">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01", "2022-12-31">, "equals", false>>,
        // Century boundaries  
        Expect<Test<IsBefore<"1999", "2000">, "equals", true>>,
        Expect<Test<IsBefore<"2000", "1999">, "equals", false>>,
      ];
    });

    it("handles month and day boundaries correctly", () => {
      type cases = [
        // End of month to beginning of next month
        Expect<Test<IsBefore<"2023-01-31", "2023-02-01">, "equals", true>>,
        Expect<Test<IsBefore<"2023-02-01", "2023-01-31">, "equals", false>>,
        // February boundary (non-leap year)
        Expect<Test<IsBefore<"2023-02-28", "2023-03-01">, "equals", true>>,
        Expect<Test<IsBefore<"2023-03-01", "2023-02-28">, "equals", false>>,
        // February boundary (leap year)
        Expect<Test<IsBefore<"2024-02-28", "2024-02-29">, "equals", true>>,
        Expect<Test<IsBefore<"2024-02-29", "2024-03-01">, "equals", true>>,
      ];
    });
  });

  describe("Edge Cases", () => {
    it("handles boundary dates correctly", () => {
      type cases = [
        // Leap year boundary
        Expect<Test<IsBefore<"2020-02-28", "2020-02-29">, "equals", true>>,
        Expect<Test<IsBefore<"2020-02-29", "2020-03-01">, "equals", true>>,
        // Year boundaries
        Expect<Test<IsBefore<"1999-12-31", "2000-01-01">, "equals", true>>,
        Expect<Test<IsBefore<"2000-01-01", "1999-12-31">, "equals", false>>,
        // Month boundaries
        Expect<Test<IsBefore<"2023-01-31", "2023-02-01">, "equals", true>>,
        Expect<Test<IsBefore<"2023-02-01", "2023-01-31">, "equals", false>>,
      ];
    });

    it("handles datetime precision correctly", () => {
      type cases = [
        // Second precision
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T00:00:01Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:01Z", "2023-01-01T00:00:00Z">, "equals", false>>,
        // Minute boundaries
        Expect<Test<IsBefore<"2023-01-01T00:59:59Z", "2023-01-01T01:00:00Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T01:00:00Z", "2023-01-01T00:59:59Z">, "equals", false>>,
        // Hour boundaries
        Expect<Test<IsBefore<"2023-01-01T23:59:59Z", "2023-01-02T00:00:00Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-02T00:00:00Z", "2023-01-01T23:59:59Z">, "equals", false>>,
      ];
    });
  });

  describe("Multiple Same Type Comparisons", () => {
    it("works with multiple year comparisons in sequence", () => {
      type cases = [
        Expect<Test<IsBefore<"2020", "2021">, "equals", true>>,
        Expect<Test<IsBefore<"2021", "2022">, "equals", true>>,
        Expect<Test<IsBefore<"2020", "2022">, "equals", true>>,
        Expect<Test<IsBefore<"2022", "2020">, "equals", false>>,
      ];
    });

    it("works with multiple date comparisons in sequence", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-01-01", "2023-01-02">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-02", "2023-01-03">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01", "2023-01-03">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-03", "2023-01-01">, "equals", false>>,
      ];
    });

    it("works with multiple datetime comparisons in sequence", () => {
      type cases = [
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T00:00:01Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:01Z", "2023-01-01T00:00:02Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:00Z", "2023-01-01T00:00:02Z">, "equals", true>>,
        Expect<Test<IsBefore<"2023-01-01T00:00:02Z", "2023-01-01T00:00:00Z">, "equals", false>>,
      ];
    });
  });

});
