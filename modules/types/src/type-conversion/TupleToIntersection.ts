/**
 * Recursively intersects all the elements of a tuple.
 *
 * - If T is [H, ...R], result = H & TupleToIntersection<R>
 * - Otherwise (empty tuple), result = unknown (the identity for intersection)
 */
export type TupleToIntersection<T extends readonly unknown[]> =
  T extends [infer Head, ...infer Rest]
      ? Head & TupleToIntersection<Rest>
      : unknown;
