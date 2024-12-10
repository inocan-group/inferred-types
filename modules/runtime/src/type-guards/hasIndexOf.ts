import type { Container, Dictionary, IsValidIndex, Tuple } from "inferred-types/types";
import { isErrorCondition, isObject } from "inferred-types/runtime";

/**
 * **hasIndexOf**(value, idx) => boolean
 *
 * A type guard which determines whether container passed in has
 * an explicit index.
 */
export function hasIndexOf<
  TContainer extends Container,
  TIndex extends PropertyKey,
>(value: TContainer, idx: TIndex): value is TContainer &
(TContainer extends Tuple
  ? Tuple<TIndex>
  : TContainer extends Dictionary
    ? Record<TIndex, unknown>
    : never
) {
  const result = isObject(value)
    ? String(idx) in value
    : Array.isArray(value)
      ? Number(idx) in value
      : false;
  return (
    isErrorCondition(result, "invalid-index")
      ? false
      : result
  ) as IsValidIndex<TContainer, TIndex>;
}
