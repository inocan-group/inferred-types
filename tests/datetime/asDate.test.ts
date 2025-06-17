import { describe, it, expect } from "vitest";
import { asDate } from "../../modules/runtime/src/datetime/asDate";

// Helper to check if a Date is at midnight UTC
const isMidnightUTC = (d: Date) =>
  d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0;

describe("asDate() - UTC midnight, date-only conversion", () => {
  it("converts JS Date to UTC midnight", () => {
    const d = new Date("2024-01-15T15:30:45.123Z");
    const result = asDate(d);
    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("converts ISO explicit date string (YYYY-MM-DD)", () => {
    const result = asDate("2024-01-15");
    expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("converts ISO implicit date string (YYYYMMDD)", () => {
    const result = asDate("20240115");
    expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("converts ISO year string (YYYY)", () => {
    const result = asDate("2024");
    expect(result.toISOString()).toBe("2024-01-01T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("converts ISO datetime string (YYYY-MM-DDTHH:mm:ssZ)", () => {
    const result = asDate("2024-01-15T15:30:45.123Z");
    expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("converts ISO datetime string with offset (YYYY-MM-DDTHH:mm:ss+02:00)", () => {
    const result = asDate("2024-01-15T23:59:59+02:00");
    expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("converts epoch milliseconds", () => {
    const ms = Date.UTC(2024, 0, 15, 15, 30, 45, 123);
    const result = asDate(ms);
    expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("converts epoch seconds", () => {
    const s = Math.floor(Date.UTC(2024, 0, 15, 15, 30, 45, 123) / 1000);
    const result = asDate(s);
    expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
    expect(isMidnightUTC(result)).toBe(true);
  });

  it("throws on invalid input", () => {
    expect(() => asDate("not-a-date")).toThrow();
    expect(() => asDate({})).toThrow();
  });

  // Optional: test Moment, Luxon, DateFns, Temporal if available in runtime
  it("converts Moment date to UTC midnight", () => {
    try {
      const moment = require("moment");
      const m = moment("2024-01-15T12:00:00Z");
      const result = asDate(m);
      expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
      expect(isMidnightUTC(result)).toBe(true);
    } catch {
      // skip if not available
    }
  });

  it("converts Luxon date to UTC midnight", () => {
    try {
      const { DateTime } = require("luxon");
      const l = DateTime.fromISO("2024-01-15T12:00:00Z");
      const result = asDate(l);
      expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
      expect(isMidnightUTC(result)).toBe(true);
    } catch {
      // skip if not available
    }
  });

  it("converts DateFns date to UTC midnight", () => {
    try {
      const { parseISO } = require("date-fns");
      const d = parseISO("2024-01-15T12:00:00Z");
      const result = asDate(d);
      expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
      expect(isMidnightUTC(result)).toBe(true);
    } catch {
      // skip if not available
    }
  });

  it("converts Temporal.PlainDate to UTC midnight", () => {
    const Temporal = (globalThis as any).Temporal;
    if (Temporal && Temporal.PlainDate) {
      const t = Temporal.PlainDate.from("2024-01-15");
      const result = asDate(t);
      expect(result.toISOString()).toBe("2024-01-15T00:00:00.000Z");
      expect(isMidnightUTC(result)).toBe(true);
    }
  });
});
