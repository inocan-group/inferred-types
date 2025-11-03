import type { AsRgbObject, AsRgbTuple, Err, If, IsHexColor, RGB } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { err, isHexColor, isRgbObject, stripLeading } from "inferred-types/runtime";

/**
 * converts a hex color value to an RGB object.
 *
 * Expects hex string WITHOUT the leading '#' symbol.
 * Handles both 3-digit shorthand (e.g., "f00") and 6-digit (e.g., "ff0000") formats.
 */
function convertHex<T extends string>(color: T): RGB {
    // Expand 3-digit shorthand to 6-digit format (e.g., "f00" -> "ff0000")
    const hex = color.length === 3
        ? color.split("").map(char => char + char).join("")
        : color;

    // Parse the 6-digit hex string into RGB components
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

function toTuple<T extends RGB>(obj: T): [red: number, green: number, blue: number] {
    return [
        obj.r,
        obj.g,
        obj.b
    ] as [red: number, green: number, blue: number];
}

/**
 * **hexColorToRgb**`(hex) -> RGB`
 *
 * Converts a hex color string into a RGB object.
 */
export function hexColorToRgbObject<T extends string>(
    hex: T
): If<IsHexColor<T>, AsRgbObject<T>, Err<"invalid-types/hexadecimal">> {
    return (
        isHexColor(hex)
            ? convertHex(stripLeading(hex, "#"))
            : err(`invalid-type/hexadecimal`)
    ) as If<IsHexColor<T>, AsRgbObject<T>, Err<"invalid-types/hexadecimal">>;
}

/**
 * **hexColorToRgbTuple**`(hex) -> [ r: number, g: number, b: number ]`
 *
 * Converts a hex color string into a RGB tuple: `[r, g, b]`
 */
export function hexColorToRgbTuple<T extends string>(
    hex: T
): If<IsHexColor<T>, AsRgbTuple<T>, Err<"invalid-types/hexadecimal">> {
    return (
        isHexColor(hex)
            ? isRgbObject(convertHex(stripLeading(hex, "#")))
                ? toTuple(convertHex(stripLeading(hex, "#")))
                : Never
            : err(`invalid-type/hexadecimal`)
    ) as unknown as If<IsHexColor<T>, AsRgbTuple<T>, Err<"invalid-types/hexadecimal">>;
}
