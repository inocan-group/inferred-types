import { AsRgb, Err,  If, IsHexColor } from "inferred-types/types";
import { isHexColor, err, stripLeading } from "inferred-types/runtime";
import {  } from "@inferred-types/types";



/**
 * **hexColorToRgb**`(hex) -> RGB`
 *
 * Converts a hex color string into a RGB object.
 */
export function hexColorToRgbObject<T extends string>(hex: T): If<IsHexColor<T>, AsRgb<T>, Err<"invalid-types/hexadecimal">> {
    return (
        isHexColor(hex)
        ? convertHex(stripLeading(hex,"#"))
        : err(`invalid-type/hexadecimal`)
    ) as If<IsHexColor<T>, AsRgb<T>, Err<"invalid-types/hexadecimal">>
}

/**
 * **hexColorToRgbTuple**`(hex) -> [ r: number, g: number, b: number ]`
 *
 * Converts a hex color string into a RGB tuple: `[r, g, b]`
 */
export function hexColorToRgbTuple<T extends string>(hex: T): If<IsHexColor<T>, AsRgb<T>, Err<"invalid-types/hexadecimal">> {
    return isHexColor(hex)
}
