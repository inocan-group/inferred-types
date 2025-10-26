import { describe, it } from "vitest";
import type {
    HexColorToRgb,
    Expect,
    AssertEqual,
    AssertError
} from "inferred-types/types";

describe("HexColorToRgb<T>", () => {

    describe("6-digit hex colors", () => {
        it("converts uppercase 6-digit hex to RGB object", () => {
            type Red = HexColorToRgb<"#FF0000">;
            type Green = HexColorToRgb<"#00FF00">;
            type Blue = HexColorToRgb<"#0000FF">;
            type Orange = HexColorToRgb<"#FF8040">;

            type cases = [
                Expect<AssertEqual<Red, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<Green, { r: 0, g: 255, b: 0 }>>,
                Expect<AssertEqual<Blue, { r: 0, g: 0, b: 255 }>>,
                Expect<AssertEqual<Orange, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("converts lowercase 6-digit hex to RGB object", () => {
            type RedLower = HexColorToRgb<"#ff0000">;
            type OrangeLower = HexColorToRgb<"#ff8040">;
            type MixedCase = HexColorToRgb<"#Ff8040">;

            type cases = [
                Expect<AssertEqual<RedLower, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<OrangeLower, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<MixedCase, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("handles boundary values (black and white)", () => {
            type Black = HexColorToRgb<"#000000">;
            type White = HexColorToRgb<"#FFFFFF">;
            type WhiteLower = HexColorToRgb<"#ffffff">;

            type cases = [
                Expect<AssertEqual<Black, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<White, { r: 255, g: 255, b: 255 }>>,
                Expect<AssertEqual<WhiteLower, { r: 255, g: 255, b: 255 }>>,
            ]
        });

        it("converts various color hex values", () => {
            type Purple = HexColorToRgb<"#800080">;
            type Cyan = HexColorToRgb<"#00FFFF">;
            type Magenta = HexColorToRgb<"#FF00FF">;
            type Yellow = HexColorToRgb<"#FFFF00">;

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
            type RedShort = HexColorToRgb<"#F00">;
            type GreenShort = HexColorToRgb<"#0F0">;
            type BlueShort = HexColorToRgb<"#00F">;

            type cases = [
                Expect<AssertEqual<RedShort, { r: 240, g: 0, b: 0 }>>,
                Expect<AssertEqual<GreenShort, { r: 15, g: 0, b: 0 }>>,
                Expect<AssertEqual<BlueShort, { r: 0, g: 15, b: 0 }>>,
            ]
        });

        it("converts lowercase 3-digit hex shorthand", () => {
            type RedLower = HexColorToRgb<"#f00">;
            type MixedCase = HexColorToRgb<"#F0a">;

            type cases = [
                Expect<AssertEqual<RedLower, { r: 240, g: 0, b: 0 }>>,
                Expect<AssertEqual<MixedCase, { r: 240, g: 10, b: 0 }>>,
            ]
        });

        it("handles boundary values in shorthand", () => {
            type BlackShort = HexColorToRgb<"#000">;
            type WhiteShort = HexColorToRgb<"#FFF">;

            type cases = [
                Expect<AssertEqual<BlackShort, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<WhiteShort, { r: 255, g: 15, b: 0 }>>,
            ]
        });
    });

    describe("Edge cases and partial values", () => {
        it("handles 2 hex values (defaults B to 0)", () => {
            type TwoValues = HexColorToRgb<"#FF80">;

            type cases = [
                Expect<AssertEqual<TwoValues, { r: 255, g: 128, b: 0 }>>
            ]
        });

        it("handles 1 hex value (defaults G and B to 0)", () => {
            type OneValue = HexColorToRgb<"#FF">;

            type cases = [
                Expect<AssertEqual<OneValue, { r: 255, g: 0, b: 0 }>>
            ]
        });
    });

    describe("Error cases", () => {
        it("returns error for invalid hex characters", () => {
            // @ts-expect-error
            type InvalidChars = HexColorToRgb<"#GGGGGG">;
            type SpecialChars = HexColorToRgb<"#FF@080">;

            type cases = [
                Expect<AssertError<InvalidChars, "invalid-type">>,
                Expect<AssertError<SpecialChars, "invalid-type">>,
            ]
        });

        it("propagates HexToDecimal errors", () => {
            // @ts-expect-error
            type InvalidFormat = HexColorToRgb<"#XYZ">;

            type cases = [
                Expect<AssertError<InvalidFormat>>
            ]
        });
    });

    describe("Common web colors", () => {
        it("converts standard web color hex codes", () => {
            type Tomato = HexColorToRgb<"#FF6347">;
            type SkyBlue = HexColorToRgb<"#87CEEB">;
            type LimeGreen = HexColorToRgb<"#32CD32">;
            type Gold = HexColorToRgb<"#FFD700">;

            type cases = [
                Expect<AssertEqual<Tomato, { r: 255, g: 99, b: 71 }>>,
                Expect<AssertEqual<SkyBlue, { r: 135, g: 206, b: 235 }>>,
                Expect<AssertEqual<LimeGreen, { r: 50, g: 205, b: 50 }>>,
                Expect<AssertEqual<Gold, { r: 255, g: 215, b: 0 }>>,
            ]
        });
    });
});
