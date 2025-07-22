/* eslint-disable ts/ban-ts-comment */
import { isTomorrow } from "inferred-types/runtime";
import {
    Expect,
    IsIsoDateTime,
    IsIsoDate,
    IsLuxonDateTime,
    Test,
    LuxonLikeDateTime,
    IsoDateTime,
    IsoDate,
} from "inferred-types/types";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it } from "vitest";

describe("isTomorrow()", () => {
    const mockNow = new Date(2024, 0, 15); // January 15, 2024

    it("should correctly validate Date objects", () => {
        const tomorrow = new Date(2024, 0, 16);
        const today = new Date(2024, 0, 15);
        const dayAfterTomorrow = new Date(2024, 0, 17);

        expect(isTomorrow(tomorrow, mockNow)).toBe(true);
        expect(isTomorrow(today, mockNow)).toBe(false);
        expect(isTomorrow(dayAfterTomorrow, mockNow)).toBe(false);

        if (isTomorrow(tomorrow, mockNow)) {
            type D = typeof tomorrow;

            type cases = [
                Expect<Test<D, "equals", Date>>
            ];
        }
    });

    it("should correctly validate Moment.js objects", () => {
        const tomorrow = moment("2024-01-16");
        const today = moment("2024-01-15");
        const dayAfterTomorrow = moment("2024-01-17");

        expect(isTomorrow(tomorrow, mockNow)).toBe(true);
        expect(isTomorrow(today, mockNow)).toBe(false);
        expect(isTomorrow(dayAfterTomorrow, mockNow)).toBe(false);

    });

    it("should correctly validate Luxon DateTime objects", () => {
        const tomorrow = DateTime.fromISO("2024-01-16");
        const today = DateTime.fromISO("2024-01-15");
        const dayAfterTomorrow = DateTime.fromISO("2024-01-17");
        type Luxon = IsLuxonDateTime<typeof tomorrow>;

        expect(isTomorrow(tomorrow, mockNow)).toBe(true);
        expect(isTomorrow(today, mockNow)).toBe(false);
        expect(isTomorrow(dayAfterTomorrow, mockNow)).toBe(false);

        if (isTomorrow(tomorrow, mockNow)) {
            type NextDay = typeof tomorrow;

            type cases = [
                Expect<Test<Luxon, "equals", true>>,
            ];
        }
    });

    it("should correctly validate ISO 8601 datetime strings", () => {
        const tomorrow = "2024-01-16T14:30:00Z";
        const today = "2024-01-15T14:30:00Z";
        const dayAfterTomorrow = "2024-01-17T14:30:00Z";
        type Iso = IsIsoDateTime<typeof tomorrow>;

        expect(isTomorrow(tomorrow, mockNow)).toBe(true);
        expect(isTomorrow(today, mockNow)).toBe(false);
        expect(isTomorrow(dayAfterTomorrow, mockNow)).toBe(false);

        if (isTomorrow(tomorrow, mockNow)) {
            type NextDay = typeof tomorrow;

            type cases = [
                Expect<Test<Iso, "equals", true>>,
                Expect<Test<NextDay, "extends", IsoDateTime>>
            ];
        }
    });

    it("should correctly validate ISO 8601 date strings", () => {
        const tomorrow = "2024-01-16";
        const wide = tomorrow as string;
        const today = "2024-01-15";
        const dayAfterTomorrow = "2024-01-17";
        type Iso = IsIsoDate<typeof tomorrow>;
        type IsoWide = IsIsoDate<string>;

        expect(isTomorrow(tomorrow, mockNow)).toBe(true);
        expect(isTomorrow(today, mockNow)).toBe(false);
        expect(isTomorrow(dayAfterTomorrow, mockNow)).toBe(false);

        if (isTomorrow(tomorrow, mockNow)) {
            type NextDay = typeof tomorrow;
            // @ts-ignore
            type _cases = [
                Expect<Test<Iso, "equals", true>>,
                Expect<Test<NextDay, "extends", IsoDate>>
            ];
        }
        if (isTomorrow(wide, mockNow)) {
            type WideDay = typeof wide;
            // @ts-ignore
            type _cases = [
                Expect<Test<IsoWide, "equals", boolean>>,
                Expect<Test<WideDay, "extends", string>>
            ];
        }
    });

    it("should handle invalid inputs", () => {
        expect(() => isTomorrow(null, mockNow)).toThrow();
        expect(() => isTomorrow(undefined, mockNow)).toThrow();
        expect(() => isTomorrow("not a date", mockNow)).toThrow();
        expect(isTomorrow("2024", mockNow)).toBe(false); // Valid year, but Jan 1 != Jan 16
        expect(isTomorrow(123, mockNow)).toBe(false); // Valid epoch, but different date
        expect(() => isTomorrow({}, mockNow)).toThrow();
        expect(() => isTomorrow([], mockNow)).toThrow();
    });

    it("should handle edge cases", () => {
        // Different times on tomorrow should still return true
        expect(isTomorrow("2024-01-16T00:00:00Z", mockNow)).toBe(true);
        expect(isTomorrow("2024-01-16T23:59:59Z", mockNow)).toBe(true);

        // Month boundary
        const lastDayOfMonth = new Date(2024, 0, 31); // Jan 31, 2024
        expect(isTomorrow("2024-02-01", lastDayOfMonth)).toBe(true);

        // Year boundary
        const lastDayOfYear = new Date(2024, 11, 31); // Dec 31, 2024
        expect(isTomorrow("2025-01-01", lastDayOfYear)).toBe(true);

        // Malformed ISO strings
        expect(() => isTomorrow("2024-01", mockNow)).toThrow();
        expect(() => isTomorrow("2024-01-", mockNow)).toThrow();
        expect(() => isTomorrow("2024-01-32", mockNow)).toThrow();
        expect(() => isTomorrow("2024-13-16", mockNow)).toThrow();
    });
});
