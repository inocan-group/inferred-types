import { describe, it, expect } from "vitest";
import {
    isError,
    parseIsoDate
} from "inferred-types/runtime";
import { AsDateMeta, DateMeta, Expect, Test } from "inferred-types/types";

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
        } satisfies DateMeta;
        type Result = typeof result;

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", "01", "15", ["12", "34", "56", "789", "Z"]]>
            >>
        ]

    });

    it("datetime, offset, no ms", () => {
        const str = "2024-01-15T23:59:59+02:00" as const;
        const result = parseIsoDate(str);
        const expected: DateMeta = {
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
        expect(result).toEqual(expected);

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", "01", "15", ["23", "59", "59", null, "+02:00"]]>
            >>
        ]
    });



    it("parses ISO datetime with offset", () => {
        const str = "2024-01-15T23:59:59+02:00" as const;
        const result = parseIsoDate(str);
        expect(result).toEqual({
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
        });

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", "01", "15", ["23", "59", "59", null, "+02:00"]]>
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
        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", "01", "15", null]>
            >>
        ]
    });

    it("parses ISO date (YYYYMMDD)", () => {
        const str = "20240115" as const;
        const result = parseIsoDate(str);
        const expected: DateMeta = {
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
        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", "01", "15", null]>
            >>
        ]
    });

    it("parses ISO year only (YYYY)", () => {
        const str = "2024" as const;
        const result = parseIsoDate(str);
        const expected: DateMeta = {
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

        if (isError(result)) {
            throw result
        }

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", null, null, null]>
            >>
        ]
    });

    it("parses ISO year/month only (-YYYY-MM)", () => {
        const str = "-2024-01" as const;
        const result = parseIsoDate(str);
        const expected: DateMeta = {
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
        if (isError(result)) {
            throw result
        }

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", "01", null, null]>
            >>
        ]
    });

    it("parses ISO year/month only (-YYYYMM)", () => {
        const str = "-202401" as const;
        const result = parseIsoDate(str);
        const expected: DateMeta = {
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

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<["2024", "01", null, null]>
            >>
        ]
    });

    it("parses ISO year-less month/day (--MM-DD)", () => {
        const str = "--01-15" as const;
        const result = parseIsoDate(str);
        const expected: DateMeta = {
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
        expect(result).toEqual(expected);

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<[null, "01", "15", null]>
            >>
        ]
    });

    it("parses ISO year-less month/day (--MMDD)", () => {
        const str = "--0115" as const;
        const result = parseIsoDate(str);
        const expected: DateMeta = {
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
        expect(result).toEqual(expected);

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

        type cases = [
            Expect<Test<
                typeof result, "equals",
                AsDateMeta<[null, "01", "15", null]>
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
                typeof num, "isError", Error
            >>,
            Expect<Test<
                typeof notADate, "isError", "parse-date/year"
            >>,
        ]

    });
});
