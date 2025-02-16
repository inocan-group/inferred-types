/* eslint-disable ts/ban-ts-comment */
import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { isYesterday } from "inferred-types";
import {
  Extends,
  IsIso8601DateTime,
  IsIsoDate,
  IsLuxonDateTime,
  Iso8601Date,
  Iso8601DateTime,
  LuxonJs,
  MomentJs
} from "inferred-types/types";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("isYesterday()", () => {
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
    const yesterday = new Date(2024, 0, 14);
    const today = new Date(2024, 0, 15);
    const dayBeforeYesterday = new Date(2024, 0, 13);

    expect(isYesterday(yesterday)).toBe(true);
    expect(isYesterday(today)).toBe(false);
    expect(isYesterday(dayBeforeYesterday)).toBe(false);

    if (isYesterday(yesterday)) {
      type D = typeof yesterday;

      // @ts-ignore
      type _cases = [
        Expect<Equal<D, Date>>
      ];
    }
  });

  it("should correctly validate Moment.js objects", () => {
    const yesterday = moment("2024-01-14");
    const today = moment("2024-01-15");
    const dayBeforeYesterday = moment("2024-01-13");

    expect(isYesterday(yesterday)).toBe(true);
    expect(isYesterday(today)).toBe(false);
    expect(isYesterday(dayBeforeYesterday)).toBe(false);

    if (isYesterday(yesterday)) {
      type D = typeof yesterday;


      type cases = [
        Expect<Extends<D, moment.Moment>>
      ];
    }
  });

  it("should correctly validate Luxon DateTime objects", () => {
    const yesterday = DateTime.fromISO("2024-01-14") as unknown as LuxonJs["DateTime"];
    const today = DateTime.fromISO("2024-01-15");
    const dayBeforeYesterday = DateTime.fromISO("2024-01-13");
    type Luxon = IsLuxonDateTime<typeof yesterday>;

    expect(isYesterday(yesterday)).toBe(true);
    expect(isYesterday(today)).toBe(false);
    expect(isYesterday(dayBeforeYesterday)).toBe(false);

    if (isYesterday(yesterday)) {
      type PrevDay = typeof yesterday;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Luxon>,
        Expect<Extends<LuxonJs["DateTime"], PrevDay>>
      ];
    }
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const yesterday = "2024-01-14T14:30:00Z";
    const today = "2024-01-15T14:30:00Z";
    const dayBeforeYesterday = "2024-01-13T14:30:00Z";
    type Iso = IsIso8601DateTime<typeof yesterday>;

    expect(isYesterday(yesterday)).toBe(true);
    expect(isYesterday(today)).toBe(false);
    expect(isYesterday(dayBeforeYesterday)).toBe(false);

    if (isYesterday(yesterday)) {
      type PrevDay = typeof yesterday;

      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<PrevDay, Iso8601DateTime>>
      ];
    }
  });

  it("should correctly validate ISO 8601 date strings", () => {
    const yesterday = "2024-01-14";
    const wide = yesterday as string;
    const today = "2024-01-15";
    const dayBeforeYesterday = "2024-01-13";
    type Iso = IsIsoDate<typeof yesterday>;
    type IsoWide = IsIsoDate<typeof wide>;

    expect(isYesterday(yesterday)).toBe(true);
    expect(isYesterday(today)).toBe(false);
    expect(isYesterday(dayBeforeYesterday)).toBe(false);

    if (isYesterday(yesterday)) {
      type PrevDay = typeof yesterday;

      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<PrevDay, Iso8601Date>>
      ];
    }
    if (isYesterday(wide)) {
      type WideDay = typeof wide;

      type _cases = [
        Expect<Equal<IsoWide, boolean>>,
        Expect<Extends<WideDay, string>>
      ];
    }
  });

  it("should handle invalid inputs", () => {
    expect(isYesterday(null)).toBe(false);
    expect(isYesterday(undefined)).toBe(false);
    expect(isYesterday("not a date")).toBe(false);
    expect(isYesterday("2024")).toBe(false);
    expect(isYesterday(123)).toBe(false);
    expect(isYesterday({})).toBe(false);
    expect(isYesterday([])).toBe(false);
  });

  it("should handle edge cases", () => {
    // Different times on yesterday should still return true
    expect(isYesterday("2024-01-14T00:00:00Z")).toBe(true);
    expect(isYesterday("2024-01-14T23:59:59Z")).toBe(true);

    // Month boundary
    const firstDayOfMonth = new Date(2024, 1, 1); // February 1, 2024
    vi.setSystemTime(firstDayOfMonth);
    expect(isYesterday("2024-01-31")).toBe(true);

    // Year boundary
    const firstDayOfYear = new Date(2024, 0, 1); // January 1, 2024
    vi.setSystemTime(firstDayOfYear);
    expect(isYesterday("2023-12-31")).toBe(true);

    // Malformed ISO strings
    expect(isYesterday("2024-01")).toBe(false);
    expect(isYesterday("2024-01-")).toBe(false);
    expect(isYesterday("2024-01-32")).toBe(false);
    expect(isYesterday("2024-13-14")).toBe(false);
  });
});
