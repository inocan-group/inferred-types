import type { Err, HexColor, HexToDecimal, StripLeading } from "inferred-types/types";

type Process<T extends HexColor> =
HexToDecimal<StripLeading<T, "#">> extends [
        infer R extends number,
        infer G extends number,
        infer B extends number
    ]
        ? {
            r: R;
            g: G;
            b: B;
        }
    : HexToDecimal<StripLeading<T, "#">> extends [
        infer R extends number,
        infer G extends number
    ]
        ? {
            r: R;
            g: G;
            b: 0;
        }
    : HexToDecimal<StripLeading<T, "#">> extends [
        infer R extends number
    ]
        ? {
            r: R;
            g: 0;
            b: 0;
        }
    : HexToDecimal<StripLeading<T, "#">> extends Error
        ? HexToDecimal<StripLeading<T, "#">>
    : Err<
        `invalid-type/hex-color`,
        `The Hex color passed into HexColorToRgb<T> could not be parsed into an RGB object`,
        { input: T; utility: "HexColorToRgb"; library: "inferred-types" }
    >;


/**
 * **HexColorToRgbObject**`<T>`
 *
 * Converts a hex color string to a `RGB` object.
 *
 * **Related:**
 * - `HexColorToRgbTuple`
 * - `AsRgb`, `IsRGB`, `RGB`, `RGBA`, `CssRgbColor`
 * - `cssColor()`, `twColor()`, `isRgbObject()`, `isCssRgbString()`
 */
export type HexColorToRgbObject<T extends HexColor> = Process<T>;
