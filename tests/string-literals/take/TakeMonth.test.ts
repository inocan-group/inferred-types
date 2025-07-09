import type { TakeMonth, Equals, Expect, TwoDigitMonth } from "inferred-types/types";
import { describe, it } from "vitest";

describe("TakeMonth", () => {
    it("valid months (01-12)", () => {
        // Valid months from 01 to 12
        type T01 = TakeMonth<"01abc">;
        type C01 = Expect<Equals<T01, { take: TwoDigitMonth<"01">, rest: "abc" }>>;

        type T02 = TakeMonth<"02xyz">;
        type C02 = Expect<Equals<T02, { take: TwoDigitMonth<"02">, rest: "xyz" }>>;

        type T03 = TakeMonth<"03">;
        type C03 = Expect<Equals<T03, { take: TwoDigitMonth<"03">, rest: "" }>>;

        type T06 = TakeMonth<"06-15">;
        type C06 = Expect<Equals<T06, { take: TwoDigitMonth<"06">, rest: "-15" }>>;

        type T09 = TakeMonth<"09">;
        type C09 = Expect<Equals<T09, { take: TwoDigitMonth<"09">, rest: "" }>>;

        type T10 = TakeMonth<"10">;
        type C10 = Expect<Equals<T10, { take: TwoDigitMonth<"10">, rest: "" }>>;

        type T11 = TakeMonth<"11abc">;
        type C11 = Expect<Equals<T11, { take: TwoDigitMonth<"11">, rest: "abc" }>>;

        type T12 = TakeMonth<"12-31">;
        type C12 = Expect<Equals<T12, { take: TwoDigitMonth<"12">, rest: "-31" }>>;
    });

    it("invalid months (00, 13-99)", () => {
        // Month 00 is not valid
        type T00 = TakeMonth<"00abc">;
        type C00 = Expect<Equals<T00, { take: null, rest: "00abc" }>>;

        // Months above 12 are not valid
        type T13 = TakeMonth<"13">;
        type C13 = Expect<Equals<T13, { take: null, rest: "13" }>>;

        type T20 = TakeMonth<"20">;
        type C20 = Expect<Equals<T20, { take: null, rest: "20" }>>;

        type T99 = TakeMonth<"99">;
        type C99 = Expect<Equals<T99, { take: null, rest: "99" }>>;
    });

    it("non-numeric strings", () => {
        type NonNumeric1 = TakeMonth<"abc">;
        type CNonNumeric1 = Expect<Equals<NonNumeric1, { take: null, rest: "abc" }>>;

        type NonNumeric2 = TakeMonth<"x1">;
        type CNonNumeric2 = Expect<Equals<NonNumeric2, { take: null, rest: "x1" }>>;

        type NonNumeric3 = TakeMonth<"1x">;
        type CNonNumeric3 = Expect<Equals<NonNumeric3, { take: null, rest: "1x" }>>;
    });

    it("single digit strings", () => {
        type Single1 = TakeMonth<"1">;
        type CSingle1 = Expect<Equals<Single1, { take: null, rest: "1" }>>;

        type Single2 = TakeMonth<"9">;
        type CSingle2 = Expect<Equals<Single2, { take: null, rest: "9" }>>;
    });

    it("empty string", () => {
        type Empty = TakeMonth<"">;
        type CEmpty = Expect<Equals<Empty, { take: null, rest: "" }>>;
    });

    it("wide string handling", () => {
        type WideString = TakeMonth<string>;
        type CWideString = Expect<Equals<WideString, { take: string | null, rest: string }>>;
    });

    it("months with various following content", () => {
        type WithDash = TakeMonth<"01-15">;
        type CWithDash = Expect<Equals<WithDash, { take: "01", rest: "-15" }>>;

        type WithSlash = TakeMonth<"12/31">;
        type CWithSlash = Expect<Equals<WithSlash, { take: "12", rest: "/31" }>>;

        type WithT = TakeMonth<"07T12:00:00">;
        type CWithT = Expect<Equals<WithT, { take: "07", rest: "T12:00:00" }>>;

        type WithSpace = TakeMonth<"03 March">;
        type CWithSpace = Expect<Equals<WithSpace, { take: "03", rest: " March" }>>;
    });

    it("TIgnoreLeading functionality", () => {
        // Ignore leading dash
        type IgnoreDash1 = TakeMonth<"-01abc", "-">;
        type CIgnoreDash1 = Expect<Equals<IgnoreDash1, { take: "01", rest: "abc" }>>;

        type IgnoreDash2 = TakeMonth<"-12-31", "-">;
        type CIgnoreDash2 = Expect<Equals<IgnoreDash2, { take: "12", rest: "-31" }>>;

        // Ignore leading slash
        type IgnoreSlash = TakeMonth<"/06xyz", "/">;
        type CIgnoreSlash = Expect<Equals<IgnoreSlash, { take: "06", rest: "xyz" }>>;

        // Ignore leading colon
        type IgnoreColon = TakeMonth<":03test", ":">;
        type CIgnoreColon = Expect<Equals<IgnoreColon, { take: "03", rest: "test" }>>;

        // Ignore leading dot
        type IgnoreDot = TakeMonth<".09end", ".">;
        type CIgnoreDot = Expect<Equals<IgnoreDot, { take: "09", rest: "end" }>>;

        // No leading character to ignore - should work normally
        type NoLeading = TakeMonth<"11abc", "-">;
        type CNoLeading = Expect<Equals<NoLeading, { take: "11", rest: "abc" }>>;

        // Invalid month after ignoring leading character
        type InvalidAfterIgnore = TakeMonth<"-00abc", "-">;
        type CInvalidAfterIgnore = Expect<Equals<InvalidAfterIgnore, { take: null, rest: "00abc" }>>;
    });
});
