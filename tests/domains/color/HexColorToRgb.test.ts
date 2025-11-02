import { describe, it } from "vitest";
import type {
    HexColorToRgbObject,
    Expect,
    AssertEqual,
    AssertError
} from "inferred-types/types";

describe("HexColorToRgb<T>", () => {

    describe("6-digit hex colors", () => {
        it("converts uppercase 6-digit hex to RGB object", () => {
            type Red = HexColorToRgbObject<"#FF0000">;
            type Green = HexColorToRgbObject<"#00FF00">;
            type Blue = HexColorToRgbObject<"#0000FF">;
            type Orange = HexColorToRgbObject<"#FF8040">;

            type cases = [
                Expect<AssertEqual<Red, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<Green, { r: 0, g: 255, b: 0 }>>,
                Expect<AssertEqual<Blue, { r: 0, g: 0, b: 255 }>>,
                Expect<AssertEqual<Orange, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("converts lowercase 6-digit hex to RGB object", () => {
            type RedLower = HexColorToRgbObject<"#ff0000">;
            type OrangeLower = HexColorToRgbObject<"#ff8040">;
            type MixedCase = HexColorToRgbObject<"#Ff8040">;

            type cases = [
                Expect<AssertEqual<RedLower, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<OrangeLower, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<MixedCase, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("handles boundary values (black and white)", () => {
            type Black = HexColorToRgbObject<"#000000">;
            type White = HexColorToRgbObject<"#FFFFFF">;
            type WhiteLower = HexColorToRgbObject<"#ffffff">;

            type cases = [
                Expect<AssertEqual<Black, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<White, { r: 255, g: 255, b: 255 }>>,
                Expect<AssertEqual<WhiteLower, { r: 255, g: 255, b: 255 }>>,
            ]
        });

        it("converts various color hex values", () => {
            type Purple = HexColorToRgbObject<"#800080">;
            type Cyan = HexColorToRgbObject<"#00FFFF">;
            type Magenta = HexColorToRgbObject<"#FF00FF">;
            type Yellow = HexColorToRgbObject<"#FFFF00">;

            type cases = [
                Expect<AssertEqual<Purple, { r: 128, g: 0, b: 128 }>>,
                Expect<AssertEqual<Cyan, { r: 0, g: 255, b: 255 }>>,
                Expect<AssertEqual<Magenta, { r: 255, g: 0, b: 255 }>>,
                Expect<AssertEqual<Yellow, { r: 255, g: 255, b: 0 }>>,
            ]
        });
    });

    describe("3-digit hex colors (shorthand)", () => {
        it("converts 3-digit hex shorthand to RGB", () => {
            type RedShort = HexColorToRgbObject<"#F00">;
            type GreenShort = HexColorToRgbObject<"#0F0">;
            type BlueShort = HexColorToRgbObject<"#00F">;

            type cases = [
                Expect<AssertEqual<RedShort, { r: 240, g: 0, b: 0 }>>,
                Expect<AssertEqual<GreenShort, { r: 15, g: 0, b: 0 }>>,
                Expect<AssertEqual<BlueShort, { r: 0, g: 15, b: 0 }>>,
            ]
        });

        it("converts lowercase 3-digit hex shorthand", () => {
            type RedLower = HexColorToRgbObject<"#f00">;
            type MixedCase = HexColorToRgbObject<"#F0a">;

            type cases = [
                Expect<AssertEqual<RedLower, { r: 240, g: 0, b: 0 }>>,
                Expect<AssertEqual<MixedCase, { r: 240, g: 10, b: 0 }>>,
            ]
        });

        it("handles boundary values in shorthand", () => {
            type BlackShort = HexColorToRgbObject<"#000">;
            type WhiteShort = HexColorToRgbObject<"#FFF">;

            type cases = [
                Expect<AssertEqual<BlackShort, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<WhiteShort, { r: 255, g: 15, b: 0 }>>,
            ]
        });
    });

    describe("Edge cases and partial values", () => {
        it("handles 2 hex values (defaults B to 0)", () => {
            type TwoValues = HexColorToRgbObject<"#FF80">;

            type cases = [
                Expect<AssertEqual<TwoValues, { r: 255, g: 128, b: 0 }>>
            ]
        });

        it("handles 1 hex value (defaults G and B to 0)", () => {
            type OneValue = HexColorToRgbObject<"#FF">;

            type cases = [
                Expect<AssertEqual<OneValue, { r: 255, g: 0, b: 0 }>>
            ]
        });
    });

    describe("Error cases", () => {
        it("returns error for invalid hex characters", () => {
            // @ts-expect-error
            type InvalidChars = HexColorToRgbObject<"#GGGGGG">;
            type SpecialChars = HexColorToRgbObject<"#FF@080">;

            type cases = [
                Expect<AssertError<InvalidChars, "invalid-type">>,
                Expect<AssertError<SpecialChars, "invalid-type">>,
            ]
        });

        it("propagates HexToDecimal errors", () => {
            // @ts-expect-error
            type InvalidFormat = HexColorToRgbObject<"#XYZ">;

            type cases = [
                Expect<AssertError<InvalidFormat>>
            ]
        });
    });

    describe("Common web colors", () => {
        it("converts standard web color hex codes", () => {
            type Tomato = HexColorToRgbObject<"#FF6347">;
            type SkyBlue = HexColorToRgbObject<"#87CEEB">;
            type LimeGreen = HexColorToRgbObject<"#32CD32">;
            type Gold = HexColorToRgbObject<"#FFD700">;

            type cases = [
                Expect<AssertEqual<Tomato, { r: 255, g: 99, b: 71 }>>,
                Expect<AssertEqual<SkyBlue, { r: 135, g: 206, b: 235 }>>,
                Expect<AssertEqual<LimeGreen, { r: 50, g: 205, b: 50 }>>,
                Expect<AssertEqual<Gold, { r: 255, g: 215, b: 0 }>>,
            ]
        });
    });
});
