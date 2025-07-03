import { describe, it } from "vitest";
import { IsLeapYear, ParseDate } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";

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
        type cases = [
            // ISO date format tests
            Expect<Test<IsLeapYear<"2020-01-01">, "equals", true>>,
            Expect<Test<IsLeapYear<"2020-12-31">, "equals", true>>,
            Expect<Test<IsLeapYear<"2021-06-15">, "equals", false>>,
            Expect<Test<IsLeapYear<"2000-02-29">, "equals", true>>,
            Expect<Test<IsLeapYear<"1900-01-01">, "equals", false>>,

            // Different date formats
            //   Expect<Test<IsLeapYear<"01/01/2020">, "equals", true>>,
            //   Expect<Test<IsLeapYear<"12/31/2021">, "equals", false>>,
            //   Expect<Test<IsLeapYear<"2020/01/01">, "equals", true>>,
            //   Expect<Test<IsLeapYear<"2021/12/31">, "equals", false>>,
        ];
    });

    it("should return false for invalid date formats", () => {
        type cases = [
            // @ts-expect-error
            Expect<Test<IsLeapYear<"not-a-date">, "equals", false>>,
            // @ts-expect-error
            Expect<Test<IsLeapYear<"abc">, "equals", false>>,
            Expect<Test<IsLeapYear<"20">, "equals", false>>,
            Expect<Test<IsLeapYear<"123">, "equals", false>>,
            Expect<Test<IsLeapYear<"12345">, "equals", false>>,
            // @ts-expect-error
            Expect<Test<IsLeapYear<"">, "equals", false>>,
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
            Expect<Test<IsLeapYear<"2004">, "equals", true>>, // ends in 04
            Expect<Test<IsLeapYear<"2008">, "equals", true>>, // ends in 08
            Expect<Test<IsLeapYear<"2012">, "equals", true>>, // ends in 12
            Expect<Test<IsLeapYear<"2016">, "equals", true>>, // ends in 16
            Expect<Test<IsLeapYear<"2020">, "equals", true>>, // ends in 20
            Expect<Test<IsLeapYear<"2024">, "equals", true>>, // ends in 24
        ];
    });
});
