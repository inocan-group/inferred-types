import { describe, it, expect } from "vitest";
import { parseDateObject } from "inferred-types/runtime";
import { isError } from "inferred-types/runtime";
import type { IsoMeta } from "inferred-types/runtime";
import moment from "moment";
import { DateTime } from "luxon";
import { parseISO } from "date-fns";

describe("parseDateObject()", () => {
  it("parses Date instance (UTC)", () => {
    const date = new Date("2024-01-15T12:34:56.789Z");
    const result = parseDateObject(date);
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
    if (isError(result)) throw result;
    expect(result).toEqual(expected);
  });

  it("parses ISO date string", () => {
    const isoString = "2024-01-15T12:34:56.789Z";
    const result = parseDateObject(isoString as any);
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
    if (isError(result)) throw result;
    expect(result).toEqual(expected);
  });

  it("parses Moment.js date object", () => {
    const m = moment("2024-01-15T12:34:56.789Z");
    const result = parseDateObject(m);
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
    if (isError(result)) throw result;
    expect(result).toEqual(expected);
  });

  it("parses Luxon DateTime object", () => {
    const l = DateTime.fromISO("2024-01-15T12:34:56.789-05:00");
    const result = parseDateObject(l);
    const expected: IsoMeta = {
      dateType: "full",
      year: "2024",
      month: "01",
      date: "15",
      hour: "09",
      minute: "34",
      second: "56",
      ms: "789",
      timezone: "-08:00"
    };
    if (isError(result)) throw result;
    expect(result).toEqual(expected);
  });

  it("parses DateFns date object", () => {
    const d = parseISO("2024-01-15T12:34:56.789Z");
    const result = parseDateObject(d);
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
    if (isError(result)) throw result;
    expect(result).toEqual(expected);
  });

  it("parses Temporal.PlainDateTime object", () => {
    const Temporal = (globalThis as any).Temporal;
    if (Temporal && Temporal.PlainDateTime) {
      const t = Temporal.PlainDateTime.from("2024-01-15T12:34:56.789");
      const result = parseDateObject(t);
      const expected: IsoMeta = {
        dateType: "datetime",
        hasTime: true,
        year: "2024",
        month: "01",
        date: "15",
        hour: "12",
        minute: "34",
        second: "56",
        ms: "789"
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
    const result = parseDateObject(m);
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
    if (isError(result)) throw result;
    expect(result).toEqual(expected);
  });
  it("parses non-UTC DateFns date object", () => {
    const d = parseISO("2024-01-15T12:34:56.789-05:00");
    const result = parseDateObject(d);
    const expected: IsoMeta = {
      dateType: "datetime",
      hasTime: true,
      year: "2024",
      month: "01",
      date: "15",
      hour: "17", // UTC hour
      minute: "34",
      second: "56",
      ms: "789",
      timezone: "Z"
    };
    if (isError(result)) throw result;
    expect(result).toEqual(expected);
  });
});
