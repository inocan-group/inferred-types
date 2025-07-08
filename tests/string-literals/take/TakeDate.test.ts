import { describe, expect, it } from "vitest";
import { TakeDate, Expect, Test } from "inferred-types/types";

describe("TakeDate<T>", () => {

    it("valid dates 01-09", () => {
        type T1 = TakeDate<"01">;
        type T2 = TakeDate<"05rest">;
        type T3 = TakeDate<"09-2024">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "01", rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "05", rest: "rest" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "09", rest: "-2024" }
            >>,
        ];
    });

    it("valid dates 10-19", () => {
        type T1 = TakeDate<"10">;
        type T2 = TakeDate<"15rest">;
        type T3 = TakeDate<"19-2024">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "10", rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "15", rest: "rest" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "19", rest: "-2024" }
            >>,
        ];
    });

    it("valid dates 20-29", () => {
        type T1 = TakeDate<"20">;
        type T2 = TakeDate<"25rest">;
        type T3 = TakeDate<"29-2024">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "20", rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "25", rest: "rest" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "29", rest: "-2024" }
            >>,
        ];
    });

    it("valid dates 30-31", () => {
        type T1 = TakeDate<"30">;
        type T2 = TakeDate<"31rest">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "30", rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "31", rest: "rest" }
            >>,
        ];
    });

    it("invalid dates", () => {
        // Invalid date: 00
        type T1 = TakeDate<"00">;
        // Invalid date: 32
        type T2 = TakeDate<"32">;
        // Invalid date: 40
        type T3 = TakeDate<"40">;
        // Not a date at all
        type T4 = TakeDate<"abc">;
        // Single digit without leading zero
        type T5 = TakeDate<"5">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "00" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "32" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "40" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "abc" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: null, rest: "5" }
            >>,
        ];
    });

    it("wide string type handling", () => {
        type T1 = TakeDate<string>;
        type T2 = TakeDate<`${string}rest`>;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: string | null, rest: string }
            >>,
            Expect<Test<
                T2, "equals",
                { take: string | null, rest: string }
            >>,
        ];
    });

    it("empty string", () => {
        type T1 = TakeDate<"">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "" }
            >>,
        ];
    });

    it("partial strings", () => {
        // Only one character
        type T1 = TakeDate<"0">;
        type T2 = TakeDate<"3">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "0" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "3" }
            >>,
        ];
    });

    it("with longer strings", () => {
        type T1 = TakeDate<"15-12-2024">;
        type T2 = TakeDate<"01T12:34:56Z">;
        type T3 = TakeDate<"31December">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "15", rest: "-12-2024" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "01", rest: "T12:34:56Z" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "31", rest: "December" }
            >>,
        ];
    });

    it("edge cases", () => {
        // Dates that look valid but aren't in the context
        type T1 = TakeDate<"39">;
        type T2 = TakeDate<"99">;
        // Leading zeros with invalid second digit
        type T3 = TakeDate<"0a">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "39" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "99" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "0a" }
            >>,
        ];
    });

    it("all valid two-digit dates", () => {
        type T01 = TakeDate<"01">;
        type T05 = TakeDate<"05">;
        type T10 = TakeDate<"10">;
        type T15 = TakeDate<"15">;
        type T20 = TakeDate<"20">;
        type T25 = TakeDate<"25">;
        type T28 = TakeDate<"28">;
        type T29 = TakeDate<"29">;
        type T30 = TakeDate<"30">;
        type T31 = TakeDate<"31">;

        type cases = [
            Expect<Test<T01, "equals", { take: "01", rest: "" }>>,
            Expect<Test<T05, "equals", { take: "05", rest: "" }>>,
            Expect<Test<T10, "equals", { take: "10", rest: "" }>>,
            Expect<Test<T15, "equals", { take: "15", rest: "" }>>,
            Expect<Test<T20, "equals", { take: "20", rest: "" }>>,
            Expect<Test<T25, "equals", { take: "25", rest: "" }>>,
            Expect<Test<T28, "equals", { take: "28", rest: "" }>>,
            Expect<Test<T29, "equals", { take: "29", rest: "" }>>,
            Expect<Test<T30, "equals", { take: "30", rest: "" }>>,
            Expect<Test<T31, "equals", { take: "31", rest: "" }>>,
        ];
    });

    it("dates in various contexts", () => {
        type T1 = TakeDate<"15/12/2024">;  // Date with slash separator
        type T2 = TakeDate<"01.12.2024">;  // Date with dot separator
        type T3 = TakeDate<"31-Dec-2024">; // Date with month name
        type T4 = TakeDate<"28th February">; // Date with suffix
        type T5 = TakeDate<"05-">;         // Date followed by dash only

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "15", rest: "/12/2024" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "01", rest: ".12.2024" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "31", rest: "-Dec-2024" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "28", rest: "th February" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "05", rest: "-" }
            >>,
        ];
    });

    describe("runtime tests", () => {
        it("should match compile-time behavior", () => {
            // This is a compile-time only type, so we just verify the types compile
            const validDate: TakeDate<"15"> = { take: "15", rest: "" };
            const invalidDate: TakeDate<"99"> = { take: null, rest: "99" };
            const wideString: TakeDate<string> = { take: "15", rest: "rest" };
            const wideStringNull: TakeDate<string> = { take: null, rest: "string" };

            expect(true).toBe(true);
        });
    });
});
