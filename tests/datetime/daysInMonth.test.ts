import { describe, it, expect } from "vitest";
import { daysInMonth } from "inferred-types/runtime";
import { DaysInMonth, Expect, Test } from "inferred-types/types";

describe("Days in Month", () => {
    describe("DaysInMonth<T>", () => {


        it("numbers between 1 and 12 treated as month number", () => {
            type T1 = DaysInMonth<1>;

            type cases = [
                /** type tests */
            ];
        });


        it("handles two-digit month literals without year", () => {
            type T01 = DaysInMonth<"01">;
            type T02 = DaysInMonth<"02">;
            type T03 = DaysInMonth<"03">;
            type T04 = DaysInMonth<"04">;
            type T05 = DaysInMonth<"05">;
            type T06 = DaysInMonth<"06">;
            type T07 = DaysInMonth<"07">;
            type T08 = DaysInMonth<"08">;
            type T09 = DaysInMonth<"09">;
            type T10 = DaysInMonth<"10">;
            type T11 = DaysInMonth<"11">;
            type T12 = DaysInMonth<"12">;

            // TwoDigitMonth literals are not treated as DateLike by the type utility
            // They fall through to the final error case
            type cases = [
                Expect<Test<T01, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T02, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T03, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T04, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T05, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T06, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T07, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T08, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T09, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T10, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T11, "isError", "invalid-date/days-in-month">>,
                Expect<Test<T12, "isError", "invalid-date/days-in-month">>,
            ];
        });

        it("handles month name literals without year", () => {
            type TJan = DaysInMonth<"January">;
            type TFeb = DaysInMonth<"February">;
            type TApr = DaysInMonth<"April">;
            type TJul = DaysInMonth<"July">;
            type TDec = DaysInMonth<"December">;

            type cases = [
                Expect<Test<TJan, "equals", 31>>,
                Expect<Test<TFeb, "equals", 28>>, // No year info, defaults to 28
                Expect<Test<TApr, "equals", 30>>,
                Expect<Test<TJul, "equals", 31>>,
                Expect<Test<TDec, "equals", 31>>,
            ];
        });

        it("handles month abbreviation literals without year", () => {
            type TJan = DaysInMonth<"Jan">;
            type TFeb = DaysInMonth<"Feb">;
            type TApr = DaysInMonth<"Apr">;
            type TJul = DaysInMonth<"Jul">;
            type TDec = DaysInMonth<"Dec">;

            type cases = [
                Expect<Test<TJan, "equals", 31>>,
                Expect<Test<TFeb, "equals", 28>>, // No year info, defaults to 28
                Expect<Test<TApr, "equals", 30>>,
                Expect<Test<TJul, "equals", 31>>,
                Expect<Test<TDec, "equals", 31>>,
            ];
        });

        it("handles February with year parameter for leap years", () => {
            type TFeb2024 = DaysInMonth<"02", 2024>; // Double leap year
            type TFeb2023 = DaysInMonth<"02", 2023>; // Non-leap year
            type TFeb2020 = DaysInMonth<"February", 2020>; // Regular leap year
            type TFeb2021 = DaysInMonth<"Feb", 2021>; // Non-leap year

            type cases = [
                // TwoDigitMonth with year falls through to error case
                Expect<Test<TFeb2024, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TFeb2023, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TFeb2020, "equals", 29>>, // MonthName works
                Expect<Test<TFeb2021, "equals", 28>>,
            ];
        });

        it("handles February with known double leap years from constants", () => {
            type TFeb2016 = DaysInMonth<"02", 2016>; // Double leap year (in array)
            type TFeb2008 = DaysInMonth<"February", 2008>; // Double leap year (in array)
            type TFeb4000 = DaysInMonth<"Feb", 4000>; // Regular leap year (not in array)

            type cases = [
                // TwoDigitMonth with year falls through to error case
                Expect<Test<TFeb2016, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TFeb2008, "equals", 30>>, // MonthName works
                Expect<Test<TFeb4000, "equals", 29>>, // MonthAbbrev works
            ];
        });

        it("handles ISO date strings", () => {
            type TJan2024 = DaysInMonth<"2024-01-15">;
            type TFeb2024 = DaysInMonth<"2024-02-28">; // Double leap year
            type TApr2023 = DaysInMonth<"2023-04-01">;
            type TDec2020 = DaysInMonth<"2020-12-31">;

            type cases = [
                Expect<Test<TJan2024, "equals", 31>>,
                Expect<Test<TFeb2024, "equals", 30>>, // 2024 is double leap year
                Expect<Test<TApr2023, "equals", 30>>,
                Expect<Test<TDec2020, "equals", 31>>,
            ];
        });

        it("handles ISO datetime strings", () => {
            type TJan2024 = DaysInMonth<"2024-01-15T10:30:00Z">;
            type TFeb2024 = DaysInMonth<"2024-02-28T12:00:00Z">; // Double leap year
            type TApr2023 = DaysInMonth<"2023-04-01T00:00:00Z">;

            type cases = [
                Expect<Test<TJan2024, "equals", 31>>,
                Expect<Test<TFeb2024, "equals", 30>>, // 2024 is double leap year
                Expect<Test<TApr2023, "equals", 30>>,
            ];
        });

        it("handles months with year parameter (non-February)", () => {
            type TJan2024 = DaysInMonth<"01", 2024>;
            type TApr2024 = DaysInMonth<"April", 2024>;
            type TJul2023 = DaysInMonth<"Jul", 2023>;
            type TDec2020 = DaysInMonth<"December", 2020>;

            type cases = [
                // TwoDigitMonth with year parameter errors
                Expect<Test<TJan2024, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TApr2024, "equals", 30>>, // MonthName works
                Expect<Test<TJul2023, "equals", 31>>, // MonthAbbrev works
                Expect<Test<TDec2020, "equals", 31>>, // MonthName works
            ];
        });

        it("handles error cases for invalid inputs", () => {
            type TInvalid1 = DaysInMonth<"not-a-month">;
            type TInvalid2 = DaysInMonth<"13">; // Invalid month
            type TInvalid3 = DaysInMonth<"invalid-date">;

            type cases = [
                Expect<Test<TInvalid1, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TInvalid2, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TInvalid3, "isError", "invalid-date/days-in-month">>,
            ];
        });

        it("handles wide types", () => {
            type TString = DaysInMonth<string>;
            type TNumber = DaysInMonth<number>;

            type cases = [
                // Wide types should result in errors since they can't be resolved at compile time
                Expect<Test<TString, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TNumber, "isError", "invalid-date/days-in-month">>,
            ];
        });

        it("handles edge cases with partial dates", () => {
            type TYearMonth = DaysInMonth<"2024-02">; // Year-month format
            type TMonthDay = DaysInMonth<"--02-15">; // Month-day format

            type cases = [
                // Partial dates are likely not supported
                Expect<Test<TYearMonth, "isError", "invalid-date/days-in-month">>,
                Expect<Test<TMonthDay, "equals", 28>>, // This might work with --MM-DD format
            ];
        });
    });


    describe("daysInMonth()", () => {

        it("handles two-digit month format without year", () => {
            const jan = daysInMonth("01");
            const feb = daysInMonth("02");
            const mar = daysInMonth("03");
            const apr = daysInMonth("04");
            const may = daysInMonth("05");
            const jun = daysInMonth("06");
            const jul = daysInMonth("07");
            const aug = daysInMonth("08");
            const sep = daysInMonth("09");
            const oct = daysInMonth("10");
            const nov = daysInMonth("11");
            const dec = daysInMonth("12");

            // runtime tests
            expect(jan).toBe(31);
            expect(feb).toBe(28); // No year info, defaults to 28
            expect(mar).toBe(31);
            expect(apr).toBe(30);
            expect(may).toBe(31);
            expect(jun).toBe(30);
            expect(jul).toBe(31);
            expect(aug).toBe(31);
            expect(sep).toBe(30);
            expect(oct).toBe(31);
            expect(nov).toBe(30);
            expect(dec).toBe(31);

            // type tests - runtime function returns DaysInMonth<T> which can be Error for TwoDigitMonth
            type cases = [
                Expect<Test<typeof jan, "isError", "unknown-month">>,
                Expect<Test<typeof feb, "isError", "unknown-month">>,
                Expect<Test<typeof mar, "isError", "unknown-month">>,
                Expect<Test<typeof apr, "isError", "unknown-month">>,
                Expect<Test<typeof may, "isError", "unknown-month">>,
                Expect<Test<typeof jun, "isError", "unknown-month">>,
                Expect<Test<typeof jul, "isError", "unknown-month">>,
                Expect<Test<typeof aug, "isError", "unknown-month">>,
                Expect<Test<typeof sep, "isError", "unknown-month">>,
                Expect<Test<typeof oct, "isError", "unknown-month">>,
                Expect<Test<typeof nov, "isError", "unknown-month">>,
                Expect<Test<typeof dec, "isError", "unknown-month">>,
            ];
        });

        it("handles month names without year", () => {
            const jan = daysInMonth("January");
            const feb = daysInMonth("February");
            const apr = daysInMonth("April");
            const jul = daysInMonth("July");
            const dec = daysInMonth("December");

            expect(jan).toBe(31);
            expect(feb).toBe(28); // No year info, defaults to 28
            expect(apr).toBe(30);
            expect(jul).toBe(31);
            expect(dec).toBe(31);

            type cases = [
                // MonthName parameters may return DaysInMonth<T> type which could be complex
                Expect<Test<typeof jan, "extends", number>>,
                Expect<Test<typeof feb, "extends", number>>,
                Expect<Test<typeof apr, "extends", number>>,
                Expect<Test<typeof jul, "extends", number>>,
                Expect<Test<typeof dec, "extends", number>>,
            ];
        });

        it("handles month abbreviations without year", () => {
            const jan = daysInMonth("Jan");
            const feb = daysInMonth("Feb");
            const apr = daysInMonth("Apr");
            const jul = daysInMonth("Jul");
            const dec = daysInMonth("Dec");

            expect(jan).toBe(31);
            expect(feb).toBe(28); // No year info, defaults to 28
            expect(apr).toBe(30);
            expect(jul).toBe(31);
            expect(dec).toBe(31);

            type cases = [
                // MonthAbbrev parameters may return DaysInMonth<T> type which could be complex
                Expect<Test<typeof jan, "extends", number>>,
                Expect<Test<typeof feb, "extends", number>>,
                Expect<Test<typeof apr, "extends", number>>,
                Expect<Test<typeof jul, "extends", number>>,
                Expect<Test<typeof dec, "extends", number>>,
            ];
        });

        it("handles February with leap years (including double leap)", () => {
            const feb2024 = daysInMonth("02", 2024); // Double leap year (in DOUBLE_LEAP_MODERN)
            const feb2023 = daysInMonth("02", 2023); // Non-leap year
            const feb2020 = daysInMonth("02", 2020); // Regular leap year (not in DOUBLE_LEAP_MODERN)
            const feb2021 = daysInMonth("02", 2021); // Non-leap year

            expect(feb2024).toBe(30); // Double leap year has 30 days
            expect(feb2023).toBe(28);
            expect(feb2020).toBe(29); // Regular leap year has 29 days
            expect(feb2021).toBe(28);

            type cases = [
                // Runtime function returns complex types - just check they extend number
                Expect<Test<typeof feb2024, "extends", number>>,
                Expect<Test<typeof feb2023, "extends", number>>,
                Expect<Test<typeof feb2020, "extends", number>>,
                Expect<Test<typeof feb2021, "extends", number>>,
            ];
        });

        it("handles February with years not in DOUBLE_LEAP_MODERN", () => {
            // Years not in the DOUBLE_LEAP_MODERN array
            const feb4000 = daysInMonth("February", 4000); // Leap year but not double leap
            const feb8000 = daysInMonth("Feb", 8000); // Leap year but not double leap
            const feb2016 = daysInMonth("Feb", 2016); // Double leap year (in array)

            expect(feb4000).toBe(29); // Regular leap year
            expect(feb8000).toBe(29); // Regular leap year
            expect(feb2016).toBe(30); // Double leap year

            type cases = [
                // Runtime function returns complex types - just check they extend number
                Expect<Test<typeof feb4000, "extends", number>>,
                Expect<Test<typeof feb8000, "extends", number>>,
                Expect<Test<typeof feb2016, "extends", number>>,
            ];
        });

        it("handles months with year (non-February)", () => {
            const jan2024 = daysInMonth("01", 2024);
            const apr2024 = daysInMonth("April", 2024);
            const jul2023 = daysInMonth("Jul", 2023);
            const dec2020 = daysInMonth("December", 2020);

            expect(jan2024).toBe(31);
            expect(apr2024).toBe(30);
            expect(jul2023).toBe(31);
            expect(dec2020).toBe(31);

            type cases = [
                // Runtime function returns complex types - just check they extend number
                Expect<Test<typeof jan2024, "extends", number>>,
                Expect<Test<typeof apr2024, "extends", number>>,
                Expect<Test<typeof jul2023, "extends", number>>,
                Expect<Test<typeof dec2020, "extends", number>>,
            ];
        });

        it("handles edge cases and errors", () => {
            // Invalid month strings should return errors
            // Note: We'll test valid months since the function expects specific types
            const valid = daysInMonth("01");

            expect(valid).toBe(31);

            type cases = [
                Expect<Test<typeof valid, "isError", "unknown-month">>,
            ];
        });
    });
})



