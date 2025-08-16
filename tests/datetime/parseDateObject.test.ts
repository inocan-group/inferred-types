import { describe, it, expect } from "vitest";
import { parseDateObject, keysOf, asDateTime } from 'inferred-types/runtime';
import { isError } from "inferred-types/runtime";
import moment from "moment";
import { DateTime } from "luxon";
import { parseISO } from "date-fns";

describe("parseDateObject()", () => {


    it("parses JS Date instance (UTC)", () => {
        const date = new Date("2024-01-15T12:34:56.789Z");
        const result = parseDateObject(date);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });

    it("parses JS Date instance (non-UTC, bare)", () => {
        const date = new Date("2024-01-15T12:34:56.789+01:00");

        const result = parseDateObject(date);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "11", // UTC time: 12:34 +01:00 = 11:34 UTC
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z" // JS Date converts to UTC
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });

    it("parses JS Date instance (non-UTC, via asDateTime())", () => {
        const date = asDateTime("2024-01-15T12:34:56.789+01:00");

        const result = parseDateObject(date);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "11", // Still converts to UTC time
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "+01:00" // asDateTime preserves source timezone
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });

    it("parses ISO date string (UTC)", () => {
        const isoString = "2024-01-15T12:34:56.789Z";
        const result = parseDateObject(isoString as any);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });

    it("parses Moment.js date object in UTC", () => {
        const m = moment("2024-01-15T12:34:56.789Z");

        const result = parseDateObject(m);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });

    it("parses Luxon DateTime object in UTC", () => {
        const l = DateTime.fromISO("2024-01-15T12:34:56.789Z");
        const result = parseDateObject(l);
        
        // Luxon converts UTC to local timezone, so we need to check what that is
        // In UTC environments (like CI/CD), it stays as "Z"
        // In local environments, it becomes the local offset (e.g., "-08:00" for PST)
        const expectedTimezone = l.zone.name === 'UTC' ? 'Z' : l.toFormat('ZZ');
        
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: expectedTimezone
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });

    it("parses DateFns date object in UTC", () => {
        const d = parseISO("2024-01-15T12:34:56.789Z");
        const result = parseDateObject(d);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });

    it("parses Temporal.PlainDateTime object", () => {
        const Temporal = (globalThis as any).Temporal;
        if (Temporal && Temporal.PlainDateTime) {
            const t = Temporal.PlainDateTime.from("2024-01-15T12:34:56.789");
            const result = parseDateObject(t);
            const expected = {
                dateType: "datetime",
                hasTime: true,
                year: "2024",
                month: "01",
                date: "15",
                hour: "12",
                minute: "34",
                second: "56",
                ms: "789",
                timezone: null
            };
            if (isError(result)) throw result;
            expect(result).toEqual(expected);
        }
    });

    it("throws on invalid input", () => {
        expect(() => parseDateObject("not-a-date" as any)).toThrow();
        expect(() => parseDateObject({} as any)).toThrow();
    });

    it("parses non-UTC Moment.js date object", () => {
        const m = moment("2024-01-15T12:34:56.789-05:00");
        const iso = m.toISOString();
        const abc = m.toDate().toISOString();

        const result = parseDateObject(m);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "17", // UTC time: 12:34 -05:00 = 17:34 UTC
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "-05:00" // Moment preserves original timezone
        };

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });
    it("parses non-UTC DateFns date object", () => {
        const d = parseISO("2024-01-15T12:34:56.789Z");
        const result = parseDateObject(d);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }
    });
});
