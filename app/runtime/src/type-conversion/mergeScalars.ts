import type { MergeScalars, Scalar } from "@inferred-types/types";
import { isUndefined } from "../type-guards/isUndefined";


/**
 * **mergeScalars**(a,b)
 *
 * The value of scalar `b` _overrides_ that of `a` unless `b` is
 * undefined.
 */
export function mergeScalars<
  A extends Scalar | undefined,
  B extends Scalar | undefined
>(a: A, b: B) {
  return (isUndefined(b) ? a : b) as MergeScalars<A,B>;
}
