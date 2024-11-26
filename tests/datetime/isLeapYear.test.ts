import { describe, expect, it } from "vitest";
import {  asDate, isLeapYear } from "inferred-types/runtime"
import moment from "moment";
import { DateTime } from "luxon";

describe("isLeapYear()", () => {
  it("should correctly validate ISO Year strings", () => {
    const t1 = "2024";
    const t2 = "2000";
    const t3 = "2020"

    const f1 = "2023";
    const f2 = "1900";

    expect(isLeapYear(t1), `${asDate(t1).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(t2), `${asDate(t2).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(t3), `${asDate(t3).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(f1)).toBe(false);
    expect(isLeapYear(f2)).toBe(false);
  });

  it("should correctly validate Date objects", () => {
    const t1 = new Date(2024,0,1);
    const t2 = new Date(2000,0,1);
    const t3 = new Date(2020,0,1);

    const f1 = new Date(2023,0,1);
    const f2 = new Date(1900,0,1);

    expect(isLeapYear(t1), `${asDate(t1).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(t2), `${asDate(t2).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(t3), `${asDate(t3).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(f1)).toBe(false);
    expect(isLeapYear(f2)).toBe(false);
  });

  it("should correctly validate Moment.js objects", () => {
    const t1 = moment("2024");
    const t2 = moment("2000");
    const t3 = moment("2020");

    const f1 = moment("2023");

    expect(isLeapYear(t1), `${asDate(t1).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(t2), `${asDate(t2).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(t3), `${asDate(t3).getUTCFullYear()} should be a leap year`).toBe(true);
    expect(isLeapYear(f1)).toBe(false);
  });

  it("should correctly validate Luxon DateTime objects", () => {
    const leapYear = DateTime.fromISO("2024");
    const nonLeapYear = DateTime.fromISO("2023");

    expect(isLeapYear(leapYear)).toBe(true);
    expect(isLeapYear(nonLeapYear)).toBe(false);
  });
});
