import { isSameMonth } from "inferred-types/runtime";
import { DateLike, IsSameMonth } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";

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
      // @ts-expect-error
      Expect<Test<IsSameMonth<string, "2023-01-01">, "equals", boolean>>,
      // @ts-expect-error
      Expect<Test<IsSameMonth<"2023-01-01", string>, "equals", boolean>>,
      Expect<Test<IsSameMonth<number, "2023-01-01">, "equals", boolean>>,
      Expect<Test<IsSameMonth<"2023-01-01", number>, "equals", boolean>>,
    ];
  });

  it("Mixed DateLike Types", () => {
    type cases = [
      Expect<Test<IsSameMonth<"2023-01", "2023-01-15">, "equals", boolean>>,
      Expect<Test<IsSameMonth<"2023", "2023-01-01">, "equals", boolean>>,
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

describe("isSameMonth(comparator) -> (date) -> boolean", () => {

    it("same month and year with Date objects", () => {
        const comparator = new Date(2024, 5, 15); // June 15, 2024
        const checkFn = isSameMonth(comparator);

        const sameMonth = new Date(2024, 5, 1); // June 1, 2024
        const sameMonthEndDay = new Date(2024, 5, 30); // June 30, 2024
        const differentMonth = new Date(2024, 6, 15); // July 15, 2024
        const differentYear = new Date(2023, 5, 15); // June 15, 2023

        const t1 = checkFn(sameMonth);
        const t2 = checkFn(sameMonthEndDay);
        const f1 = checkFn(differentMonth);
        const f2 = checkFn(differentYear);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("same month and year with ISO date strings", () => {
        const checkFn = isSameMonth("2024-06-15");

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
        const checkFn = isSameMonth(new Date(2024, 5, 15));

        const t1 = checkFn("2024-06-01");
        const t2 = checkFn("2024-06-30T14:30:00Z");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("edge cases - year boundaries", () => {
        // December vs January of next year
        const checkDecember = isSameMonth("2024-12-15");
        const f1 = checkDecember("2025-01-15");

        // January vs December of previous year
        const checkJanuary = isSameMonth("2024-01-15");
        const f2 = checkJanuary("2023-12-15");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("leap year February", () => {
        const checkFebLeap = isSameMonth("2024-02-15"); // 2024 is leap year
        const t1 = checkFebLeap("2024-02-29"); // Feb 29 in leap year
        const f1 = checkFebLeap("2023-02-15"); // Different year

        expect(t1).toBe(true);
        expect(f1).toBe(false);
    });

    it("all months of the year", () => {
        const months = [
            "2024-01-15", "2024-02-15", "2024-03-15", "2024-04-15",
            "2024-05-15", "2024-06-15", "2024-07-15", "2024-08-15",
            "2024-09-15", "2024-10-15", "2024-11-15", "2024-12-15"
        ] as DateLike[];

        months.forEach((month, index) => {
            const checkFn = isSameMonth(month);

            // Same month should return true
            const t1 = checkFn(`2024-${String(index + 1).padStart(2, '0')}-01` as DateLike);
            expect(t1).toBe(true);

            // Different month should return false
            if (index < 11) {
                const nextMonth = `2024-${String(index + 2).padStart(2, '0')}-01` as DateLike;
                const f1 = checkFn(nextMonth);
                expect(f1).toBe(false);
            }
        });
    });

    it("type tests", () => {
        const comparator = "2024-06-15" as const;
        const checkFn = isSameMonth(comparator);

        const yesProbably = checkFn(new Date(2024, 5, 1)); // June 1, 2024 (month 5 = June)
        const yes = checkFn("2024-06-01");
        const no = checkFn("2024-07-01");

        expect(yesProbably).toBe(true);
        expect(yes).toBe(true);
        expect(no).toBe(false);

        type cases = [
            Expect<Test<typeof yesProbably, "equals", boolean>>,
            Expect<Test<typeof yes, "equals", true>>,
            Expect<Test<typeof no, "equals", false>>,
        ];
    });
});

