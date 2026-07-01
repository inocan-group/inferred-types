import type { CssAspectRatio } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

const tokens = [
    "1",
    "inherit",
    "initial",
    "revert",
    "revert-layer",
    "unset",
    "auto",
];

const isRatio = (val: string) => /^\d{1,4} ?\/ ?\d{1,4}$/.test(val);

/**
 * Type guard which tests whether the passed in value is a valid CSS Aspect
 * Ratio value.
 *
 * A `CssAspectRatio` is a union of a single keyword token (e.g. `auto`, `1`,
 * a CSS global) OR a `Ratio` (e.g. `16/9`, `16 / 9`); the two are never
 * combined, so the whole string must match exactly one of these forms.
 */
export function isCssAspectRatio<T>(val: T): val is T & CssAspectRatio {
    return isString(val) && (tokens.includes(val) || isRatio(val));
}
