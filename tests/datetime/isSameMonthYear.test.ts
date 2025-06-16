import { describe, it, expect } from "vitest";
import { Test, Expect } from "inferred-types/types";
import { isSameMonthYear } from "inferred-types/runtime";

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
