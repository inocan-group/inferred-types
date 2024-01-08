import { Flatten, Narrowable } from "src/types";

/**
 * **createTuple**(...values) -> (...values) -> Tuple
 * 
 * Runtime utility to define a strongly typed tuple.
 * 
 * - if you want to _widen_ certain elements in the Tuple you can use
 * the `widen()` type utility for those elements.
 * 
 * ### Example
 * ```ts
 * // [ "foo", "bar", 42 ]
 * const foobar = defineTuple("foo", "bar", 42)
 * // [ string, "bar", 42]
 * const foey = defineTuple(wide("foo"), "bar", 42)
 * ```
 */
export const defineTuple = <
  T extends readonly Narrowable[] | readonly Narrowable[][]
>(...values: T) => values.flat() as Flatten<T>;
