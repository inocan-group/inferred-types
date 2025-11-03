import type { AsRgbaObject, CssRgb, RGB, RGBA } from "inferred-types/types";
import { CSS_COLOR_LOOKUP } from "inferred-types/constants";
import {
    convertCssRgbStringToRgbObject,
    err,
    hexColorToRgbObject,
    isCssNamedColor,
    isHexColor,
    isRgbaObject,
    isRgbObject
} from "inferred-types/runtime";
import { isCssRgbString } from "./isCssRgbString";

/**
 * **asRgbaObject**`(val)`
 *
 * Converts a number of color formats into a RGB color object. Formats
 * recognized
 *
 * - CSS RGB string (e.g., `rgb(...)`)
 * - RGBA object
 * - RGB Tuple
 * - Hex Color
 * - Named CSS Color
 *
 * If the incoming color information has no alpha value then `1` will be used.
 */
export function asRgbaObject<T extends string | RGB | RGBA>(rgb: T) {
    return (
        isRgbObject(rgb)
            ? {
                ...(rgb as RGB),
                a: 1
            }
            : isRgbaObject(rgb)
                ? rgb
                : isCssNamedColor(rgb)
                    ? {
                        ...convertCssRgbStringToRgbObject(
                            CSS_COLOR_LOOKUP[rgb] as CssRgb
                        ),
                        a: 1
                    }
                    : isHexColor(rgb)
                        ? hexColorToRgbObject(rgb)
                        : isCssRgbString(rgb)
                            ? convertCssRgbStringToRgbObject(rgb)
                            : err("invalid-type/rgb")

    ) as unknown as AsRgbaObject<T>;
}
