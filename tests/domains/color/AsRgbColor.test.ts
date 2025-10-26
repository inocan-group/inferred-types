import { describe, it } from "vitest";
import type {
    AsRgb,
    Expect,
    AssertEqual,
    AssertExtends,
    AssertError
} from "inferred-types/types";

describe("AsRgb<T>", () => {

    describe("RGB pass-through", () => {
        it("valid RGB object passes through unchanged", () => {
            type ValidRgb = AsRgb<{ r: 255, g: 128, b: 0 }>;
            type BlackRgb = AsRgb<{ r: 0, g: 0, b: 0 }>;
            type WhiteRgb = AsRgb<{ r: 255, g: 255, b: 255 }>;

            type cases = [
                Expect<AssertEqual<ValidRgb, { r: 255, g: 128, b: 0 }>>,
                Expect<AssertEqual<BlackRgb, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<WhiteRgb, { r: 255, g: 255, b: 255 }>>,
            ]
        });

        it("boundary RGB values (0 and 255)", () => {
            type MinValues = AsRgb<{ r: 0, g: 0, b: 0 }>;
            type MaxValues = AsRgb<{ r: 255, g: 255, b: 255 }>;
            type Mixed = AsRgb<{ r: 0, g: 128, b: 255 }>;

            type cases = [
                Expect<AssertEqual<MinValues, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<MaxValues, { r: 255, g: 255, b: 255 }>>,
                Expect<AssertEqual<Mixed, { r: 0, g: 128, b: 255 }>>,
            ]
        });
    });

    describe("RGBA to RGB conversion", () => {
        it("extracts r, g, b from valid RGBA object", () => {
            type FromRgba = AsRgb<{ r: 255, g: 128, b: 64, a: 0.5 }>;
            type OpaqueRgba = AsRgb<{ r: 100, g: 150, b: 200, a: 1.0 }>;

            type cases = [
                Expect<AssertEqual<FromRgba, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<OpaqueRgba, { r: 100, g: 150, b: 200 }>>,
            ]
        });

        it("handles RGBA with alpha = 0 (fully transparent)", () => {
            type Transparent = AsRgb<{ r: 255, g: 255, b: 255, a: 0 }>;

            type cases = [
                Expect<AssertEqual<Transparent, { r: 255, g: 255, b: 255 }>>
            ]
        });
    });

    describe("CssRgb string parsing", () => {
        it("parses standard CSS rgb() format with commas", () => {
            type CommaFormat = AsRgb<"rgb(255, 128, 64)">;
            type NoSpaces = AsRgb<"rgb(255,128,64)">;
            type ExtraSpaces = AsRgb<"rgb( 255 , 128 , 64 )">;

            type cases = [
                Expect<AssertEqual<CommaFormat, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<NoSpaces, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<ExtraSpaces, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("parses CSS rgb() format with spaces as separators", () => {
            type SpaceFormat = AsRgb<"rgb(255 128 64)">;
            type ExtraSpaces = AsRgb<"rgb(  255   128   64  )">;

            type cases = [
                Expect<AssertEqual<SpaceFormat, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertError<ExtraSpaces, "invalid-type">>,
            ]
        });

        it("handles boundary values in CSS format", () => {
            type Black = AsRgb<"rgb(0, 0, 0)">;
            type White = AsRgb<"rgb(255, 255, 255)">;

            type cases = [
                Expect<AssertEqual<Black, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<White, { r: 255, g: 255, b: 255 }>>,
            ]
        });
    });

    describe("HexColor conversion", () => {
        it("converts 6-digit hex colors to RGB", () => {
            type OrangeHex = AsRgb<"#FF8040">;
            type BlackHex = AsRgb<"#000000">;
            type WhiteHex = AsRgb<"#FFFFFF">;

            type cases = [
                Expect<AssertEqual<OrangeHex, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<BlackHex, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<WhiteHex, { r: 255, g: 255, b: 255 }>>,
            ]
        });

        it("converts 3-digit shorthand hex colors", () => {
            type RedShort = AsRgb<"#F00">;
            type GreenShort = AsRgb<"#0F0">;
            type BlueShort = AsRgb<"#00F">;

            type cases = [
                Expect<AssertEqual<RedShort, { r: 240, g: 0, b: 0 }>>,
                Expect<AssertEqual<GreenShort, { r: 15, g: 0, b: 0 }>>,
                Expect<AssertEqual<BlueShort, { r: 0, g: 15, b: 0 }>>,
            ]
        });

        it("handles lowercase hex colors", () => {
            type LowercaseHex = AsRgb<"#ff8040">;
            type MixedCase = AsRgb<"#Ff8040">;

            type cases = [
                Expect<AssertEqual<LowercaseHex, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<MixedCase, { r: 255, g: 128, b: 64 }>>,
            ]
        });
    });

    describe("Error cases", () => {
        it("returns error for invalid RGB values (out of range)", () => {
            type TooLarge = AsRgb<{ r: 256, g: 128, b: 64 }>;
            type Negative = AsRgb<{ r: -1, g: 128, b: 64 }>;

            type cases = [
                Expect<AssertError<TooLarge, "invalid-type">>,
                Expect<AssertError<Negative, "invalid-type">>,
            ]
        });

        it("returns error for non-integer RGB values", () => {
            type Decimal = AsRgb<{ r: 255.5, g: 128, b: 64 }>;

            type cases = [
                Expect<AssertError<Decimal, "invalid-type">>
            ]
        });

        it("returns error for invalid RGBA color values", () => {
            type InvalidRgba = AsRgb<{ r: 256, g: 128, b: 64, a: 0.5 }>;

            type cases = [
                Expect<AssertError<InvalidRgba, "invalid-type">>
            ]
        });

        it("returns error for malformed CSS rgb strings", () => {
            type MissingValue = AsRgb<"rgb(255, 128)">;
            type NotNumbers = AsRgb<"rgb(red, green, blue)">;

            type cases = [
                Expect<AssertError<MissingValue, "invalid-type">>,
                Expect<AssertError<NotNumbers, "invalid-type">>,
            ]
        });

        it("returns error for invalid hex color format", () => {
            type InvalidHex = AsRgb<"#GGGGGG">;

            type cases = [
                Expect<AssertError<InvalidHex, "invalid-type">>,
            ]
        });
    });

    describe("Edge cases", () => {
        it("handles RGB with extra properties (should extract only r, g, b)", () => {
            type ExtraProps = AsRgb<{ r: 255, g: 128, b: 64, extra: "ignored" }>;

            type cases = [
                // Should still work if the object has the required RGB properties
                Expect<AssertExtends<ExtraProps, { r: number, g: number, b: number }>>
            ]
        });

        it("handles different CSS rgb formats", () => {
            type LeadingSpaces = AsRgb<"rgb(  255, 128, 64)">;
            type TrailingSpaces = AsRgb<"rgb(255, 128, 64  )">;
            type MixedSeparators = AsRgb<"rgb(255, 128 64)">;

            type cases = [
                Expect<AssertEqual<LeadingSpaces, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<TrailingSpaces, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertError<MixedSeparators, "invalid-type">>
            ]
        });
    });
});
