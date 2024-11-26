/* eslint-disable @typescript-eslint/ban-ts-comment */
import {  Expect, ExpectTrue } from "@type-challenges/utils";
import { getWeekNumber } from "inferred-types/runtime";
import {
  Extends,
  IsLuxonDateTime,
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

  it("should correctly calculate week numbers for 2024 Date objects", () => {
    expect(getWeekNumber()).toBe(3)
    expect(getWeekNumber(new Date(2024, 0, 1))).toBe(1);
    expect(getWeekNumber(new Date(2024, 0, 15))).toBe(3);
    expect(getWeekNumber(new Date(2024, 0, 17))).toBe(3);
    expect(getWeekNumber(new Date(2024, 0, 22))).toBe(4);

    expect(getWeekNumber(new Date(2024, 3, 1))).toBe(14);

    expect(getWeekNumber(new Date(2024, 11, 30))).toBe(53);
    expect(getWeekNumber(new Date(2024, 11, 31))).toBe(53);
  });

  it("should correctly calculate week numbers for 2023 Date objects", () => {
    expect(getWeekNumber(new Date(2023, 0, 1))).toBe(1);
    expect(getWeekNumber(new Date(2023, 0, 15))).toBe(3);
    expect(getWeekNumber(new Date(2023, 0, 17))).toBe(3);
    expect(getWeekNumber(new Date(2023, 0, 22))).toBe(4);

    expect(getWeekNumber(new Date(2023, 3, 1))).toBe(13);

    expect(getWeekNumber(new Date(2023, 11, 30))).toBe(52);
    expect(getWeekNumber(new Date(2023, 11, 31))).toBe(53);
  });

  it("should correctly calculate week numbers for 2024 ISO 8601 date strings", () => {
    expect(getWeekNumber("2024-01-01")).toBe(1);
    expect(getWeekNumber("2024-01-15")).toBe(3);
    expect(getWeekNumber("2024-01-17")).toBe(3);
    expect(getWeekNumber("2024-01-22")).toBe(4);

    expect(getWeekNumber("2024-04-01")).toBe(14);

    expect(getWeekNumber("2024-12-30")).toBe(53);
    expect(getWeekNumber("2024-12-31")).toBe(53);
  });

  it("should correctly calculate week numbers for 2023 ISO 8601 date strings", () => {
    expect(getWeekNumber("2023-01-01")).toBe(1);
    expect(getWeekNumber("2023-01-15")).toBe(3);
    expect(getWeekNumber("2023-01-17")).toBe(3);
    expect(getWeekNumber("2023-01-22")).toBe(4);

    expect(getWeekNumber("2023-04-01")).toBe(13);

    expect(getWeekNumber("2023-12-30")).toBe(52);
    expect(getWeekNumber("2023-12-31")).toBe(53);
  });

  it("should correctly calculate week numbers for Moment.js objects", () => {
    const m1 = moment("2024-01-01");
    expect(getWeekNumber(m1)).toBe(1);
    expect(getWeekNumber(moment("2024-01-15"))).toBe(3);
    expect(getWeekNumber(moment("2024-12-31"))).toBe(53);
  });

  it("should correctly calculate week numbers for Luxon DateTime objects", () => {
    const date = DateTime.fromISO("2024-01-15");
    type Luxon = IsLuxonDateTime<typeof date>;

    expect(getWeekNumber(date)).toBe(3);
    expect(getWeekNumber(DateTime.fromISO("2024-01-01"))).toBe(1);
    expect(getWeekNumber(DateTime.fromISO("2024-12-31"))).toBe(53);

    if (getWeekNumber(date)) {
      type ThisDate = typeof date;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Luxon>,
        Expect<Extends< DateTime<true>, ThisDate>>
      ];
    }
  });

  it("should correctly calculate week numbers for ISO 8601 datetime strings", () => {
    const date = "2024-01-15T14:30:00Z";

    expect(
      getWeekNumber(date),
      `"${date} is week ${getWeekNumber(date)}; should be week 3"`
    ).toBe(3);

    expect(getWeekNumber("2024-12-31T23:59:59Z")).toBe(53);
  });



  it("should handle default parameter (current date)", () => {
    expect(getWeekNumber()).toBe(3); // Week 3 for January 15, 2024
  });

  it("should handle different week start days", () => {
    const testDate = new Date(2024, 0, 7); // January 7, 2024
    expect(getWeekNumber(testDate), `Jan 7th of 2024 should be in week 1, if starting on Monday `).toBe(1);

  });


  it("should handle invalid inputs gracefully", () => {
      // @ts-expect-error - Invalid input type
      expect(() => getWeekNumber(null)).toThrow();
      expect(() => getWeekNumber("invalid date")).toThrow();
  });
});
