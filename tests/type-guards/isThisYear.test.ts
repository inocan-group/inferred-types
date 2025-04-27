/* eslint-disable ts/ban-ts-comment */
import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { isThisYear } from "inferred-types/runtime";
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
      type _cases = [
        Expect<Test<D, "equals",  Date>>
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
  });

  it("should correctly validate Luxon DateTime objects", () => {
    const thisYear = DateTime.fromISO(`${mockCurrentYear}-06-15`) as unknown as LuxonJs["DateTime"];
    const lastYear = DateTime.fromISO(`${mockCurrentYear - 1}-06-15`);
    const nextYear = DateTime.fromISO(`${mockCurrentYear + 1}-06-15`);
    type Luxon = IsLuxonDateTime<typeof thisYear>;

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type ThisYear = typeof thisYear;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Luxon>,
        Expect<Extends<LuxonJs["DateTime"], ThisYear>>
      ];
    }
  });

  it("should correctly validate ISO 8601 datetime strings", () => {
    const thisYear = `${mockCurrentYear}-06-15T14:30:00Z`;
    const lastYear = `${mockCurrentYear - 1}-06-15T14:30:00Z`;
    const nextYear = `${mockCurrentYear + 1}-06-15T14:30:00Z`;
    type Iso = IsIso8601DateTime<typeof thisYear>;

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type ThisYear = typeof thisYear;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<ThisYear, Iso8601DateTime>>
      ];
    }
  });

  it("should correctly validate ISO 8601 date strings", () => {
    const thisYear = `${mockCurrentYear}-06-15`;
    const wide = thisYear as string;
    const lastYear = `${mockCurrentYear - 1}-06-15`;
    const nextYear = `${mockCurrentYear + 1}-06-15`;
    type Iso = IsIsoDate<typeof thisYear>;
    type IsoWide = IsIsoDate<typeof wide>;

    expect(isThisYear(thisYear)).toBe(true);
    expect(isThisYear(lastYear)).toBe(false);
    expect(isThisYear(nextYear)).toBe(false);

    if (isThisYear(thisYear)) {
      type ThisYear = typeof thisYear;
      // @ts-ignore
      type _cases = [
        ExpectTrue<Iso>,
        Expect<Extends<ThisYear, Iso8601Date>>
      ];
    }
    if (isThisYear(wide)) {
      type WideYear = typeof wide;
      // @ts-ignore
      type _cases = [
        Expect<Test<IsoWide, "equals",  boolean>>,
        Expect<Extends<WideYear, string>>
      ];
    }
  });

  it("should handle invalid inputs", () => {
    expect(isThisYear(null)).toBe(false);
    expect(isThisYear(undefined)).toBe(false);
    expect(isThisYear("not a date")).toBe(false);
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
    expect(isThisYear(`${mockCurrentYear}-`)).toBe(false);
    expect(isThisYear(`${mockCurrentYear}-13-01`)).toBe(false);
  });
});
