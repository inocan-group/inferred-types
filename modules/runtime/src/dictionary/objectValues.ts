import type { Narrowable, ObjectKey, Tuple, Values } from "inferred-types/types";

/**
 * **objectValues**`(obj) -> [val, val, val]`
 *
 * Converts an object into a strongly typed tuple of the _values_ of
 */
export function objectValues<
  T extends Record<ObjectKey, N>,
  N extends Narrowable,
>(obj: T) {
  const tuple: Tuple = Object.keys(obj).reduce(
    (acc, key) => [
      ...acc,
      obj[key],
    ],
    [] as Tuple,
  );

  return tuple as Values<T>;
}
