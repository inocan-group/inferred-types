import { ShapeCallback } from "@inferred-types/types";
import { isFunction } from "../isFunction";

/**
 * type guard which validates that the `val` passed in is a `ShapeCallback`
 */
export const isShapeCallback = (val: unknown): val is ShapeCallback => {
  return isFunction(val) && (val as any).kind === "shape"
}
