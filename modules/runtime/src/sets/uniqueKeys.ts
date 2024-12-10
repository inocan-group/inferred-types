import type { Container, ObjectKey, UniqueKeys } from "inferred-types/types";
import { isArray } from "src/type-guards/isArray";

/**
 * **uniqueKeys**(left, right)
 *
 * Returns a strongly typed `LeftRight` tuple which identifies the
 * unique keys for each participant list passed in.
 */
export function uniqueKeys<
  L extends Container,
  R extends Container,
>(left: L, right: R): UniqueKeys<L, R> {
  const isNumeric = !!(isArray(left) && isArray(right));

  if (
    (isArray(left) && !isArray(right))
    || (isArray(right) && !isArray(left))
  ) {
    throw new Error("uniqueKeys(l,r) given invalid comparison; both left and right values should be an object or an array but not one of each!");
  }

  const l = (
    isNumeric
      ? Object.keys(left).map(i => Number(i))
      : Object.keys(left)
  ) as ObjectKey[];
  const r = (
    isNumeric
      ? Object.keys(right).map(i => Number(i))
      : Object.keys(right)
  ) as ObjectKey[];

  if (isNumeric) {
    throw new Error("uniqueKeys does not yet work with tuples");
  }

  const leftKeys = l.filter(i => !r.includes(i));
  const rightKeys = r.filter(i => !l.includes(i));

  return [
    "LeftRight",
    leftKeys,
    rightKeys,
  ] as unknown as UniqueKeys<L, R>;
}
