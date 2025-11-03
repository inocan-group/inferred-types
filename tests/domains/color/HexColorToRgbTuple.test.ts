import { describe, it, expect } from "vitest";
import type {
    HexColorToRgbTuple,
    Expect,
    AssertEqual
} from "inferred-types/types";
import { hexColorToRgbTuple } from "inferred-types/runtime";

describe("HexColorToRgbTuple<T>", () => {

    describe("6-digit hex colors", () => {
        it("converts uppercase 6-digit hex to labeled RGB tuple", () => {
            const red = hexColorToRgbTuple("#FF0000");
            const green = hexColorToRgbTuple("#00FF00");
            const blue = hexColorToRgbTuple("#0000FF");
            const orange = hexColorToRgbTuple("#FF8040");

            expect(red).toEqual([255, 0, 0]);
            expect(green).toEqual([0, 255, 0]);
            expect(blue).toEqual([0, 0, 255]);
            expect(orange).toEqual([255, 128, 64]);

            type Red = typeof red;
            type Green = typeof green;
            type Blue = typeof blue;
            type Orange = typeof orange;

            type cases = [
                Expect<AssertEqual<Red, [red: 255, green: 0, blue: 0]>>,
                Expect<AssertEqual<Green, [red: 0, green: 255, blue: 0]>>,
                Expect<AssertEqual<Blue, [red: 0, green: 0, blue: 255]>>,
                Expect<AssertEqual<Orange, [red: 255, green: 128, blue: 64]>>,
            ]
        });

        it("converts lowercase 6-digit hex to labeled RGB tuple", () => {
            type RedLower = HexColorToRgbTuple<"#ff0000">;
            type OrangeLower = HexColorToRgbTuple<"#ff8040">;
            type MixedCase = HexColorToRgbTuple<"#Ff8040">;

            type cases = [
                Expect<AssertEqual<RedLower, [red: 255, green: 0, blue: 0]>>,
                Expect<AssertEqual<OrangeLower, [red: 255, green: 128, blue: 64]>>,
                Expect<AssertEqual<MixedCase, [red: 255, green: 128, blue: 64]>>,
            ]
        });

        it("handles boundary values (black and white)", () => {
            type Black = HexColorToRgbTuple<"#000000">;
            type White = HexColorToRgbTuple<"#FFFFFF">;
            type WhiteLower = HexColorToRgbTuple<"#ffffff">;

            type cases = [
                Expect<AssertEqual<Black, [red: 0, green: 0, blue: 0]>>,
                Expect<AssertEqual<White, [red: 255, green: 255, blue: 255]>>,
                Expect<AssertEqual<WhiteLower, [red: 255, green: 255, blue: 255]>>,
            ]
        });

        it("converts various color hex values", () => {
            type Purple = HexColorToRgbTuple<"#800080">;
            type Cyan = HexColorToRgbTuple<"#00FFFF">;
            type Magenta = HexColorToRgbTuple<"#FF00FF">;
            type Yellow = HexColorToRgbTuple<"#FFFF00">;

            type cases = [
                Expect<AssertEqual<Purple, [red: 128, green: 0, blue: 128]>>,
                Expect<AssertEqual<Cyan, [red: 0, green: 255, blue: 255]>>,
                Expect<AssertEqual<Magenta, [red: 255, green: 0, blue: 255]>>,
                Expect<AssertEqual<Yellow, [red: 255, green: 255, blue: 0]>>,
            ]
        });
    });

    describe("3-digit hex colors (shorthand)", () => {
        it("converts 3-digit hex shorthand to labeled RGB tuple", () => {
            const redShort = hexColorToRgbTuple("#F00");
            const greenShort = hexColorToRgbTuple("#0F0");
            const blueShort = hexColorToRgbTuple("#00F");

            expect(redShort).toEqual([255, 0, 0]);
            expect(greenShort).toEqual([0, 255, 0]);
            expect(blueShort).toEqual([0, 0, 255]);

            type RedShort = typeof redShort;
            type GreenShort = typeof greenShort;
            type BlueShort = typeof blueShort;

            type cases = [
                Expect<AssertEqual<RedShort, [red: 255, green: 0, blue: 0]>>,
                Expect<AssertEqual<GreenShort, [red: 0, green: 255, blue: 0]>>,
                Expect<AssertEqual<BlueShort, [red: 0, green: 0, blue: 255]>>,
            ]
        });

        it("converts lowercase 3-digit hex shorthand", () => {
            type RedLower = HexColorToRgbTuple<"#f00">;
            type MixedCase = HexColorToRgbTuple<"#F0a">;

            type cases = [
                Expect<AssertEqual<RedLower, [red: 255, green: 0, blue: 0]>>,
                Expect<AssertEqual<MixedCase, [red: 255, green: 0, blue: 170]>>,
            ]
        });

        it("handles boundary values in shorthand", () => {
            type BlackShort = HexColorToRgbTuple<"#000">;
            type WhiteShort = HexColorToRgbTuple<"#FFF">;

            type cases = [
                Expect<AssertEqual<BlackShort, [red: 0, green: 0, blue: 0]>>,
                Expect<AssertEqual<WhiteShort, [red: 255, green: 255, blue: 255]>>,
            ]
        });
    });

    // Note: CSS hex colors only support 3 or 6 digits, not 1, 2, 4, 5, 7, or 8 (for RGB).
    // Invalid inputs (non-hex characters, wrong lengths) will return Error types.

    describe("Common web colors", () => {
        it("converts standard web color hex codes", () => {
            type Tomato = HexColorToRgbTuple<"#FF6347">;
            type SkyBlue = HexColorToRgbTuple<"#87CEEB">;
            type LimeGreen = HexColorToRgbTuple<"#32CD32">;
            type Gold = HexColorToRgbTuple<"#FFD700">;

            type cases = [
                Expect<AssertEqual<Tomato, [red: 255, green: 99, blue: 71]>>,
                Expect<AssertEqual<SkyBlue, [red: 135, green: 206, blue: 235]>>,
                Expect<AssertEqual<LimeGreen, [red: 50, green: 205, blue: 50]>>,
                Expect<AssertEqual<Gold, [red: 255, green: 215, blue: 0]>>,
            ]
        });
    });

    describe("Tuple-specific behavior", () => {
        it("produces labeled tuple with correct property names", () => {
            type Result = HexColorToRgbTuple<"#FF8040">;

            // Verify tuple can be destructured with labels
            type cases = [
                Expect<AssertEqual<Result, [red: 255, green: 128, blue: 64]>>,
            ]
        });

        it("tuple length is always 3 for valid hex colors", () => {
            type Red = HexColorToRgbTuple<"#FF0000">;
            type RedShort = HexColorToRgbTuple<"#F00">;

            // Both should produce tuples with length 3
            type cases = [
                Expect<AssertEqual<Red, [red: 255, green: 0, blue: 0]>>,
                Expect<AssertEqual<RedShort, [red: 255, green: 0, blue: 0]>>,
            ]
        });
    });
});
