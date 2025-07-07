import { describe, it } from "vitest";
import {
    Expect,
    IsFourDigitYear,
    Test,
} from "inferred-types/types";

describe("IsFourDigitYear<T>", () => {

    it("valid 4-digit years", () => {
        type Year1900 = IsFourDigitYear<"1900">;
        type Year2000 = IsFourDigitYear<"2000">;
        type Year2023 = IsFourDigitYear<"2023">;
        type Year2024 = IsFourDigitYear<"2024">;
        type Year1985 = IsFourDigitYear<"1985">;
        type Year1776 = IsFourDigitYear<"1776">;

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
        type Year0000 = IsFourDigitYear<"0000">;
        type Year0001 = IsFourDigitYear<"0001">;
        type Year9999 = IsFourDigitYear<"9999">;
        type Year0100 = IsFourDigitYear<"0100">;
        type Year0010 = IsFourDigitYear<"0010">;
        type Year0999 = IsFourDigitYear<"0999">;

        type cases = [
            Expect<Test<Year0000, "equals", true>>,
            Expect<Test<Year0001, "equals", true>>,
            Expect<Test<Year9999, "equals", true>>,
            Expect<Test<Year0100, "equals", true>>,
            Expect<Test<Year0010, "equals", true>>,
            Expect<Test<Year0999, "equals", true>>
        ];
    });

    it("all single digits in each position", () => {
        type WithZeros = IsFourDigitYear<"0000">;
        type WithOnes = IsFourDigitYear<"1111">;
        type WithTwos = IsFourDigitYear<"2222">;
        type WithThrees = IsFourDigitYear<"3333">;
        type WithFours = IsFourDigitYear<"4444">;
        type WithFives = IsFourDigitYear<"5555">;
        type WithSixes = IsFourDigitYear<"6666">;
        type WithSevens = IsFourDigitYear<"7777">;
        type WithEights = IsFourDigitYear<"8888">;
        type WithNines = IsFourDigitYear<"9999">;

        type cases = [
            Expect<Test<WithZeros, "equals", true>>,
            Expect<Test<WithOnes, "equals", true>>,
            Expect<Test<WithTwos, "equals", true>>,
            Expect<Test<WithThrees, "equals", true>>,
            Expect<Test<WithFours, "equals", true>>,
            Expect<Test<WithFives, "equals", true>>,
            Expect<Test<WithSixes, "equals", true>>,
            Expect<Test<WithSevens, "equals", true>>,
            Expect<Test<WithEights, "equals", true>>,
            Expect<Test<WithNines, "equals", true>>
        ];
    });

    it("invalid length - too short", () => {
        type OneDigit = IsFourDigitYear<"1">;
        type TwoDigit = IsFourDigitYear<"23">;
        type ThreeDigit = IsFourDigitYear<"123">;
        type Empty = IsFourDigitYear<"">;

        type cases = [
            Expect<Test<OneDigit, "equals", false>>,
            Expect<Test<TwoDigit, "equals", false>>,
            Expect<Test<ThreeDigit, "equals", false>>,
            Expect<Test<Empty, "equals", false>>
        ];
    });

    it("invalid length - too long", () => {
        type FiveDigit = IsFourDigitYear<"12345">;
        type SixDigit = IsFourDigitYear<"123456">;
        type TenDigit = IsFourDigitYear<"1234567890">;
        type WithExtra = IsFourDigitYear<"2023extra">;

        type cases = [
            Expect<Test<FiveDigit, "equals", false>>,
            Expect<Test<SixDigit, "equals", false>>,
            Expect<Test<TenDigit, "equals", false>>,
            Expect<Test<WithExtra, "equals", false>>
        ];
    });

    it("non-numeric characters", () => {
        type WithLetters = IsFourDigitYear<"abcd">;
        type MixedAlphaNum1 = IsFourDigitYear<"12ab">;
        type MixedAlphaNum2 = IsFourDigitYear<"ab12">;
        type MixedAlphaNum3 = IsFourDigitYear<"1a2b">;
        type WithSpace = IsFourDigitYear<"20 3">;
        type WithDash = IsFourDigitYear<"20-3">;
        type WithSlash = IsFourDigitYear<"20/3">;
        type AllLetters = IsFourDigitYear<"year">;
        type SpecialChars = IsFourDigitYear<"!@#$">;
        type WithDot = IsFourDigitYear<"20.3">;
        type WithComma = IsFourDigitYear<"2,023">;

        type cases = [
            Expect<Test<WithLetters, "equals", false>>,
            Expect<Test<MixedAlphaNum1, "equals", false>>,
            Expect<Test<MixedAlphaNum2, "equals", false>>,
            Expect<Test<MixedAlphaNum3, "equals", false>>,
            Expect<Test<WithSpace, "equals", false>>,
            Expect<Test<WithDash, "equals", false>>,
            Expect<Test<WithSlash, "equals", false>>,
            Expect<Test<AllLetters, "equals", false>>,
            Expect<Test<SpecialChars, "equals", false>>,
            Expect<Test<WithDot, "equals", false>>,
            Expect<Test<WithComma, "equals", false>>
        ];
    });

    it("partial numeric strings", () => {
        type StartNumeric = IsFourDigitYear<"123a">;
        type EndNumeric = IsFourDigitYear<"a123">;
        type MiddleLetters = IsFourDigitYear<"1a3b">;
        type SpaceInMiddle = IsFourDigitYear<"12 34">;
        type TabInMiddle = IsFourDigitYear<"12\t34">;

        type cases = [
            Expect<Test<StartNumeric, "equals", false>>,
            Expect<Test<EndNumeric, "equals", false>>,
            Expect<Test<MiddleLetters, "equals", false>>,
            Expect<Test<SpaceInMiddle, "equals", false>>,
            Expect<Test<TabInMiddle, "equals", false>>
        ];
    });

    it("whitespace variations", () => {
        type LeadingSpace = IsFourDigitYear<" 2023">;
        type TrailingSpace = IsFourDigitYear<"2023 ">;
        type BothSpaces = IsFourDigitYear<" 2023 ">;
        type Tab = IsFourDigitYear<"\t2023">;
        type Newline = IsFourDigitYear<"2023\n">;
        type CarriageReturn = IsFourDigitYear<"2023\r">;

        type cases = [
            Expect<Test<LeadingSpace, "equals", false>>,
            Expect<Test<TrailingSpace, "equals", false>>,
            Expect<Test<BothSpaces, "equals", false>>,
            Expect<Test<Tab, "equals", false>>,
            Expect<Test<Newline, "equals", false>>,
            Expect<Test<CarriageReturn, "equals", false>>
        ];
    });

    it("special numeric formats", () => {
        type NegativeNumber = IsFourDigitYear<"-123">;  // 4 chars but starts with -
        type PositiveSign = IsFourDigitYear<"+123">;    // 4 chars but starts with +
        type Decimal = IsFourDigitYear<"12.3">;         // 4 chars but contains .
        type Scientific = IsFourDigitYear<"1e23">;      // 4 chars but scientific notation
        type Hexadecimal = IsFourDigitYear<"0x12">;     // 4 chars but hex prefix
        type Binary = IsFourDigitYear<"0b11">;          // 4 chars but binary prefix

        type cases = [
            Expect<Test<NegativeNumber, "equals", false>>,
            Expect<Test<PositiveSign, "equals", false>>,
            Expect<Test<Decimal, "equals", false>>,
            Expect<Test<Scientific, "equals", false>>,
            Expect<Test<Hexadecimal, "equals", false>>,
            Expect<Test<Binary, "equals", false>>
        ];
    });

    it("wide string types and unions", () => {
        type WideString = IsFourDigitYear<string>;
        type ValidUnion = IsFourDigitYear<"2023" | "2024">;
        type InvalidUnion = IsFourDigitYear<"abc" | "def">;
        type MixedUnion = IsFourDigitYear<"2023" | "invalid">;
        type ShortLongUnion = IsFourDigitYear<"23" | "12345">;

        type cases = [
            // Wide string returns boolean
            Expect<Test<WideString, "equals", boolean>>,
            // Valid union should return true (both are valid)
            Expect<Test<ValidUnion, "equals", true>>,
            // Invalid union should return false (both are invalid)
            Expect<Test<InvalidUnion, "equals", false>>,
            // Mixed unions don't reach the wide string case, distributed over union
            Expect<Test<MixedUnion, "equals", true | false>>,
            Expect<Test<ShortLongUnion, "equals", false>>
        ];
    });

    it("non-string types", () => {
        type Numeric = IsFourDigitYear<2023>;
        type NumericType = IsFourDigitYear<number>;
        type Boolean = IsFourDigitYear<true>;
        type Array = IsFourDigitYear<[]>;
        type Object = IsFourDigitYear<{}>;
        type Null = IsFourDigitYear<null>;
        type Undefined = IsFourDigitYear<undefined>;
        type Symbol = IsFourDigitYear<symbol>;
        type BigInt = IsFourDigitYear<bigint>;
        type Function = IsFourDigitYear<() => void>;

        type cases = [
            Expect<Test<Numeric, "equals", false>>,
            Expect<Test<NumericType, "equals", false>>,
            Expect<Test<Boolean, "equals", false>>,
            Expect<Test<Array, "equals", false>>,
            Expect<Test<Object, "equals", false>>,
            Expect<Test<Null, "equals", false>>,
            Expect<Test<Undefined, "equals", false>>,
            Expect<Test<Symbol, "equals", false>>,
            Expect<Test<BigInt, "equals", false>>,
            Expect<Test<Function, "equals", false>>
        ];
    });

    it("template literal types", () => {
        type DirectLiteral = IsFourDigitYear<"2023">;
        type TemplateLiteral = IsFourDigitYear<`2023`>;
        type TemplateWithExpression = IsFourDigitYear<`${2023}`>;
        type TemplateConcat = IsFourDigitYear<`20${"23"}`>;

        type cases = [
            Expect<Test<DirectLiteral, "equals", true>>,
            Expect<Test<TemplateLiteral, "equals", true>>,
            // Template with numeric expression should work
            Expect<Test<TemplateWithExpression, "equals", true>>,
            Expect<Test<TemplateConcat, "equals", true>>
        ];
    });

    it("comprehensive valid patterns", () => {
        type Sequential1 = IsFourDigitYear<"0123">;
        type Sequential2 = IsFourDigitYear<"1234">;
        type Sequential3 = IsFourDigitYear<"5678">;
        type ReverseSeq = IsFourDigitYear<"9876">;
        type Alternating1 = IsFourDigitYear<"1010">;
        type Alternating2 = IsFourDigitYear<"2121">;
        type Pattern1 = IsFourDigitYear<"1357">;
        type Pattern2 = IsFourDigitYear<"2468">;
        type Random1 = IsFourDigitYear<"5729">;
        type Random2 = IsFourDigitYear<"8041">;

        type cases = [
            Expect<Test<Sequential1, "equals", true>>,
            Expect<Test<Sequential2, "equals", true>>,
            Expect<Test<Sequential3, "equals", true>>,
            Expect<Test<ReverseSeq, "equals", true>>,
            Expect<Test<Alternating1, "equals", true>>,
            Expect<Test<Alternating2, "equals", true>>,
            Expect<Test<Pattern1, "equals", true>>,
            Expect<Test<Pattern2, "equals", true>>,
            Expect<Test<Random1, "equals", true>>,
            Expect<Test<Random2, "equals", true>>
        ];
    });

    it("ISO date string parts", () => {
        // Testing that it correctly identifies the year part in ISO strings
        type FromISODate = IsFourDigitYear<"2023-01-01">;
        type JustYear = IsFourDigitYear<"2023">;
        type YearMonth = IsFourDigitYear<"2023-01">;
        type YearOnly = IsFourDigitYear<"2023">;

        type cases = [
            // Should fail because entire string is checked, not just first 4 chars
            Expect<Test<FromISODate, "equals", false>>,
            Expect<Test<JustYear, "equals", true>>,
            Expect<Test<YearMonth, "equals", false>>,
            Expect<Test<YearOnly, "equals", true>>
        ];
    });

    it("unicode and special characters", () => {
        type Unicode1 = IsFourDigitYear<"২০২৩">;  // Bengali numerals
        type Unicode2 = IsFourDigitYear<"٢٠٢٣">;  // Arabic numerals
        type Emoji = IsFourDigitYear<"😀😀😀😀">;
        type Mixed = IsFourDigitYear<"20२३">;    // Mixed scripts

        type cases = [
            // Non-ASCII numeric characters are not recognized as NumericChar
            Expect<Test<Unicode1, "equals", false>>,
            Expect<Test<Unicode2, "equals", false>>,
            Expect<Test<Emoji, "equals", false>>,
            Expect<Test<Mixed, "equals", false>>
        ];
    });

});
