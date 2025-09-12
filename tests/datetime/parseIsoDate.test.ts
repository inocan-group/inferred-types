import { describe, it, expect } from "vitest";
import {
import type { AsDateMeta, Expect, Test } from "inferred-types/types";
    isError,
    keysOf,
    parseIsoDate
} from "inferred-types/runtime";

describe("parseIsoDate()", () => {
    it("datetime, UTC", () => {
        let str = "2024-01-15T12:34:56.789Z" as const;
        let result = parseIsoDate(str);
        let expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "12",
            minute: "34",
            second: "56",
            ms: "789",
            timezone: "Z"
        };

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]

    });

    it("datetime, offset, no ms", () => {
        const str = "2024-01-15T23:59:59+02:00" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "23",
            minute: "59",
            second: "59",
            ms: null,
            timezone: "+02:00"
        };
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO datetime with offset", () => {
        const str = "2024-01-15T23:59:59+02:00" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "datetime",
            hasTime: true,
            year: "2024",
            month: "01",
            date: "15",
            hour: "23",
            minute: "59",
            second: "59",
            ms: null,
            timezone: "+02:00"
        }
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO date (YYYY-MM-DD)", () => {
        const str = "2024-01-15" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "year-independent",
            hasTime: false,
            year: "2024",
            month: "01",
            date: "15",
            hour: null,
            minute: null,
            second: null,
            ms: null,
            timezone: null
        };

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO date (YYYYMMDD)", () => {
        const str = "20240115" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "year-independent",
            hasTime: false,
            year: "2024",
            month: "01",
            date: "15",
            hour: null,
            minute: null,
            second: null,
            ms: null,
            timezone: null
        };

        if (isError(result)) {
            throw new Error(`expected ISO string -- 20240115 -- to be parsable!`)
        }
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO year only (YYYY)", () => {
        const str = "2024" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "year",
            hasTime: false,
            year: "2024",
            month: null,
            date: null,
            hour: null,
            minute: null,
            second: null,
            ms: null,
            timezone: null,
        }

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO year/month only (-YYYY-MM)", () => {
        const str = "-2024-01" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "year-month",
            hasTime: false,
            year: "2024",
            month: "01",
            date: null,
            hour: null,
            minute: null,
            second: null,
            ms: null,
            timezone: null,
        }

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO year/month only (-YYYYMM)", () => {
        const str = "-202401" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "year-month",
            hasTime: false,
            year: "2024",
            month: "01",
            date: null,
            hour: null,
            minute: null,
            second: null,
            ms: null,
            timezone: null,
        };
        if (isError(result)) {
            throw result
        }
        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO year-less month/day (--MM-DD)", () => {
        const str = "--01-15" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "year-independent",
            hasTime: false,
            year: null,
            month: "01",
            date: "15",
            hour: null,
            minute: null,
            second: null,
            ms: null,
            timezone: null
        }

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("parses ISO year-less month/day (--MMDD)", () => {
        const str = "--0115" as const;
        const result = parseIsoDate(str);
        const expected = {
            dateType: "year-independent",
            hasTime: false,
            year: null,
            month: "01",
            date: "15",
            hour: null,
            minute: null,
            second: null,
            ms: null,
            timezone: null
        }

        for (const key of keysOf(expected)) {
            expect(expected[key], `'${key}' should be: '${expected[key]}' but was '${result[key]}'\n\t`).toBe(result[key]);
        }

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<typeof str>
            >>
        ]
    });

    it("invalid input returns an error", () => {
        const notADate = parseIsoDate("not-a-date");
        const num = parseIsoDate(1234 as any);
        const empty = parseIsoDate("");

        expect(notADate instanceof Error).toBe(true);
        expect(num instanceof Error).toBe(true);
        expect(empty instanceof Error).toBe(true);

        type cases = [
            Expect<Test<
                typeof notADate, "isError", "parse-date/year"
            >>,
            Expect<Test<
                typeof num, "extends", Date | Error
            >>,
            Expect<Test<
                typeof notADate, "isError", "parse-date/year"
            >>,
        ]
    });

    it.skip("DateTime meta converted to string variants", () => {
        // const p = parseIsoDate("2023-03-05T12:55Z");
        // const str = p.toString();
        // const date = p.asDate();
        // const yearMonth = p.asYearMonth();
        // const yearIndependent = p.asYearIndependent();
        // const year = p.asYear();

        // expect(str).toBe("2023-03-05T12:55Z");
        // expect(date).toBe("2023-03-05");
        // expect(year).toBe("2023");
        // expect(yearIndependent).toBe("--03-05")

        // type cases = [
        //     Expect<Test<
        //         typeof p, "equals",
        //         AsDateMeta<[
        //             "2023", "03", "05", ["12", "55", null, null, "Z"]
        //         ]>
        //     >>,
        //     Expect<Test<
        //         typeof str, "equals",
        //         "2023-03-05T12:55Z"
        //     >>,
        //     Expect<Test<
        //         typeof date, "equals",
        //         "2023-03-05"
        //     >>,
        //     Expect<Test<
        //         typeof yearMonth, "equals",
        //         "-2023-03"
        //     >>,
        //     Expect<Test<
        //         typeof yearIndependent, "equals",
        //         "--03-05"
        //     >>,
        // ];
    });

});
