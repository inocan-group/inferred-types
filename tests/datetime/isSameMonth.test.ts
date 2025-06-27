import { describe, it, expect } from "vitest";
import { Test, Expect } from "inferred-types/types";
import { isSameMonth } from "inferred-types/runtime";
import { DateLike } from "../../modules/inferred-types/dist";

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
