import { describe, it, expect } from "vitest";
import { asFourDigitYear } from "inferred-types/runtime";
import type { AsFourDigitYear, Expect, FourDigitYear, Test } from "inferred-types/types";

describe("FourDigitYear", () => {
    describe("AsFourDigitYear<T>", () => {

        it("happy path", () => {
            type T2024 = AsFourDigitYear<2024>;
            type T1999 = AsFourDigitYear<1999>;
            type T9999 = AsFourDigitYear<9999>;
            type T1000 = AsFourDigitYear<1000>;

            type cases = [
                Expect<Test<T2024, "equals", "2024">>,
                Expect<Test<T1999, "equals", "1999">>,
                Expect<Test<T9999, "equals", "9999">>,
                Expect<Test<T1000, "equals", "1000">>,
            ];
        });

        it("happy path (with branding)", () => {
            type T2024 = AsFourDigitYear<2024, true>;
            type T1999 = AsFourDigitYear<1999, true>;
            type T9999 = AsFourDigitYear<9999, true>;
            type T1000 = AsFourDigitYear<1000, true>;

            type cases = [
                Expect<Test<T2024, "extends", "2024">>,
                Expect<Test<T1999, "extends", "1999">>,
                Expect<Test<T9999, "extends", "9999">>,
                Expect<Test<T1000, "extends", "1000">>,
            ];
        });

        it("handles valid three-digit year literals by padding", () => {
            type T123 = AsFourDigitYear<123>;
            type T456 = AsFourDigitYear<456>;
            type T999 = AsFourDigitYear<999>;
            type T100 = AsFourDigitYear<100>;

            type cases = [
                Expect<Test<T123, "equals", "0123">>,
                Expect<Test<T456, "equals", "0456">>,
                Expect<Test<T999, "equals", "0999">>,
                Expect<Test<T100, "equals", "0100">>,
            ];
        });

        it("handles valid two-digit year literals by padding", () => {
            type T12 = AsFourDigitYear<12>;
            type T34 = AsFourDigitYear<34>;
            type T99 = AsFourDigitYear<99>;
            type T10 = AsFourDigitYear<10>;

            // NOTE: The type implementation has a bug where IsInteger check is backwards
            type cases = [
                Expect<Test<T12, "equals", "0012">>,
                Expect<Test<T34, "equals", "0034">>,
                Expect<Test<T99, "equals", "0099">>,
                Expect<Test<T10, "equals", "0010">>,
            ];
        });

        it("handles valid one-digit year literals by padding", () => {
            type T1 = AsFourDigitYear<1>;
            type T5 = AsFourDigitYear<5>;
            type T9 = AsFourDigitYear<9>;
            type T0 = AsFourDigitYear<0>;

            // NOTE: The type implementation has a bug where IsInteger check is backwards
            type cases = [
                Expect<Test<T1, "equals", "0001">>,
                Expect<Test<T5, "equals", "0005">>,
                Expect<Test<T9, "equals", "0009">>,
                Expect<Test<T0, "equals", "0000">>,
            ];
        });

        it("handles string literal numbers", () => {
            type T2024 = AsFourDigitYear<"2024">;
            type T123 = AsFourDigitYear<"123">;
            type T45 = AsFourDigitYear<"45">;
            type T7 = AsFourDigitYear<"7">;

            type cases = [
                Expect<Test<T2024, "equals", "2024">>,
                Expect<Test<T123, "equals", "0123">>,
                Expect<Test<T45, "equals", "0045">>,
                Expect<Test<T7, "equals", "0007">>,
            ];
        });

        it("handles string literal numbers (branded)", () => {
            type T2024 = AsFourDigitYear<"2024", true>;
            type T123 = AsFourDigitYear<"123", true>;
            type T45 = AsFourDigitYear<"45", true>;
            type T7 = AsFourDigitYear<"7", true>;

            type cases = [
                Expect<Test<T2024, "extends", "2024">>,
                Expect<Test<T123, "extends", "0123">>,
                Expect<Test<T45, "extends", "0045">>,
                Expect<Test<T7, "extends", "0007">>,
            ];
        });

        it("returns errors for negative year literals", () => {
            type TNeg2024 = AsFourDigitYear<-2024>;
            type TNeg1 = AsFourDigitYear<-1>;
            type TNeg100 = AsFourDigitYear<-100>;

            type cases = [
                Expect<Test<TNeg2024, "isError", "year-invalid/negative">>,
                Expect<Test<TNeg1, "isError", "year-invalid/negative">>,
                Expect<Test<TNeg100, "isError", "year-invalid/negative">>,
            ];
        });

        it("returns errors for years too large", () => {
            type TTooLarge = AsFourDigitYear<10000>;
            type TWayTooLarge = AsFourDigitYear<99999>;
            type TSlightlyTooLarge = AsFourDigitYear<10001>;

            // NOTE: Due to implementation bug, large numbers also return "not-integer" error
            type cases = [
                Expect<Test<TTooLarge, "isError", "year-invalid/too-large">>,
                Expect<Test<TWayTooLarge, "isError", "year-invalid/too-large">>,
                Expect<Test<TSlightlyTooLarge, "isError", "year-invalid/too-large">>,
            ];
        });

        it("returns errors for invalid string literals", () => {
            type TInvalid = AsFourDigitYear<"not-a-year">;
            type TEmpty = AsFourDigitYear<"">;
            type TMixed = AsFourDigitYear<"20a4">;
            type TDecimal = AsFourDigitYear<"2024.5">;

            type cases = [
                Expect<Test<TInvalid, "isError", "year-invalid/type">>,
                Expect<Test<TEmpty, "isError", "year-invalid/type">>,
                Expect<Test<TMixed, "isError", "year-invalid/type">>,
                Expect<Test<TDecimal, "isError", "year-invalid/type">>,
            ];
        });

        it("handles wide types as errors", () => {
            type TNumber = AsFourDigitYear<number>;
            type TString = AsFourDigitYear<string>;
            type TAny = AsFourDigitYear<any>;

            type cases = [
                Expect<Test<TNumber, "extends", FourDigitYear | Error>>,
                Expect<Test<TString, "isError", "year-invalid/type">>,
                Expect<Test<TAny, "equals", FourDigitYear | Error>>,
            ];
        });

        it("handles edge cases with branding and errors", () => {
            type TNegativeBranded = AsFourDigitYear<-2024, true>;
            type TTooLargeBranded = AsFourDigitYear<10000, true>;
            type TInvalidBranded = AsFourDigitYear<"invalid", true>;

            type cases = [
                Expect<Test<TNegativeBranded, "isError", "year-invalid/negative">>,
                Expect<Test<TTooLargeBranded, "isError", "year-invalid/too-large">>,
                Expect<Test<TInvalidBranded, "isError", "year-invalid/type">>,
            ];
        });

        it("handles decimal number literals as errors", () => {
            type TDecimal = AsFourDigitYear<2024.5>;

            type cases = [
                Expect<Test<TDecimal, "isError", "year-invalid/float">>,
            ];
        });
    });

    describe("asFourDigitYear()", () => {

        it("handles valid four-digit years", () => {
            const year2024 = asFourDigitYear(2024);
            const year1999 = asFourDigitYear(1999);
            const year9999 = asFourDigitYear(9999);

            expect(year2024).toBe("2024");
            expect(year1999).toBe("1999");
            expect(year9999).toBe("9999");

            // The runtime function's return type is typed as AsFourDigitYear<T>
            // Due to the type implementation bug, these resolve to errors
            type cases = [
                Expect<Test<typeof year2024, "equals", "2024">>,
                Expect<Test<typeof year1999, "equals", "1999">>,
                Expect<Test<typeof year9999, "equals", "9999">>,
            ];
        });

        it("handles valid three-digit years by padding", () => {
            const year123 = asFourDigitYear(123);
            const year456 = asFourDigitYear(456);
            const year999 = asFourDigitYear(999);

            expect(year123).toBe("0123");
            expect(year456).toBe("0456");
            expect(year999).toBe("0999");

            type cases = [
                Expect<Test<typeof year123, "equals", "0123">>,
                Expect<Test<typeof year456, "equals", "0456">>,
                Expect<Test<typeof year999, "equals", "0999">>,
            ];
        });

        it("handles valid two-digit years by padding", () => {
            const year12 = asFourDigitYear(12);
            const year34 = asFourDigitYear(34);
            const year99 = asFourDigitYear(99);

            expect(year12).toBe("0012");
            expect(year34).toBe("0034");
            expect(year99).toBe("0099");

            type cases = [
                Expect<Test<typeof year12, "equals", "0012">>,
                Expect<Test<typeof year34, "equals", "0034">>,
                Expect<Test<typeof year99, "equals", "0099">>,
            ];
        });

        it("handles valid one-digit years by padding", () => {
            const year1 = asFourDigitYear(1);
            const year5 = asFourDigitYear(5);
            const year9 = asFourDigitYear(9);

            expect(year1).toBe("0001");
            expect(year5).toBe("0005");
            expect(year9).toBe("0009");

            type cases = [
                Expect<Test<typeof year1, "equals", "0001">>,
                Expect<Test<typeof year5, "equals", "0005">>,
                Expect<Test<typeof year9, "equals", "0009">>,
            ];
        });

        it("handles year zero", () => {
            const year0 = asFourDigitYear(0);

            expect(year0).toBe("0000");

            type cases = [
                Expect<Test<typeof year0, "equals", "0000">>,
            ];
        });

        it("handles number-like strings", () => {
            const year2024 = asFourDigitYear("2024");
            const year123 = asFourDigitYear("123");
            const year45 = asFourDigitYear("45");

            expect(year2024).toBe("2024");
            expect(year123).toBe("0123");
            expect(year45).toBe("0045");

            // String literals get treated as "wrong-type" by the type utility
            type cases = [
                Expect<Test<typeof year2024, "equals", "2024">>,
                Expect<Test<typeof year123, "equals", "0123">>,
                Expect<Test<typeof year45, "equals", "0045">>,
            ];
        });

        it("returns errors for negative numbers", () => {
            const negativeYear = asFourDigitYear(-2024);
            const negativeOne = asFourDigitYear(-1);

            // Since the function returns an error object, we need to check it's an error
            expect(negativeYear).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));
            expect(negativeOne).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));

            type cases = [
                Expect<Test<typeof negativeYear, "extends", Error>>,
                Expect<Test<typeof negativeOne, "extends", Error>>,
            ];
        });

        it("returns errors for numbers too large", () => {
            const tooLarge = asFourDigitYear(10000);
            const wayTooLarge = asFourDigitYear(99999);

            expect(tooLarge).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));
            expect(wayTooLarge).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));

            type cases = [
                Expect<Test<typeof tooLarge, "extends", Error>>,
                Expect<Test<typeof wayTooLarge, "extends", Error>>,
            ];
        });

        it("returns errors for non-integer numbers", () => {
            const decimal = asFourDigitYear(2024.5);
            const float = asFourDigitYear(123.456);

            expect(decimal).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));
            expect(float).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));

            type cases = [
                Expect<Test<typeof decimal, "isError", "year-invalid/float">>,
                Expect<Test<typeof float, "isError", "year-invalid/float">>,
            ];
        });

        it("returns errors for invalid string inputs", () => {
            const invalidString = asFourDigitYear("not-a-year");
            const emptyString = asFourDigitYear("");
            const mixedString = asFourDigitYear("20a4");

            expect(invalidString).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));
            // Empty string converts to 0, which becomes "0000"
            expect(emptyString).toBe("0000");
            expect(mixedString).toEqual(expect.objectContaining({
                type: expect.stringMatching(/year-invalid/)
            }));

            type cases = [
                Expect<Test<typeof invalidString, "isError", "year-invalid/type">>,
                Expect<Test<typeof emptyString, "isError", "year-invalid/type">>,
                Expect<Test<typeof mixedString, "isError", "year-invalid/type">>,
            ];
        });
    });

});
