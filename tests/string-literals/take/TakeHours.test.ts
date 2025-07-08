import { describe, it } from "vitest";
import {
    Expect,
    Test,
    TakeHours
} from "inferred-types/types";

describe("TakeHours<T>", () => {

    it("happy path - strings starting with valid hours", () => {
        type T1 = TakeHours<"00:00:00">;
        type T2 = TakeHours<"12:30:45">;
        type T3 = TakeHours<"23:59:59">;
        type T4 = TakeHours<"09AM">;
        type T5 = TakeHours<"18:00">;
        type T6 = TakeHours<"01 hour past midnight">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "00", rest: ":00:00" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "12", rest: ":30:45" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "23", rest: ":59:59" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "09", rest: "AM" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "18", rest: ":00" }
            >>,
            Expect<Test<
                T6, "equals",
                { take: "01", rest: " hour past midnight" }
            >>,
        ];
    });

    it("non-matching - strings not starting with valid hours", () => {
        type T1 = TakeHours<"abc12">;
        type T2 = TakeHours<"The hour 12">;
        type T3 = TakeHours<" 12 has leading space">;
        type T4 = TakeHours<"Hour: 12">;
        type T5 = TakeHours<"-12 is negative">;
        type T6 = TakeHours<"hello world">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "abc12" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "The hour 12" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: " 12 has leading space" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "Hour: 12" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: null, rest: "-12 is negative" }
            >>,
            Expect<Test<
                T6, "equals",
                { take: null, rest: "hello world" }
            >>,
        ];
    });

    it("invalid hours - 24 and above", () => {
        type T1 = TakeHours<"24:00:00">;
        type T2 = TakeHours<"25:30:00">;
        type T3 = TakeHours<"30:00:00">;
        type T4 = TakeHours<"99:99:99">;
        type T5 = TakeHours<"24 hours">;
        type T6 = TakeHours<"29 o'clock">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "24:00:00" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "25:30:00" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "30:00:00" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "99:99:99" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: null, rest: "24 hours" }
            >>,
            Expect<Test<
                T6, "equals",
                { take: null, rest: "29 o'clock" }
            >>,
        ];
    });

    it("single digit hours", () => {
        type T1 = TakeHours<"0">;
        type T2 = TakeHours<"1">;
        type T3 = TakeHours<"9">;
        type T4 = TakeHours<"5:30">;
        type T5 = TakeHours<"8AM">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "0" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "1" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "9" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "5:30" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: null, rest: "8AM" }
            >>,
        ];
    });

    it("exactly 2 digits", () => {
        type T1 = TakeHours<"00">;
        type T2 = TakeHours<"12">;
        type T3 = TakeHours<"23">;
        type T4 = TakeHours<"01">;
        type T5 = TakeHours<"09">;
        type T6 = TakeHours<"15">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "00", rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "12", rest: "" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "23", rest: "" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "01", rest: "" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "09", rest: "" }
            >>,
            Expect<Test<
                T6, "equals",
                { take: "15", rest: "" }
            >>,
        ];
    });

    it("boundary hours", () => {
        type T1 = TakeHours<"00:00:00">;  // Midnight
        type T2 = TakeHours<"23:59:59">;  // Last valid hour
        type T3 = TakeHours<"12:00:00">;  // Noon
        type T4 = TakeHours<"20:00:00">;  // 8 PM
        type T5 = TakeHours<"19:59:59">;  // Last hour starting with 1
        type T6 = TakeHours<"10:00:00">;  // First double-digit hour

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "00", rest: ":00:00" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "23", rest: ":59:59" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "12", rest: ":00:00" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "20", rest: ":00:00" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "19", rest: ":59:59" }
            >>,
            Expect<Test<
                T6, "equals",
                { take: "10", rest: ":00:00" }
            >>,
        ];
    });

    it("mixed numeric and non-numeric in first 2 chars", () => {
        type T1 = TakeHours<"1a">;
        type T2 = TakeHours<"2x:00">;
        type T3 = TakeHours<"0.5">;
        type T4 = TakeHours<"1-2">;
        type T5 = TakeHours<"a1">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "1a" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "2x:00" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "0.5" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "1-2" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: null, rest: "a1" }
            >>,
        ];
    });

    it("edge cases", () => {
        type T1 = TakeHours<"">;  // Empty string
        type T2 = TakeHours<":">;  // Single non-numeric
        type T3 = TakeHours<"  ">;  // Spaces

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: ":" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "  " }
            >>,
        ];
    });

    it("wide string types", () => {
        type T1 = TakeHours<string>;
        type T2 = TakeHours<`${string}12`>;
        type T3 = TakeHours<`12${string}`>;
        type T4 = TakeHours<`${number}${number}`>;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: string | null, rest: string }
            >>,
            Expect<Test<
                T2, "equals",
                { take: string | null, rest: string }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "12", rest: string }
            >>,
            Expect<Test<
                T4, "equals",
                { take: string | null, rest: string }
            >>,
        ];
    });

    it("various time formats in context", () => {
        type T1 = TakeHours<"12:30:45.123Z">;  // ISO time with milliseconds
        type T2 = TakeHours<"09:15AM EST">;    // 12-hour format with timezone
        type T3 = TakeHours<"23:59:59+01:00">; // Time with timezone offset
        type T4 = TakeHours<"00:00:00.000">;   // Midnight with milliseconds
        type T5 = TakeHours<"17:45">;          // Simple HH:MM format

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "12", rest: ":30:45.123Z" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "09", rest: ":15AM EST" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "23", rest: ":59:59+01:00" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "00", rest: ":00:00.000" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "17", rest: ":45" }
            >>,
        ];
    });

    it("all valid two-digit hours", () => {
        type T00 = TakeHours<"00">;
        type T05 = TakeHours<"05">;
        type T10 = TakeHours<"10">;
        type T15 = TakeHours<"15">;
        type T20 = TakeHours<"20">;
        type T23 = TakeHours<"23">;

        type cases = [
            Expect<Test<T00, "equals", { take: "00", rest: "" }>>,
            Expect<Test<T05, "equals", { take: "05", rest: "" }>>,
            Expect<Test<T10, "equals", { take: "10", rest: "" }>>,
            Expect<Test<T15, "equals", { take: "15", rest: "" }>>,
            Expect<Test<T20, "equals", { take: "20", rest: "" }>>,
            Expect<Test<T23, "equals", { take: "23", rest: "" }>>,
        ];
    });

    it("TIgnoreLeading functionality", () => {
        // Ignore leading colon in time formats
        type IgnoreColon1 = TakeHours<":12:30:45", ":">;
        type CIgnoreColon1 = Expect<Test<IgnoreColon1, "equals", { take: "12", rest: ":30:45" }>>;

        type IgnoreColon2 = TakeHours<":09AM", ":">;
        type CIgnoreColon2 = Expect<Test<IgnoreColon2, "equals", { take: "09", rest: "AM" }>>;

        // Ignore leading T in ISO datetime format
        type IgnoreT = TakeHours<"T14:30:00", "T">;
        type CIgnoreT = Expect<Test<IgnoreT, "equals", { take: "14", rest: ":30:00" }>>;

        // Ignore leading space
        type IgnoreSpace = TakeHours<" 08:00", " ">;
        type CIgnoreSpace = Expect<Test<IgnoreSpace, "equals", { take: "08", rest: ":00" }>>;

        // Ignore leading dash
        type IgnoreDash = TakeHours<"-23:59", "-">;
        type CIgnoreDash = Expect<Test<IgnoreDash, "equals", { take: "23", rest: ":59" }>>;

        // No leading character to ignore - should work normally
        type NoLeading = TakeHours<"15:30", ":">;
        type CNoLeading = Expect<Test<NoLeading, "equals", { take: "15", rest: ":30" }>>;

        // Invalid hour after ignoring leading character
        type InvalidAfterIgnore = TakeHours<":24:00", ":">;
        type CInvalidAfterIgnore = Expect<Test<InvalidAfterIgnore, "equals", { take: null, rest: "24:00" }>>;
    });

});
