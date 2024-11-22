import { Equal, Expect } from "@type-challenges/utils";
import { isThisYear } from "inferred-types";
import { DoesExtend, Iso8601Date, Iso8601DateTime, LuxonJs, MomentJs } from "src/types/index";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("isThisYear()", () => {
  const mockCurrentYear = 2024;

  beforeEach(() => {
    // Mock the current date to ensure consistent tests
    vi.useFakeTimers();
    vi.setSystemTime(new Date(mockCurrentYear, 0, 1));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly validate Date objects", () => {
    const thisYear = new Date(mockCurrentYear, 5, 15);
    const lastYear = new Date(mockCurrentYear - 1, 5, 15);
    const nextYear = new Date(mockCurrentYear + 1, 5, 15);

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type D = typeof thisYear;
      // @ts-ignore
      type cases = [
        Expect<Equal<D, Date>>
      ];
    }
  });

  it("should correctly validate Moment.js objects", () => {
    const thisYear = moment(`${mockCurrentYear}-06-15`);
    const lastYear = moment(`${mockCurrentYear - 1}-06-15`);
    const nextYear = moment(`${mockCurrentYear + 1}-06-15`);

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type D = typeof thisYear;
      // @ts-ignore
      type cases = [
        Expect<Equal<D, MomentJs>>
      ];
    }
  });

  it("should correctly validate Luxon DateTime objects", () => {
    const thisYear = DateTime.fromISO(`${mockCurrentYear}-06-15`);
    const lastYear = DateTime.fromISO(`${mockCurrentYear - 1}-06-15`);
    const nextYear = DateTime.fromISO(`${mockCurrentYear + 1}-06-15`);

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type ThisYear = typeof thisYear;
      // @ts-ignore
      type cases = [
        Expect<DoesExtend<LuxonJs["DateTime"], ThisYear>>
      ];
    }
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const thisYear = `${mockCurrentYear}-06-15T14:30:00Z`;
    const lastYear = `${mockCurrentYear - 1}-06-15T14:30:00Z`;
    const nextYear = `${mockCurrentYear + 1}-06-15T14:30:00Z`;

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type ThisYear = typeof thisYear;
      // @ts-ignore
      type cases = [
        Expect<Equal<ThisYear, Iso8601DateTime>>
      ];
    }
  });

  it("should correctly validate ISO 8601 date strings", () => {
    const thisYear = `${mockCurrentYear}-06-15`;
    const lastYear = `${mockCurrentYear - 1}-06-15`;
    const nextYear = `${mockCurrentYear + 1}-06-15`;

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type D = typeof thisYear;
      // @ts-ignore
      type cases = [
        Expect<Equal<D, Iso8601Date>>
      ];
    }
  });

  it("should handle invalid inputs", () => {
    expect(isThisYear(null)).toBe(false);
    expect(isThisYear(undefined)).toBe(false);
    expect(isThisYear("not a date")).toBe(false);
    expect(isThisYear("2024")).toBe(false);
    expect(isThisYear(123)).toBe(false);
    expect(isThisYear({})).toBe(false);
    expect(isThisYear([])).toBe(false);
  });

  it("should handle edge cases", () => {
    // Last day of current year
    expect(isThisYear(`${mockCurrentYear}-12-31T23:59:59Z`)).toBe(true);

    // First day of current year
    expect(isThisYear(`${mockCurrentYear}-01-01T00:00:00Z`)).toBe(true);

    // Malformed ISO strings
    expect(isThisYear(`${mockCurrentYear}`)).toBe(false);
    expect(isThisYear(`${mockCurrentYear}-`)).toBe(false);
    expect(isThisYear(`${mockCurrentYear}-13-01`)).toBe(false);
  });
});
