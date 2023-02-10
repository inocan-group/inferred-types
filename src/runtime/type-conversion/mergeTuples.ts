import type { MergeTuples, Narrowable } from "src/types";
import { isDefined } from "../type-guards";

/**
 * **mergeTuples**(a,b)
 * 
 * Replaces values in `a` with `b` unless `b` is _undefined_. Also, if 
 * `a` has more elements than `b` then these extra elements will be
 * appended to the end.
 */
export function mergeTuples<A extends readonly Narrowable[], B extends readonly Narrowable[]>(a: A, b: B): MergeTuples<A,B> {
  return (
    b.length > a.length
      ? b.map((v,idx) => isDefined(v) ? v : a[idx])
      : [...b, ...a.slice(b.length)].map((v,idx) => isDefined(v) ? v : a[idx])
  ) as unknown as MergeTuples<A,B>;
}
