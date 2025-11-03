import type { RGBA } from "inferred-types/types";

/**
 * **isRgbaObject**`(val)`
 *
 * A type guard that tests whether `val` is an RGBA object with numeric r, g, b, a properties.
 *
 * Validates:
 * - r, g, b values must be between 0-255 (inclusive)
 * - a (alpha) value must be between 0-1 (inclusive)
 *
 * Note: This checks for object format `{ r: number, g: number, b: number, a: number }`,
 * not CSS string format. Use `isRgbaColor()` for CSS strings like "rgba(...)".
 */
export function isRgbaObject(val: unknown): val is RGBA {
    if (typeof val !== "object" || val === null) {
        return false;
    }

    const obj = val as Record<string, unknown>;

    return (
        typeof obj.r === "number"
        && !Number.isNaN(obj.r)
        && Number.isFinite(obj.r)
        && obj.r >= 0
        && obj.r <= 255
        && typeof obj.g === "number"
        && !Number.isNaN(obj.g)
        && Number.isFinite(obj.g)
        && obj.g >= 0
        && obj.g <= 255
        && typeof obj.b === "number"
        && !Number.isNaN(obj.b)
        && Number.isFinite(obj.b)
        && obj.b >= 0
        && obj.b <= 255
        && typeof obj.a === "number"
        && !Number.isNaN(obj.a)
        && Number.isFinite(obj.a)
        && obj.a >= 0
        && obj.a <= 1
    );
}
