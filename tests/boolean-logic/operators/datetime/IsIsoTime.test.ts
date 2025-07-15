import { describe, it } from "vitest";
import {
    Expect,
    IsIsoTime,
    Test,
} from "inferred-types/types";

describe("IsIsoTime<T>", () => {

    it("valid HH:MM format", () => {
        type ValidMinimal1 = IsIsoTime<"00:00">;
        type ValidMinimal2 = IsIsoTime<"12:34">;
        type ValidMinimal3 = IsIsoTime<"23:59">;
        type ValidMinimal4 = IsIsoTime<"09:15">;

        type cases = [
            Expect<Test<ValidMinimal1, "equals", true>>,
            Expect<Test<ValidMinimal2, "equals", true>>,
            Expect<Test<ValidMinimal3, "equals", true>>,
            Expect<Test<ValidMinimal4, "equals", true>>
        ];
    });

    it("valid HH:MM:SS format", () => {
        type ValidSeconds1 = IsIsoTime<"00:00:00">;
        type ValidSeconds2 = IsIsoTime<"12:34:56">;
        type ValidSeconds3 = IsIsoTime<"23:59:59">;
        type ValidSeconds4 = IsIsoTime<"01:23:45">;

        type cases = [
            Expect<Test<ValidSeconds1, "equals", true>>,
            Expect<Test<ValidSeconds2, "equals", true>>,
            Expect<Test<ValidSeconds3, "equals", true>>,
            Expect<Test<ValidSeconds4, "equals", true>>
        ];
    });

    it("valid HH:MM:SS.mmm format", () => {
        type ValidMillis1 = IsIsoTime<"00:00:00.000">;
        type ValidMillis2 = IsIsoTime<"12:34:56.123">;
        type ValidMillis3 = IsIsoTime<"23:59:59.999">;
        type ValidMillis4 = IsIsoTime<"14:30:45.789">;

        type cases = [
            Expect<Test<ValidMillis1, "equals", true>>,
            Expect<Test<ValidMillis2, "equals", true>>,
            Expect<Test<ValidMillis3, "equals", true>>,
            Expect<Test<ValidMillis4, "equals", true>>
        ];
    });

    it("valid times with UTC timezone (Z)", () => {
        type WithUTC1 = IsIsoTime<"12:34Z">;
        type WithUTC2 = IsIsoTime<"12:34:56Z">;
        type WithUTC3 = IsIsoTime<"12:34:56.789Z">;
        type WithUTC4 = IsIsoTime<"00:00:00.000Z">;
        type WithUTC5 = IsIsoTime<"23:59:59.999Z">;

        type cases = [
            Expect<Test<WithUTC1, "equals", true>>,
            Expect<Test<WithUTC2, "equals", true>>,
            Expect<Test<WithUTC3, "equals", true>>,
            Expect<Test<WithUTC4, "equals", true>>,
            Expect<Test<WithUTC5, "equals", true>>
        ];
    });

    it("valid times with positive timezone offsets", () => {
        type WithPlus1 = IsIsoTime<"12:34+01">;
        type WithPlus2 = IsIsoTime<"12:34:56+05">;
        type WithPlus3 = IsIsoTime<"12:34:56.789+0530">;
        type WithPlus4 = IsIsoTime<"09:15+02:00">;
        type WithPlus5 = IsIsoTime<"14:30:45+08:30">;
        type WithPlus6 = IsIsoTime<"16:20:10.456+12:00">;

        type cases = [
            Expect<Test<WithPlus1, "equals", true>>,
            Expect<Test<WithPlus2, "equals", true>>,
            Expect<Test<WithPlus3, "equals", true>>,
            Expect<Test<WithPlus4, "equals", true>>,
            Expect<Test<WithPlus5, "equals", true>>,
            Expect<Test<WithPlus6, "equals", true>>
        ];
    });

    it("valid times with negative timezone offsets", () => {
        type WithMinus1 = IsIsoTime<"12:34-01">;
        type WithMinus2 = IsIsoTime<"12:34:56-05">;
        type WithMinus3 = IsIsoTime<"12:34:56.789-0800">;
        type WithMinus4 = IsIsoTime<"18:45-07:00">;
        type WithMinus5 = IsIsoTime<"20:15:30-04:30">;
        type WithMinus6 = IsIsoTime<"22:30:45.123-11:00">;

        type cases = [
            Expect<Test<WithMinus1, "equals", true>>,
            Expect<Test<WithMinus2, "equals", true>>,
            Expect<Test<WithMinus3, "equals", true>>,
            Expect<Test<WithMinus4, "equals", true>>,
            Expect<Test<WithMinus5, "equals", true>>,
            Expect<Test<WithMinus6, "equals", true>>
        ];
    });

    it("edge cases - midnight and boundaries", () => {
        type Midnight1 = IsIsoTime<"00:00">;
        type Midnight2 = IsIsoTime<"00:00:00">;
        type Midnight3 = IsIsoTime<"00:00:00.000">;
        type Midnight4 = IsIsoTime<"00:00:00.000Z">;

        type EndOfDay1 = IsIsoTime<"23:59">;
        type EndOfDay2 = IsIsoTime<"23:59:59">;
        type EndOfDay3 = IsIsoTime<"23:59:59.999">;
        type EndOfDay4 = IsIsoTime<"23:59:59.999Z">;

        type Noon1 = IsIsoTime<"12:00">;
        type Noon2 = IsIsoTime<"12:00:00">;
        type Noon3 = IsIsoTime<"12:00:00.000Z">;

        type cases = [
            Expect<Test<Midnight1, "equals", true>>,
            Expect<Test<Midnight2, "equals", true>>,
            Expect<Test<Midnight3, "equals", true>>,
            Expect<Test<Midnight4, "equals", true>>,
            Expect<Test<EndOfDay1, "equals", true>>,
            Expect<Test<EndOfDay2, "equals", true>>,
            Expect<Test<EndOfDay3, "equals", true>>,
            Expect<Test<EndOfDay4, "equals", true>>,
            Expect<Test<Noon1, "equals", true>>,
            Expect<Test<Noon2, "equals", true>>,
            Expect<Test<Noon3, "equals", true>>
        ];
    });

    it("invalid hour values", () => {
        type InvalidHour1 = IsIsoTime<"24:00">;
        type InvalidHour2 = IsIsoTime<"25:30">;
        type InvalidHour3 = IsIsoTime<"99:15">;
        type InvalidHour4 = IsIsoTime<"-1:30">;
        type InvalidHour5 = IsIsoTime<"ab:30">;

        type cases = [
            Expect<Test<InvalidHour1, "equals", false>>,
            Expect<Test<InvalidHour2, "equals", false>>,
            Expect<Test<InvalidHour3, "equals", false>>,
            Expect<Test<InvalidHour4, "equals", false>>,
            Expect<Test<InvalidHour5, "equals", false>>
        ];
    });

    it("invalid minute values", () => {
        type InvalidMinute1 = IsIsoTime<"12:60">;
        type InvalidMinute2 = IsIsoTime<"12:99">;
        type InvalidMinute3 = IsIsoTime<"12:-1">;
        type InvalidMinute4 = IsIsoTime<"12:ab">;
        type InvalidMinute5 = IsIsoTime<"12:1">;  // Single digit minute

        type cases = [
            Expect<Test<InvalidMinute1, "equals", false>>,
            Expect<Test<InvalidMinute2, "equals", false>>,
            Expect<Test<InvalidMinute3, "equals", false>>,
            Expect<Test<InvalidMinute4, "equals", false>>,
            Expect<Test<InvalidMinute5, "equals", false>>
        ];
    });

    it("invalid second values", () => {
        type InvalidSecond1 = IsIsoTime<"12:30:60">;
        type InvalidSecond2 = IsIsoTime<"12:30:99">;
        type InvalidSecond3 = IsIsoTime<"12:30:-1">;
        type InvalidSecond4 = IsIsoTime<"12:30:ab">;
        type InvalidSecond5 = IsIsoTime<"12:30:5">;  // Single digit second

        type cases = [
            Expect<Test<InvalidSecond1, "equals", false>>,
            Expect<Test<InvalidSecond2, "equals", false>>,
            Expect<Test<InvalidSecond3, "equals", false>>,
            Expect<Test<InvalidSecond4, "equals", false>>,
            Expect<Test<InvalidSecond5, "equals", false>>
        ];
    });

    it("malformed format structures", () => {
        type MissingMinute = IsIsoTime<"12">;
        type MissingColon1 = IsIsoTime<"1234">;
        type ExtraDigits = IsIsoTime<"12:345">;        // "345" can't be parsed as valid MM:SS
        type ExtraColon = IsIsoTime<"12:34:56:78">;
        type WrongSeparator1 = IsIsoTime<"12-34">;
        type WrongSeparator2 = IsIsoTime<"12.34.56">;
        type ExtraChars = IsIsoTime<"12:34extra">;
        type ThreeDigitHour = IsIsoTime<"123:45">;     // "123" is not a valid TwoDigitHour

        type cases = [
            Expect<Test<MissingMinute, "equals", false>>,
            Expect<Test<MissingColon1, "equals", false>>,
            Expect<Test<ExtraDigits, "equals", false>>,
            Expect<Test<ExtraColon, "equals", false>>,
            Expect<Test<WrongSeparator1, "equals", false>>,
            Expect<Test<WrongSeparator2, "equals", false>>,
            Expect<Test<ExtraChars, "equals", false>>,
            Expect<Test<ThreeDigitHour, "equals", false>>
        ];
    });

    it("invalid timezone formats", () => {
        type InvalidTZ1 = IsIsoTime<"12:34+25:00">;  // Invalid hour offset
        type InvalidTZ2 = IsIsoTime<"12:34-25:00">;  // Invalid hour offset
        type InvalidTZ3 = IsIsoTime<"12:34+12:60">;  // Invalid minute offset
        type InvalidTZ4 = IsIsoTime<"12:34X">;       // Invalid timezone marker
        type InvalidTZ5 = IsIsoTime<"12:34+abc">;    // Non-numeric offset
        type InvalidTZ6 = IsIsoTime<"12:34++01">;    // Double plus

        type cases = [
            Expect<Test<InvalidTZ1, "equals", false>>,
            Expect<Test<InvalidTZ2, "equals", false>>,
            Expect<Test<InvalidTZ3, "equals", false>>,
            Expect<Test<InvalidTZ4, "equals", false>>,
            Expect<Test<InvalidTZ5, "equals", false>>,
            Expect<Test<InvalidTZ6, "equals", false>>
        ];
    });

    it("completely invalid strings", () => {
        type NotTime1 = IsIsoTime<"hello">;
        type NotTime2 = IsIsoTime<"123456">;
        type NotTime3 = IsIsoTime<"date: 2023-01-01">;
        type NotTime4 = IsIsoTime<"">;
        type NotTime5 = IsIsoTime<"null">;
        type NotTime6 = IsIsoTime<"undefined">;

        type cases = [
            Expect<Test<NotTime1, "equals", false>>,
            Expect<Test<NotTime2, "equals", false>>,
            Expect<Test<NotTime3, "equals", false>>,
            Expect<Test<NotTime4, "equals", false>>,
            Expect<Test<NotTime5, "equals", false>>,
            Expect<Test<NotTime6, "equals", false>>
        ];
    });

    it("wide string types", () => {
        type WideString = IsIsoTime<string>;
        type StringUnion = IsIsoTime<"12:34" | "invalid">;
        type MixedUnion = IsIsoTime<"12:34" | 42>;

        type cases = [
            Expect<Test<WideString, "equals", false>>,
            Expect<Test<StringUnion, "equals", boolean>>,  // Mixed union results in boolean
            Expect<Test<MixedUnion, "equals", boolean>>    // Mixed union results in boolean
        ];
    });

    it("non-string types", () => {
        type Numeric = IsIsoTime<42>;
        type Boolean = IsIsoTime<true>;
        type Array = IsIsoTime<[]>;
        type Object = IsIsoTime<{}>;
        type Null = IsIsoTime<null>;
        type Undefined = IsIsoTime<undefined>;

        type cases = [
            Expect<Test<Numeric, "equals", false>>,
            Expect<Test<Boolean, "equals", false>>,
            Expect<Test<Array, "equals", false>>,
            Expect<Test<Object, "equals", false>>,
            Expect<Test<Null, "equals", false>>,
            Expect<Test<Undefined, "equals", false>>
        ];
    });

    it("comprehensive valid format coverage", () => {
        // Testing all valid combinations systematically
        type Format1 = IsIsoTime<"01:23">;                    // HH:MM
        type Format2 = IsIsoTime<"01:23Z">;                   // HH:MM + UTC
        type Format3 = IsIsoTime<"01:23+05">;                 // HH:MM + TZ(short)
        type Format4 = IsIsoTime<"01:23+0530">;               // HH:MM + TZ(compact)
        type Format5 = IsIsoTime<"01:23+05:30">;              // HH:MM + TZ(extended)

        type Format6 = IsIsoTime<"01:23:45">;                 // HH:MM:SS
        type Format7 = IsIsoTime<"01:23:45Z">;                // HH:MM:SS + UTC
        type Format8 = IsIsoTime<"01:23:45-08">;              // HH:MM:SS + TZ(short)
        type Format9 = IsIsoTime<"01:23:45-0800">;            // HH:MM:SS + TZ(compact)
        type Format10 = IsIsoTime<"01:23:45-08:00">;          // HH:MM:SS + TZ(extended)

        type Format11 = IsIsoTime<"01:23:45.678">;            // HH:MM:SS.mmm
        type Format12 = IsIsoTime<"01:23:45.678Z">;           // HH:MM:SS.mmm + UTC
        type Format13 = IsIsoTime<"01:23:45.678+09">;         // HH:MM:SS.mmm + TZ(short)
        type Format14 = IsIsoTime<"01:23:45.678+0900">;       // HH:MM:SS.mmm + TZ(compact)
        type Format15 = IsIsoTime<"01:23:45.678+09:00">;      // HH:MM:SS.mmm + TZ(extended)


        type cases = [
            Expect<Test<Format1, "equals", true>>,
            Expect<Test<Format2, "equals", true>>,
            Expect<Test<Format3, "equals", true>>,
            Expect<Test<Format4, "equals", true>>,
            Expect<Test<Format5, "equals", true>>,
            Expect<Test<Format6, "equals", true>>,
            Expect<Test<Format7, "equals", true>>,
            Expect<Test<Format8, "equals", true>>,
            Expect<Test<Format9, "equals", true>>,
            Expect<Test<Format10, "equals", true>>,
            Expect<Test<Format11, "equals", true>>,
            Expect<Test<Format12, "equals", true>>,
            Expect<Test<Format13, "equals", true>>,
            Expect<Test<Format14, "equals", true>>,
            Expect<Test<Format15, "equals", true>>
        ];
    });

});
