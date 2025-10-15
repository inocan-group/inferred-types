import type {
    As,
    AsNumber,
    CssNamedColor,
    CssNamedColorLookup,
    Err,
    NumberLike,
    RgbColor,
    Split,
    StripLeading,
    StripTrailing,
    TrimEach,
    Whitespace
} from "inferred-types/types";
import type { RGB } from "runtime/dictionary";
import { CSS_COLOR_LOOKUP } from "constants/colors";
import { err } from "runtime/errors";
import { asNumber } from "runtime/numeric";
import { stripLeading, stripTrailing } from "runtime/string-literals";
import { isNamedColor, isNumberLike, isRgbColor } from "runtime/type-guards";

type FromRgbColor<T extends `rgb(${string})`>
    = Split<
        StripTrailing<StripLeading<T, "rgb(">, ")">,
    "," | Whitespace
    > extends infer Parts extends readonly string[]
        ? Parts["length"] extends 3
            ? TrimEach<Parts> extends infer Success extends readonly [ NumberLike, NumberLike, NumberLike ]
                ? As<{ r: AsNumber<Success[0]>; g: AsNumber<Success[1]>; b: AsNumber<Success[2]> }, RGB>
                : Err<"invalid-color/rgb">
            : Err<"invalid-color/rgb">
        : Err<"invalid-color/rgb">;

type Result<T extends string> = T extends RgbColor
    ? FromRgbColor<T>

    : T extends CssNamedColor
        ? FromRgbColor<
            CssNamedColorLookup[T]
        >
        : Err<"invalid-color">;

export function parseRgbColor<T extends string>(
    color: T
): Result<T> {
    if (isRgbColor(color)) {
        const [r, g, b] = stripTrailing(stripLeading(color, "rgb("), ")")
            .split(",")
            .map(i => i.trim().toLowerCase());
        return [r, g, b].every(i => isNumberLike(i))
            ? {
                r: asNumber(r as NumberLike),
                g: asNumber(g as NumberLike),
                b: asNumber(b as NumberLike)
            } as Result<T>
            : err(
                `invalid-color/rgb`,
                `Some of the values assigned to the RGB colors are unable to be parsed to a numeric value: ${color}`,
                { color, r, g, b }
            ) as unknown as Result<T>;
    }

    return err(
        `invalid-color/rgb`,
        `Could not parse the string passed in -- '${color}' -- as an RGB color. Must look something like: rgb(#,#,#)`,
        { color }
    ) as unknown as Result<T>;
}

export function parseNamedColor<T extends string>(
    color: T
): Result<T> {
    return Object.keys(CSS_COLOR_LOOKUP).includes(color)
        ? parseRgbColor(CSS_COLOR_LOOKUP[color as keyof typeof CSS_COLOR_LOOKUP] as RgbColor) as unknown as Result<T>
        : err(
            `invalid-color/named`,
            `The string -- ${color} -- is not a valid "named color" recognized by HTML and CSS. Make sure you have no whitespace or uppercase characters.`,
            { color }
        ) as unknown as Result<T>;
}

/**
 * **parseColor**`(color) -> RGB`
 *
 * Extracts the discrete RGB values from both `CssRgb` strings and
 * _named colors_ recognized by HTML and CSS.
 *
 * = Note: all strings are trimmed and forced to lowercase to help
 * with matching.
 */
export function parseColor<T extends string>(
    color: T
): Result<T> {
    if (isRgbColor(color)) {
        return parseRgbColor(color) as unknown as Result<T>;
    }
    else if (isNamedColor(color)) {
        return parseNamedColor(color) as unknown as Result<T>;
    }
    else {
        return err(
            "invalid-color",
            `The string passed in -- ${color} -- could not be parsed as either a CSS RGB Color or a CSS Named Color.`,
            { color }
        ) as unknown as Result<T>;
    }
}
