import { HexColor, HexColorToRgbObject, RGB } from "inferred-types/types";


/**
 * **HexColorToRgbTuple**`<T>`
 *
 * Converts a hex color string to a `RgbTuple`.
 *
 * **Related:**
 * - `HexColorToRgbTuple`
 * - `AsRgb`, `IsRGB`, `RGB`, `RGBA`, `CssRgbColor`
 * - `cssColor()`, `twColor()`, `isRgbObject()`, `isCssRgbString()`
 */
export type HexColorToRgbTuple<T extends HexColor> = HexColorToRgbObject<T> extends infer O extends RGB
    ? [ red: RGB["r"], green: RGB["g"], blue: RGB["b"] ]
    : HexColorToRgbObject<T> extends Error
        ? HexColorToRgbObject<T>
    : never;
