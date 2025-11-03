import { describe, it } from "vitest";
import type {
    IsHexColor,
    Expect,
    AssertTrue,
    AssertFalse
} from "inferred-types/types";

describe("IsHexColor<T>", () => {
    it("valid hex colors with 3 digits", () => {
        type ThreeDigitLower = IsHexColor<"#abc">;
        type ThreeDigitUpper = IsHexColor<"#ABC">;
        type ThreeDigitMixed = IsHexColor<"#aBc">;
        type ThreeDigitNumeric = IsHexColor<"#123">;
        type ThreeDigitMixed2 = IsHexColor<"#a1b">;

        type cases = [
            Expect<AssertTrue<ThreeDigitLower>>,
            Expect<AssertTrue<ThreeDigitUpper>>,
            Expect<AssertTrue<ThreeDigitMixed>>,
            Expect<AssertTrue<ThreeDigitNumeric>>,
            Expect<AssertTrue<ThreeDigitMixed2>>
        ];
    });

    it("valid hex colors with 6 digits", () => {
        type SixDigitLower = IsHexColor<"#aabbcc">;
        type SixDigitUpper = IsHexColor<"#AABBCC">;
        type SixDigitMixed = IsHexColor<"#AaBbCc">;
        type SixDigitNumeric = IsHexColor<"#123456">;
        type SixDigitMixed2 = IsHexColor<"#a1b2c3">;
        type SixDigitAllF = IsHexColor<"#ffffff">;
        type SixDigitAll0 = IsHexColor<"#000000">;

        type cases = [
            Expect<AssertTrue<SixDigitLower>>,
            Expect<AssertTrue<SixDigitUpper>>,
            Expect<AssertTrue<SixDigitMixed>>,
            Expect<AssertTrue<SixDigitNumeric>>,
            Expect<AssertTrue<SixDigitMixed2>>,
            Expect<AssertTrue<SixDigitAllF>>,
            Expect<AssertTrue<SixDigitAll0>>
        ];
    });

    it("invalid - wrong lengths (1, 2, 4, 5 digits not valid per CSS spec)", () => {
        type OneDigit = IsHexColor<"#a">;
        type TwoDigits = IsHexColor<"#ab">;
        type FourDigits = IsHexColor<"#abcd">;
        type FiveDigits = IsHexColor<"#abcde">;

        type cases = [
            Expect<AssertFalse<OneDigit>>,
            Expect<AssertFalse<TwoDigits>>,
            Expect<AssertFalse<FourDigits>>,
            Expect<AssertFalse<FiveDigits>>
        ];
    });

    it("invalid - missing hash symbol", () => {
        type NoHash = IsHexColor<"abc">;
        type NoHashSix = IsHexColor<"aabbcc">;

        type cases = [
            Expect<AssertFalse<NoHash>>,
            Expect<AssertFalse<NoHashSix>>
        ];
    });

    it("invalid - non-hexadecimal characters", () => {
        type WithG = IsHexColor<"#abg">;
        type WithZ = IsHexColor<"#xyz">;
        type WithSpace = IsHexColor<"#ab c">;
        type WithSpecial = IsHexColor<"#ab!">;
        type WithDash = IsHexColor<"#ab-cd">;

        type cases = [
            Expect<AssertFalse<WithG>>,
            Expect<AssertFalse<WithZ>>,
            Expect<AssertFalse<WithSpace>>,
            Expect<AssertFalse<WithSpecial>>,
            Expect<AssertFalse<WithDash>>
        ];
    });

    it("invalid - empty or too short", () => {
        type EmptyString = IsHexColor<"">;
        type OnlyHash = IsHexColor<"#">;

        type cases = [
            Expect<AssertFalse<EmptyString>>,
            Expect<AssertFalse<OnlyHash>>
        ];
    });

    it("invalid - wrong length (7+ digits not valid for RGB)", () => {
        type SevenDigitsInvalid = IsHexColor<"#abcdefg">; // 'g' is invalid hex char
        type SevenDigitsValid = IsHexColor<"#abcdef0">; // 7 valid hex chars
        type EightDigits = IsHexColor<"#12345678">;
        type NineDigits = IsHexColor<"#123456789">;

        type cases = [
            Expect<AssertFalse<SevenDigitsInvalid>>,
            Expect<AssertFalse<SevenDigitsValid>>, // Still false - only 3 or 6 allowed
            Expect<AssertFalse<EightDigits>>,
            Expect<AssertFalse<NineDigits>>
        ];
    });

    it("wide string type returns boolean", () => {
        type WideString = IsHexColor<string>;

        type cases = [
            Expect<AssertTrue<WideString extends boolean ? true : false>>
        ];
    });

    it("non-string types return false", () => {
        type NumberType = IsHexColor<123>;
        type BooleanType = IsHexColor<true>;
        type ObjectType = IsHexColor<{ color: string }>;
        type ArrayType = IsHexColor<string[]>;
        type NullType = IsHexColor<null>;
        type UndefinedType = IsHexColor<undefined>;

        type cases = [
            Expect<AssertFalse<NumberType>>,
            Expect<AssertFalse<BooleanType>>,
            Expect<AssertFalse<ObjectType>>,
            Expect<AssertFalse<ArrayType>>,
            Expect<AssertFalse<NullType>>,
            Expect<AssertFalse<UndefinedType>>
        ];
    });

    it("edge case - all valid hex characters", () => {
        type AllHexChars = IsHexColor<"#0123456789abcdefABCDEF">;

        type cases = [
            // This should be false because it's more than 6 characters
            Expect<AssertFalse<AllHexChars>>
        ];
    });

    it("edge case - uppercase vs lowercase", () => {
        type LowerA = IsHexColor<"#aaa">;
        type UpperA = IsHexColor<"#AAA">;
        type MixedA = IsHexColor<"#AaA">;

        type cases = [
            Expect<AssertTrue<LowerA>>,
            Expect<AssertTrue<UpperA>>,
            Expect<AssertTrue<MixedA>>
        ];
    });
});
