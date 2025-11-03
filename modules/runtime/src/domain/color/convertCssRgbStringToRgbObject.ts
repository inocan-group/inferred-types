import type { Err, If, IsCssRgbString, RGB } from "inferred-types/types";
import { err, isCssRgbString, stripLeading, stripTrailing } from "inferred-types/runtime";

/**
 * Helper function to parse the RGB values from the content string
 * after stripping "rgb(" prefix and ")" suffix.
 */
function toRgbObject<T extends string>(content: T): RGB {
    // Strip the trailing ")"
    const cleaned = stripTrailing(content, ")").trim();

    // Split by comma or space, then filter and trim
    const parts = cleaned
        .split(/[,\s]+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

    if (parts.length !== 3) {
        throw new Error(`Expected 3 RGB values, got ${parts.length}`);
    }

    const [r, g, b] = parts.map(Number);

    return { r, g, b };
}

/**
 * **convertCssRgbStringToRgbObject**`(cssRgb)`
 *
 * Converts a CSS RGB string into a RGB object.
 *
 * **Examples:**
 * - `"rgb(255, 128, 64)"` → `{ r: 255, g: 128, b: 64 }`
 * - `"rgb(255,128,64)"` → `{ r: 255, g: 128, b: 64 }`
 * - `"rgb(255 128 64)"` → `{ r: 255, g: 128, b: 64 }`
 */
export function convertCssRgbStringToRgbObject<T extends string>(
    cssRgb: T
): If<IsCssRgbString<T>, RGB, Err<"invalid-type/css-rgb">> {
    return (
        isCssRgbString(cssRgb)
            ? toRgbObject(stripLeading(cssRgb, "rgb("))
            : err("invalid-type/css-rgb")
    ) as If<IsCssRgbString<T>, RGB, Err<"invalid-type/css-rgb">>;
}
