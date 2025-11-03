import type { CSS_COLOR_LOOKUP } from "inferred-types/constants";
import type {
    As,
    AsNumber,
    CssNamedColor,
    CssRgb,
    Err,
    HexColor,
    HexColorToRgbObject,
    IsRgbObject,
    RGB,
    RGBA,
    Split,
    Trim
} from "inferred-types/types";

type ParseCssRgb<
    T extends CssRgb,
    Raw extends string = T extends `rgb(${infer Rest})` ? Trim<Rest> : T
> = Split<Raw, "," | " "> extends readonly [infer R extends string, infer G extends string, infer B extends string]
    ? {
        r: AsNumber<Trim<R>>;
        g: AsNumber<Trim<G>>;
        b: AsNumber<Trim<B>>;
    }
    : Err<
        "invalid-value/rgb",
    `Failed to parse a CssRgb string -- ${T} -- into a valid RGB object`,
    { input: T; raw: Raw; utility: "AsRgb"; library: "inferred-types" }
    >;

type Lookup = typeof CSS_COLOR_LOOKUP;

type ExtractRgb<T> = T extends { r: infer R extends number; g: infer G extends number; b: infer B extends number }
    ? { r: R; g: G; b: B }
    : never;

/**
 * **AsRgbObject**`<T>`
 *
 * Attempts to map various kinds of color information and convert
 * it to an `RGB` object. Can convert:
 *
 * - CSS RGB color string (aka, `CssRgbColor`)
 * - CSS RGBA color string (aka, `CssRgbaColor`)
 * - A hex color string (e.g., `#ffee00`)
 * - an RGBA object (extracts r, g, b)
 * - an RGB-like object with extra properties (extracts r, g, b)
 * - and will proxy through a pure RGB object
 */
export type AsRgbObject<
    T
> = T extends RGBA
    ? IsRgbObject<ExtractRgb<T>> extends true
        ? ExtractRgb<T>
        : Err<
            `invalid-type/rgb`,
        `An RGBA like object was passed into AsRgb<T> but it's numeric values were not valid: { r: ${T["r"]}, g: ${T["g"]}, b: ${T["b"]} }`,
        { input: T; utility: "AsRgb"; library: "inferred-types" }
        >
    : T extends RGB
        ? IsRgbObject<ExtractRgb<T>> extends true
            ? ExtractRgb<T>
            : Err<
                `invalid-type/rgb`,
        `An RGB like object was passed into AsRgb<T> but it's numeric values were not valid: { r: ${T["r"]}, g: ${T["g"]}, b: ${T["b"]} }`,
        { input: T; utility: "AsRgb"; library: "inferred-types" }
            >
        : T extends CssRgb
            ? ParseCssRgb<T> extends RGB
                ? IsRgbObject<ParseCssRgb<T>> extends true
                    ? ParseCssRgb<T>
                    : Err<
                        `invalid-type/rgb`,
        `A CSS RGB color string was parsed but the RGB values didn't pass as valid: { r: ${ParseCssRgb<T>["r"]}, g: ${ParseCssRgb<T>["g"]}, b: ${ParseCssRgb<T>["b"]} }`,
        { input: T; utility: "AsRgb"; library: "inferred-types" }
                    >
                : ParseCssRgb<T> extends Error
                    ? ParseCssRgb<T>
                    : never
            : T extends CssNamedColor
                ? AsRgbObject<
                    As<Lookup[T], CssRgb>
                >
                : T extends HexColor
                    ? HexColorToRgbObject<T> extends Error
                        ? Err<
                            `invalid-type/rgb`,
    `A CSS Hex color string was parsed but the RGB values didn't pass as valid: { r: ${T}`,
    { input: T; utility: "AsRgb"; library: "inferred-types" }
                        >
                        : HexColorToRgbObject<T> extends RGB
                            ? HexColorToRgbObject<T>
                            : never
                    : Err<
                        `invalid-type/rgb`,
                        `A value which doesn't extend RGB, RGBA, HexColor, CssRgb, or CssRgba was passed in!`
                    >;
