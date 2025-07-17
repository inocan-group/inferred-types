import { describe, expect, it } from "vitest";
import {
    Err,
    Expect,
    IsSameDay,
    Test,
} from "inferred-types/types";
import { isSameDay } from "inferred-types/runtime";

/**
 * NOTE: The current implementation of IsSameDay compares only the MONTH component
 * (index 1) of parsed dates, not the full date. This means:
 * - Dates with same month but different days/years return true
 * - Year-only dates return true (both have null month)
 * - Different months return false regardless of year/day
 *
 * This may not be the intended "same day" behavior but the tests document
 * the current implementation.
 */
describe("IsSameDay<A,B>", () => {

    it("identical string dates should return true", () => {
        type cases = [
            // Identical full ISO dates
            Expect<Test<IsSameDay<"2024-12-25", "2024-12-25">, "equals", true>>,
            Expect<Test<IsSameDay<"2024-01-01", "2024-01-01">, "equals", true>>,
            Expect<Test<IsSameDay<"2024-02-29", "2024-02-29">, "equals", true>>, // Leap year


            Expect<Test<IsSameDay<"2024-12-25", "2024-12-24">, "equals", false>>,
            Expect<Test<IsSameDay<"2024-12-01", "2024-12-31">, "equals", false>>,

            // ISO datetime strings with same dates
            Expect<Test<IsSameDay<"2024-12-25T10:30:00", "2024-12-25T15:45:30">, "equals", true>>,
        ];
    });

    it("different months should return false", () => {
        type cases = [
            // Different months in same year
            Expect<Test<IsSameDay<"2024-12-25", "2024-11-25">, "equals", false>>,
            Expect<Test<IsSameDay<"2024-01-15", "2024-02-15">, "equals", false>>,

            // Month boundaries
            Expect<Test<IsSameDay<"2024-01-31", "2024-02-01">, "equals", false>>,
            Expect<Test<IsSameDay<"2024-12-31", "2025-01-01">, "equals", false>>,

            // Leap year boundaries
            Expect<Test<IsSameDay<"2024-02-29", "2024-03-01">, "equals", false>>,
        ];
    });

    it("year-only comparisons result in false", () => {
        type Y1 = IsSameDay<"2024", "2023">;

        type cases = [
            Expect<Test<Y1, "equals", false>>,
        ];
    });

    it("same month different years should return false", () => {

        type cases = [
            // Same month, different years - returns true (only month is compared)
            Expect<Test<IsSameDay<"2024-12-25", "2023-12-25">, "equals", false>>,
            Expect<Test<IsSameDay<"2024-01-01", "2025-01-01">, "equals", false>>,
            Expect<Test<IsSameDay<"2020-06-15", "2030-06-20">, "equals", false>>,
        ];
    });

    it("identical integer dates should return true", () => {
        type cases = [
            // Unix timestamps (same value)
            Expect<Test<IsSameDay<1640995200, 1640995200>, "equals", true>>,
            Expect<Test<IsSameDay<1609459200, 1609459200>, "equals", true>>,
            Expect<Test<IsSameDay<0, 0>, "equals", true>>,
        ];
    });

    it("integer dates which are MORE than a day apart return false at design time", () => {
        type F1 = IsSameDay<1640995200, 1640995300>;
        type F2 = IsSameDay<1609459200, 1609545600>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });


    it("non-integer numeric values return error", () => {
        type E1 = IsSameDay<12.5, 12.5>;
        type E2 = IsSameDay<12, 12.5>;
        type E3 = IsSameDay<12.5, 12>;


        type cases = [
            Expect<Test<E1, "isError", "invalid-date">>,
            Expect<Test<E2, "isError", "invalid-date">>,
            Expect<Test<E3, "isError", "invalid-date">>,
        ];
    });


    it("wide types should return boolean", () => {
        type cases = [
            // Wide number types
            Expect<Test<IsSameDay<number, 1640995200>, "equals", boolean>>,
            Expect<Test<IsSameDay<1640995200, number>, "equals", boolean>>,
            Expect<Test<IsSameDay<number, number>, "equals", boolean>>,
        ];
    });

    it("mixed valid date types should behave correctly", () => {
        type cases = [
            // String numbers vs numbers
            Expect<Test<IsSameDay<"1640995200", 1640995200>, "equals", boolean>>,
            Expect<Test<IsSameDay<1640995200, "1640995200">, "equals", boolean>>,

            // Different type combinations that can't be determined at compile time
            Expect<Test<IsSameDay<"2024-12-25", 1640995200>, "equals", boolean>>,
            Expect<Test<IsSameDay<1640995200, "2024-12-25">, "equals", boolean>>,
        ];
    });

    it("same month different day returns false", () => {
        type cases = [
            // Same month, different days - current implementation returns true
            Expect<Test<IsSameDay<"2024-02-28", "2024-02-29">, "equals", false>>,
            Expect<Test<IsSameDay<"2024-01-01", "2024-01-31">, "equals", false>>,
            Expect<Test<IsSameDay<"2024-12-01", "2024-12-25">, "equals", false>>,
        ];
    });

});

describe("isSameDay(comparator) -> (date) -> boolean", () => {

    it("same day with Date objects", () => {
        const comparator = new Date(2024, 5, 15); // June 15, 2024

        const checkFn = isSameDay(comparator);

        const sameDay = new Date(2024, 5, 15, 14, 30); // Same day, different time
        const differentDay = new Date(2024, 5, 16); // June 16, 2024

        const t1 = checkFn(sameDay);
        const f1 = checkFn(differentDay);

        expect(t1).toBe(true);
        expect(f1).toBe(false);
    });

    it("same day with ISO date strings", () => {
        const checkFn = isSameDay("2024-06-15");

        const t1 = checkFn("2024-06-15");
        const f1 = checkFn("2024-06-16");
        const f2 = checkFn("2024-05-15"); // Different month
        const f3 = checkFn("2023-06-15"); // Different year

        expect(t1).toBe(true);
        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
    });

    it("same day with mixed date types", () => {
        const checkFn = isSameDay(new Date(2024, 5, 15));

        const t1 = checkFn("2024-06-15");
        const t2 = checkFn("2024-06-15T14:30:00Z");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("edge cases - month and year boundaries", () => {
        // Last day of month vs first day of next month
        const checkLastDayMay = isSameDay("2024-05-31");
        const f1 = checkLastDayMay("2024-06-01");

        // Last day of year vs first day of next year
        const checkLastDayYear = isSameDay("2024-12-31");
        const f2 = checkLastDayYear("2025-01-01");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("leap year considerations", () => {
        // February 29 in leap year
        const checkLeapDay = isSameDay("2024-02-29");
        const t1 = checkLeapDay("2024-02-29");

        expect(t1).toBe(true);
    });

    it("type tests", () => {
        const comparator = "2024-06-15" as const;
        const checkFn = isSameDay(comparator);

        const result1 = checkFn("2024-06-15");
        const result2 = checkFn("2024-06-16");

        type cases = [
            // The function should return a boolean
            Expect<Test<typeof result1, "extends", boolean>>,
            Expect<Test<typeof result2, "extends", boolean>>,
        ];
    });
});
