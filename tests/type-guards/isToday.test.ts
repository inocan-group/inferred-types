/* eslint-disable ts/ban-ts-comment */
import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { isToday } from "inferred-types/runtime";
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

describe("isToday()", () => {
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
    const today = new Date(2024, 0, 15);
    const yesterday = new Date(2024, 0, 14);
    const tomorrow = new Date(2024, 0, 16);

    expect(isToday(today)).toBe(true);
    expect(isToday(yesterday)).toBe(false);
    expect(isToday(tomorrow)).toBe(false);

    if (isToday(today)) {
      type D = typeof today;

      // @ts-ignore
      type _cases = [
        Expect<Test<D, "equals",  Date>>
      ];
    }
  });

  it("should correctly validate Moment.js objects", () => {
    const today = moment("2024-01-15");
    const yesterday = moment("2024-01-14");
    const tomorrow = moment("2024-01-16");

    expect(isToday(today)).toBe(true);
    expect(isToday(yesterday)).toBe(false);
    expect(isToday(tomorrow)).toBe(false);

  });

  it("should correctly validate Luxon DateTime objects", () => {
    const today = DateTime.fromISO("2024-01-15") as unknown as LuxonJs["DateTime"];
    const yesterday = DateTime.fromISO("2024-01-14");
    const tomorrow = DateTime.fromISO("2024-01-16");
    type Luxon = IsLuxonDateTime<typeof today>;

    expect(isToday(today)).toBe(true);
    expect(isToday(yesterday)).toBe(false);
    expect(isToday(tomorrow)).toBe(false);

    if (isToday(today)) {
      type ThisDay = typeof today;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Luxon>,
        Expect<Extends<LuxonJs["DateTime"], ThisDay>>
      ];
    }
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const today = "2024-01-15T14:30:00Z";
    const yesterday = "2024-01-14T14:30:00Z";
    const tomorrow = "2024-01-16T14:30:00Z";
    type Iso = IsIso8601DateTime<typeof today>;

    expect(isToday(today)).toBe(true);
    expect(isToday(yesterday)).toBe(false);
    expect(isToday(tomorrow)).toBe(false);

    if (isToday(today)) {
      type ThisDay = typeof today;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<ThisDay, Iso8601DateTime>>
      ];
    }
  });

  it("should correctly validate ISO 8601 date strings", () => {
    const today = "2024-01-15";
    const yesterday = "2024-01-14";
    const tomorrow = "2024-01-16";
    type Iso = IsIsoDate<typeof today>;

    expect(isToday(today)).toBe(true);
    expect(isToday(yesterday)).toBe(false);
    expect(isToday(tomorrow)).toBe(false);

    if (isToday(today)) {
      type ThisDay = typeof today;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<ThisDay, Iso8601Date>>
      ];
    }

  });

  it("should handle invalid inputs", () => {
    expect(isToday(null)).toBe(false);
    expect(isToday(undefined)).toBe(false);
    expect(isToday("not a date")).toBe(false);
    expect(isToday("2024")).toBe(false);
    expect(isToday(123)).toBe(false);
    expect(isToday({})).toBe(false);
    expect(isToday([])).toBe(false);
  });

  it("should handle edge cases", () => {
    // Different times on the same day should still return true
    expect(isToday("2024-01-15T00:00:00Z")).toBe(true);
    expect(isToday("2024-01-15T23:59:59Z")).toBe(true);

    // Malformed ISO strings
    expect(isToday("2024-01")).toBe(false);
    expect(isToday("2024-01-")).toBe(false);
    expect(isToday("2024-01-32")).toBe(false);
    expect(isToday("2024-13-15")).toBe(false);
  });
});
