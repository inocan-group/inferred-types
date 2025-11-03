import type { RGB } from "inferred-types/types";

/**
 * **isRgbObject**`(val)`
 *
 * A type guard that tests whether `val` is an RGB object with numeric r, g, b properties.
 *
 * Validates:
 * - r, g, b values must be between 0-255 (inclusive)
 * - Must NOT have an 'a' property (use `isRgbaObject()` for RGBA objects)
 *
 * Note: This checks for object format `{ r: number, g: number, b: number }`,
 * not CSS string format. Use `isRgbColor()` for CSS strings like "rgb(...)".
 */
export function isRgbObject(val: unknown): val is RGB {
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
        && !("a" in obj)
    );
}
