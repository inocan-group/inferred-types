/* eslint-disable ts/ban-ts-comment */
import { getWeekNumber, isThisWeek } from "inferred-types/runtime";
import {
  LuxonJs
} from "inferred-types/types";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("isThisWeek()", () => {
  const mockDate = new Date(2024, 0, 15); // Monday, January 15, 2024

  beforeEach(() => {
    // Mock the current date to ensure consistent tests
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly validate Date objects with Monday start", () => {
    const sameWeek = new Date(2024, 0, 17); // Wednesday
    const previousWeek = new Date(2024, 0, 8); // Monday last week
    const nextWeek = new Date(2024, 0, 22); // Monday next week

    expect(isThisWeek(sameWeek)).toBe(true);
    expect(isThisWeek(previousWeek)).toBe(false);
    expect(isThisWeek(nextWeek)).toBe(false);
  });



  it("should correctly validate Moment.js objects", () => {
    const sameWeek = moment("2024-01-17"); // Wednesday
    const previousWeek = moment("2024-01-08");
    const nextWeek = moment("2024-01-22");

    expect(isThisWeek(sameWeek)).toBe(true);
    expect(isThisWeek(previousWeek)).toBe(false);
    expect(isThisWeek(nextWeek)).toBe(false);
  });

  it("should correctly validate Luxon DateTime objects", () => {
    const sameWeek = DateTime.fromISO("2024-01-17") as unknown as LuxonJs["DateTime"];
    const previousWeek = DateTime.fromISO("2024-01-08");
    const nextWeek = DateTime.fromISO("2024-01-22");

    expect(isThisWeek(sameWeek)).toBe(true);
    expect(isThisWeek(previousWeek)).toBe(false);
    expect(isThisWeek(nextWeek)).toBe(false);
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const sameWeek = "2024-01-17T14:30:00Z";
    const previousWeek = "2024-01-08T14:30:00Z";
    const nextWeek = "2024-01-22T14:30:00Z";

    expect(isThisWeek(sameWeek)).toBe(true);
    expect(isThisWeek(previousWeek)).toBe(false);
    expect(isThisWeek(nextWeek)).toBe(false);

  });

  it("should correctly validate ISO 8601 date strings", () => {
    const sameWeek = "2024-01-17";
    const previousWeek = "2024-01-08";
    const nextWeek = "2024-01-22";

    expect(isThisWeek(sameWeek)).toBe(true);
    expect(isThisWeek(previousWeek)).toBe(false);
    expect(
      isThisWeek(nextWeek),
      `Week ${getWeekNumber(nextWeek)} should NOT be in week ${getWeekNumber()} `
    ).toBe(false);

  });

  it("should handle invalid inputs", () => {
    // @ts-expect-error
    expect(isThisWeek(null)).toBe(false);
    // @ts-expect-error
    expect(isThisWeek(undefined)).toBe(false);
    expect(isThisWeek("not a date")).toBe(false);
    expect(isThisWeek("2024")).toBe(false);
    expect(isThisWeek(123)).toBe(false);
    expect(isThisWeek({})).toBe(false);
    expect(isThisWeek([])).toBe(false);
  });

  it("should handle edge cases", () => {
    // Different times on the same day should still return true
    expect(isThisWeek("2024-01-17T00:00:00Z")).toBe(true);
    expect(isThisWeek("2024-01-17T23:59:59Z")).toBe(true);

    // Week boundaries
    expect(isThisWeek("2024-01-21")).toBe(true);
    expect(
      isThisWeek("2024-01-15"),
      `Week ${getWeekNumber("2024-01-15")} should be in week ${getWeekNumber()}`
    ).toBe(true);

    // Malformed ISO strings
    expect(isThisWeek("2024-01")).toBe(false);
    expect(isThisWeek("2024-01-")).toBe(false);
    expect(isThisWeek("2024-01-32")).toBe(false);
    expect(isThisWeek("2024-13-15")).toBe(false);
  });
});
