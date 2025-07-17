import { isSameMonthYear } from "inferred-types/runtime";
import { IsSameMonthYear } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("IsSameMonthYear<A, B>", () => {

  it("Same Month and Year - True Cases", () => {
    type cases = [
      // Same month-year, different days
      Expect<Test<IsSameMonthYear<"2023-01-01", "2023-01-31">, "equals", true>>,
      Expect<Test<IsSameMonthYear<"2023-02-01", "2023-02-28">, "equals", true>>,
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
        // @ts-expect-error
        Expect<Test<IsSameMonthYear<string, "2023-01-01">, "equals", boolean>>,
        // @ts-expect-error
        Expect<Test<IsSameMonthYear<"2023-01-01", string>, "equals", boolean>>,
        Expect<Test<IsSameMonthYear<number, "2023-01-01">, "equals", boolean>>,
        Expect<Test<IsSameMonthYear<"2023-01-01", number>, "equals", boolean>>,
    ];
  });

  it("Mixed DateLike Types", () => {
    type T1 = IsSameMonthYear<"-2023-01", "2023-01-15">;
    type T2 = IsSameMonthYear<"2023-01-15", "-2023-01">;
    type T3 = IsSameMonthYear<"2023-01-15", "2023-01-15T12:30:00Z">;

    type F1 = IsSameMonthYear<"-2024-01", "2023-01-15">;


    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,

      Expect<Test<F1, "equals", false>>,
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

describe("isSameMonthYear(comparator) -> (date) -> boolean", () => {

    it("same month and year with Date objects", () => {
        const comparator = new Date(2024, 5, 15); // June 15, 2024
        const checkFn = isSameMonthYear(comparator);

        const sameMonthYear = new Date(2024, 5, 1); // June 1, 2024
        const sameMonthYearEndDay = new Date(2024, 5, 30); // June 30, 2024
        const differentMonth = new Date(2024, 6, 15); // July 15, 2024
        const differentYear = new Date(2023, 5, 15); // June 15, 2023

        const t1 = checkFn(sameMonthYear);
        const t2 = checkFn(sameMonthYearEndDay);
        const f1 = checkFn(differentMonth);
        const f2 = checkFn(differentYear);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("same month and year with ISO date strings", () => {
        const checkFn = isSameMonthYear("2024-06-15");

        const t1 = checkFn("2024-06-01");
        const t2 = checkFn("2024-06-30");
        const f1 = checkFn("2024-07-15"); // Different month
        const f2 = checkFn("2023-06-15"); // Different year
        const f3 = checkFn("2024-05-15"); // Different month

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
    });

    it("same month and year with mixed date types", () => {
        const checkFn = isSameMonthYear(new Date(2024, 5, 15));

        const t1 = checkFn("2024-06-01");
        const t2 = checkFn("2024-06-30T14:30:00Z");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("edge cases - year boundaries", () => {
        // December vs January of next year
        const checkDecember = isSameMonthYear("2024-12-15");
        const f1 = checkDecember("2025-01-15");

        // January vs December of previous year
        const checkJanuary = isSameMonthYear("2024-01-15");
        const f2 = checkJanuary("2023-12-15");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("leap year February", () => {
        const checkFebLeap = isSameMonthYear("2024-02-15"); // 2024 is leap year
        const t1 = checkFebLeap("2024-02-29"); // Feb 29 in leap year
        const f1 = checkFebLeap("2023-02-15"); // Different year

        expect(t1).toBe(true);
        expect(f1).toBe(false);
    });

    it("type tests", () => {
        const comparator = "2024-06-15" as const;
        const checkFn = isSameMonthYear(comparator);

        const result1 = checkFn("2024-06-01");
        const result2 = checkFn("2024-07-01");

        type cases = [
            // The function should return a boolean
            Expect<Test<typeof result1, "extends", boolean>>,
            Expect<Test<typeof result2, "extends", boolean>>,
        ];
    });
});
