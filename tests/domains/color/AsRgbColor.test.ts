import { describe, it } from "vitest";
import type {
    AsRgbObject,
    Expect,
    AssertEqual,
    AssertExtends,
    AssertError
} from "inferred-types/types";

describe("AsRgb<T>", () => {

    describe("RGB pass-through", () => {
        it("valid RGB object passes through unchanged", () => {
            type ValidRgb = AsRgbObject<{ r: 255, g: 128, b: 0 }>;
            type BlackRgb = AsRgbObject<{ r: 0, g: 0, b: 0 }>;
            type WhiteRgb = AsRgbObject<{ r: 255, g: 255, b: 255 }>;

            type cases = [
                Expect<AssertEqual<ValidRgb, { r: 255, g: 128, b: 0 }>>,
                Expect<AssertEqual<BlackRgb, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<WhiteRgb, { r: 255, g: 255, b: 255 }>>,
            ]
        });

        it("boundary RGB values (0 and 255)", () => {
            type MinValues = AsRgbObject<{ r: 0, g: 0, b: 0 }>;
            type MaxValues = AsRgbObject<{ r: 255, g: 255, b: 255 }>;
            type Mixed = AsRgbObject<{ r: 0, g: 128, b: 255 }>;

            type cases = [
                Expect<AssertEqual<MinValues, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<MaxValues, { r: 255, g: 255, b: 255 }>>,
                Expect<AssertEqual<Mixed, { r: 0, g: 128, b: 255 }>>,
            ]
        });
    });

    describe("RGBA to RGB conversion", () => {
        it("extracts r, g, b from valid RGBA object", () => {
            type FromRgba = AsRgbObject<{ r: 255, g: 128, b: 64, a: 0.5 }>;
            type OpaqueRgba = AsRgbObject<{ r: 100, g: 150, b: 200, a: 1.0 }>;

            type cases = [
                Expect<AssertEqual<FromRgba, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<OpaqueRgba, { r: 100, g: 150, b: 200 }>>,
            ]
        });

        it("handles RGBA with alpha = 0 (fully transparent)", () => {
            type Transparent = AsRgbObject<{ r: 255, g: 255, b: 255, a: 0 }>;

            type cases = [
                Expect<AssertEqual<Transparent, { r: 255, g: 255, b: 255 }>>
            ]
        });
    });

    describe("CssRgb string parsing", () => {
        it("parses standard CSS rgb() format with commas", () => {
            type CommaFormat = AsRgbObject<"rgb(255, 128, 64)">;
            type NoSpaces = AsRgbObject<"rgb(255,128,64)">;
            type ExtraSpaces = AsRgbObject<"rgb( 255 , 128 , 64 )">;

            type cases = [
                Expect<AssertEqual<CommaFormat, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<NoSpaces, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<ExtraSpaces, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("parses CSS rgb() format with spaces as separators", () => {
            type SpaceFormat = AsRgbObject<"rgb(255 128 64)">;
            type ExtraSpaces = AsRgbObject<"rgb(  255   128   64  )">;

            type cases = [
                Expect<AssertEqual<SpaceFormat, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertError<ExtraSpaces, "invalid-type">>,
            ]
        });

        it("handles boundary values in CSS format", () => {
            type Black = AsRgbObject<"rgb(0, 0, 0)">;
            type White = AsRgbObject<"rgb(255, 255, 255)">;

            type cases = [
                Expect<AssertEqual<Black, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<White, { r: 255, g: 255, b: 255 }>>,
            ]
        });
    });

    describe("CSS named colors", () => {

        it("named colors", () => {
            type Red = AsRgbObject<"red">;

            type cases = [
                Expect<AssertEqual<Red, { r: 255, g: 0, b: 0 }>>,
            ];
        });

    })

    describe("HexColor conversion", () => {
        it("converts 6-digit hex colors to RGB", () => {
            type OrangeHex = AsRgbObject<"#FF8040">;
            type BlackHex = AsRgbObject<"#000000">;
            type WhiteHex = AsRgbObject<"#FFFFFF">;

            type cases = [
                Expect<AssertEqual<OrangeHex, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<BlackHex, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<WhiteHex, { r: 255, g: 255, b: 255 }>>,
            ]
        });

        it("converts 3-digit shorthand hex colors", () => {
            type RedShort = AsRgbObject<"#F00">;
            type GreenShort = AsRgbObject<"#0F0">;
            type BlueShort = AsRgbObject<"#00F">;

            type cases = [
                Expect<AssertEqual<RedShort, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<GreenShort, { r: 0, g: 255, b: 0 }>>,
                Expect<AssertEqual<BlueShort, { r: 0, g: 0, b: 255 }>>,
            ]
        });

        it("handles lowercase hex colors", () => {
            type LowercaseHex = AsRgbObject<"#ff8040">;
            type MixedCase = AsRgbObject<"#Ff8040">;

            type cases = [
                Expect<AssertEqual<LowercaseHex, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<MixedCase, { r: 255, g: 128, b: 64 }>>,
            ]
        });
    });

    describe("Error cases", () => {
        it("returns error for invalid RGB values (out of range)", () => {
            type TooLarge = AsRgbObject<{ r: 256, g: 128, b: 64 }>;
            type Negative = AsRgbObject<{ r: -1, g: 128, b: 64 }>;

            type cases = [
                Expect<AssertError<TooLarge, "invalid-type">>,
                Expect<AssertError<Negative, "invalid-type">>,
            ]
        });

        it("returns error for non-integer RGB values", () => {
            type Decimal = AsRgbObject<{ r: 255.5, g: 128, b: 64 }>;

            type cases = [
                Expect<AssertError<Decimal, "invalid-type">>
            ]
        });

        it("returns error for invalid RGBA color values", () => {
            type InvalidRgba = AsRgbObject<{ r: 256, g: 128, b: 64, a: 0.5 }>;

            type cases = [
                Expect<AssertError<InvalidRgba, "invalid-type">>
            ]
        });

        it("returns error for malformed CSS rgb strings", () => {
            type MissingValue = AsRgbObject<"rgb(255, 128)">;
            type NotNumbers = AsRgbObject<"rgb(red, green, blue)">;

            type cases = [
                Expect<AssertError<MissingValue, "invalid-type">>,
                Expect<AssertError<NotNumbers, "invalid-type">>,
            ]
        });

        it("returns error for invalid hex color format", () => {
            type InvalidHex = AsRgbObject<"#GGGGGG">;

            type cases = [
                Expect<AssertError<InvalidHex, "invalid-type">>,
            ]
        });
    });

    describe("Edge cases", () => {
        it("handles RGB with extra properties (should extract only r, g, b)", () => {
            type ExtraProps = AsRgbObject<{ r: 255, g: 128, b: 64, extra: "ignored" }>;

            type cases = [
                // Should still work if the object has the required RGB properties
                Expect<AssertExtends<ExtraProps, { r: number, g: number, b: number }>>
            ]
        });

        it("handles different CSS rgb formats", () => {
            type LeadingSpaces = AsRgbObject<"rgb(  255, 128, 64)">;
            type TrailingSpaces = AsRgbObject<"rgb(255, 128, 64  )">;
            type MixedSeparators = AsRgbObject<"rgb(255, 128 64)">;

            type cases = [
                Expect<AssertEqual<LeadingSpaces, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<TrailingSpaces, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertError<MixedSeparators, "invalid-type">>
            ]
        });
    });
});
