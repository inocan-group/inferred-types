import type { AsRgbObject } from "@inferred-types/types";
import type { RGB, RGBA } from "inferred-types/types";
import { CSS_COLOR_LOOKUP } from "inferred-types/constants";
import {
    hexColorToRgbObject,
    isCssNamedColor,
    isHexColor,
    isRgbaObject,
    isRgbObject
} from "inferred-types/runtime";
import { isCssRgbString } from "./isCssRgbString";

/**
 * **asRgbObject**`(val)`
 *
 * Converts a number of color formats into a RGB color object. Formats
 * recognized
 *
 * - CSS RGB string (e.g., `rgb(...)`)
 * - RGBA object
 * - RGB Tuple
 * - Hex Color
 * - Named CSS Color
 */
export function asRgbObject<T extends string | RGB | RGBA>(rgb: T) {
    return (
        isRgbObject(rgb)
            ? rgb
            : isRgbaObject(rgb)
                ? {
                    r: rgb.r,
                    g: rgb.g,
                    b: rgb.b
                }
                : isCssNamedColor(rgb)
                    ? asRgbObject(CSS_COLOR_LOOKUP[rgb] as string)
                    : isHexColor(rgb)
                        ? hexColorToRgbObject(rgb)
                        : isCssRgbString(rgb)
                            ? convertCssRgbStringToObject(rgb)
                            : err("invalid-type/rgb")

    ) as AsRgbObject<T>;
}
