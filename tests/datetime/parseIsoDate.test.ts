import { describe, it, expect } from "vitest";
import { parseIsoDate } from "inferred-types/runtime";

describe("parseIsoDate()", () => {
  it("parses ISO datetime with Z", () => {
    const result = parseIsoDate("2024-01-15T12:34:56.789Z");
    expect(result).toEqual({
      year: 2024,
      month: 1,
      date: 15,
      time: {
        hour: 12,
        minute: 34,
        second: 56,
        ms: 789,
        offset: "Z"
      }
    });
  });

  it("parses ISO datetime with offset", () => {
    const result = parseIsoDate("2024-01-15T23:59:59+02:00");
    expect(result).toEqual({
      year: 2024,
      month: 1,
      date: 15,
      time: {
        hour: 23,
        minute: 59,
        second: 59,
        ms: 0,
        offset: "+02:00"
      }
    });
  });

  it("parses ISO date (YYYY-MM-DD)", () => {
    const result = parseIsoDate("2024-01-15");
    expect(result).toEqual({
      year: 2024,
      month: 1,
      date: 15,
      time: null
    });
  });

  it("parses ISO date (YYYYMMDD)", () => {
    const result = parseIsoDate("20240115");
    expect(result).toEqual({
      year: 2024,
      month: 1,
      date: 15,
      time: null
    });
  });

  it("parses ISO year only (YYYY)", () => {
    const result = parseIsoDate("2024");
    expect(result).toEqual({
      year: 2024,
      month: null,
      date: null,
      time: null
    });
  });

  it("parses ISO year/month only (-YYYY-MM)", () => {
    const result = parseIsoDate("-2024-01");
    expect(result).toEqual({
      year: 2024,
      month: 1,
      date: null,
      time: null
    });
  });

  it("parses ISO year/month only (-YYYYMM)", () => {
    const result = parseIsoDate("-202401");
    expect(result).toEqual({
      year: 2024,
      month: 1,
      date: null,
      time: null
    });
  });

  it("parses ISO year-less month/day (--MM-DD)", () => {
    const result = parseIsoDate("--01-15");
    expect(result).toEqual({
      year: null,
      month: 1,
      date: 15,
      time: null
    });
  });

  it("parses ISO year-less month/day (--MMDD)", () => {
    const result = parseIsoDate("--0115");
    expect(result).toEqual({
      year: null,
      month: 1,
      date: 15,
      time: null
    });
  });

  it("throws on invalid input", () => {
    expect(() => parseIsoDate("not-a-date" as any)).toThrow();
    expect(() => parseIsoDate(1234 as any)).toThrow();
    expect(() => parseIsoDate("" as any)).toThrow();
  });
});
