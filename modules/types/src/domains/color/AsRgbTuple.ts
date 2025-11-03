import type { AsRgbObject, RGB } from "inferred-types/types";

/**
 * **AsRgbTuple**`<T>`
 *
 * Attempts to map various kinds of color information and convert
 * it to aa tuple of the form of `[ red, green, blue ]`. Can convert:
 *
 * - CSS RGB color string (aka, `CssRgbColor`)
 * - CSS RGBA color string (aka, `CssRgbaColor`)
 * - A hex color string (e.g., `#ffee00`)
 * - an RGBA object
 * - and a RGB object
 */
export type AsRgbTuple<T> = AsRgbObject<T> extends Error
    ? AsRgbObject<T>
    : AsRgbObject<T> extends infer O extends RGB
        ? [
        red: O["r"],
        green: O["g"],
        blue: O["b"]
        ]
        : never;
