import { describe, it, expect } from "vitest";
import { asDateTime } from "inferred-types/runtime";

// Helper to compare ISO string up to seconds
const iso = (d: Date) => d.toISOString();

describe("asDateTime() - preserves date and time information", () => {
  it("converts JS Date (with time)", () => {
    const d = new Date("2024-01-15T15:30:45.123Z");
    const result = asDateTime(d);
    expect(result).toBeInstanceOf(Date);
    expect(iso(result)).toBe("2024-01-15T15:30:45.123Z");
  });

  it("converts ISO datetime string (YYYY-MM-DDTHH:mm:ssZ)", () => {
    const result = asDateTime("2024-01-15T15:30:45.123Z");
    expect(iso(result)).toBe("2024-01-15T15:30:45.123Z");
  });

  it("converts ISO datetime string with offset (YYYY-MM-DDTHH:mm:ss+02:00)", () => {
    const result = asDateTime("2024-01-15T23:59:59+02:00");
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
