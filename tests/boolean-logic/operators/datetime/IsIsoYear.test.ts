import { describe, it } from "vitest";
import {
    Expect,
    IsIsoYear,
    Test,
} from "inferred-types/types";

describe("IsIsoYear<T>", () => {

    it("valid 4-digit years", () => {
        type Year1900 = IsIsoYear<"1900">;
        type Year2000 = IsIsoYear<"2000">;
        type Year2023 = IsIsoYear<"2023">;
        type Year2024 = IsIsoYear<"2024">;
        type Year1985 = IsIsoYear<"1985">;
        type Year1776 = IsIsoYear<"1776">;

        type cases = [
            Expect<Test<Year1900, "equals", true>>,
            Expect<Test<Year2000, "equals", true>>,
            Expect<Test<Year2023, "equals", true>>,
            Expect<Test<Year2024, "equals", true>>,
            Expect<Test<Year1985, "equals", true>>,
            Expect<Test<Year1776, "equals", true>>
        ];
    });

    it("edge case years - boundaries", () => {
        type Year0000 = IsIsoYear<"0000">;  // Technically valid 4-digit format
        type Year0001 = IsIsoYear<"0001">;  // First valid year
        type Year9999 = IsIsoYear<"9999">;  // Maximum 4-digit year
        type Year0100 = IsIsoYear<"0100">;  // Year with leading zero
        type Year0010 = IsIsoYear<"0010">;  // Year with multiple leading zeros
        type Year0999 = IsIsoYear<"0999">;  // Pre-1000 year

        type cases = [
            Expect<Test<Year0000, "equals", true>>,
            Expect<Test<Year0001, "equals", true>>,
            Expect<Test<Year9999, "equals", true>>,
            Expect<Test<Year0100, "equals", true>>,
            Expect<Test<Year0010, "equals", true>>,
            Expect<Test<Year0999, "equals", true>>
        ];
    });

    it("historical years", () => {
        type Ancient1 = IsIsoYear<"0476">;   // Fall of Western Roman Empire
        type Ancient2 = IsIsoYear<"1066">;   // Norman Conquest
        type Ancient3 = IsIsoYear<"1215">;   // Magna Carta
        type Ancient4 = IsIsoYear<"1453">;   // Fall of Constantinople
        type Ancient5 = IsIsoYear<"1492">;   // Columbus

        type cases = [
            Expect<Test<Ancient1, "equals", true>>,
            Expect<Test<Ancient2, "equals", true>>,
            Expect<Test<Ancient3, "equals", true>>,
            Expect<Test<Ancient4, "equals", true>>,
            Expect<Test<Ancient5, "equals", true>>
        ];
    });

    it("future years", () => {
        type Future1 = IsIsoYear<"2025">;
        type Future2 = IsIsoYear<"2030">;
        type Future3 = IsIsoYear<"2100">;
        type Future4 = IsIsoYear<"3000">;
        type Future5 = IsIsoYear<"5000">;

        type cases = [
            Expect<Test<Future1, "equals", true>>,
            Expect<Test<Future2, "equals", true>>,
            Expect<Test<Future3, "equals", true>>,
            Expect<Test<Future4, "equals", true>>,
            Expect<Test<Future5, "equals", true>>
        ];
    });

    it("invalid length - too short", () => {
        type OneDigit = IsIsoYear<"1">;
        type TwoDigit = IsIsoYear<"23">;
        type ThreeDigit = IsIsoYear<"123">;
        type Empty = IsIsoYear<"">;

        type cases = [
            Expect<Test<OneDigit, "equals", false>>,
            Expect<Test<TwoDigit, "equals", false>>,
            Expect<Test<ThreeDigit, "equals", false>>,
            Expect<Test<Empty, "equals", false>>
        ];
    });

    it("invalid length - too long", () => {
        type FiveDigit = IsIsoYear<"12345">;
        type SixDigit = IsIsoYear<"123456">;
        type TenDigit = IsIsoYear<"1234567890">;
        type WithExtra = IsIsoYear<"2023extra">;

        type cases = [
            Expect<Test<FiveDigit, "equals", false>>,
            Expect<Test<SixDigit, "equals", false>>,
            Expect<Test<TenDigit, "equals", false>>,
            Expect<Test<WithExtra, "equals", false>>
        ];
    });

    it("non-numeric characters", () => {
        type WithLetters = IsIsoYear<"abcd">;
        type MixedAlphaNum = IsIsoYear<"12ab">;
        type WithSpaces = IsIsoYear<"20 3">;
        type WithSlash = IsIsoYear<"20/3">;
        type AllLetters = IsIsoYear<"year">;
        type SpecialChars = IsIsoYear<"!@#$">;

        type cases = [
            Expect<Test<WithLetters, "equals", false>>,
            Expect<Test<MixedAlphaNum, "equals", false>>,
            Expect<Test<WithSpaces, "equals", false>>,
            Expect<Test<WithSlash, "equals", false>>,
            Expect<Test<AllLetters, "equals", false>>,
            Expect<Test<SpecialChars, "equals", false>>
        ];
    });

    it("negative years and signs", () => {
        type NegativeYear1 = IsIsoYear<"-123">;   // 4 chars, valid negative number
        type NegativeYear2 = IsIsoYear<"-2023">;  // 5 chars total
        type PlusSign = IsIsoYear<"+2023">;       // 5 chars total
        type MinusOnly = IsIsoYear<"-">;          // 1 char
        type PositiveYear = IsIsoYear<"+123">;    // 4 chars, valid positive number

        type cases = [
            Expect<Test<NegativeYear1, "equals", false>>,
            Expect<Test<NegativeYear2, "equals", false>>,
            Expect<Test<PlusSign, "equals", false>>,
            Expect<Test<MinusOnly, "equals", false>>,
            Expect<Test<PositiveYear, "equals", false>>
        ];
    });

    it("decimal numbers are always invalid ISO years", () => {
        type Decimal1 = IsIsoYear<"12.3">;
        type Decimal2 = IsIsoYear<"1.23">;
        type Decimal3 = IsIsoYear<".123">;   // 4 chars, valid number
        type Decimal4 = IsIsoYear<"0.12">;
        type ScientificNotation = IsIsoYear<"1e23">;  // 4 chars, valid number

        type cases = [
            Expect<Test<Decimal1, "equals", false>>,
            Expect<Test<Decimal2, "equals", false>>,
            Expect<Test<Decimal3, "equals", false>>,
            Expect<Test<Decimal4, "equals", false>>,
            Expect<Test<ScientificNotation, "equals", false>>
        ];
    });

    it("whitespace and formatting", () => {
        type LeadingSpace = IsIsoYear<" 2023">;
        type TrailingSpace = IsIsoYear<"2023 ">;
        type MiddleSpace = IsIsoYear<"20 23">;
        type Tab = IsIsoYear<"2023\t">;
        type Newline = IsIsoYear<"2023\n">;
        type MultipleSpaces = IsIsoYear<"  2023  ">;

        type cases = [
            Expect<Test<LeadingSpace, "equals", false>>,
            Expect<Test<TrailingSpace, "equals", false>>,
            Expect<Test<MiddleSpace, "equals", false>>,
            Expect<Test<Tab, "equals", false>>,
            Expect<Test<Newline, "equals", false>>,
            Expect<Test<MultipleSpaces, "equals", false>>
        ];
    });

    it("wide string types and unions", () => {
        type WideString = IsIsoYear<string>;
        type ValidUnion = IsIsoYear<"2023" | "2024">;
        type MixedUnion = IsIsoYear<"2023" | "invalid">;
        type ValidInvalidUnion = IsIsoYear<"2023" | "abc">;
        type NumberStringUnion = IsIsoYear<"2023" | "123">;

        type cases = [
            // Wide string returns boolean due to the conditional logic
            Expect<Test<WideString, "equals", boolean>>,
            // Valid union should return true (both are valid)
            Expect<Test<ValidUnion, "equals", true>>,
            // Mixed unions return boolean when some are valid and some aren't
            Expect<Test<MixedUnion, "equals", boolean>>,
            Expect<Test<ValidInvalidUnion, "equals", boolean>>,
            Expect<Test<NumberStringUnion, "equals", boolean>>
        ];
    });

    it("non-string types", () => {
        type Numeric = IsIsoYear<2023>;
        type NumericString = IsIsoYear<number>;
        type Boolean = IsIsoYear<true>;
        type Array = IsIsoYear<[]>;
        type Object = IsIsoYear<{}>;
        type Null = IsIsoYear<null>;
        type Undefined = IsIsoYear<undefined>;
        type Symbol = IsIsoYear<symbol>;

        type cases = [
            Expect<Test<Numeric, "equals", false>>,
            Expect<Test<NumericString, "equals", false>>,
            Expect<Test<Boolean, "equals", false>>,
            Expect<Test<Array, "equals", false>>,
            Expect<Test<Object, "equals", false>>,
            Expect<Test<Null, "equals", false>>,
            Expect<Test<Undefined, "equals", false>>,
            Expect<Test<Symbol, "equals", false>>
        ];
    });

    it("comprehensive valid year samples", () => {
        // Testing various 4-digit numeric strings that should all be valid
        type Year1 = IsIsoYear<"1000">;    // First 4-digit year
        type Year2 = IsIsoYear<"1234">;    // Sequential digits
        type Year3 = IsIsoYear<"1111">;    // Repeated digits
        type Year4 = IsIsoYear<"2222">;    // Repeated digits
        type Year5 = IsIsoYear<"3333">;    // Repeated digits
        type Year6 = IsIsoYear<"4444">;    // Repeated digits
        type Year7 = IsIsoYear<"5555">;    // Repeated digits
        type Year8 = IsIsoYear<"6666">;    // Repeated digits
        type Year9 = IsIsoYear<"7777">;    // Repeated digits
        type Year10 = IsIsoYear<"8888">;   // Repeated digits
        type Year11 = IsIsoYear<"9876">;   // Descending digits
        type Year12 = IsIsoYear<"1357">;   // Odd digits
        type Year13 = IsIsoYear<"2468">;   // Even digits
        type Year14 = IsIsoYear<"0123">;   // With leading zero

        type cases = [
            Expect<Test<Year1, "equals", true>>,
            Expect<Test<Year2, "equals", true>>,
            Expect<Test<Year3, "equals", true>>,
            Expect<Test<Year4, "equals", true>>,
            Expect<Test<Year5, "equals", true>>,
            Expect<Test<Year6, "equals", true>>,
            Expect<Test<Year7, "equals", true>>,
            Expect<Test<Year8, "equals", true>>,
            Expect<Test<Year9, "equals", true>>,
            Expect<Test<Year10, "equals", true>>,
            Expect<Test<Year11, "equals", true>>,
            Expect<Test<Year12, "equals", true>>,
            Expect<Test<Year13, "equals", true>>,
            Expect<Test<Year14, "equals", true>>
        ];
    });

    it("comprehensive invalid format samples", () => {
        // Various invalid formats that should all return false
        type Invalid1 = IsIsoYear<"20">;          // Too short
        type Invalid2 = IsIsoYear<"20234">;       // Too long
        type Invalid3 = IsIsoYear<"year">;        // Non-numeric
        type Invalid4 = IsIsoYear<"20ab">;        // Mixed
        type Invalid5 = IsIsoYear<"ab23">;        // Mixed
        type Invalid6 = IsIsoYear<"hello world">; // Long text
        type Invalid7 = IsIsoYear<"2023-01-01">;  // Date format
        type Invalid8 = IsIsoYear<"12:34">;       // Time format
        type Invalid9 = IsIsoYear<"2023.5">;      // Decimal
        type Invalid10 = IsIsoYear<"2,023">;      // Comma
        type Invalid11 = IsIsoYear<"#2023">;      // Hash prefix
        type Invalid12 = IsIsoYear<"2023!">;      // Exclamation suffix

        type cases = [
            Expect<Test<Invalid1, "equals", false>>,
            Expect<Test<Invalid2, "equals", false>>,
            Expect<Test<Invalid3, "equals", false>>,
            Expect<Test<Invalid4, "equals", false>>,
            Expect<Test<Invalid5, "equals", false>>,
            Expect<Test<Invalid6, "equals", false>>,
            Expect<Test<Invalid7, "equals", false>>,
            Expect<Test<Invalid8, "equals", false>>,
            Expect<Test<Invalid9, "equals", false>>,
            Expect<Test<Invalid10, "equals", false>>,
            Expect<Test<Invalid11, "equals", false>>,
            Expect<Test<Invalid12, "equals", false>>
        ];
    });

    it("edge cases with template literals and computed types", () => {
        // Testing that the type works correctly with literal types vs computed types
        type DirectLiteral = IsIsoYear<"2023">;
        type TemplateLiteral = IsIsoYear<`2023`>;

        // These should behave the same for literal strings
        type cases = [
            Expect<Test<DirectLiteral, "equals", true>>,
            Expect<Test<TemplateLiteral, "equals", true>>
        ];
    });

});
