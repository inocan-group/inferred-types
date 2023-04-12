import type { MergeScalars, Scalar } from "src/types";
import { isUndefined } from "src/runtime";

/**
 * **mergeScalars**(a,b)
 * 
 * The value of scalar `b` _overrides_ that of `a` unless `b` is
 * undefined.
 */
export function mergeScalars<A extends Scalar | undefined, B extends Scalar | undefined>(a: A, b: B): MergeScalars<A,B> {
  return (isUndefined(b) ? a : b) as MergeScalars<A,B>;
}
