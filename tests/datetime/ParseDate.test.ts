import { describe, it } from "vitest";
import {
    Expect,
    ParseDate,
    Test,
    IsError,
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
                [ "2024", "06", "15" ]
            >>,
            Expect<Test<
                T2, "equals",
                [ "2024", "06", "15" ]
            >>,
            Expect<Test<
                T3, "equals",
                [ "1999", "12", "31" ]
            >>,
            Expect<Test<
                T4, "equals",
                [ "1999", "12", "31" ]
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
                [ "2024", "06", null ]
            >>,
            Expect<Test<
                T2, "equals",
                [ "2024", "06", null ]
            >>,
            Expect<Test<
                T3, "equals",
                [ "1999", "12", null ]
            >>,
            Expect<Test<
                T4, "equals",
                [ "1999", "12", null ]
            >>
        ];
    });

    it("Year-independent: --MM-DD and --MMDD", () => {
        type T1 = ParseDate<"--06-15">;
        type T2 = ParseDate<"--0615">;
        type T3 = ParseDate<"--12-31">;
        type T4 = ParseDate<"--1231">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ null, "06", "15" ]
            >>,
            Expect<Test<
                T2, "equals",
                [ null, "06", "15" ]
            >>,
            Expect<Test<
                T3, "equals",
                [ null, "12", "31" ]
            >>,
            Expect<Test<
                T4, "equals",
                [ null, "12", "31" ]
            >>
        ];
    });

    it("Date with time info (valid time)", () => {
        type T1 = ParseDate<"2024-06-15T12:34">;
        type T2 = ParseDate<"20240615T23:59:59.999Z">;
        type T3 = ParseDate<"-2024-06T00:00:00">;
        type T4 = ParseDate<"--06-15T14:30:45+02:00">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ "2024", "06", "15", [ "12", "34", undefined, undefined, undefined ] ]
            >>,
            Expect<Test<
                T2, "equals",
                [ "2024", "06", "15", [ "23", "59", "59", "999", "Z" ] ]
            >>,
            Expect<Test<
                T3, "equals",
                [ "2024", "06", null, [ "00", "00", "00", undefined, undefined ] ]
            >>,
            Expect<Test<
                T4, "equals",
                [ null, "06", "15", [ "14", "30", "45", undefined, "+02:00" ] ]
            >>
        ];
    });

    it("Date with time info (invalid time)", () => {
        type T1 = ParseDate<"2024-06-15T25:00">; // Invalid hour
        type T2 = ParseDate<"-2024-06T12:60">; // Invalid minute
        type T3 = ParseDate<"--06-15T12:30:60">; // Invalid second

        type cases = [
            Expect<Test<T1[3], "isError", "parse/time">>,
            Expect<Test<T2[3], "isError", "parse/time">>,
            Expect<Test<T3[3], "isError", "parse/time">>
        ];
    });

    it("error cases - invalid formats", () => {
        type Invalid1 = ParseDate<"2024-13-01">; // Invalid month
        type Invalid2 = ParseDate<"2024-06-32">; // Invalid day
        type Invalid3 = ParseDate<"2024">; // Incomplete
        type Invalid4 = ParseDate<"not-a-date">;
        type Invalid5 = ParseDate<"2024-06-15Tnot-a-time">;

        type cases = [
            Expect<Test<Invalid1, "isError", "parse/date">>,
            Expect<Test<Invalid2, "isError", "parse/date">>,
            Expect<Test<Invalid3, "isError", "parse/date">>,
            Expect<Test<Invalid4, "isError", "parse/date">>,
            // For Invalid5, the time part should be an Error
            Expect<Test<Invalid5[3], "isError", "parse/time">>
        ];
    });

    it("error cases - wide string types", () => {
        type WideString = ParseDate<string>;

        type cases = [
            Expect<IsError<WideString>>
        ];
    });

    it("edge cases", () => {
        type LeapYear = ParseDate<"2020-02-29">;
        // Remove MinDate and MaxDate if not supported by parser

        type cases = [
            Expect<Test<
                LeapYear, "equals",
                [ "2020", "02", "29" ]
            >>
        ];
    });

});
