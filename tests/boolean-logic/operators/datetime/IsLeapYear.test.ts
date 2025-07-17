import { describe, expect, it } from "vitest";
import { IsLeapYear, ParseDate } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";
import { asDate, isLeapYear } from "inferred-types/runtime";
import moment from "moment";
import { DateTime } from "luxon";

describe("IsLeapYear type utility", () => {
    it("should return true for valid leap years", () => {
        type X = ParseDate<"2004">
        type cases = [
            // Years divisible by 4 and not by 100
            Expect<Test<IsLeapYear<"2004">, "equals", true>>,
            Expect<Test<IsLeapYear<"2008">, "equals", true>>,
            Expect<Test<IsLeapYear<"2012">, "equals", true>>,
            Expect<Test<IsLeapYear<"2016">, "equals", true>>,
            Expect<Test<IsLeapYear<"2020">, "equals", true>>,
            Expect<Test<IsLeapYear<"2024">, "equals", true>>,

            // Years divisible by 400
            Expect<Test<IsLeapYear<"2000">, "equals", true>>,
            Expect<Test<IsLeapYear<"1600">, "equals", true>>,
            Expect<Test<IsLeapYear<"2400">, "equals", true>>,
        ];
    });

    it("should return false for non-leap years", () => {
        type cases = [
            // Years not divisible by 4
            Expect<Test<IsLeapYear<"2001">, "equals", false>>,
            Expect<Test<IsLeapYear<"2002">, "equals", false>>,
            Expect<Test<IsLeapYear<"2003">, "equals", false>>,
            Expect<Test<IsLeapYear<"2005">, "equals", false>>,
            Expect<Test<IsLeapYear<"2017">, "equals", false>>,
            Expect<Test<IsLeapYear<"2018">, "equals", false>>,
            Expect<Test<IsLeapYear<"2019">, "equals", false>>,
            Expect<Test<IsLeapYear<"2021">, "equals", false>>,
            Expect<Test<IsLeapYear<"2022">, "equals", false>>,
            Expect<Test<IsLeapYear<"2023">, "equals", false>>,

            // Years divisible by 100 but not by 400
            Expect<Test<IsLeapYear<"1900">, "equals", false>>,
            Expect<Test<IsLeapYear<"1800">, "equals", false>>,
            Expect<Test<IsLeapYear<"1700">, "equals", false>>,
            Expect<Test<IsLeapYear<"2100">, "equals", false>>,
            Expect<Test<IsLeapYear<"2200">, "equals", false>>,
            Expect<Test<IsLeapYear<"2300">, "equals", false>>,
        ];
    });

    it("should handle full date strings", () => {
        type T1 = IsLeapYear<"2020-01-01">;
        type T2 = IsLeapYear<"2020-12-31">;
        type T3 = IsLeapYear<"2004-12-31">;
        type T4 = IsLeapYear<"2000-12-31">;

        type F1 = IsLeapYear<"1999-01-01">;

        type cases = [
            // ISO date format tests
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("should return error for invalid date formats", () => {
        type E1 = IsLeapYear<"not-a-date">;
        type E2 = IsLeapYear<"abc">;
        type E3 = IsLeapYear<"20">
        type E4 = IsLeapYear<"123">;
        type E5 = IsLeapYear<"">;

        type cases = [
            Expect<Test<E1, "isError", "parse-date">>,
            Expect<Test<E2, "isError", "parse-date">>,
            Expect<Test<E3, "isError", "parse-date">>,
            Expect<Test<E4, "isError", "parse-date">>,
            Expect<Test<E5, "isError", "parse-date">>,
        ];
    });


    it("should handle edge cases for specific years", () => {
        type cases = [
            // Century years
            Expect<Test<IsLeapYear<"1000">, "equals", false>>, // divisible by 400
            Expect<Test<IsLeapYear<"1100">, "equals", false>>, // divisible by 100, not by 400
            Expect<Test<IsLeapYear<"1200">, "equals", true>>, // divisible by 400
            Expect<Test<IsLeapYear<"1300">, "equals", false>>, // divisible by 100, not by 400
            Expect<Test<IsLeapYear<"1400">, "equals", false>>, // divisible by 100, not by 400
            Expect<Test<IsLeapYear<"1500">, "equals", false>>, // divisible by 100, not by 400

            // Years ending in specific patterns
            Expect<Test<IsLeapYear<"2000">, "equals", true>>, // ends in 00
            Expect<Test<IsLeapYear<"2004">, "equals", true>>, // ends in 04
            Expect<Test<IsLeapYear<"2008">, "equals", true>>, // ends in 08
            Expect<Test<IsLeapYear<"2012">, "equals", true>>, // ends in 12
            Expect<Test<IsLeapYear<"2016">, "equals", true>>, // ends in 16
            Expect<Test<IsLeapYear<"2020">, "equals", true>>, // ends in 20
            Expect<Test<IsLeapYear<"2024">, "equals", true>>, // ends in 24
        ];
    });
});

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
