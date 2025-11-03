import { describe, it } from "vitest";
import type {
    AsRgbTuple,
    Expect,
    AssertEqual,
    AssertError
} from "inferred-types/types";

describe("AsRgbTuple<T>", () => {

    describe("RGB object to tuple conversion", () => {
        it("converts valid RGB object to labeled tuple", () => {
            type OrangeTuple = AsRgbTuple<{ r: 255, g: 128, b: 0 }>;
            type BlackTuple = AsRgbTuple<{ r: 0, g: 0, b: 0 }>;
            type WhiteTuple = AsRgbTuple<{ r: 255, g: 255, b: 255 }>;

            type cases = [
                Expect<AssertEqual<OrangeTuple, [red: 255, green: 128, blue: 0]>>,
                Expect<AssertEqual<BlackTuple, [red: 0, green: 0, blue: 0]>>,
                Expect<AssertEqual<WhiteTuple, [red: 255, green: 255, blue: 255]>>,
            ]
        });

        it("handles boundary RGB values (0 and 255)", () => {
            type MinValues = AsRgbTuple<{ r: 0, g: 0, b: 0 }>;
            type MaxValues = AsRgbTuple<{ r: 255, g: 255, b: 255 }>;
            type Mixed = AsRgbTuple<{ r: 0, g: 128, b: 255 }>;

            type cases = [
                Expect<AssertEqual<MinValues, [red: 0, green: 0, blue: 0]>>,
                Expect<AssertEqual<MaxValues, [red: 255, green: 255, blue: 255]>>,
                Expect<AssertEqual<Mixed, [red: 0, green: 128, blue: 255]>>,
            ]
        });

        it("converts various mid-range RGB values", () => {
            type Gray = AsRgbTuple<{ r: 128, g: 128, b: 128 }>;
            type Purple = AsRgbTuple<{ r: 128, g: 0, b: 128 }>;
            type Olive = AsRgbTuple<{ r: 128, g: 128, b: 0 }>;

            type cases = [
                Expect<AssertEqual<Gray, [red: 128, green: 128, blue: 128]>>,
                Expect<AssertEqual<Purple, [red: 128, green: 0, blue: 128]>>,
                Expect<AssertEqual<Olive, [red: 128, green: 128, blue: 0]>>,
            ]
        });
    });

    describe("RGBA to RGB tuple conversion", () => {
        it("extracts r, g, b from RGBA object and converts to tuple", () => {
            type FromRgba = AsRgbTuple<{ r: 255, g: 128, b: 64, a: 0.5 }>;
            type OpaqueRgba = AsRgbTuple<{ r: 100, g: 150, b: 200, a: 1.0 }>;

            type cases = [
                Expect<AssertEqual<FromRgba, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<OpaqueRgba, [red: 100, green: 150, blue: 200]>>,
            ]
        });

        it("handles RGBA with alpha = 0 (fully transparent)", () => {
            type Transparent = AsRgbTuple<{ r: 255, g: 255, b: 255, a: 0 }>;

            type cases = [
                Expect<AssertEqual<Transparent, [red: 255, green: 255, blue: 255]>>
            ]
        });

        it("handles RGBA with various alpha values", () => {
            type HalfOpaque = AsRgbTuple<{ r: 200, g: 100, b: 50, a: 0.5 }>;
            type AlmostTransparent = AsRgbTuple<{ r: 255, g: 0, b: 0, a: 0.1 }>;

            type cases = [
                Expect<AssertEqual<HalfOpaque, [red: 200, green: 100, blue: 50]>>,
                Expect<AssertEqual<AlmostTransparent, [red: 255, green: 0, blue: 0]>>,
            ]
        });
    });

    describe("CSS rgb() string to tuple conversion", () => {
        it("parses standard CSS rgb() format with commas", () => {
            type CommaFormat = AsRgbTuple<"rgb(255, 128, 64)">;
            type NoSpaces = AsRgbTuple<"rgb(255,128,64)">;
            type ExtraSpaces = AsRgbTuple<"rgb( 255 , 128 , 64 )">;

            type cases = [
                Expect<AssertEqual<CommaFormat, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<NoSpaces, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<ExtraSpaces, [red: 255, green: 128, blue: 64]>>,
            ]
        });

        it("parses CSS rgb() format with spaces as separators", () => {
            type SpaceFormat = AsRgbTuple<"rgb(255 128 64)">;

            type cases = [
                Expect<AssertEqual<SpaceFormat, [red: 255, green: 128, blue: 64]>>,
            ]
        });

        it("handles boundary values in CSS format", () => {
            type Black = AsRgbTuple<"rgb(0, 0, 0)">;
            type White = AsRgbTuple<"rgb(255, 255, 255)">;
            type Red = AsRgbTuple<"rgb(255, 0, 0)">;

            type cases = [
                Expect<AssertEqual<Black, [red: 0, green: 0, blue: 0]>>,
                Expect<AssertEqual<White, [red: 255, green: 255, blue: 255]>>,
                Expect<AssertEqual<Red, [red: 255, green: 0, blue: 0]>>,
            ]
        });

        it("handles various CSS rgb() formatting styles", () => {
            type LeadingSpaces = AsRgbTuple<"rgb(  255, 128, 64)">;
            type TrailingSpaces = AsRgbTuple<"rgb(255, 128, 64  )">;

            type cases = [
                Expect<AssertEqual<LeadingSpaces, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<TrailingSpaces, [red: 255, green: 128, blue: 64]>>,
            ]
        });
    });

    describe("HexColor to tuple conversion", () => {
        it("converts 6-digit hex colors to labeled tuple", () => {
            type OrangeHex = AsRgbTuple<"#FF8040">;
            type BlackHex = AsRgbTuple<"#000000">;
            type WhiteHex = AsRgbTuple<"#FFFFFF">;

            type cases = [
                Expect<AssertEqual<OrangeHex, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<BlackHex, [red: 0, green: 0, blue: 0]>>,
                Expect<AssertEqual<WhiteHex, [red: 255, green: 255, blue: 255]>>,
            ]
        });

        it("converts 3-digit shorthand hex colors to labeled tuple", () => {
            type RedShort = AsRgbTuple<"#F00">;
            type GreenShort = AsRgbTuple<"#0F0">;
            type BlueShort = AsRgbTuple<"#00F">;

            type cases = [
                Expect<AssertEqual<RedShort, [red: 255, green: 0, blue: 0]>>,
                Expect<AssertEqual<GreenShort, [red: 0, green: 255, blue: 0]>>,
                Expect<AssertEqual<BlueShort, [red: 0, green: 0, blue: 255]>>,
            ]
        });

        it("handles lowercase and mixed-case hex colors", () => {
            type LowercaseHex = AsRgbTuple<"#ff8040">;
            type MixedCase = AsRgbTuple<"#Ff8040">;
            type LowercaseShort = AsRgbTuple<"#f0a">;

            type cases = [
                Expect<AssertEqual<LowercaseHex, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<MixedCase, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<LowercaseShort, [red: 255, green: 0, blue: 170]>>,
            ]
        });

        it("converts common web color hex codes to tuples", () => {
            type Tomato = AsRgbTuple<"#FF6347">;
            type SkyBlue = AsRgbTuple<"#87CEEB">;
            type LimeGreen = AsRgbTuple<"#32CD32">;
            type Gold = AsRgbTuple<"#FFD700">;

            type cases = [
                Expect<AssertEqual<Tomato, [red: 255, green: 99, blue: 71]>>,
                Expect<AssertEqual<SkyBlue, [red: 135, green: 206, blue: 235]>>,
                Expect<AssertEqual<LimeGreen, [red: 50, green: 205, blue: 50]>>,
                Expect<AssertEqual<Gold, [red: 255, green: 215, blue: 0]>>,
            ]
        });
    });

    describe("Tuple structure verification", () => {
        it("produces labeled tuple with correct property names", () => {
            type Result = AsRgbTuple<"#FF8040">;

            // Verify tuple has labeled elements
            type cases = [
                Expect<AssertEqual<Result, [red: 255, green: 128, blue: 64]>>,
            ]
        });

        it("tuple length is always 3 for valid inputs", () => {
            type FromRgb = AsRgbTuple<{ r: 100, g: 150, b: 200 }>;
            type FromRgba = AsRgbTuple<{ r: 100, g: 150, b: 200, a: 0.5 }>;
            type FromCss = AsRgbTuple<"rgb(100, 150, 200)">;
            type FromHex = AsRgbTuple<"#6496C8">;

            type cases = [
                Expect<AssertEqual<FromRgb, [red: 100, green: 150, blue: 200]>>,
                Expect<AssertEqual<FromRgba, [red: 100, green: 150, blue: 200]>>,
                Expect<AssertEqual<FromCss, [red: 100, green: 150, blue: 200]>>,
                Expect<AssertEqual<FromHex, [red: 100, green: 150, blue: 200]>>,
            ]
        });
    });

    describe("Error propagation", () => {
        it("returns error for invalid RGB values (out of range)", () => {
            type TooLarge = AsRgbTuple<{ r: 256, g: 128, b: 64 }>;
            type Negative = AsRgbTuple<{ r: -1, g: 128, b: 64 }>;

            type cases = [
                Expect<AssertError<TooLarge, "invalid-type">>,
                Expect<AssertError<Negative, "invalid-type">>,
            ]
        });

        it("returns error for non-integer RGB values", () => {
            type Decimal = AsRgbTuple<{ r: 255.5, g: 128, b: 64 }>;

            type cases = [
                Expect<AssertError<Decimal, "invalid-type">>
            ]
        });

        it("returns error for invalid RGBA color values", () => {
            type InvalidRgba = AsRgbTuple<{ r: 256, g: 128, b: 64, a: 0.5 }>;
            type NegativeInRgba = AsRgbTuple<{ r: 255, g: -1, b: 64, a: 0.5 }>;

            type cases = [
                Expect<AssertError<InvalidRgba, "invalid-type">>,
                Expect<AssertError<NegativeInRgba, "invalid-type">>,
            ]
        });

        it("returns error for malformed CSS rgb strings", () => {
            type MissingValue = AsRgbTuple<"rgb(255, 128)">;
            type TooManyValues = AsRgbTuple<"rgb(255, 128, 64, 32)">;
            type NotNumbers = AsRgbTuple<"rgb(red, green, blue)">;

            type cases = [
                Expect<AssertError<MissingValue, "invalid-type">>,
                Expect<AssertError<TooManyValues, "invalid-type">>,
                Expect<AssertError<NotNumbers, "invalid-type">>,
            ]
        });

        it("returns error for invalid hex color format", () => {
            type InvalidHex = AsRgbTuple<"#GGGGGG">;
            type WrongLength = AsRgbTuple<"#FF">;
            type NoHash = AsRgbTuple<"FF0000">;

            type cases = [
                Expect<AssertError<InvalidHex, "invalid-type">>,
                Expect<AssertError<WrongLength, "invalid-type">>,
                Expect<AssertError<NoHash, "invalid-type">>,
            ]
        });

        it("returns error for unsupported input types", () => {
            type NumberInput = AsRgbTuple<123>;
            type BooleanInput = AsRgbTuple<true>;
            type ArrayInput = AsRgbTuple<[255, 128, 64]>;

            type cases = [
                Expect<AssertError<NumberInput, "invalid-type">>,
                Expect<AssertError<BooleanInput, "invalid-type">>,
                Expect<AssertError<ArrayInput, "invalid-type">>,
            ]
        });
    });

    describe("Edge cases", () => {
        it("handles RGB object with extra properties", () => {
            type ExtraProps = AsRgbTuple<{ r: 255, g: 128, b: 64, extra: "ignored" }>;

            type cases = [
                // Should still produce valid tuple if core RGB properties are valid
                Expect<AssertEqual<ExtraProps, [red: 255, green: 128, blue: 64]>>
            ]
        });

        it("handles single-digit values in all formats", () => {
            type SingleDigitRgb = AsRgbTuple<{ r: 1, g: 2, b: 3 }>;
            type SingleDigitCss = AsRgbTuple<"rgb(1, 2, 3)">;

            type cases = [
                Expect<AssertEqual<SingleDigitRgb, [red: 1, green: 2, blue: 3]>>,
                Expect<AssertEqual<SingleDigitCss, [red: 1, green: 2, blue: 3]>>,
            ]
        });

        it("handles all possible CSS rgb() whitespace variations", () => {
            type NoWhitespace = AsRgbTuple<"rgb(255,128,64)">;
            type StandardWhitespace = AsRgbTuple<"rgb(255, 128, 64)">;
            type ExcessWhitespace = AsRgbTuple<"rgb(  255  ,  128  ,  64  )">;

            type cases = [
                Expect<AssertEqual<NoWhitespace, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<StandardWhitespace, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<ExcessWhitespace, [red: 255, green: 128, blue: 64]>>,
            ]
        });
    });
});
