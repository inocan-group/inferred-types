import { describe, it, expect } from "vitest";
import {
    isFourDigitYear,
    isThreeDigitMillisecond,
    isTwoDigitHour,
    isTwoDigitMinute,
    isTwoDigitSecond,
    isTwoDigitMonth,
    isTwoDigitDate,
    isMinimalDigitDate,
    isTimezoneOffset,
} from "inferred-types/runtime";

describe("ISO type guards", () => {

    it("isTwoDigitHour", () => {
        const t1 = isTwoDigitHour("01");
        const t2 = isTwoDigitHour("06");
        const t3 = isTwoDigitHour("12");
        const t4 = isTwoDigitHour("16");
        const t5 = isTwoDigitHour("23");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);

        const f1 = isTwoDigitHour("0");
        const f2 = isTwoDigitHour("6");
        const f3 = isTwoDigitHour("25");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
    });

    it("isTwoDigitMinute", () => {
        const t1 = isTwoDigitMinute("01");
        const t2 = isTwoDigitMinute("06");
        const t3 = isTwoDigitMinute("50");
        const t4 = isTwoDigitMinute("57");
        const t5 = isTwoDigitMinute("59");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);

        const f1 = isTwoDigitMinute("0");
        const f2 = isTwoDigitMinute("6");
        const f3 = isTwoDigitMinute("60");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
    });

    it("isThreeDigitMilliseconds", () => {
        const t1 = isThreeDigitMillisecond("001");
        const t2 = isThreeDigitMillisecond("056");
        const t3 = isThreeDigitMillisecond("500");
        const t4 = isThreeDigitMillisecond("579");
        const t5 = isThreeDigitMillisecond("999");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);

        const f1 = isThreeDigitMillisecond("0");
        const f2 = isThreeDigitMillisecond("6");
        const f3 = isThreeDigitMillisecond("60");
        const f4 = isThreeDigitMillisecond("1000");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);
    });


    it("isTimeZone()", () => {
        const t1 = isTimezoneOffset("Z");
        const t2 = isTimezoneOffset("+7");
        const t3 = isTimezoneOffset("-7:30");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);

        const f1 = isTimezoneOffset("Z+1");
        const f2 = isTimezoneOffset("+7.1");
        const f3 = isTimezoneOffset("-7:306");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);

    });

    it("isFourDigitYear", () => {
        // Valid cases
        const t1 = isFourDigitYear("2024");
        const t2 = isFourDigitYear("1999");
        const t3 = isFourDigitYear("0001");
        const t4 = isFourDigitYear("9999");
        const t5 = isFourDigitYear("-0001");
        const t6 = isFourDigitYear("-2024");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
        expect(t6).toBe(true);

        // Invalid cases
        const f1 = isFourDigitYear("24");
        const f2 = isFourDigitYear("202");
        const f3 = isFourDigitYear("20245");
        const f4 = isFourDigitYear("abcd");
        const f5 = isFourDigitYear(2024);
        const f6 = isFourDigitYear("");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);
        expect(f5).toBe(false);
        expect(f6).toBe(false);
    });

    it("isTwoDigitSecond", () => {
        // Valid cases
        const t1 = isTwoDigitSecond("00");
        const t2 = isTwoDigitSecond("01");
        const t3 = isTwoDigitSecond("30");
        const t4 = isTwoDigitSecond("45");
        const t5 = isTwoDigitSecond("59");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);

        // Invalid cases
        const f1 = isTwoDigitSecond("60");
        const f2 = isTwoDigitSecond("99");
        const f3 = isTwoDigitSecond("0");
        const f4 = isTwoDigitSecond("5");
        const f5 = isTwoDigitSecond("100");
        const f6 = isTwoDigitSecond("ab");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);
        expect(f5).toBe(false);
        expect(f6).toBe(false);
    });

    it("isTwoDigitMonth", () => {
        // Valid cases
        const t1 = isTwoDigitMonth("01");
        const t2 = isTwoDigitMonth("06");
        const t3 = isTwoDigitMonth("09");
        const t4 = isTwoDigitMonth("10");
        const t5 = isTwoDigitMonth("12");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);

        // Invalid cases
        const f1 = isTwoDigitMonth("00");
        const f2 = isTwoDigitMonth("13");
        const f3 = isTwoDigitMonth("1");
        const f4 = isTwoDigitMonth("9");
        const f5 = isTwoDigitMonth("99");
        const f6 = isTwoDigitMonth("ab");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);
        expect(f5).toBe(false);
        expect(f6).toBe(false);
    });

    it("isTwoDigitDate", () => {
        // Valid cases
        const t1 = isTwoDigitDate("01");
        const t2 = isTwoDigitDate("09");
        const t3 = isTwoDigitDate("15");
        const t4 = isTwoDigitDate("28");
        const t5 = isTwoDigitDate("30");
        const t6 = isTwoDigitDate("31");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
        expect(t6).toBe(true);

        // Invalid cases
        const f1 = isTwoDigitDate("00");
        const f2 = isTwoDigitDate("32");
        const f3 = isTwoDigitDate("1");
        const f4 = isTwoDigitDate("9");
        const f5 = isTwoDigitDate("99");
        const f6 = isTwoDigitDate("ab");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);
        expect(f5).toBe(false);
        expect(f6).toBe(false);
    });

    it("isMinimalDigitDate", () => {
        // Valid cases
        const t1 = isMinimalDigitDate("1");
        const t2 = isMinimalDigitDate("9");
        const t3 = isMinimalDigitDate("10");
        const t4 = isMinimalDigitDate("15");
        const t5 = isMinimalDigitDate("29");
        const t6 = isMinimalDigitDate("30");
        const t7 = isMinimalDigitDate("31");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
        expect(t6).toBe(true);
        expect(t7).toBe(true);

        // Invalid cases
        const f1 = isMinimalDigitDate("0");
        const f2 = isMinimalDigitDate("01");
        const f3 = isMinimalDigitDate("09");
        const f4 = isMinimalDigitDate("32");
        const f5 = isMinimalDigitDate("99");
        const f6 = isMinimalDigitDate("ab");
        const f7 = isMinimalDigitDate("");

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);
        expect(f5).toBe(false);
        expect(f6).toBe(false);
        expect(f7).toBe(false);
    });

})
