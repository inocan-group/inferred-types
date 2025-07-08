import { describe, it } from "vitest";
import {
    Expect,
    Test,
    TakeYear
} from "inferred-types/types";

describe("TakeYear<T>", () => {

    it("happy path - strings starting with valid years", () => {
        type T1 = TakeYear<"2024 is the current year">;
        type E1 = T1["take"] extends `${number}` ? true : false;
        type T2 = TakeYear<"1999 was the last year of the millennium">;
        type T3 = TakeYear<"2000-01-01">;
        type T4 = TakeYear<"1776 Declaration of Independence">;
        type T5 = TakeYear<"9999 is far in the future">;
        type TT1 = TakeYear<"2024-06-15">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "2024", rest: " is the current year" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "1999", rest: " was the last year of the millennium" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "2000", rest: "-01-01" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "1776", rest: " Declaration of Independence" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "9999", rest: " is far in the future" }
            >>,
        ];
    });

    it("non-matching - strings not starting with 4 digits", () => {
        type T1 = TakeYear<"abc2024">;
        type T2 = TakeYear<"The year 2024">;
        type T3 = TakeYear<" 2024 has leading space">;
        type T4 = TakeYear<"Year: 2024">;
        type T5 = TakeYear<"-2024 is negative">;
        type T6 = TakeYear<"hello world">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "abc2024" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "The year 2024" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: " 2024 has leading space" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "Year: 2024" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: null, rest: "-2024 is negative" }
            >>,
            Expect<Test<
                T6, "equals",
                { take: null, rest: "hello world" }
            >>,
        ];
    });

    it("less than 4 digits", () => {
        type T1 = TakeYear<"1">;
        type T2 = TakeYear<"12">;
        type T3 = TakeYear<"123">;
        type T4 = TakeYear<"123 not enough digits">;
        type T5 = TakeYear<"99 problems">;
        type T6 = TakeYear<"0">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "1" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "12" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "123" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "123 not enough digits" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: null, rest: "99 problems" }
            >>,
            Expect<Test<
                T6, "equals",
                { take: null, rest: "0" }
            >>,
        ];
    });

    it("exactly 4 digits", () => {
        type T1 = TakeYear<"2024">;
        type T2 = TakeYear<"1999">;
        type T3 = TakeYear<"0000">;
        type T4 = TakeYear<"5555">;
        type T5 = TakeYear<"0001">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "2024", rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "1999", rest: "" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "0000", rest: "" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "5555", rest: "" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "0001", rest: "" }
            >>,
        ];
    });

    it("more than 4 digits at start", () => {
        type T1 = TakeYear<"20240101">;
        type T2 = TakeYear<"19991231235959">;
        type T3 = TakeYear<"12345 has 5 digits">;
        type T4 = TakeYear<"999999999">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "2024", rest: "0101" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "1999", rest: "1231235959" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "1234", rest: "5 has 5 digits" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "9999", rest: "99999" }
            >>,
        ];
    });

    it("mixed numeric and non-numeric in first 4 chars", () => {
        type T1 = TakeYear<"20a4">;
        type T2 = TakeYear<"1.99">;
        type T3 = TakeYear<"12-3">;
        type T4 = TakeYear<"202X">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "20a4" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "1.99" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "12-3" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: null, rest: "202X" }
            >>,
        ];
    });

    it("edge cases", () => {
        type T1 = TakeYear<"">;  // Empty string
        type T2 = TakeYear<".">;  // Single non-numeric
        type T3 = TakeYear<"    ">;  // Spaces

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: null, rest: "" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: null, rest: "." }
            >>,
            Expect<Test<
                T3, "equals",
                { take: null, rest: "    " }
            >>,
        ];
    });

    it("wide string types", () => {
        type T1 = TakeYear<string>;
        type T2 = TakeYear<`${string}2024`>;
        type T3 = TakeYear<`2024${string}`>;

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
                { take: "2024", rest: string }
            >>,
        ];
    });

    it("various year formats in context", () => {
        type T1 = TakeYear<"2024-12-25T10:30:00Z">;  // ISO date
        type T2 = TakeYear<"2024/12/25">;  // Date with slashes
        type T3 = TakeYear<"2024.12.25">;  // Date with dots
        type T4 = TakeYear<"2024Q1">;  // Quarter notation
        type T5 = TakeYear<"2024W52">;  // Week notation

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "2024", rest: "-12-25T10:30:00Z" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "2024", rest: "/12/25" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "2024", rest: ".12.25" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "2024", rest: "Q1" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "2024", rest: "W52" }
            >>,
        ];
    });

    it("historical and future years", () => {
        type T1 = TakeYear<"0000 BC/AD boundary">;
        type T2 = TakeYear<"1000 millennium">;
        type T3 = TakeYear<"1492 Columbus">;
        type T4 = TakeYear<"3000 future">;
        type T5 = TakeYear<"9999 max 4-digit year">;

        type cases = [
            Expect<Test<
                T1, "equals",
                { take: "0000", rest: " BC/AD boundary" }
            >>,
            Expect<Test<
                T2, "equals",
                { take: "1000", rest: " millennium" }
            >>,
            Expect<Test<
                T3, "equals",
                { take: "1492", rest: " Columbus" }
            >>,
            Expect<Test<
                T4, "equals",
                { take: "3000", rest: " future" }
            >>,
            Expect<Test<
                T5, "equals",
                { take: "9999", rest: " max 4-digit year" }
            >>,
        ];
    });

});
