import type { InlineSvg } from "inferred-types/types";
import { isString } from "./isString";

/**
 * **isInlineSvg**`(val)`
 *
 * Type guard which tests whether the passed in value is both a string
 * and also appears to be an inline SVG image.
 */
export function isInlineSvg<T>(v: T): v is T & InlineSvg {
    return isString(v) && v.trim().startsWith(`<svg`) && v.trim().endsWith(`</svg>`);
}
