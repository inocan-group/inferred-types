import { describe, it, expect } from "vitest";
import { isError, IsoMeta,  parseIsoDate } from "inferred-types/runtime";

describe("parseIsoDate()", () => {


    it("datetime, UTC", () => {
        let str = "2024-01-15T12:34:56.789Z";
        let result = parseIsoDate(str);
        let expected: IsoMeta = {
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
        }

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);

    });

    it("datetime, offset, no ms", () => {
        const result = parseIsoDate("2024-01-15T23:59:59+02:00");
        const expected = {
            dateType: "full",
            year: "2024",
            month: "01",
            date: "15",
            hour: "23",
            minute: "59",
            second: "59",
            ms: undefined,
            offset: "+02:00"
        };
        expect(result).toEqual(expected);

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);
    });



    it("parses ISO datetime with offset", () => {
        const result = parseIsoDate("2024-01-15T23:59:59+02:00");
        expect(result).toEqual({
            dateType: "full",
            year: "2024",
            month: "01",
            date: "15",
            hour: "23",
            minute: "59",
            second: "59",
            ms: undefined,
            offset: "+02:00"
        });
    });

    it("parses ISO date (YYYY-MM-DD)", () => {
        const result = parseIsoDate("2024-01-15");
        const expected = {
            dateType: "full",
            hasTime: false,
            year: "2024",
            month: "01",
            date: "15",
            hour: undefined,
            minute: undefined,
            ms: undefined,
            offset: undefined
        };
        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);
    });

    it("parses ISO date (YYYYMMDD)", () => {
        const result = parseIsoDate("20240115");
        const expected = {
            dateType: "full",
            hasTime: false,
            year: "2024",
            month: "01",
            date: "15",
            hour: undefined,
            minute: undefined,
            ms: undefined,
            offset: undefined
        };

        if (isError(result)) {
            throw new Error(`expected ISO string -- 20240115 -- to be parsable!`)
        }
        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);
    });

    it("parses ISO year only (YYYY)", () => {
        const result = parseIsoDate("2024");
        const expected = {
            dateTime: "year",
            hasTime: false,
            year: "2024",
            month: undefined,
            date: undefined,
            hour: undefined,
            minute: undefined,
            ms: undefined,
            timezone: undefined,
        }

        if (isError(result)) {
            throw result
        }

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);
    });

    it("parses ISO year/month only (-YYYY-MM)", () => {
        const result = parseIsoDate("-2024-01");
        const expected: IsoMeta = {
            dateType: "year",
            hasTime: false,
            year: "2024",
            month: "01",
            date: undefined,
            hour: undefined,
            minute: undefined,
            second: undefined,
            ms: undefined,
            timezone: undefined,
        }
        if (isError(result)) {
            throw result
        }

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);
    });

    it.skip("parses ISO year/month only (-YYYYMM)", () => {
        const result = parseIsoDate("-202401");
        expect(result).toEqual({
            year: 2024,
            month: 1,
            date: null,
            time: null
        });
    });

    it("parses ISO year-less month/day (--MM-DD)", () => {
        const result = parseIsoDate("--01-15");
        const expected: IsoMeta = {
            dateType: "year-independent",
            hasTime: false,
            year: undefined,
            month: "01",
            date: "15",
            hour: undefined,
            minute: undefined,
            second: undefined,
            ms: undefined,
            timezone: undefined
        }
        expect(result).toEqual(expected);

        expect(
            result,
            `${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).join(', ')} keys were not equal!\n\t- ${Object.keys(expected).filter(k => expected[k as keyof typeof expected] !== result[k as keyof typeof result]).map(k => `${k}: ${expected[k as keyof typeof expected]} ≠ ${result[k as keyof typeof result]}`).join('\n\t -')}\n`
        ).toEqual(expected);
    });

    it.skip("parses ISO year-less month/day (--MMDD)", () => {
        const result = parseIsoDate("--0115");
        expect(result).toEqual({
            year: null,
            month: 1,
            date: 15,
            time: null
        });
    });

    it.skip("throws on invalid input", () => {
        expect(() => parseIsoDate("not-a-date" as any)).toThrow();
        expect(() => parseIsoDate(1234 as any)).toThrow();
        expect(() => parseIsoDate("" as any)).toThrow();
    });
});
