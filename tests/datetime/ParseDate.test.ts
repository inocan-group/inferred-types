import { describe, it } from "vitest";
import {
    Expect,
    ParseDate,
    ParseTime,
    Test,
    IsLeapYear,
    FourDigitYear,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond,
    TwoDigitMonth,
    TwoDigitDate,
    ThreeDigitMillisecond,
    TimezoneOffset
} from "inferred-types/types";

describe("ParseDate<T>", () => {

    it("YYYY-MM-DD and YYYYMMDD formats", () => {
        type T1 = ParseDate<"2024-06-15">;
        type T2 = ParseDate<"20240615">;
        type T3 = ParseDate<"1999-12-31">;
        type T4 = ParseDate<"19991231">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ FourDigitYear<"2024">, TwoDigitMonth<"06">, TwoDigitDate<"15">, null ]
            >>,
            Expect<Test<
                T2, "equals",
                [ FourDigitYear<"2024">, TwoDigitMonth<"06">, TwoDigitDate<"15">, null ]
            >>,
            Expect<Test<
                T3, "equals",
                [ FourDigitYear<"1999">, TwoDigitMonth<"12">,TwoDigitDate<"31">, null ]
            >>,
            Expect<Test<
                T4, "equals",
                [ FourDigitYear<"1999">, TwoDigitMonth<"12">, TwoDigitDate<"31">, null ]
            >>
        ];
    });

    it("Year/month only: -YYYY-MM and -YYYYMM", () => {
        type T1 = ParseDate<"-2024-06">;
        type T2 = ParseDate<"-202406">;
        type T3 = ParseDate<"-1999-12">;
        type T4 = ParseDate<"-199912">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ FourDigitYear<"2024">, TwoDigitMonth<"06">, null, null ]
            >>,
            Expect<Test<
                T2, "equals",
                [ FourDigitYear<"2024">, TwoDigitMonth<"06">, null, null ]
            >>,
            Expect<Test<
                T3, "equals",
                [ FourDigitYear<"1999">, TwoDigitMonth<"12">, null, null ]
            >>,
            Expect<Test<
                T4, "equals",
                [ FourDigitYear<"1999">, TwoDigitMonth<"12">, null, null ]
            >>
        ];
    });

    it("Valid --MM-DD and --MMDD", () => {
        type T1 = ParseDate<"--06-15">;
        type T2 = ParseDate<"--0615">;
        type T3 = ParseDate<"--12-31">;
        type T4 = ParseDate<"--1231">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ null, TwoDigitMonth<"06">, TwoDigitDate<"15">, null ]
            >>,
            Expect<Test<
                T2, "equals",
                [ null, TwoDigitMonth<"06">, TwoDigitDate<"15">, null ]
            >>,
            Expect<Test<
                T3, "equals",
                [ null, TwoDigitMonth<"12">, TwoDigitDate<"31">, null ]
            >>,
            Expect<Test<
                T4, "equals",
                [ null, TwoDigitMonth<"12">, TwoDigitDate<"31">, null ]
            >>
        ];
    });

     it("Invalid --MM-DD and --MMDD", () => {
        type T1 = ParseDate<"--13-15">;
        type T2 = ParseDate<"--1233">;
        type T3 = ParseDate<"--12-33">;
        type T4 = ParseDate<"--1331">;

        type cases = [
            Expect<Test<T1, "isError","parse-date/month">>,
            Expect<Test<T2, "isError", "parse-date/date">>,
            Expect<Test<T3, "isError", "parse-date/date">>,
            Expect<Test<T4, "isError","parse-date/month">>,
        ];
    });

    it("Date with time info (valid time)", () => {
        type T1 = ParseDate<"2024-06-15T12:34">;
        type TT1 = ParseTime<"12:34:15">;
        type T2 = ParseDate<"20240615T23:59:59.999Z">;
        type T3 = ParseDate<"-2024-06T00:00:00">;
        type T4 = ParseDate<"--06-15T14:30:45+02:00">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [
                    FourDigitYear<"2024">,
                    TwoDigitMonth<"06">,
                    TwoDigitDate<"15">,
                    [
                        TwoDigitHour<"12">,
                        TwoDigitMinute<"34">,
                        null,
                        null,
                        null
                    ]
                ]
            >>,
            Expect<Test<
                T2, "equals",
                [
                    FourDigitYear<"2024">,
                    TwoDigitMonth<"06">,
                    TwoDigitDate<"15">,
                    [
                        TwoDigitHour<"23">,
                        TwoDigitMinute<"59">,
                        TwoDigitSecond<"59">,
                        ThreeDigitMillisecond<"999">,
                        TimezoneOffset<"Z">
                    ]
                ]
            >>,
            Expect<Test<T3, "isError","parse-date/leftover">>,
            Expect<Test<T4, "isError","parse-date/leftover">>
        ];
    });

    it("Date with time info (invalid time)", () => {
        type T1 = ParseDate<"2024-06-15T25:00">; // Invalid hour
        type T2 = ParseDate<"-2024-06T12:60">; // Invalid minute
        type T3 = ParseDate<"--06-15T12:30:60">; // Invalid second

        type cases = [
            Expect<Test<T1, "isError", "parse-date/datetime">>,
            Expect<Test<T2, "isError", "parse-date/leftover">>,
            Expect<Test<T3, "isError", "parse-date/leftover">>
        ];
    });

    it("error cases - invalid formats", () => {
        type Invalid1 = ParseDate<"2024-13-01">; // Invalid month
        type Invalid2 = ParseDate<"2024-06-32">; // Invalid day
        type Invalid4 = ParseDate<"not-a-date">;
        type Invalid5 = ParseDate<"2024-06-15Tnot-a-time">;

        type cases = [
            Expect<Test<Invalid1, "isError", "parse-date/month">>,
            Expect<Test<Invalid2, "isError", "parse-date/date">>,
            Expect<Test<Invalid4, "isError", "parse-date/year">>,
            Expect<Test<Invalid5, "isError", "parse-date/datetime">>
        ];
    });

    it("error cases - wide string types", () => {
        type WideString = ParseDate<string>;

        type cases = [
            Expect<Test<
                WideString, "equals",
                Error | ParsedDate
            >>
        ];
    });

    it("edge cases", () => {
        type LeapYear = ParseDate<"2020-02-29">;
        type L = IsLeapYear<"2020">;
        type NonLeapYear = ParseDate<"2021-02-29">;
        type ThirtyDayMonth = ParseDate<"2020-04-31">;
        type ThirtyOneDayMonth = ParseDate<"2020-05-31">;

        type cases = [
            Expect<Test<
                LeapYear, "equals",
                [ FourDigitYear<"2020">, TwoDigitMonth<"02">, TwoDigitDate<"29">, null ]
            >>,
            Expect<Test<
                NonLeapYear, "isError",
                "parse-date/invalid-date"
            >>,
            Expect<Test<
                ThirtyDayMonth, "isError",
                "parse-date/invalid-date"
            >>,
            Expect<Test<
                ThirtyOneDayMonth, "equals",
                [FourDigitYear<"2020">, TwoDigitMonth<"05">, TwoDigitDate<"31">, null]
            >>,
        ];
    });

});
