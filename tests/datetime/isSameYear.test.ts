import { describe, it, expect } from "vitest";
import { Test, Expect, DateLike } from "inferred-types/types";
import { isSameYear } from "inferred-types/runtime";

describe("isSameYear(comparator) -> (date) -> boolean", () => {

    it("same year with Date objects", () => {
        const comparator = new Date(2024, 5, 15); // June 15, 2024
        const checkFn = isSameYear(comparator);

        const sameYearDiffMonth = new Date(2024, 0, 1); // January 1, 2024
        const sameYearDiffDay = new Date(2024, 11, 31); // December 31, 2024
        const differentYear = new Date(2023, 5, 15); // June 15, 2023
        const differentYearFuture = new Date(2025, 5, 15); // June 15, 2025

        const t1 = checkFn(sameYearDiffMonth);
        const t2 = checkFn(sameYearDiffDay);
        const f1 = checkFn(differentYear);
        const f2 = checkFn(differentYearFuture);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("same year with ISO date strings", () => {
        const checkFn = isSameYear("2024-06-15");

        const t1 = checkFn("2024-01-01");
        const t2 = checkFn("2024-12-31");
        const t3 = checkFn("2024-02-29"); // Leap year day
        const f1 = checkFn("2023-06-15"); // Previous year
        const f2 = checkFn("2025-06-15"); // Next year

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("same year with mixed date types", () => {
        const checkFn = isSameYear(new Date(2024, 5, 15));

        const t1 = checkFn("2024-01-01");
        const t2 = checkFn("2024-12-31T23:59:59Z");
        const f1 = checkFn("2023-12-31");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(f1).toBe(false);
    });

    it("leap year considerations", () => {
        // 2024 is a leap year
        const checkLeapYear = isSameYear("2024-02-29");
        const t1 = checkLeapYear("2024-01-01");
        const t2 = checkLeapYear("2024-12-31");

        // 2023 is not a leap year
        const f1 = checkLeapYear("2023-02-28");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(f1).toBe(false);
    });

    it("century boundary years", () => {
        const check2000 = isSameYear("2000-01-01");
        const t1 = check2000("2000-12-31");
        const f1 = check2000("1999-12-31");
        const f2 = check2000("2001-01-01");

        expect(t1).toBe(true);
        expect(f1).toBe(false);
        expect(f2).toBe(false);
    });

    it("year only comparisons", () => {
        // Different months and days should still be true if same year
        const checkFn = isSameYear("2024-06-15");

        const months = [
            "2024-01-01", "2024-02-15", "2024-03-31", "2024-04-30",
            "2024-05-15", "2024-07-04", "2024-08-31", "2024-09-15",
            "2024-10-31", "2024-11-01", "2024-12-25"
        ];

        months.forEach(date => {
            expect(checkFn(date as DateLike)).toBe(true);
        });
    });

    it("type tests", () => {
        const comparator = "2024-06-15" as const;
        const checkFn = isSameYear(comparator);

        const result1 = checkFn("2024-01-01");
        const result2 = checkFn("2023-01-01");

        type cases = [
            // The function should return a boolean
            Expect<Test<typeof result1, "extends", boolean>>,
            Expect<Test<typeof result2, "extends", boolean>>,
        ];
    });
});
