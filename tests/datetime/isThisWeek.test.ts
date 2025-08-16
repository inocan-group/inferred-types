import { describe, expect, it } from "vitest";
import {
    getWeekNumber,
    isThisWeek
} from "inferred-types/runtime";

import { DateTime } from "luxon";
import moment from "moment";

describe("isThisWeek()", () => {
  const mockNow = new Date(2024, 0, 10); // Wednesday, January 10, 2024 (week 2)

  it("should correctly validate Date objects with Monday start", () => {
    const sameWeek = new Date(2024, 0, 12); // Friday, same week as mockNow (week 2)
    const previousWeek = new Date(2024, 0, 3); // Wednesday, week 1
    const nextWeek = new Date(2024, 0, 17); // Wednesday, week 3

    expect(isThisWeek(sameWeek, mockNow)).toBe(true);
    expect(isThisWeek(previousWeek, mockNow)).toBe(false);
    expect(isThisWeek(nextWeek, mockNow)).toBe(false);
  });

  it("should correctly validate Moment.js objects", () => {
    const sameWeek = moment("2024-01-12"); // Friday, same week as mockNow
    const previousWeek = moment("2024-01-03"); // Wednesday, week 1
    const nextWeek = moment("2024-01-17"); // Wednesday, week 3

    expect(isThisWeek(sameWeek, mockNow)).toBe(true);
    expect(isThisWeek(previousWeek, mockNow)).toBe(false);
    expect(isThisWeek(nextWeek, mockNow)).toBe(false);
  });

  it("should correctly validate Luxon DateTime objects", () => {
    const sameWeek = DateTime.fromISO("2024-01-12");
    const previousWeek = DateTime.fromISO("2024-01-03");
    const nextWeek = DateTime.fromISO("2024-01-17");

    expect(isThisWeek(sameWeek, mockNow)).toBe(true);
    expect(isThisWeek(previousWeek, mockNow)).toBe(false);
    expect(isThisWeek(nextWeek, mockNow)).toBe(false);
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const sameWeek = "2024-01-12T14:30:00Z";
    const previousWeek = "2024-01-03T14:30:00Z";
    const nextWeek = "2024-01-17T14:30:00Z";

    expect(isThisWeek(sameWeek, mockNow)).toBe(true);
    expect(isThisWeek(previousWeek, mockNow)).toBe(false);
    expect(isThisWeek(nextWeek, mockNow)).toBe(false);

  });

  it("should correctly validate ISO 8601 date strings", () => {
    const sameWeek = "2024-01-12";
    const previousWeek = "2024-01-03";
    const nextWeek = "2024-01-17";

    expect(isThisWeek(sameWeek, mockNow)).toBe(true);
    expect(isThisWeek(previousWeek, mockNow)).toBe(false);
    expect(
      isThisWeek(nextWeek, mockNow),
      `Week ${getWeekNumber(nextWeek)} should NOT be in week ${getWeekNumber(mockNow)} `
    ).toBe(false);

  });

  it("should handle invalid inputs", () => {
    expect(() => isThisWeek(null as any, mockNow)).toThrow();
    expect(() => isThisWeek(undefined as any, mockNow)).toThrow();
    expect(() => isThisWeek("not a date", mockNow)).toThrow();
    // "2024" is actually valid (year input) so it returns false instead of throwing
    expect(isThisWeek("2024", mockNow)).toBe(false);
    // 123 is also valid (epoch seconds) so it returns false instead of throwing
    expect(isThisWeek(123, mockNow)).toBe(false);
    expect(() => isThisWeek({}, mockNow)).toThrow();
    expect(() => isThisWeek([], mockNow)).toThrow();
  });

  it("should handle edge cases", () => {
    // Different times on the same day should still return true
    expect(isThisWeek("2024-01-12T00:00:00Z", mockNow)).toBe(true);
    expect(isThisWeek("2024-01-12T23:59:59Z", mockNow)).toBe(true);

    // Week boundaries - using dates we know are in week 2
    expect(isThisWeek("2024-01-11", mockNow)).toBe(true); // Thursday, week 2
    expect(
      isThisWeek("2024-01-14", mockNow),
      `Week ${getWeekNumber("2024-01-14")} should be in week ${getWeekNumber(mockNow)}`
    ).toBe(true); // Sunday, week 2

    // Malformed ISO strings
    expect(() => isThisWeek("2024-01", mockNow)).toThrow();
    expect(() => isThisWeek("2024-01-", mockNow)).toThrow();
    expect(() => isThisWeek("2024-01-32", mockNow)).toThrow();
    expect(() => isThisWeek("2024-13-15", mockNow)).toThrow();
  });
});
