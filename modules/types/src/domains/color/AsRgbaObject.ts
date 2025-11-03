import type { CSS_COLOR_LOOKUP } from "inferred-types/constants";
import type {
    As,
    AsNumber,
    AsRgbObject,
    CssNamedColor,
    CssRgb,
    Err,
    ExpandDictionary,
    HexColor,
    HexColorToRgbObject,
    IsRgbaObject,
    Split,
    Trim
} from "inferred-types/types";

import type { IsRgbObject } from "./IsRgbObject";
import type { RGB } from "./RGB";
import type { RGBA } from "./RGBA";

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

/**
 * **AsRgbaObject**`<T>`
 *
 * Attempts to map various kinds of color information and convert
 * it to an `RGBA` object. Can convert:
 *
 * - CSS RGB color string (aka, `CssRgbColor`) and sets alpha to 1
 * - CSS RGBA color string (aka, `CssRgbaColor`)
 * - A hex color string (e.g., `#ffee00`) and sets alpha to 1
 * - an RGB object (extracts r, g, b) and sets alpha to 1
 * - an RGBA-like object with extra properties (extracts r, g, b)
 * - and will proxy through a pure RGBA object "as is"
 *
 * **Related:** `AsRgbObject<T>`
 */
export type AsRgbaObject<
    T
> = T extends RGBA
    ? IsRgbaObject<T> extends true
        ? T
        : Err<
            `invalid-type/rgb`,
            `An RGBA like object was passed into AsRgb<T> but it's numeric values were not valid: { r: ${T["r"]}, g: ${T["g"]}, b: ${T["b"]} }`,
            { input: T; utility: "AsRgb"; library: "inferred-types" }
        >
    : T extends RGB
        ? IsRgbObject<T> extends true
            ? ExpandDictionary<T & Record<"a", 1>>
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
