import { describe, it, expect } from "vitest";
import { parseNumericDate } from "inferred-types/runtime";
import type { DateMeta } from "inferred-types/runtime";

describe("parseNumericDate()", () => {
  it("parses epoch milliseconds", () => {
    const date = new Date("2024-01-15T12:34:56.789Z");
    const ms = date.getTime();
    const result = parseNumericDate(ms);
    const expected: DateMeta = {
      dateType: "datetime",
      hasTime: true,
      year: "2024",
      month: "01",
      date: "15",
      hour: "12",
      minute: "34",
      second: "56",
      ms: "789",
      timezone: "Z",
    };
    expect(result).toEqual(expected);
  });

  it("parses epoch seconds", () => {
    const date = new Date("2024-01-15T12:34:56.000Z");
    const seconds = Math.floor(date.getTime() / 1000);
    const result = parseNumericDate(seconds);
    const expected: DateMeta = {
      dateType: "datetime",
      hasTime: true,
      year: "2024",
      month: "01",
      date: "15",
      hour: "12",
      minute: "34",
      second: "56",
      ms: "000",
      timezone: "Z",
    };
    expect(result).toEqual(expected);
  });

  it("parses current time (ms)", () => {
    const now = Date.now();
    const date = new Date(now);
    const result = parseNumericDate(now);
    const expected = {
      dateType: "datetime",
      hasTime: true,
      year: date.toISOString().slice(0, 4),
      month: date.toISOString().slice(5, 7),
      date: date.toISOString().slice(8, 10),
      hour: date.toISOString().slice(11, 13),
      minute: date.toISOString().slice(14, 16),
      second: date.toISOString().slice(17, 19),
      ms: date.toISOString().slice(20, 23),
      timezone: "Z",
    } as DateMeta;
    expect(result).toEqual(expected);
  });

  it("parses current time (s)", () => {
    const now = Math.floor(Date.now() / 1000);
    const date = new Date(now * 1000);
    const result = parseNumericDate(now);
    const expected = {
      dateType: "datetime",
      hasTime: true,
      year: date.toISOString().slice(0, 4),
      month: date.toISOString().slice(5, 7),
      date: date.toISOString().slice(8, 10),
      hour: date.toISOString().slice(11, 13),
      minute: date.toISOString().slice(14, 16),
      second: date.toISOString().slice(17, 19),
      ms: date.toISOString().slice(20, 23),
      timezone: "Z",
    } as DateMeta;
    expect(result).toEqual(expected);
  });

  it("throws on invalid input (NaN)", () => {
    expect(() => parseNumericDate(NaN as any)).toThrow();
  });
});
