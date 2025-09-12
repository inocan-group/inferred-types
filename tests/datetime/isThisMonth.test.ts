/* eslint-disable ts/ban-ts-comment */
import { Equal, ExpectTrue } from "@type-challenges/utils";
import { isThisMonth } from "inferred-types/runtime";
import type { Expect, IsJsDate, IsLuxonDateTime, Test } from "inferred-types/types";

import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it } from "vitest";

describe("isThisMonth()", () => {
    const mockYear = 2024;
    const mockMonth = 6; // June
    const mockNow = new Date(mockYear, mockMonth - 1, 15); // June 15, 2024

    it("should correctly validate Date objects", () => {
        const thisMonth = new Date(mockYear, mockMonth - 1, 15);
        const lastMonth = new Date(mockYear, mockMonth - 2, 15);
        const nextMonth = new Date(mockYear, mockMonth, 15);
        type Iso = IsJsDate<typeof thisMonth>;

        expect(isThisMonth(thisMonth, mockNow)).toBe(true);
        expect(isThisMonth(lastMonth, mockNow)).toBe(false);
        expect(isThisMonth(nextMonth, mockNow)).toBe(false);

        if (isThisMonth(thisMonth, mockNow)) {
            type D = typeof thisMonth;

            type cases = [
                ExpectTrue<Iso>,
                Expect<Test<D, "equals", Date>>
            ];
        }
    });

    it("should correctly validate Moment.js objects", () => {
        const thisMonth = moment(`${mockYear}-${String(mockMonth).padStart(2, "0")}-15`);
        const lastMonth = moment(`${mockYear}-${String(mockMonth - 1).padStart(2, "0")}-15`);
        const nextMonth = moment(`${mockYear}-${String(mockMonth + 1).padStart(2, "0")}-15`);

        expect(isThisMonth(thisMonth, mockNow)).toBe(true);
        expect(isThisMonth(lastMonth, mockNow)).toBe(false);
        expect(isThisMonth(nextMonth, mockNow)).toBe(false);

    });

    it("should correctly validate Luxon DateTime objects", () => {
        const thisMonth = DateTime.fromISO(`${mockYear}-${String(mockMonth).padStart(2, "0")}-15`)
        const lastMonth = DateTime.fromISO(`${mockYear}-${String(mockMonth - 1).padStart(2, "0")}-15`);
        const nextMonth = DateTime.fromISO(`${mockYear}-${String(mockMonth + 1).padStart(2, "0")}-15`);
        type Luxon = IsLuxonDateTime<typeof thisMonth>;

        expect(isThisMonth(thisMonth, mockNow)).toBe(true);
        expect(isThisMonth(lastMonth, mockNow)).toBe(false);
        expect(isThisMonth(nextMonth, mockNow)).toBe(false);

        if (isThisMonth(thisMonth, mockNow)) {
            type ThisMonth = typeof thisMonth;
            type cases = [
                Expect<Test<Luxon, "equals", boolean>>,
            ];
        }
    });

    it("should correctly validate ISO 8601 datetime strings", () => {
        const thisMonth = `${mockYear}-${String(mockMonth).padStart(2, "0")}-15T14:30:00Z`;
        const lastMonth = `${mockYear}-${String(mockMonth - 1).padStart(2, "0")}-15T14:30:00Z`;
        const nextMonth = `${mockYear}-${String(mockMonth + 1).padStart(2, "0")}-15T14:30:00Z`;

        expect(isThisMonth(thisMonth, mockNow)).toBe(true);
        expect(isThisMonth(lastMonth, mockNow)).toBe(false);
        expect(isThisMonth(nextMonth, mockNow)).toBe(false);
    });

    it("should correctly validate ISO 8601 date strings", () => {
        const thisMonth = `${mockYear}-${String(mockMonth).padStart(2, "0")}-15`;
        const lastMonth = `${mockYear}-${String(mockMonth - 1).padStart(2, "0")}-15`;
        const nextMonth = `${mockYear}-${String(mockMonth + 1).padStart(2, "0")}-15`;

        expect(isThisMonth(thisMonth, mockNow)).toBe(true);
        expect(isThisMonth(lastMonth, mockNow)).toBe(false);
        expect(isThisMonth(nextMonth, mockNow)).toBe(false);

    });

    it("should handle invalid inputs", () => {
        // @ts-expect-error
        expect(() => isThisMonth(null, mockNow)).toThrow();
        // @ts-expect-error
        expect(() => isThisMonth(undefined, mockNow)).toThrow();
        expect(() => isThisMonth("not a date", mockNow)).toThrow();
        expect(() => isThisMonth("2024-06", mockNow)).toThrow(); // Invalid date format
        expect(isThisMonth(123, mockNow)).toBe(false); // Valid epoch, but different month
        expect(() => isThisMonth({}, mockNow)).toThrow();
        expect(() => isThisMonth([], mockNow)).toThrow();
    });

    it("should handle edge cases", () => {
        // First day of current month
        expect(isThisMonth(`${mockYear}-${String(mockMonth).padStart(2, "0")}-01T00:00:00Z`, mockNow)).toBe(true);

        // Last day of current month
        expect(isThisMonth(`${mockYear}-${String(mockMonth).padStart(2, "0")}-30T23:59:59Z`, mockNow)).toBe(true);

        // Malformed ISO strings
        expect(isThisMonth(`${mockYear}`, mockNow)).toBe(false); // Valid year, but Jan 1 != June
        expect(() => isThisMonth(`${mockYear}-`, mockNow)).toThrow();
        expect(() => isThisMonth(`${mockYear}-13-01`, mockNow)).toThrow();
    });
});
