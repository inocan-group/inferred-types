import { describe, it, expect } from "vitest";
import { Test, Expect } from "inferred-types/types";
import { isSameDay } from "../../modules/runtime/src/datetime/isSameDay";

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
