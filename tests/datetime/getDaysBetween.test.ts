/* eslint-disable ts/ban-ts-comment */
import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { getDaysBetween } from "inferred-types/runtime";
import {
  Extends,
  IsIsoDateTime,
  IsIsoDate,
  IsLuxonDateTime,
  Iso8601Date,
  Iso8601DateTime,
  Test
} from "inferred-types/types";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("getDaysBetween()", () => {
  const mockDate = new Date(2024, 0, 15); // January 15, 2024

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly calculate days between Date objects", () => {
    const date1 = new Date(2024, 0, 1);
    const date2 = new Date(2024, 0, 15);

    expect(getDaysBetween(date1, date2)).toBe(14);
    expect(getDaysBetween(date2, date1)).toBe(14); // Order shouldn't matter

    if (getDaysBetween(date1, date2)) {
      type D = typeof getDaysBetween;
      // @ts-ignore
      type _cases = [
        Expect<Test<ReturnType<D>, "equals",  number>>
      ];
    }
  });

  it("should correctly calculate days between Moment.js objects", () => {
    const m1 = moment("2024-01-01");
    const m2 = moment("2024-01-15");

    expect(getDaysBetween(m1, m2)).toBe(14);
    expect(getDaysBetween(m2, m1)).toBe(14);
  });

  it("should correctly calculate days between Luxon DateTime objects", () => {
    const date1 = DateTime.fromISO("2024-01-01");
    const date2 = DateTime.fromISO("2024-01-15");
    type Luxon = IsLuxonDateTime<typeof date1>;

    expect(getDaysBetween(date1, date2)).toBe(14);

    if (getDaysBetween(date1, date2)) {
      type ThisDate = typeof date1;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Luxon>,
        Expect<Extends<DateTime<true>, ThisDate>>
      ];
    }
  });

  it("should correctly calculate days between ISO 8601 datetime strings", () => {
    const date1 = "2024-01-01T00:00:00Z";
    const date2 = "2024-01-15T23:59:59Z";
    type Iso = IsIsoDateTime<typeof date1>;

    expect(getDaysBetween(date1, date2)).toBe(14);

    if (getDaysBetween(date1, date2)) {
      type ThisDate = typeof date1;

      type _cases = [
        ExpectTrue<Iso>,
        Expect<Test<ThisDate, "extends", Iso8601DateTime>>
      ];
    }
  });

  it("should correctly calculate days between ISO 8601 date strings", () => {
    const date1 = "2024-01-01";
    const date2 = "2024-01-15";
    type Iso = IsIsoDate<typeof date1>;

    expect(getDaysBetween(date1, date2)).toBe(14);

    if (getDaysBetween(date1, date2)) {
      type ThisDate = typeof date1;

      type _cases = [
        ExpectTrue<Iso>,
        Expect<Test<ThisDate, "extends", Iso8601Date>>
      ];
    }
  });

  it("should handle default parameter (current date)", () => {
    const date = new Date(2024, 0, 1); // January 1, 2024
    expect(getDaysBetween(date)).toBe(14); // Should be 14 days to mock date (Jan 15)
  });

  it("should handle leap years correctly", () => {
    // February in leap year
    expect(getDaysBetween("2024-02-01", "2024-03-01")).toBe(29);
    // February in non-leap year
    expect(getDaysBetween("2023-02-01", "2023-03-01")).toBe(28);
    // Across leap day
    expect(getDaysBetween("2024-02-28", "2024-03-01")).toBe(2);
  });

  it("should handle edge cases", () => {
    // Same day
    expect(getDaysBetween("2024-01-01", "2024-01-01")).toBe(0);

    // One day difference
    expect(getDaysBetween("2024-01-01", "2024-01-02")).toBe(1);

    // Across year boundary
    expect(getDaysBetween("2023-12-31", "2024-01-01")).toBe(1);

    // Long period
    expect(getDaysBetween("2020-01-01", "2024-01-01")).toBe(1461); // Includes leap year

    // Different times on same day should still be 0
    expect(getDaysBetween(
      "2024-01-01T00:00:00Z",
      "2024-01-01T23:59:59Z"
    )).toBe(0);
  });

  it("should handle timezone differences correctly", () => {
      // UTC times
      expect(getDaysBetween(
        "2024-01-01T23:00:00Z",
        "2024-01-02T01:00:00Z"
      )).toBe(1);


      // Mixed UTC and offset times
      expect(getDaysBetween(
        "2024-01-01T12:00:00Z",
        "2024-01-01T23:00:00+11:00"
      )).toBe(0);

      // Across UTC day boundary but same day in local timezone
      expect(getDaysBetween(
        "2024-01-01T23:00:00+11:00",
        "2024-01-02T01:00:00-11:00"
      )).toBe(1);
  });

})
