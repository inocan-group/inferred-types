import { isYesterday } from "inferred-types/runtime";
import {
    Expect,
    Test,
    Extends,
    IsIsoDateTime,
    IsIsoDate,
    IsLuxonDateTime,
    IsoDateTime,
    IsoDate
} from "inferred-types/types";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it } from "vitest";

describe("isYesterday()", () => {
    const mockNow = new Date(2024, 0, 15); // January 15, 2024

    it("should correctly validate Date objects", () => {
        const yesterday = new Date(2024, 0, 14);
        const today = new Date(2024, 0, 15);
        const dayBeforeYesterday = new Date(2024, 0, 13);

        expect(isYesterday(yesterday, mockNow)).toBe(true);
        expect(isYesterday(today, mockNow)).toBe(false);
        expect(isYesterday(dayBeforeYesterday, mockNow)).toBe(false);

        if (isYesterday(yesterday, mockNow)) {
            type D = typeof yesterday;

            type cases = [
                Expect<Test<D, "equals", Date>>
            ];
        }
    });

    it("should correctly validate Moment.js objects", () => {
        const yesterday = moment("2024-01-14");
        const today = moment("2024-01-15");
        const dayBeforeYesterday = moment("2024-01-13");

        expect(isYesterday(yesterday, mockNow)).toBe(true);
        expect(isYesterday(today, mockNow)).toBe(false);
        expect(isYesterday(dayBeforeYesterday, mockNow)).toBe(false);

        if (isYesterday(yesterday, mockNow)) {
            type D = typeof yesterday;


            type cases = [
                Expect<Extends<D, moment.Moment>>
            ];
        }
    });

    it("should correctly validate Luxon DateTime objects", () => {
        const yesterday = DateTime.fromISO("2024-01-14");
        const today = DateTime.fromISO("2024-01-15");
        const dayBeforeYesterday = DateTime.fromISO("2024-01-13");
        type Luxon = IsLuxonDateTime<typeof yesterday>;

        expect(isYesterday(yesterday, mockNow)).toBe(true);
        expect(isYesterday(today, mockNow)).toBe(false);
        expect(isYesterday(dayBeforeYesterday, mockNow)).toBe(false);

        if (isYesterday(yesterday, mockNow)) {
            type PrevDay = typeof yesterday;
            type cases = [
                Expect<Test<Luxon, "equals", boolean>>
            ];
        }
    });

    it("should correctly validate ISO  datetime strings", () => {
        const yesterday = "2024-01-14T14:30:00Z";
        const today = "2024-01-15T14:30:00Z";
        const dayBeforeYesterday = "2024-01-13T14:30:00Z";
        type Iso = IsIsoDateTime<typeof yesterday>;

        expect(isYesterday(yesterday, mockNow)).toBe(true);
        expect(isYesterday(today, mockNow)).toBe(false);
        expect(isYesterday(dayBeforeYesterday, mockNow)).toBe(false);

        if (isYesterday(yesterday, mockNow)) {
            type PrevDay = typeof yesterday;

            type _cases = [
                Expect<Test<Iso, "equals", true>>,
                Expect<Extends<PrevDay, IsoDateTime>>
            ];
        }
    });

    it("should correctly validate ISO  date strings", () => {
        const yesterday = "2024-01-14";
        const today = "2024-01-15";
        const dayBeforeYesterday = "2024-01-13";
        type Iso = IsIsoDate<typeof yesterday>;
        type IsoWide = IsIsoDate<string>;

        expect(isYesterday(yesterday, mockNow)).toBe(true);
        expect(isYesterday(today, mockNow)).toBe(false);
        expect(isYesterday(dayBeforeYesterday, mockNow)).toBe(false);

        if (isYesterday(yesterday, mockNow)) {
            type PrevDay = typeof yesterday;

            type _cases = [
                Expect<Test<Iso, "equals", true>>,
                Expect<Extends<PrevDay, IsoDate>>
            ];
        }

    });

    it("should handle invalid inputs", () => {
        // @ts-expect-error
        expect(() => isYesterday(null, mockNow)).toThrow();
        // @ts-expect-error
        expect(() => isYesterday(undefined, mockNow)).toThrow();
        // @ts-expect-error
        expect(() => isYesterday("not a date", mockNow)).toThrow();
        expect(isYesterday("2024", mockNow)).toBe(false); // Valid year, but Jan 1 != Jan 14
        expect(isYesterday(123, mockNow)).toBe(false); // Valid epoch, but different date
        expect(() => isYesterday({}, mockNow)).toThrow();
        expect(() => isYesterday([], mockNow)).toThrow();
    });

    it("should handle edge cases", () => {
        // Different times on yesterday should still return true
        expect(isYesterday("2024-01-14T00:00:00Z", mockNow)).toBe(true);
        expect(isYesterday("2024-01-14T23:59:59Z", mockNow)).toBe(true);

        // Month boundary
        const firstDayOfMonth = new Date(2024, 1, 1); // February 1, 2024
        expect(isYesterday("2024-01-31", firstDayOfMonth)).toBe(true);

        // Year boundary
        const firstDayOfYear = new Date(2024, 0, 1); // January 1, 2024
        expect(isYesterday("2023-12-31", firstDayOfYear)).toBe(true);

        // Malformed ISO strings
        expect(() => isYesterday("2024-01", mockNow)).toThrow();
        // @ts-expect-error
        expect(() => isYesterday("2024-01-", mockNow)).toThrow();
        expect(() => isYesterday("2024-01-32", mockNow)).toThrow();
        expect(() => isYesterday("2024-13-14", mockNow)).toThrow();
    });
});
