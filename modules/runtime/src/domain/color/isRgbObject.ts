import type { RGB } from "inferred-types/types";

/**
 * **isRgbObject**`(val)`
 *
 * A type guard that tests whether `val` is an RGB object with numeric r, g, b properties.
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
        && typeof obj.g === "number"
        && !Number.isNaN(obj.g)
        && Number.isFinite(obj.g)
        && typeof obj.b === "number"
        && !Number.isNaN(obj.b)
        && Number.isFinite(obj.b)
        && !("a" in obj)
    );
}
