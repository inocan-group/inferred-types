import { describe, it, expect } from "vitest";
import { parseDate } from "inferred-types/runtime";
import type { IsoMeta } from "inferred-types/runtime";
import moment from "moment";
import { DateTime } from "luxon";
import { parseISO } from "date-fns";


describe("parseDate()", () => {
  it("parses ISO string", () => {
    const result = parseDate("2024-01-15T12:34:56.789Z");
    const expected: IsoMeta = {
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
    expect(result).toEqual(expected);
  });

  it("parses Date object", () => {
    const date = new Date("2024-01-15T12:34:56.789Z");
    const result = parseDate(date);
    const expected: IsoMeta = {
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
    expect(result).toEqual(expected);
  });

  it("parses epoch ms", () => {
    const date = new Date("2024-01-15T12:34:56.789Z");
    const ms = date.getTime();
    const result = parseDate(ms);
    const expected: IsoMeta = {
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
    expect(result).toEqual(expected);
  });

  it("parses epoch seconds", () => {
    const date = new Date("2024-01-15T12:34:56.000Z");
    const seconds = Math.floor(date.getTime() / 1000);
    const result = parseDate(seconds);
    const expected: IsoMeta = {
      dateType: "datetime",
      hasTime: true,
      year: "2024",
      month: "01",
      date: "15",
      hour: "12",
      minute: "34",
      second: "56",
      ms: "000",
      timezone: "Z"
    };
    expect(result).toEqual(expected);
  });

  it("parses Moment.js object", () => {
    const m = moment("2024-01-15T12:34:56.789Z");
    const result = parseDate(m);
    const expected: IsoMeta = {
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
    expect(result).toEqual(expected);
  });

  it("parses Luxon DateTime object", () => {
    const l = DateTime.fromISO("2024-01-15T12:34:56.789-05:00");
    const result = parseDate(l);
    const expected: IsoMeta = {
      dateType: "full",
      year: "2024",
      month: "01",
      date: "15",
      hour: "12",
      minute: "34",
      second: "56",
      ms: "789",
      timezone: "-05:00"
    };
    expect(result).toEqual(expected);
  });

  it("parses DateFns date object", () => {
    const d = parseISO("2024-01-15T12:34:56.789Z");
    const result = parseDate(d);
    const expected: IsoMeta = {
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
    expect(result).toEqual(expected);
  });

  it("invalid input", () => {
    expect(parseDate("not-a-date" as any) instanceof Error).toBe(true);
    expect(parseDate({} as any) instanceof Error).toBe(true);
    expect(parseDate(NaN as any) instanceof Error).toBe(true);
  });
});
