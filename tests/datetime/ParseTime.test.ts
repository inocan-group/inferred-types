import { describe, it } from "vitest";
import {
    Expect,
    ParseTime,
    Test,
} from "inferred-types/types";

describe("ParseTime<T>", () => {

    it("HH:MM format only", () => {
        type T1 = ParseTime<"12:55">;
        type T2 = ParseTime<"00:00">;
        type T3 = ParseTime<"23:59">;

        type cases = [
            Expect<Test<
                T1, "equals",
                [ "12", "55", undefined, undefined, undefined ]
            >>,
            Expect<Test<
                T2, "equals",
                [ "00", "00", undefined, undefined, undefined ]
            >>,
            Expect<Test<
                T3, "equals",
                [ "23", "59", undefined, undefined, undefined ]
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
                [ "12", "55", undefined, undefined, "Z" ]
            >>,
            Expect<Test<
                Plus, "equals",
                [ "13", "01", undefined, undefined, "+01" ]
            >>,
            Expect<Test<
                PlusExtended, "equals",
                [ "14", "30", undefined, undefined, "+05:30" ]
            >>,
            Expect<Test<
                Minus, "equals",
                [ "20", "59", undefined, undefined, "-01:30" ]
            >>,
            Expect<Test<
                MinusShort, "equals",
                [ "15", "45", undefined, undefined, "-08" ]
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
                [ "14", "30", "45", undefined, undefined ]
            >>,
            Expect<Test<
                T2, "equals",
                [ "00", "00", "00", undefined, undefined ]
            >>,
            Expect<Test<
                T3, "equals",
                [ "23", "59", "59", undefined, undefined ]
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
                [ "14", "30", "45", undefined, "Z" ]
            >>,
            Expect<Test<
                Plus, "equals",
                [ "09", "15", "30", undefined, "+02:00" ]
            >>,
            Expect<Test<
                Minus, "equals",
                [ "18", "45", "12", undefined, "-05:00" ]
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
                [ "14", "30", "45", "123", undefined ]
            >>,
            Expect<Test<
                T2, "equals",
                [ "00", "00", "00", "000", undefined ]
            >>,
            Expect<Test<
                T3, "equals",
                [ "23", "59", "59", "999", undefined ]
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
                [ "14", "30", "45", "123", "Z" ]
            >>,
            Expect<Test<
                Plus, "equals",
                [ "09", "15", "30", "456", "+02:00" ]
            >>,
            Expect<Test<
                Minus, "equals",
                [ "18", "45", "12", "789", "-05:30" ]
            >>
        ];
    });

    it("error cases - invalid formats", () => {
        type Invalid1 = ParseTime<"25:00">; // Invalid hour
        type Invalid2 = ParseTime<"12:60">; // Invalid minute
        type Invalid3 = ParseTime<"12">; // Missing minute
        type Invalid4 = ParseTime<"12:30:60">; // Invalid second
        type Invalid5 = ParseTime<"not-a-time">;

        type cases = [
            // These should all return Error types
            Expect<Test<Invalid1, "extends", Error>>,
            Expect<Test<Invalid2, "extends", Error>>,
            Expect<Test<Invalid3, "extends", Error>>,
            Expect<Test<Invalid4, "extends", Error>>,
            Expect<Test<Invalid5, "extends", Error>>
        ];
    });

    it("error cases - wide string types", () => {
        type WideString = ParseTime<string>;

        type cases = [
            Expect<Test<WideString, "extends", Error>>
        ];
    });

    it("edge cases", () => {
        type Midnight = ParseTime<"00:00:00.000Z">;
        type EndOfDay = ParseTime<"23:59:59.999Z">;
        type Noon = ParseTime<"12:00:00Z">;

        type cases = [
            Expect<Test<
                Midnight, "equals",
                [ "00", "00", "00", "000", "Z" ]
            >>,
            Expect<Test<
                EndOfDay, "equals",
                [ "23", "59", "59", "999", "Z" ]
            >>,
            Expect<Test<
                Noon, "equals",
                [ "12", "00", "00", undefined, "Z" ]
            >>
        ];
    });

});
