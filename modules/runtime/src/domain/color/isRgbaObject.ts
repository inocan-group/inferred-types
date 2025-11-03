import type { RGBA } from "inferred-types/types";

/**
 * **isRgbaObject**`(val)`
 *
 * A type guard that tests whether `val` is an RGBA object with numeric r, g, b, a properties.
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
        && typeof obj.g === "number"
        && !Number.isNaN(obj.g)
        && Number.isFinite(obj.g)
        && typeof obj.b === "number"
        && !Number.isNaN(obj.b)
        && Number.isFinite(obj.b)
        && typeof obj.a === "number"
        && !Number.isNaN(obj.a)
        && Number.isFinite(obj.a)
    );
}
