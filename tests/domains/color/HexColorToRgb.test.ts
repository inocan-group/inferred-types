import { describe, it, expect } from "vitest";
import type {
    HexColorToRgbObject,
    Expect,
    AssertEqual
} from "inferred-types/types";
import { hexColorToRgbObject } from "inferred-types/runtime";

describe("HexColorToRgb<T>", () => {

    describe("6-digit hex colors", () => {
        it("converts uppercase 6-digit hex to RGB object", () => {
            const red = hexColorToRgbObject("#FF0000");
            const green = hexColorToRgbObject("#00FF00");
            const blue = hexColorToRgbObject("#0000FF");
            const orange = hexColorToRgbObject("#FF8040");

            expect(red).toEqual({ r: 255, g: 0, b: 0 });
            expect(green).toEqual({ r: 0, g: 255, b: 0 });
            expect(blue).toEqual({ r: 0, g: 0, b: 255 });
            expect(orange).toEqual({ r: 255, g: 128, b: 64 });

            type Red = typeof red;
            type Green = typeof green;
            type Blue = typeof blue;
            type Orange = typeof orange;

            type cases = [
                Expect<AssertEqual<Red, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<Green, { r: 0, g: 255, b: 0 }>>,
                Expect<AssertEqual<Blue, { r: 0, g: 0, b: 255 }>>,
                Expect<AssertEqual<Orange, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("converts lowercase 6-digit hex to RGB object", () => {
            const redLower = hexColorToRgbObject("#ff0000");
            const orangeLower = hexColorToRgbObject("#ff8040");
            const mixedCase = hexColorToRgbObject("#Ff8040");

            expect(redLower).toEqual({ r: 255, g: 0, b: 0 });
            expect(orangeLower).toEqual({ r: 255, g: 128, b: 64 });
            expect(mixedCase).toEqual({ r: 255, g: 128, b: 64 });

            type RedLower = typeof redLower;
            type OrangeLower = typeof orangeLower;
            type MixedCase = typeof mixedCase;

            type cases = [
                Expect<AssertEqual<RedLower, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<OrangeLower, { r: 255, g: 128, b: 64 }>>,
                Expect<AssertEqual<MixedCase, { r: 255, g: 128, b: 64 }>>,
            ]
        });

        it("handles boundary values (black and white)", () => {
            const black = hexColorToRgbObject("#000000");
            const white = hexColorToRgbObject("#FFFFFF");
            const whiteLower = hexColorToRgbObject("#ffffff");

            expect(black).toEqual({ r: 0, g: 0, b: 0 });
            expect(white).toEqual({ r: 255, g: 255, b: 255 });
            expect(whiteLower).toEqual({ r: 255, g: 255, b: 255 });

            type Black = typeof black;
            type White = typeof white;
            type WhiteLower = typeof whiteLower;

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
            const redShort = hexColorToRgbObject("#F00");
            const greenShort = hexColorToRgbObject("#0F0");
            const blueShort = hexColorToRgbObject("#00F");

            expect(redShort).toEqual({ r: 255, g: 0, b: 0 });
            expect(greenShort).toEqual({ r: 0, g: 255, b: 0 });
            expect(blueShort).toEqual({ r: 0, g: 0, b: 255 });

            type RedShort = typeof redShort;
            type GreenShort = typeof greenShort;
            type BlueShort = typeof blueShort;

            type cases = [
                Expect<AssertEqual<RedShort, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<GreenShort, { r: 0, g: 255, b: 0 }>>,
                Expect<AssertEqual<BlueShort, { r: 0, g: 0, b: 255 }>>,
            ]
        });

        it("converts lowercase 3-digit hex shorthand", () => {
            type RedLower = HexColorToRgbObject<"#f00">;
            type MixedCase = HexColorToRgbObject<"#F0a">;

            type cases = [
                Expect<AssertEqual<RedLower, { r: 255, g: 0, b: 0 }>>,
                Expect<AssertEqual<MixedCase, { r: 255, g: 0, b: 170 }>>,
            ]
        });

        it("handles boundary values in shorthand", () => {
            type BlackShort = HexColorToRgbObject<"#000">;
            type WhiteShort = HexColorToRgbObject<"#FFF">;

            type cases = [
                Expect<AssertEqual<BlackShort, { r: 0, g: 0, b: 0 }>>,
                Expect<AssertEqual<WhiteShort, { r: 255, g: 255, b: 255 }>>,
            ]
        });
    });

    // Note: CSS hex colors only support 3 or 6 digits, not 1, 2, 4, 5, 7, or 8 (for RGB).
    // Invalid inputs (non-hex characters, wrong lengths) will return Error types.

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
