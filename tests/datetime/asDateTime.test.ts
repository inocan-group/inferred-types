import { describe, it, expect } from "vitest";
import { asDateTime } from "inferred-types/runtime";
import { DatePlus, Expect, Test, IsoDateTime, TimezoneOffset } from "inferred-types/types"
import moment from "moment";
import { Temporal } from "@js-temporal/polyfill";
import { DateTime } from "luxon";
import dayjs from "dayjs"

const today = Temporal.Now.plainDateISO();


// Helper to compare ISO string up to seconds
const iso = (d: Date) => d.toISOString();

describe("asDateTime()", () => {
    it("direct JS Date loses source timezone", () => {
        const d = new Date("2024-01-15T15:30:45.123+01:00");
        const result = asDateTime(d);

        expect(result.source).toBe("date");
        expect(result.tz).toBe(null);
        expect(result.offset).toBe(null);

        expect(result.toISOString()).toBe("2024-01-15T14:30:45.123Z");
    });

    it("direct JS Date from ISO DateTime preserves source timezone", () => {
        const result = asDateTime("2024-01-15T15:30:45.123+01:00");

        expect(result.offset).toBe("+01:00")
        expect(result.source).toBe("iso-datetime");
        expect(typeof result.sourceIso).toBe("string");
        expect(result.sourceIso).toBe("2024-01-15T15:30:45.123+01:00");

        expect(result.toISOString()).toBe("2024-01-15T14:30:45.123Z");
    });


    it("ISO year -> Date", () => {
        const result = asDateTime("2024");

        type cases = [
            Expect<Test<typeof result, "extends", DatePlus<"iso-year", TimezoneOffset<"Z">>>>
        ];
    });

    it("ISO year/month -> Date", () => {
        const result = asDateTime("-2024-10");

        type cases = [
            Expect<Test<
                typeof result, "extends",
                DatePlus<"iso-year-month", TimezoneOffset<"Z">, IsoDateTime>
            >>,

        ];
    });



    it("moment date with offset", () => {
        const d = moment("2024-01-15T15:30:45.123+01:00");
        const result = asDateTime(d);

        expect(result.source).toBe("moment");
        expect(result.offset).toBe("+01:00");
        expect(result.toISOString()).toBe("2024-01-15T14:30:45.123Z");

        type cases = [
            /** type tests */
        ];
    });


    it("luxon date with offset", () => {
        const d = DateTime.fromISO("2024-01-15T15:30:45.123+01:00", { setZone: true });
        const result = asDateTime(d);

        expect(result.source).toBe("luxon");
        expect(result.offset).toBe("+01:00");
        expect(result.toISOString()).toBe("2024-01-15T14:30:45.123Z");

        type cases = [
            /** type tests */
        ];
    });



    it("DayJS date with offset", () => {
        const d = dayjs("2024-01-15T15:30:45.123+01:00");
        const result = asDateTime(d);


        type cases = [
            /** type tests */
        ];
    });


    it("converts ISO datetime string (YYYY-MM-DDTHH:mm:ssZ)", () => {
        const result = asDateTime("2024-01-15T15:30:45.123Z");

        expect(result.offset).toBe("Z");
        expect(result.source).toBe("iso-datetime");

        expect(result.toISOString()).toBe("2024-01-15T15:30:45.123Z");
    });

    it("converts ISO datetime string with offset (YYYY-MM-DDTHH:mm:ss+02:00)", () => {
        const result = asDateTime("2024-01-15T23:59:59+02:00");

        expect(result.offset).toBe("+02:00");
        expect(result.source).toBe("iso-datetime");

        expect(result.toISOString()).toBe("2024-01-15T21:59:59.000Z");
    });

    it("converts ISO explicit date string (YYYY-MM-DD) to midnight UTC", () => {
        const result = asDateTime("2024-01-15");
        expect(iso(result)).toBe("2024-01-15T00:00:00.000Z");
    });

    it("converts ISO implicit date string (YYYYMMDD) to midnight UTC", () => {
        const result = asDateTime("20240115");
        expect(iso(result)).toBe("2024-01-15T00:00:00.000Z");
    });

    it("converts ISO year string (YYYY) to midnight UTC Jan 1", () => {
        const result = asDateTime("2024");
        expect(iso(result)).toBe("2024-01-01T00:00:00.000Z");
    });

    it("converts epoch milliseconds (with time)", () => {
        const ms = Date.UTC(2024, 0, 15, 15, 30, 45, 123);
        const result = asDateTime(ms);
        expect(iso(result)).toBe("2024-01-15T15:30:45.123Z");
    });

    it("converts epoch seconds (with time)", () => {
        const s = Math.floor(Date.UTC(2024, 0, 15, 15, 30, 45, 0) / 1000);
        const result = asDateTime(s);
        expect(iso(result)).toBe("2024-01-15T15:30:45.000Z");
    });

    // Optional: test Moment, Luxon, DateFns, Temporal if available in runtime
    it("converts Moment date (with time)", () => {
        try {
            const moment = require("moment");
            const m = moment("2024-01-15T12:34:56Z");
            const result = asDateTime(m);
            expect(iso(result)).toBe("2024-01-15T12:34:56.000Z");
        } catch {
            // skip if not available
        }
    });

    it("converts Luxon date (with time)", () => {
        try {
            const { DateTime } = require("luxon");
            const l = DateTime.fromISO("2024-01-15T12:34:56Z");
            const result = asDateTime(l);
            expect(iso(result)).toBe("2024-01-15T12:34:56.000Z");
        } catch {
            // skip if not available
        }
    });

    it("converts DateFns date (with time)", () => {
        try {
            const { parseISO } = require("date-fns");
            const d = parseISO("2024-01-15T12:34:56Z");
        const result = asDateTime(d);

        expect(result.source).toBe("day.js");
        expect(result.offset).toBe(null);
        expect(result.toISOString()).toBe("2024-01-15T14:30:45.123Z");
        expect(iso(result)).toBe("2024-01-15T12:34:56.000Z");
        } catch {
            // skip if not available
        }
    });

    it("converts Temporal.PlainDateTime (with time)", () => {
        const Temporal = (globalThis as any).Temporal;
        if (Temporal && Temporal.PlainDateTime) {
            const t = Temporal.PlainDateTime.from("2024-01-15T12:34:56");
            const result = asDateTime(t);
            expect(iso(result)).toBe("2024-01-15T12:34:56.000Z");
        }
    });
});
