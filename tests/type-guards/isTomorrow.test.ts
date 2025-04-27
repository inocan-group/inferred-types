/* eslint-disable ts/ban-ts-comment */
import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { isTomorrow } from "inferred-types/runtime";
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

describe("isTomorrow()", () => {
  const mockDate = new Date(2024, 0, 15); // January 15, 2024

  beforeEach(() => {
    // Mock the current date to ensure consistent tests
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly validate Date objects", () => {
    const tomorrow = new Date(2024, 0, 16);
    const today = new Date(2024, 0, 15);
    const dayAfterTomorrow = new Date(2024, 0, 17);

    expect(isTomorrow(tomorrow)).toBe(true);
    expect(isTomorrow(today)).toBe(false);
    expect(isTomorrow(dayAfterTomorrow)).toBe(false);

    if (isTomorrow(tomorrow)) {
      type D = typeof tomorrow;

      // @ts-ignore
      type _cases = [
        Expect<Test<D, "equals",  Date>>
      ];
    }
  });

  it("should correctly validate Moment.js objects", () => {
    const tomorrow = moment("2024-01-16");
    const today = moment("2024-01-15");
    const dayAfterTomorrow = moment("2024-01-17");

    expect(isTomorrow(tomorrow)).toBe(true);
    expect(isTomorrow(today)).toBe(false);
    expect(isTomorrow(dayAfterTomorrow)).toBe(false);

  });

  it("should correctly validate Luxon DateTime objects", () => {
    const tomorrow = DateTime.fromISO("2024-01-16") as unknown as LuxonJs["DateTime"];
    const today = DateTime.fromISO("2024-01-15");
    const dayAfterTomorrow = DateTime.fromISO("2024-01-17");
    type Luxon = IsLuxonDateTime<typeof tomorrow>;

    expect(isTomorrow(tomorrow)).toBe(true);
    expect(isTomorrow(today)).toBe(false);
    expect(isTomorrow(dayAfterTomorrow)).toBe(false);

    if (isTomorrow(tomorrow)) {
      type NextDay = typeof tomorrow;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Luxon>,
        Expect<Extends<LuxonJs["DateTime"], NextDay>>
      ];
    }
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const tomorrow = "2024-01-16T14:30:00Z";
    const today = "2024-01-15T14:30:00Z";
    const dayAfterTomorrow = "2024-01-17T14:30:00Z";
    type Iso = IsIso8601DateTime<typeof tomorrow>;

    expect(isTomorrow(tomorrow)).toBe(true);
    expect(isTomorrow(today)).toBe(false);
    expect(isTomorrow(dayAfterTomorrow)).toBe(false);

    if (isTomorrow(tomorrow)) {
      type NextDay = typeof tomorrow;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<NextDay, Iso8601DateTime>>
      ];
    }
  });

  it("should correctly validate ISO 8601 date strings", () => {
    const tomorrow = "2024-01-16";
    const wide = tomorrow as string;
    const today = "2024-01-15";
    const dayAfterTomorrow = "2024-01-17";
    type Iso = IsIsoDate<typeof tomorrow>;
    type IsoWide = IsIsoDate<typeof wide>;

    expect(isTomorrow(tomorrow)).toBe(true);
    expect(isTomorrow(today)).toBe(false);
    expect(isTomorrow(dayAfterTomorrow)).toBe(false);

    if (isTomorrow(tomorrow)) {
      type NextDay = typeof tomorrow;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<NextDay, Iso8601Date>>
      ];
    }
    if (isTomorrow(wide)) {
      type WideDay = typeof wide;
      // @ts-ignore
      type _cases = [
        Expect<Test<IsoWide, "equals",  boolean>>,
        Expect<Extends<WideDay, string>>
      ];
    }
  });

  it("should handle invalid inputs", () => {
    expect(isTomorrow(null)).toBe(false);
    expect(isTomorrow(undefined)).toBe(false);
    expect(isTomorrow("not a date")).toBe(false);
    expect(isTomorrow("2024")).toBe(false);
    expect(isTomorrow(123)).toBe(false);
    expect(isTomorrow({})).toBe(false);
    expect(isTomorrow([])).toBe(false);
  });

  it("should handle edge cases", () => {
    // Different times on tomorrow should still return true
    expect(isTomorrow("2024-01-16T00:00:00Z")).toBe(true);
    expect(isTomorrow("2024-01-16T23:59:59Z")).toBe(true);

    // Month boundary
    const lastDayOfMonth = new Date(2024, 0, 31);
    vi.setSystemTime(lastDayOfMonth);
    expect(isTomorrow("2024-02-01")).toBe(true);

    // Year boundary
    const lastDayOfYear = new Date(2024, 11, 31);
    vi.setSystemTime(lastDayOfYear);
    expect(isTomorrow("2025-01-01")).toBe(true);

    // Malformed ISO strings
    expect(isTomorrow("2024-01")).toBe(false);
    expect(isTomorrow("2024-01-")).toBe(false);
    expect(isTomorrow("2024-01-32")).toBe(false);
    expect(isTomorrow("2024-13-16")).toBe(false);
  });
});
