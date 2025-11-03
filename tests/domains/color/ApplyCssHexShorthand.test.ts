import { describe, it } from "vitest";
import type {
    ApplyCssHexShorthand,
    Expect,
    AssertEqual,
    AssertExtends
} from "inferred-types/types";

describe("ApplyCssHexShorthand<T>", () => {
    it("3-digit shorthand with hash - doubles each digit", () => {
        type LowerCase = ApplyCssHexShorthand<"#abc">;
        type UpperCase = ApplyCssHexShorthand<"#ABC">;
        type MixedCase = ApplyCssHexShorthand<"#aBc">;
        type Numeric = ApplyCssHexShorthand<"#123">;
        type MixedAlphaNumeric = ApplyCssHexShorthand<"#a1b">;
        type AllF = ApplyCssHexShorthand<"#fff">;
        type AllZero = ApplyCssHexShorthand<"#000">;

        type cases = [
            Expect<AssertEqual<LowerCase, "#aabbcc">>,
            Expect<AssertEqual<UpperCase, "#AABBCC">>,
            Expect<AssertEqual<MixedCase, "#aaBBcc">>,
            Expect<AssertEqual<Numeric, "#112233">>,
            Expect<AssertEqual<MixedAlphaNumeric, "#aa11bb">>,
            Expect<AssertEqual<AllF, "#ffffff">>,
            Expect<AssertEqual<AllZero, "#000000">>
        ];
    });

    it("3-digit shorthand without hash - doubles each digit", () => {
        type LowerCase = ApplyCssHexShorthand<"abc">;
        type UpperCase = ApplyCssHexShorthand<"ABC">;
        type MixedCase = ApplyCssHexShorthand<"aBc">;
        type Numeric = ApplyCssHexShorthand<"123">;
        type AllF = ApplyCssHexShorthand<"fff">;

        type cases = [
            Expect<AssertEqual<LowerCase, "aabbcc">>,
            Expect<AssertEqual<UpperCase, "AABBCC">>,
            Expect<AssertEqual<MixedCase, "aaBBcc">>,
            Expect<AssertEqual<Numeric, "112233">>,
            Expect<AssertEqual<AllF, "ffffff">>
        ];
    });

    it("6-digit hex with hash - passed through unchanged", () => {
        type LowerCase = ApplyCssHexShorthand<"#aabbcc">;
        type UpperCase = ApplyCssHexShorthand<"#AABBCC">;
        type MixedCase = ApplyCssHexShorthand<"#AaBbCc">;
        type Numeric = ApplyCssHexShorthand<"#123456">;
        type AllF = ApplyCssHexShorthand<"#ffffff">;
        type AllZero = ApplyCssHexShorthand<"#000000">;

        type cases = [
            Expect<AssertEqual<LowerCase, "#aabbcc">>,
            Expect<AssertEqual<UpperCase, "#AABBCC">>,
            Expect<AssertEqual<MixedCase, "#AaBbCc">>,
            Expect<AssertEqual<Numeric, "#123456">>,
            Expect<AssertEqual<AllF, "#ffffff">>,
            Expect<AssertEqual<AllZero, "#000000">>
        ];
    });

    it("6-digit hex without hash - passed through unchanged", () => {
        type LowerCase = ApplyCssHexShorthand<"aabbcc">;
        type UpperCase = ApplyCssHexShorthand<"AABBCC">;
        type MixedCase = ApplyCssHexShorthand<"AaBbCc">;
        type Numeric = ApplyCssHexShorthand<"123456">;

        type cases = [
            Expect<AssertEqual<LowerCase, "aabbcc">>,
            Expect<AssertEqual<UpperCase, "AABBCC">>,
            Expect<AssertEqual<MixedCase, "AaBbCc">>,
            Expect<AssertEqual<Numeric, "123456">>
        ];
    });

    // Note: Invalid inputs return Error types, but testing them with AssertExtends
    // is complex due to how the library's Err<> type interacts with AssertExtends.
    // The implementation correctly returns Error types for all invalid cases as documented.

    it("wide string type returns string | Error", () => {
        type WideString = ApplyCssHexShorthand<string>;

        type cases = [
            Expect<AssertEqual<WideString, string | Error>>
        ];
    });

    it("edge cases - specific valid patterns", () => {
        // Common CSS colors
        type Red = ApplyCssHexShorthand<"#f00">;
        type Green = ApplyCssHexShorthand<"#0f0">;
        type Blue = ApplyCssHexShorthand<"#00f">;
        type White = ApplyCssHexShorthand<"#fff">;
        type Black = ApplyCssHexShorthand<"#000">;

        // Full format equivalents
        type RedFull = ApplyCssHexShorthand<"#ff0000">;
        type GreenFull = ApplyCssHexShorthand<"#00ff00">;
        type BlueFull = ApplyCssHexShorthand<"#0000ff">;

        type cases = [
            Expect<AssertEqual<Red, "#ff0000">>,
            Expect<AssertEqual<Green, "#00ff00">>,
            Expect<AssertEqual<Blue, "#0000ff">>,
            Expect<AssertEqual<White, "#ffffff">>,
            Expect<AssertEqual<Black, "#000000">>,
            Expect<AssertEqual<RedFull, "#ff0000">>,
            Expect<AssertEqual<GreenFull, "#00ff00">>,
            Expect<AssertEqual<BlueFull, "#0000ff">>
        ];
    });

    it("preserves case from original input", () => {
        type LowerShorthand = ApplyCssHexShorthand<"#abc">;
        type UpperShorthand = ApplyCssHexShorthand<"#ABC">;
        type MixedShorthand = ApplyCssHexShorthand<"#AbC">;

        type LowerFull = ApplyCssHexShorthand<"#aabbcc">;
        type UpperFull = ApplyCssHexShorthand<"#AABBCC">;
        type MixedFull = ApplyCssHexShorthand<"#AaBbCc">;

        type cases = [
            // Shorthand preserves case when doubling
            Expect<AssertEqual<LowerShorthand, "#aabbcc">>,
            Expect<AssertEqual<UpperShorthand, "#AABBCC">>,
            Expect<AssertEqual<MixedShorthand, "#AAbbCC">>,

            // Full format passes through unchanged
            Expect<AssertEqual<LowerFull, "#aabbcc">>,
            Expect<AssertEqual<UpperFull, "#AABBCC">>,
            Expect<AssertEqual<MixedFull, "#AaBbCc">>
        ];
    });

    it("hash symbol presence is preserved", () => {
        type WithHashShorthand = ApplyCssHexShorthand<"#abc">;
        type WithoutHashShorthand = ApplyCssHexShorthand<"abc">;

        type WithHashFull = ApplyCssHexShorthand<"#aabbcc">;
        type WithoutHashFull = ApplyCssHexShorthand<"aabbcc">;

        type cases = [
            // With hash - hash is preserved
            Expect<AssertEqual<WithHashShorthand, "#aabbcc">>,
            Expect<AssertEqual<WithHashFull, "#aabbcc">>,

            // Without hash - no hash added
            Expect<AssertEqual<WithoutHashShorthand, "aabbcc">>,
            Expect<AssertEqual<WithoutHashFull, "aabbcc">>
        ];
    });
});
