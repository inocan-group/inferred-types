import type {
    AsNumber,
    CssRgb,
    Err,
    HexColor,
    HexColorToRgb,
    IsRGB,
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

/**
 * **AsRgb**`<T>`
 *
 * Attempts to map various kinds of color information and convert
 * it to an `RGB` object
 */
export type AsRgb<
    T
> = T extends RGBA
    ? IsRGB<{
        r: T["r"];
        g: T["g"];
        b: T["b"];
    }> extends true
        ? {
            r: T["r"];
            g: T["g"];
            b: T["b"];
        }
        : Err<
            `invalid-type/rgb`,
            `An RGBA like object was passed into AsRgb<T> but it's numeric values were not valid: { r: ${T["r"]}, g: ${T["g"]}, b: ${T["b"]} }`,
            { input: T; utility: "AsRgb"; library: "inferred-types" }
        >
    : T extends RGB
        ? IsRGB<T> extends true
            ? T
            : Err<
                `invalid-type/rgb`,
            `An RGB like object was passed into AsRgb<T> but it's numeric values were not valid: { r: ${T["r"]}, g: ${T["g"]}, b: ${T["b"]} }`,
            { input: T; utility: "AsRgb"; library: "inferred-types" }
            >
        : T extends CssRgb
            ? ParseCssRgb<T> extends RGB
                ? IsRGB<ParseCssRgb<T>> extends true
                    ? ParseCssRgb<T>
                    : Err<
                        `invalid-type/rgb`,
                `A CSS RGB color string was parsed but the RGB values didn't pass as valid: { r: ${ParseCssRgb<T>["r"]}, g: ${ParseCssRgb<T>["g"]}, b: ${ParseCssRgb<T>["b"]} }`,
                { input: T; utility: "AsRgb"; library: "inferred-types" }
                    >
                : ParseCssRgb<T> extends Error
                    ? ParseCssRgb<T>
                    : never
            : T extends HexColor
                ? HexColorToRgb<T> extends Error
                    ? Err<
                        `invalid-type/rgb`,
                `A CSS Hex color string was parsed but the RGB values didn't pass as valid: { r: ${T}`,
                { input: T; utility: "AsRgb"; library: "inferred-types" }
                    >
                    : HexColorToRgb<T> extends RGB
                        ? HexColorToRgb<T>
                        : never
                : Err<
                    `invalid-type/rgb`,
                    `A value which doesn't extend RGB, RGBA, HexColor, CssRgb, or CssRgba was passed in!`
                >;
