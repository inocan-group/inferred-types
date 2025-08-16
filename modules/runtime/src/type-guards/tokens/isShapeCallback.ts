import type { ShapeCallback } from "inferred-types/types";
import { isFunction } from "runtime/type-guards";

/**
 * type guard which validates that the `val` passed in is a `ShapeCallback`
 */
export function isShapeCallback(val: unknown): val is ShapeCallback {
    return isFunction(val) && (val as any).kind === "shape";
}
