import type { TakeMonth, Equals, Expect, TwoDigitMonth, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("TakeMonth", () => {
    it("valid months (01-12)", () => {
        // Valid months from 01 to 12
        type T01 = TakeMonth<"01abc">;
        type T02 = TakeMonth<"02xyz">;
        type T03 = TakeMonth<"03">;
        type T06 = TakeMonth<"06-15">;
        type T09 = TakeMonth<"09">;
        type T10 = TakeMonth<"10">;
        type T11 = TakeMonth<"11abc">;
        type T12 = TakeMonth<"12-31">;

        type cases = [
            Expect<Equals<T01, { take: TwoDigitMonth<"01">, rest: "abc" }>>,
            Expect<Equals<T02, { take: TwoDigitMonth<"02">, rest: "xyz" }>>,
            Expect<Equals<T03, { take: TwoDigitMonth<"03">, rest: "" }>>,
            Expect<Equals<T06, { take: TwoDigitMonth<"06">, rest: "-15" }>>,
            Expect<Equals<T09, { take: TwoDigitMonth<"09">, rest: "" }>>,
            Expect<Equals<T10, { take: TwoDigitMonth<"10">, rest: "" }>>,
            Expect<Equals<T11, { take: TwoDigitMonth<"11">, rest: "abc" }>>,
            Expect<Equals<T12, { take: TwoDigitMonth<"12">, rest: "-31" }>>
        ]
    });

    it("invalid months (00, 13-99)", () => {
        // Month 00 is not valid
        type T00 = TakeMonth<"00abc">;
        // Months above 12 are not valid
        type T13 = TakeMonth<"13">;
        type T20 = TakeMonth<"20">;
        type T99 = TakeMonth<"99">;

        type cases = [
            Expect<Test<T00, "isError", "parse-date">>,
            Expect<Test<T13, "isError", "parse-date">>,
            Expect<Test<T20, "isError", "parse-date">>,
            Expect<Test<T99, "isError", "parse-date">>,
        ]
    });

    it("non-numeric strings", () => {
        type NonNumeric1 = TakeMonth<"abc">;
        type NonNumeric2 = TakeMonth<"x1">;
        type NonNumeric3 = TakeMonth<"1x">;

        type cases = [
            Expect<Test<NonNumeric1, "isError", "parse-date">>,
            Expect<Test<NonNumeric2, "isError", "parse-date">>,
            Expect<Test<NonNumeric3, "isError", "parse-date">>,
        ]
    });

    it("single digit strings", () => {
        type Single1 = TakeMonth<"1">;
        type Single2 = TakeMonth<"9">;

        type cases = [
            Expect<Test<Single1, "isError", "parse-date">>,
            Expect<Test<Single2, "isError", "parse-date">>,
        ]
    });

    it("empty string", () => {
        type Empty = TakeMonth<"">;

        type cases = [
            Expect<Test<Empty, "isError", "parse-date">>,
        ]
    });

    it("wide string handling", () => {
        type WideString = TakeMonth<string>;

        type cases =[
            Expect<Test<
                WideString, "equals",
                { take: TwoDigitMonth<"branded">, rest: string } | Error
            >>
        ]
    });

    it("months with various following content", () => {
        type WithDash = TakeMonth<"01-15">;
        type WithSlash = TakeMonth<"12/31">;
        type WithT = TakeMonth<"07T12:00:00">;
        type WithSpace = TakeMonth<"03 March">;

        type cases = [
            Expect<Equals<WithDash, { take: TwoDigitMonth<"01">, rest: "-15" }>>,
            Expect<Equals<WithSlash, { take: TwoDigitMonth<"12">, rest: "/31" }>>,
            Expect<Equals<WithT, { take: TwoDigitMonth<"07">, rest: "T12:00:00" }>>,
            Expect<Equals<WithSpace, { take: TwoDigitMonth<"03">, rest: " March" }>>
        ]

    });

    it("TIgnoreLeading functionality", () => {
        // Ignore leading dash
        type IgnoreDash1 = TakeMonth<"-01abc", "-">;
        type IgnoreDash2 = TakeMonth<"-12-31", "-">;
        // Ignore leading slash
        type IgnoreSlash = TakeMonth<"/06xyz", "/">;
        // Ignore leading colon
        type IgnoreColon = TakeMonth<":03test", ":">;
        // Ignore leading dot
        type IgnoreDot = TakeMonth<".09end", ".">;
        // No leading character to ignore - should work normally
        type NoLeading = TakeMonth<"11abc", "-">;
        // Invalid month after ignoring leading character
        type InvalidAfterIgnore = TakeMonth<"-00abc", "-">;

        type cases = [
            Expect<Equals<IgnoreDash1, { take: TwoDigitMonth<"01">, rest: "abc" }>>,
            Expect<Equals<IgnoreDash2, { take: TwoDigitMonth<"12">, rest: "-31" }>>,
            Expect<Equals<IgnoreSlash, { take: TwoDigitMonth<"06">, rest: "xyz" }>>,
            Expect<Equals<IgnoreColon, { take: TwoDigitMonth<"03">, rest: "test" }>>,
            Expect<Equals<IgnoreDot, { take: TwoDigitMonth<"09">, rest: "end" }>>,
            Expect<Equals<NoLeading, { take: TwoDigitMonth<"11">, rest: "abc" }>>,
            Expect<Test<InvalidAfterIgnore, "isError", true>>
        ]
    });
});
