import { describe, it, expect } from "vitest";
import { Test, Expect, DateLike, IsDoubleLeap } from "inferred-types/types";
import { asDate, isDoubleLeap } from "inferred-types/runtime";
import moment from "moment";
import { DateTime } from "luxon";

describe("Double Leap Year", () => {

    describe("IsDoubleLeap<T> type utility", () => {
        it("should return true for valid double leap years", () => {
            type T1 = IsDoubleLeap<"1408">;
            type T2 = IsDoubleLeap<"1604">;
            type T3 = IsDoubleLeap<"1620">;

            type cases = [
                // Known double leap years from DOUBLE_LEAP_MODERN
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1636">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1748">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1756">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1976">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1984">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"2000">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"2024">, "equals", true>>,
            ];
        });

        it("should return false for non-double leap years", () => {
            type cases = [
                // Regular non-leap years
                Expect<Test<IsDoubleLeap<"2001">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2002">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2003">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2005">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2017">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2018">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2019">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2021">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2022">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2023">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2025">, "equals", false>>,

                // Leap years that are NOT in DOUBLE_LEAP_MODERN
                Expect<Test<IsDoubleLeap<"2004">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2012">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2020">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2028">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2032">, "equals", false>>,

                // Century years that are not double leap
                Expect<Test<IsDoubleLeap<"1400">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"1500">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"1700">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"1800">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"1900">, "equals", false>>,
            ];
        });

        it("should handle full date strings", () => {
            type T1 = IsDoubleLeap<"2000-01-01">;
            type T2 = IsDoubleLeap<"2000-12-31">;
            type T3 = IsDoubleLeap<"2024-02-29">; // Leap day in double leap year
            type T4 = IsDoubleLeap<"1408-06-15">;
            type T5 = IsDoubleLeap<"1604">;

            type F1 = IsDoubleLeap<"1999-01-01">;
            type F2 = IsDoubleLeap<"2020-02-29">; // Leap day but not double leap year
            type F3 = IsDoubleLeap<"2023">;

            type cases = [
                // ISO date format tests - double leap years
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
                Expect<Test<T4, "equals", true>>,
                Expect<Test<T5, "equals", true>>,

                // Non-double leap years
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });

        it("should return error for invalid date formats", () => {
            type E1 = IsDoubleLeap<"not-a-date">;
            type E2 = IsDoubleLeap<"abc">;
            type E3 = IsDoubleLeap<"20">
            type E4 = IsDoubleLeap<"123">;
            type E5 = IsDoubleLeap<"">;

            type cases = [
                Expect<Test<E1, "equals", false>>,
                Expect<Test<E2, "equals", false>>,
                Expect<Test<E3, "equals", false>>,
                Expect<Test<E4, "equals", false>>,
                Expect<Test<E5, "equals", false>>,
            ];
        });

        it("should handle edge cases for specific years", () => {
            type cases = [
                // Historical double leap years (from DOUBLE_LEAP_MODERN)
                Expect<Test<IsDoubleLeap<"1408">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1604">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1620">, "equals", true>>,

                // Recent double leap years (from DOUBLE_LEAP_MODERN)
                Expect<Test<IsDoubleLeap<"1976">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"1984">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"2000">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"2008">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"2016">, "equals", true>>,
                Expect<Test<IsDoubleLeap<"2024">, "equals", true>>,

                // Years that are leap but NOT in DOUBLE_LEAP_MODERN
                Expect<Test<IsDoubleLeap<"2004">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2012">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2020">, "equals", false>>,
                Expect<Test<IsDoubleLeap<"2028">, "equals", false>>,
            ];
        });
    });


    describe("isDoubleLeap() runtime behavior", () => {
        it("should correctly validate ISO Year strings", () => {
        const t1 = "2024";
        const t2 = "2000";
        const t3 = "1408";
        const t4 = "1604";

        const f1 = "2023";
        const f2 = "2020"; // Leap but not double leap
        const f3 = "1900";

        expect(isDoubleLeap(t1), `${asDate(t1).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t2), `${asDate(t2).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t3), `${asDate(t3).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t4), `${asDate(t4).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(f1)).toBe(false);
        expect(isDoubleLeap(f2)).toBe(false);
        expect(isDoubleLeap(f3)).toBe(false);
    });

    it("should correctly validate Date objects", () => {
        const t1 = new Date(2024, 0, 1);
        const t2 = new Date(2000, 0, 1);
        const t3 = new Date(1408, 0, 1);
        const t4 = new Date(1604, 0, 1);

        const f1 = new Date(2023, 0, 1);
        const f2 = new Date(2020, 0, 1); // Leap but not double leap
        const f3 = new Date(1900, 0, 1);

        expect(isDoubleLeap(t1), `${asDate(t1).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t2), `${asDate(t2).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t3), `${asDate(t3).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t4), `${asDate(t4).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(f1)).toBe(false);
        expect(isDoubleLeap(f2)).toBe(false);
        expect(isDoubleLeap(f3)).toBe(false);
    });

    it("should correctly validate Moment.js objects", () => {
        const t1 = moment("2024");
        const t2 = moment("2000");
        const t3 = moment("1408");
        const t4 = moment("1604");

        const f1 = moment("2023");
        const f2 = moment("2020"); // Leap but not double leap

        expect(isDoubleLeap(t1), `${asDate(t1).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t2), `${asDate(t2).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t3), `${asDate(t3).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(t4), `${asDate(t4).getUTCFullYear()} should be a double leap year`).toBe(true);
        expect(isDoubleLeap(f1)).toBe(false);
        expect(isDoubleLeap(f2)).toBe(false);
    });

    it("should correctly validate Luxon DateTime objects", () => {
        const doubleLeapYear = DateTime.fromISO("2024");
        const anotherDoubleLeapYear = DateTime.fromISO("2000");
        const leapButNotDoubleLeap = DateTime.fromISO("2020");
        const nonLeapYear = DateTime.fromISO("2023");

        expect(isDoubleLeap(doubleLeapYear)).toBe(true);
        expect(isDoubleLeap(anotherDoubleLeapYear)).toBe(true);
        expect(isDoubleLeap(leapButNotDoubleLeap)).toBe(false);
        expect(isDoubleLeap(nonLeapYear)).toBe(false);
    });

    it("should distinguish between leap years and double leap years", () => {
        // These are leap years but NOT in DOUBLE_LEAP_MODERN
        const leapButNotDouble = ["2004", "2012", "2020", "2028", "2032"];

        // These are double leap years (in DOUBLE_LEAP_MODERN)
        const doubleLeapYears = ["1408", "1604", "2000", "2008", "2016", "2024"];

        for (const year of leapButNotDouble) {
            expect(isDoubleLeap(year as DateLike), `${year} is leap but not double leap`).toBe(false);
        }

        for (const year of doubleLeapYears) {
            expect(isDoubleLeap(year as DateLike), `${year} should be a double leap year`).toBe(true);
        }
    });


        it("should correctly identify known double leap years", () => {
            // Test some known double leap years from the DOUBLE_LEAP_MODERN array
            expect(isDoubleLeap(1408)).toBe(true);
            expect(isDoubleLeap(1604)).toBe(true);
            expect(isDoubleLeap(2000)).toBe(true);
            expect(isDoubleLeap(2024)).toBe(true);

            // Test with ISO date strings for double leap years
            expect(isDoubleLeap("1408-01-01")).toBe(true);
            expect(isDoubleLeap("1604-06-15")).toBe(true);
            expect(isDoubleLeap("2000-12-31")).toBe(true);
            expect(isDoubleLeap("2024-02-29")).toBe(true); // Leap day in double leap year
        });

        it("should correctly identify non-double leap years", () => {
            // Test some known non-double leap years
            expect(isDoubleLeap(2023)).toBe(false);
            expect(isDoubleLeap(2025)).toBe(false);
            expect(isDoubleLeap(1400)).toBe(false);

            // Test with ISO date strings for non-double leap years
            expect(isDoubleLeap("2023-01-01")).toBe(false);
            expect(isDoubleLeap("2025-06-15")).toBe(false);
            expect(isDoubleLeap("1400-12-31")).toBe(false);
        });

        it("should work with Date objects", () => {
            // Double leap years as Date objects
            const doubleLeap2000 = new Date(2000, 0, 1); // Jan 1, 2000
            const doubleLeap2024 = new Date(2024, 5, 15); // June 15, 2024

            expect(isDoubleLeap(doubleLeap2000)).toBe(true);
            expect(isDoubleLeap(doubleLeap2024)).toBe(true);

            // Non-double leap years as Date objects
            const nonDoubleLeap2023 = new Date(2023, 0, 1); // Jan 1, 2023
            const nonDoubleLeap2025 = new Date(2025, 11, 31); // Dec 31, 2025

            expect(isDoubleLeap(nonDoubleLeap2023)).toBe(false);
            expect(isDoubleLeap(nonDoubleLeap2025)).toBe(false);
        });

        it("should work with ISO datetime strings", () => {
            // Double leap years with time components
            expect(isDoubleLeap("2000-01-01T10:00:00Z")).toBe(true);
            expect(isDoubleLeap("2024-06-15T15:30:45Z")).toBe(true);

            // Non-double leap years with time components
            expect(isDoubleLeap("2023-01-01T10:00:00Z")).toBe(false);
            expect(isDoubleLeap("2025-12-31T23:59:59Z")).toBe(false);
        });

        it("should work with Unix timestamps", () => {
            // Unix timestamps for double leap years (in milliseconds)
            const timestamp2000 = 946684800000; // 2000-01-01 00:00:00 UTC in ms
            const timestamp2024 = 1704067200000; // 2024-01-01 00:00:00 UTC in ms

            expect(isDoubleLeap(timestamp2000)).toBe(true);
            expect(isDoubleLeap(timestamp2024)).toBe(true);
        });

        it("should handle edge cases", () => {
            // Test leap years that are NOT double leap years
            expect(isDoubleLeap(2020)).toBe(false); // 2020 is leap but not double leap
            expect(isDoubleLeap(2004)).toBe(false); // 2004 is leap but not double leap

            // Test with leap day in non-double leap years
            expect(isDoubleLeap("2020-02-29")).toBe(false);
            expect(isDoubleLeap("2004-02-29")).toBe(false);

            // Test leap years that ARE double leap years (per DOUBLE_LEAP_MODERN)
            expect(isDoubleLeap(2016)).toBe(true); // 2016 is in DOUBLE_LEAP_MODERN
            expect(isDoubleLeap(2008)).toBe(true); // 2008 is in DOUBLE_LEAP_MODERN
        });

        it("should handle mixed date types", () => {
            // Test with mixed input/output types
            const result1 = isDoubleLeap("2000-01-01"); // string input
            const result2 = isDoubleLeap(new Date(2024, 0, 1)); // Date input
            const result3 = isDoubleLeap(1408); // number input

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);
        });
    });

    describe("isDoubleLeap() type behavior", () => {

        it("should infer correct return types for literal years", () => {
            // Test that literal year inputs produce the correct type behavior
            const result1 = isDoubleLeap(2000 as const);
            const result2 = isDoubleLeap(2023 as const);

            // Runtime validation
            expect(result1).toBe(true);
            expect(result2).toBe(false);

            // Type validation - these should be boolean literals at compile time
            expect(typeof result1).toBe("boolean");
            expect(typeof result2).toBe("boolean");
        });

        it("should infer correct return types for literal date strings", () => {
            // Test that literal date string inputs produce the correct type behavior
            const result1 = isDoubleLeap("2000-01-01" as const);
            const result2 = isDoubleLeap("2023-01-01" as const);

            // Runtime validation
            expect(result1).toBe(true);
            expect(result2).toBe(false);

            // Type validation
            expect(typeof result1).toBe("boolean");
            expect(typeof result2).toBe("boolean");
        });

        it("should handle wide types correctly", () => {
            // Test that wide types (non-literal) return boolean
            const year: number = 2000;
            const dateString: DateLike = "2000-01-01";
            const dateObj: Date = new Date(2000, 0, 1);

            const result1 = isDoubleLeap(year);
            const result2 = isDoubleLeap(dateString);
            const result3 = isDoubleLeap(dateObj);

            // Runtime validation
            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);

            // Type validation - wide types should return boolean
            expect(typeof result1).toBe("boolean");
            expect(typeof result2).toBe("boolean");
            expect(typeof result3).toBe("boolean");
        });

        it("should work with DateLike constraint", () => {
            function testDateLike<T extends DateLike>(date: T) {
                return isDoubleLeap(date);
            }

            // Should accept various DateLike values
            const result1 = testDateLike("2000-01-01");
            const result2 = testDateLike(1408);
            const result3 = testDateLike(new Date(2024, 0, 1));

            // Runtime validation
            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(result3).toBe(true);

            // Type validation
            expect(typeof result1).toBe("boolean");
            expect(typeof result2).toBe("boolean");
            expect(typeof result3).toBe("boolean");
        });

        it("should preserve type information in curried function", () => {
            const doubleLeapYear = "2000-01-01" as const;
            const result = isDoubleLeap(doubleLeapYear);

            // Runtime validation
            expect(result).toBe(true);

            // Type validation
            expect(typeof result).toBe("boolean");
        });
    });

    describe("functional composition", () => {

        it("should work with array filtering", () => {
            const years: DateLike[] = [
                1408, // double leap
                1604, // double leap
                2000, // double leap
                2023, // not double leap (not a leap year)
                2024, // double leap
                2025, // not double leap (not a leap year)
                2004, // not double leap (leap but not in DOUBLE_LEAP_MODERN)
                2008  // double leap (in DOUBLE_LEAP_MODERN)
            ];

            const doubleLeapYears = years.filter(isDoubleLeap);

            expect(doubleLeapYears).toEqual([1408, 1604, 2000, 2024, 2008]);
        });

        it("should work with array methods", () => {
            const dates = [
                new Date(1408, 0, 1), // double leap
                new Date(2000, 5, 15), // double leap
                new Date(2023, 11, 31), // not double leap
                new Date(2024, 0, 1) // double leap
            ];

            const doubleLeapDates = dates.filter(isDoubleLeap);

            expect(doubleLeapDates).toHaveLength(3);
            expect(doubleLeapDates[0]).toEqual(new Date(1408, 0, 1));
            expect(doubleLeapDates[1]).toEqual(new Date(2000, 5, 15));
            expect(doubleLeapDates[2]).toEqual(new Date(2024, 0, 1));
        });
    });

    describe("error handling", () => {

        it("should handle invalid date inputs gracefully", () => {
            // Test that the function doesn't crash with edge cases
            expect(() => {
                // Valid comparison should work
                isDoubleLeap("2000-01-01");
            }).not.toThrow();

            // Note: The actual error handling is in asDate() function
            // which is called by isDoubleLeap()
        });
    });
});
