/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { getWeekNumber } from "inferred-types/runtime";
import {
  Extends,
  IsIso8601DateTime,
  IsIsoDate,
  IsLuxonDateTime,
  Iso8601Date,
  Iso8601DateTime,
  LuxonJs
} from "inferred-types/types";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("getWeekNumber()", () => {
  const mockDate = new Date(2024, 0, 15); // January 15, 2024

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly calculate week numbers for Date objects", () => {
    // Test with Monday as start of week (default)
    expect(getWeekNumber(new Date(2024, 0, 1))).toBe(1);  // Jan 1
    expect(getWeekNumber(new Date(2024, 0, 15))).toBe(3); // Jan 15
    expect(getWeekNumber(new Date(2024, 11, 31))).toBe(53); // Dec 31

    // Test with Sunday as start of week
    expect(getWeekNumber(new Date(2024, 0, 1), "Sun")).toBe(1);
    expect(getWeekNumber(new Date(2024, 0, 15), "Sun")).toBe(3);

    if (getWeekNumber(new Date())) {
      type D = typeof getWeekNumber;
      // @ts-ignore
      type _cases = [
        Expect<Equal<ReturnType<D>, number>>
      ];
    }
  });

  it("should correctly calculate week numbers for Moment.js objects", () => {
    const m1 = moment("2024-01-01");
    expect(getWeekNumber(m1)).toBe(1);
    expect(getWeekNumber(moment("2024-01-15"))).toBe(3);
    expect(getWeekNumber(moment("2024-12-31"))).toBe(53);
  });

  it("should correctly calculate week numbers for Luxon DateTime objects", () => {
    const date = DateTime.fromISO("2024-01-15") as unknown as LuxonJs["DateTime"];
    type Luxon = IsLuxonDateTime<typeof date>;

    expect(getWeekNumber(date)).toBe(3);
    expect(getWeekNumber(DateTime.fromISO("2024-01-01"))).toBe(1);
    expect(getWeekNumber(DateTime.fromISO("2024-12-31"))).toBe(53);

    if (getWeekNumber(date)) {
      type ThisDate = typeof date;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Luxon>,
        Expect<Extends<LuxonJs["DateTime"], ThisDate>>
      ];
    }
  });

  it("should correctly calculate week numbers for ISO 8601 datetime strings", () => {
    const date = "2024-01-15T14:30:00Z";
    type Iso = IsIso8601DateTime<typeof date>;

    expect(getWeekNumber(date)).toBe(3);
    expect(getWeekNumber("2024-01-01T00:00:00Z")).toBe(1);
    expect(getWeekNumber("2024-12-31T23:59:59Z")).toBe(53);

    if (getWeekNumber(date)) {
      type ThisDate = typeof date;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<ThisDate, Iso8601DateTime>>
      ];
    }
  });

  it("should correctly calculate week numbers for ISO 8601 date strings", () => {
    const date = "2024-01-15";
    type Iso = IsIsoDate<typeof date>;

    expect(getWeekNumber(date)).toBe(3);
    expect(getWeekNumber("2024-01-01")).toBe(1);
    expect(getWeekNumber("2024-12-31")).toBe(53);

    if (getWeekNumber(date)) {
      type ThisDate = typeof date;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<ThisDate, Iso8601Date>>
      ];
    }
  });

  it("should handle default parameter (current date)", () => {
    expect(getWeekNumber()).toBe(3); // Week 3 for January 15, 2024
  });

  it("should handle different week start days", () => {
    const testDate = new Date(2024, 0, 7); // January 7, 2024
    expect(getWeekNumber(testDate, "Mon")).toBe(2);
    expect(getWeekNumber(testDate, "Sun")).toBe(2);
  });

  it("should handle edge cases", () => {
    // Last day of the year
    expect(getWeekNumber("2024-12-31")).toBe(53);

    // First day of the year
    expect(getWeekNumber("2024-01-01")).toBe(1);

    // Week spanning between years
    expect(getWeekNumber("2023-12-31")).toBe(52);
    expect(getWeekNumber("2024-01-01")).toBe(1);
  });

  it("should handle invalid inputs gracefully", () => {
    // @ts-expect-error - Invalid input type
    expect(getWeekNumber(null)).toBe(3); // Should use current date (week 3)
    expect(getWeekNumber(undefined)).toBe(3);
    expect(getWeekNumber("invalid date")).toBe(3);
  });
});
