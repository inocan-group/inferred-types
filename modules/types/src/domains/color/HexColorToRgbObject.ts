import type {
    ApplyCssHexShorthand,
    As,
    Err,
    HexColor,
    HexToDecimal,
    Length
} from "inferred-types/types";

type Process<
    T extends string
> =
HexToDecimal<T> extends [
        infer R extends number,
        infer G extends number,
        infer B extends number
    ]
        ? {
            r: R;
            g: G;
            b: B;
        }
: HexToDecimal<T> extends Error
        ? T
    : Err<
        `invalid-type/hex-color`,
        `The Hex color passed into HexColorToRgb<T> could not be parsed into an RGB object`,
        { input: T; utility: "HexColorToRgbObject"; library: "inferred-types" }
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
export type HexColorToRgbObject<T extends HexColor> = T extends `#${infer Rest}`
    ? Length<Rest> extends 3
        ? Process<
            As<ApplyCssHexShorthand<Rest>, string>
        >
    : Length<Rest> extends 6
        ? Process<Rest>
    : Err<
        `invalid-type/hex-color`,
        `The Hex color passed into HexColorToRgbObject<T> must have 3 or 6 hexadecimal digits`,
        { input: T; length: Length<Rest>; utility: "HexColorToRgbObject" }
    >
: Err<
    `invalid-type/hexadecimal`,
    `A hexadecimal color must be a string and start with '#' symbol!`,
    { input: T; utility: "HexColorToRgbObject"}
>;
