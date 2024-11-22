import { Equal, Expect } from "@type-challenges/utils";
import { isThisMonth } from "inferred-types";
import { DoesExtend, Iso8601Date, Iso8601DateTime, LuxonJs, MomentJs } from "src/types/index";
import { DateTime } from "luxon";
import moment from "moment";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("isThisMonth()", () => {
  const mockYear = 2024;
  const mockMonth = 6; // June

  beforeEach(() => {
    // Mock the current date to ensure consistent tests
    vi.useFakeTimers();
    vi.setSystemTime(new Date(mockYear, mockMonth - 1, 1)); // Month is 0-based for Date constructor
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly validate Date objects", () => {
    const thisMonth = new Date(mockYear, mockMonth - 1, 15);
    const lastMonth = new Date(mockYear, mockMonth - 2, 15);
    const nextMonth = new Date(mockYear, mockMonth, 15);

    expect(isThisMonth(thisMonth)).toBe(true);
    expect(isThisMonth(lastMonth)).toBe(false);
    expect(isThisMonth(nextMonth)).toBe(false);

    if (isThisMonth(thisMonth)) {
      type D = typeof thisMonth;
      // @ts-ignore
      type cases = [
        Expect<Equal<D, Date>>
      ];
    }
  });

  it("should correctly validate Moment.js objects", () => {
    const thisMonth = moment(`${mockYear}-${String(mockMonth).padStart(2, '0')}-15`);
    const lastMonth = moment(`${mockYear}-${String(mockMonth - 1).padStart(2, '0')}-15`);
    const nextMonth = moment(`${mockYear}-${String(mockMonth + 1).padStart(2, '0')}-15`);

    expect(isThisMonth(thisMonth)).toBe(true);
    expect(isThisMonth(lastMonth)).toBe(false);
    expect(isThisMonth(nextMonth)).toBe(false);

    if (isThisMonth(thisMonth)) {
      type D = typeof thisMonth;
      // @ts-ignore
      type cases = [
        Expect<Equal<D, MomentJs>>
      ];
    }
  });

  it("should correctly validate Luxon DateTime objects", () => {
    const thisMonth = DateTime.fromISO(`${mockYear}-${String(mockMonth).padStart(2, '0')}-15`);
    const lastMonth = DateTime.fromISO(`${mockYear}-${String(mockMonth - 1).padStart(2, '0')}-15`);
    const nextMonth = DateTime.fromISO(`${mockYear}-${String(mockMonth + 1).padStart(2, '0')}-15`);

    expect(isThisMonth(thisMonth)).toBe(true);
    expect(isThisMonth(lastMonth)).toBe(false);
    expect(isThisMonth(nextMonth)).toBe(false);

    if (isThisMonth(thisMonth)) {
      type ThisMonth = typeof thisMonth;
      // @ts-ignore
      type cases = [
        Expect<DoesExtend<LuxonJs["DateTime"], ThisMonth>>
      ];
    }
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const thisMonth = `${mockYear}-${String(mockMonth).padStart(2, '0')}-15T14:30:00Z`;
    const lastMonth = `${mockYear}-${String(mockMonth - 1).padStart(2, '0')}-15T14:30:00Z`;
    const nextMonth = `${mockYear}-${String(mockMonth + 1).padStart(2, '0')}-15T14:30:00Z`;

    expect(isThisMonth(thisMonth)).toBe(true);
    expect(isThisMonth(lastMonth)).toBe(false);
    expect(isThisMonth(nextMonth)).toBe(false);

    if (isThisMonth(thisMonth)) {
      type ThisMonth = typeof thisMonth;
      // @ts-ignore
      type cases = [
        Expect<Equal<ThisMonth, Iso8601DateTime>>
      ];
    }
  });

  it("should correctly validate ISO 8601 date strings", () => {
    const thisMonth = `${mockYear}-${String(mockMonth).padStart(2, '0')}-15`;
    const lastMonth = `${mockYear}-${String(mockMonth - 1).padStart(2, '0')}-15`;
    const nextMonth = `${mockYear}-${String(mockMonth + 1).padStart(2, '0')}-15`;

    expect(isThisMonth(thisMonth)).toBe(true);
    expect(isThisMonth(lastMonth)).toBe(false);
    expect(isThisMonth(nextMonth)).toBe(false);

    if (isThisMonth(thisMonth)) {
      type D = typeof thisMonth;
      // @ts-ignore
      type cases = [
        Expect<Equal<D, Iso8601Date>>
      ];
    }
  });

  it("should handle invalid inputs", () => {
    expect(isThisMonth(null)).toBe(false);
    expect(isThisMonth(undefined)).toBe(false);
    expect(isThisMonth("not a date")).toBe(false);
    expect(isThisMonth("2024-06")).toBe(true);
    expect(isThisMonth(123)).toBe(false);
    expect(isThisMonth({})).toBe(false);
    expect(isThisMonth([])).toBe(false);
  });

  it("should handle edge cases", () => {
    // First day of current month
    expect(isThisMonth(`${mockYear}-${String(mockMonth).padStart(2, '0')}-01T00:00:00Z`)).toBe(true);

    // Last day of current month
    expect(isThisMonth(`${mockYear}-${String(mockMonth).padStart(2, '0')}-30T23:59:59Z`)).toBe(true);

    // Malformed ISO strings
    expect(isThisMonth(`${mockYear}`)).toBe(false);
    expect(isThisMonth(`${mockYear}-`)).toBe(false);
    expect(isThisMonth(`${mockYear}-13-01`)).toBe(false);
  });
});
