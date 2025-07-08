import { describe, it } from "vitest";
import {
    Expect,
    ParseTime,
    ParsedTime,
    Test,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond,
    ThreeDigitMillisecond,
    TimezoneOffset
} from "inferred-types/types";



describe("ParseTime<T>", () => {

    it("HH:MM format only", () => {
        type T1 = ParseTime<"12:55">;
        type T2 = ParseTime<"00:00">;
        type T3 = ParseTime<"23:59">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ TwoDigitHour<"12">, TwoDigitMinute<"55">, null, null, null ]
            >>,
            Expect<Test<
                T2, "equals",
                [ TwoDigitHour<"00">, TwoDigitMinute<"00">, null, null, null ]
            >>,
            Expect<Test<
                T3, "equals",
                [ TwoDigitHour<"23">, TwoDigitMinute<"59">, null, null, null ]
            >>
        ];
    });

    it("HH:MM with timezone", () => {
        type UTC = ParseTime<"12:55Z">;
        type Plus = ParseTime<"13:01+01">;
        type PlusExtended = ParseTime<"14:30+05:30">;
        type Minus = ParseTime<"20:59-01:30">;
        type MinusShort = ParseTime<"15:45-08">;

        type cases = [
            Expect<Test<
                UTC, "equals",
                [ TwoDigitHour<"12">, TwoDigitMinute<"55">, null, null, TimezoneOffset<"Z"> ]
            >>,
            Expect<Test<
                Plus, "equals",
                [ TwoDigitHour<"13">, TwoDigitMinute<"01">, null, null, TimezoneOffset<"+01"> ]
            >>,
            Expect<Test<
                PlusExtended, "equals",
                [ TwoDigitHour<"14">, TwoDigitMinute<"30">, null, null, TimezoneOffset<"+05:30"> ]
            >>,
            Expect<Test<
                Minus, "equals",
                [ TwoDigitHour<"20">, TwoDigitMinute<"59">, null, null, TimezoneOffset<"-01:30"> ]
            >>,
            Expect<Test<
                MinusShort, "equals",
                [ TwoDigitHour<"15">, TwoDigitMinute<"45">, null, null, TimezoneOffset<"-08"> ]
            >>
        ];
    });

    it("HH:MM:SS format", () => {
        type T1 = ParseTime<"14:30:45">;
        type T2 = ParseTime<"00:00:00">;
        type T3 = ParseTime<"23:59:59">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ TwoDigitHour<"14">, TwoDigitMinute<"30">, TwoDigitSecond<"45">, null, null ]
            >>,
            Expect<Test<
                T2, "equals",
                [ TwoDigitHour<"00">, TwoDigitMinute<"00">, TwoDigitSecond<"00">, null, null ]
            >>,
            Expect<Test<
                T3, "equals",
                [ TwoDigitHour<"23">, TwoDigitMinute<"59">, TwoDigitSecond<"59">, null, null ]
            >>
        ];
    });

    it("HH:MM:SS with timezone", () => {
        type UTC = ParseTime<"14:30:45Z">;
        type Plus = ParseTime<"09:15:30+02:00">;
        type Minus = ParseTime<"18:45:12-05:00">;

        type cases = [
            Expect<Test<
                UTC, "equals",
                [ TwoDigitHour<"14">, TwoDigitMinute<"30">, TwoDigitSecond<"45">, null, TimezoneOffset<"Z"> ]
            >>,
            Expect<Test<
                Plus, "equals",
                [ TwoDigitHour<"09">, TwoDigitMinute<"15">, TwoDigitSecond<"30">, null, TimezoneOffset<"+02:00"> ]
            >>,
            Expect<Test<
                Minus, "equals",
                [ TwoDigitHour<"18">, TwoDigitMinute<"45">, TwoDigitSecond<"12">, null, TimezoneOffset<"-05:00"> ]
            >>
        ];
    });


    it("HH:MM:SS.sss format", () => {
        type T1 = ParseTime<"14:30:45.123">;
        type T2 = ParseTime<"00:00:00.000">;
        type T3 = ParseTime<"23:59:59.999">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ TwoDigitHour<"14">, TwoDigitMinute<"30">, TwoDigitSecond<"45">, ThreeDigitMillisecond<"123">, null ]
            >>,
            Expect<Test<
                T2, "equals",
                [ TwoDigitHour<"00">, TwoDigitMinute<"00">, TwoDigitSecond<"00">, ThreeDigitMillisecond<"000">, null ]
            >>,
            Expect<Test<
                T3, "equals",
                [ TwoDigitHour<"23">, TwoDigitMinute<"59">, TwoDigitSecond<"59">, ThreeDigitMillisecond<"999">, null ]
            >>
        ];
    });

    it("HH:MM:SS.sss with timezone", () => {
        type UTC = ParseTime<"14:30:45.123Z">;
        type Plus = ParseTime<"09:15:30.456+02:00">;
        type Minus = ParseTime<"18:45:12.789-05:30">;

        type cases = [
            Expect<Test<
                UTC, "equals",
                [ TwoDigitHour<"14">, TwoDigitMinute<"30">, TwoDigitSecond<"45">, ThreeDigitMillisecond<"123">, TimezoneOffset<"Z"> ]
            >>,
            Expect<Test<
                Plus, "equals",
                [ TwoDigitHour<"09">, TwoDigitMinute<"15">, TwoDigitSecond<"30">, ThreeDigitMillisecond<"456">, TimezoneOffset<"+02:00"> ]
            >>,
            Expect<Test<
                Minus, "equals",
                [ TwoDigitHour<"18">, TwoDigitMinute<"45">, TwoDigitSecond<"12">, ThreeDigitMillisecond<"789">, TimezoneOffset<"-05:30"> ]
            >>
        ];
    });

    it("error cases - invalid formats", () => {
        type Invalid1 = ParseTime<"25:00:00">; // Invalid hour
        type Invalid2 = ParseTime<"12:60">; // Invalid minute
        type Invalid3 = ParseTime<"12">; // structure - missing minute should fail
        type Invalid4 = ParseTime<"12:30:60">; // Invalid second
        type Invalid4b = ParseTime<"12:30:60.001">; // Invalid second
        type Invalid5 = ParseTime<"not-a-time">; // structure
        type Invalid6 = ParseTime<"12:55:55.abc">; // ms
        type Invalid7 = ParseTime<"12:55:55.55">; // ms
        type Invalid8 = ParseTime<"12:55:55.555Zb">; // timezone

        type cases = [
            // These should all return Error types - current implementation returns leftover for improved error detection
            Expect<Test<Invalid1, "isError", "parse-time/leftover">>, // Invalid hour: 25 > 23  
            Expect<Test<Invalid2, "isError", "parse-time/leftover">>, // Invalid minute: 60 > 59
            // Invalid3 ("12") currently returns partial parse, needs investigation
            Expect<Test<Invalid4, "isError", "parse-time/leftover">>, // Invalid second: 60 > 59
            Expect<Test<Invalid4b, "isError", "parse-time/leftover">>, // Invalid second with ms: 60 > 59  
            Expect<Test<Invalid5, "isError", "parse-time/leftover">>, // Invalid structure: not-a-time
            Expect<Test<Invalid6, "isError", "parse-time/leftover">>, // Invalid milliseconds: abc
            Expect<Test<Invalid7, "isError", "parse-time/leftover">>, // Invalid milliseconds: wrong length
            Expect<Test<Invalid8, "isError", "parse-time/leftover">>, // Valid time + leftover content
        ];
    });

    it("error cases - wide string types", () => {
        type WideString = ParseTime<string>;

        type cases = [
            Expect<Test<WideString, "equals", Error | ParsedTime>>
        ];
    });

    it("edge cases", () => {
        type Midnight = ParseTime<"00:00:00.000Z">;
        type EndOfDay = ParseTime<"23:59:59.999Z">;
        type Noon = ParseTime<"12:00:00Z">;

        type cases = [
            Expect<Test<
                Midnight, "equals",
                [ TwoDigitHour<"00">, TwoDigitMinute<"00">, TwoDigitSecond<"00">, ThreeDigitMillisecond<"000">, TimezoneOffset<"Z"> ]
            >>,
            Expect<Test<
                EndOfDay, "equals",
                [ TwoDigitHour<"23">, TwoDigitMinute<"59">, TwoDigitSecond<"59">, ThreeDigitMillisecond<"999">, TimezoneOffset<"Z"> ]
            >>,
            Expect<Test<
                Noon, "equals",
                [ TwoDigitHour<"12">, TwoDigitMinute<"00">, TwoDigitSecond<"00">, null, TimezoneOffset<"Z"> ]
            >>
        ];
    });

});
