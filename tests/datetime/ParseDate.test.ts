import { describe, expect, it } from "vitest";
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
    TimezoneOffset,
    ParsedDate,
    DateMeta
} from "inferred-types/types";
import { parseDate } from "inferred-types/runtime";
import moment from "moment";
import { DateTime } from "luxon";
import { parseISO } from "date-fns";
import { IsTwoDigitDate } from "../../modules/types/dist";

describe("ParseDate<T>", () => {

    it("YYYY-MM-DD and YYYYMMDD formats", () => {
        type T1 = ParseDate<"2024-06-15">;
        type T2 = ParseDate<"20240615">;
        type T3 = ParseDate<"1999-12-31">;
        type T4 = ParseDate<"19991231">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [FourDigitYear<"2024">, TwoDigitMonth<"06">, TwoDigitDate<"15">, null]
            >>,
            Expect<Test<
                T2, "equals",
                [FourDigitYear<"2024">, TwoDigitMonth<"06">, TwoDigitDate<"15">, null]
            >>,
            Expect<Test<
                T3, "equals",
                [FourDigitYear<"1999">, TwoDigitMonth<"12">, TwoDigitDate<"31">, null]
            >>,
            Expect<Test<
                T4, "equals",
                [FourDigitYear<"1999">, TwoDigitMonth<"12">, TwoDigitDate<"31">, null]
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
                [FourDigitYear<"2024">, TwoDigitMonth<"06">, null, null]
            >>,
            Expect<Test<
                T2, "equals",
                [FourDigitYear<"2024">, TwoDigitMonth<"06">, null, null]
            >>,
            Expect<Test<
                T3, "equals",
                [FourDigitYear<"1999">, TwoDigitMonth<"12">, null, null]
            >>,
            Expect<Test<
                T4, "equals",
                [FourDigitYear<"1999">, TwoDigitMonth<"12">, null, null]
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
                [null, TwoDigitMonth<"06">, TwoDigitDate<"15">, null]
            >>,
            Expect<Test<
                T2, "equals",
                [null, TwoDigitMonth<"06">, TwoDigitDate<"15">, null]
            >>,
            Expect<Test<
                T3, "equals",
                [null, TwoDigitMonth<"12">, TwoDigitDate<"31">, null]
            >>,
            Expect<Test<
                T4, "equals",
                [null, TwoDigitMonth<"12">, TwoDigitDate<"31">, null]
            >>
        ];
    });

    it("Invalid --MM-DD and --MMDD", () => {
        type T1 = ParseDate<"--13-15">;
        type T2 = ParseDate<"--1233">;
        type T3 = ParseDate<"--12-33">;
        type T4 = ParseDate<"--1331">;

        type cases = [
            Expect<Test<T1, "isError", "parse-date/month">>,
            Expect<Test<T2, "isError", "parse-date/date">>,
            Expect<Test<T3, "isError", "parse-date/date">>,
            Expect<Test<T4, "isError", "parse-date/month">>,
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
            Expect<Test<T3, "isError", "parse-date/leftover">>,
            Expect<Test<T4, "isError", "parse-date/leftover">>
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
        type L2 = IsTwoDigitDate<"29",FourDigitYear<"2020">,"02">;
        type NonLeapYear = ParseDate<"2021-02-29">;
        type ThirtyDayMonth = ParseDate<"2020-04-31">;
        type ThirtyOneDayMonth = ParseDate<"2020-05-31">;

        type cases = [
            Expect<Test<
                LeapYear, "equals",
                [FourDigitYear<"2020">, TwoDigitMonth<"02">, TwoDigitDate<"29">, null]
            >>,
            Expect<Test<
                NonLeapYear, "isError",
                "parse-date/date"
            >>,
            Expect<Test<
                ThirtyDayMonth, "isError",
                "parse-date/date"
            >>,
            Expect<Test<
                ThirtyOneDayMonth, "equals",
                [FourDigitYear<"2020">, TwoDigitMonth<"05">, TwoDigitDate<"31">, null]
            >>,
        ];
    });

});


describe("parseDate()", () => {
    it("parses ISO string", () => {
        const result = parseDate("2024-01-15T12:34:56.789Z");
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };

        expect(result).toMatchObject(expected);
        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];
    });

    it("parses Date object", () => {
        const date = new Date("2024-01-15T12:34:56.789Z");
        const result = parseDate(date);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        expect(result).toMatchObject(expected);
        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];
    });

    it("parses epoch ms", () => {
        const date = new Date("2024-01-15T12:34:56.789Z");
        const ms = date.getTime();
        const result = parseDate(ms);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        expect(result).toMatchObject(expected);
        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];

    });

    it("parses epoch seconds", () => {
        const date = new Date("2024-01-15T12:34:56.000Z");
        const seconds = Math.floor(date.getTime() / 1000);
        const result = parseDate(seconds);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "000",
            timezone: "Z"
        };
        expect(result).toMatchObject(expected);
        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];
    });


    it("fully qualified datetime", () => {
        const date = "2022-12-01T23:59:59.999+01:30";
        const result = parseDate(date);
        type Result = typeof result;

        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2022",
            month: "12",
            date: "01",
            hour: "23",
            minute: "59",
            second: "59",
            ms: "999",
            timezone: "+01:30"
        };
        expect(result).toMatchObject(expected);

        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];
    });


    it("parses Moment.js object", () => {
        const m = moment("2024-01-15T12:34:56.789Z");
        const result = parseDate(m);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        expect(result).toMatchObject(expected);

        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];
    });

    it("parses Luxon DateTime object", () => {
        const l = DateTime.fromISO("2024-01-15T12:34:56.789-05:00");
        const result = parseDate(l);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "17", // Converted to UTC (12 + 5 hours)
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z" // Normalized to UTC
        };
        expect(result).toMatchObject(expected);

        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];
    });

    it("parses DateFns date object", () => {
        const d = parseISO("2024-01-15T12:34:56.789Z");
        const result = parseDate(d);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };
        expect(result).toMatchObject(expected);

        type cases = [
            Expect<Test<typeof result, "extends", DateMeta>>
        ];
    });

    it("invalid input", () => {
        expect(parseDate("not-a-date" as any) instanceof Error).toBe(true);
        expect(parseDate({} as any) instanceof Error).toBe(true);
        expect(parseDate(NaN as any) instanceof Error).toBe(true);
    });
});
