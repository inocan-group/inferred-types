
import { Container, IsValidIndex, Dictionary, Tuple } from "inferred-types/dist/types/index";
import { isErrorCondition, isObject } from "src/runtime/index";


/**
 * **hasIndexOf**(value, idx) => boolean
 *
 * A type guard which determines whether container passed in has
 * an explicit index.
 */
export const hasIndexOf = <
  TContainer extends Container,
  TIndex extends PropertyKey,
>(
    value: TContainer,
    idx: TIndex
): value is TContainer &
  (TContainer extends Tuple
    ? Tuple<TIndex>
    : TContainer extends Dictionary
        ? Record<TIndex,unknown>
        : never
) => {
  const result = isObject(value)
    ? String(idx) in value
    : Array.isArray(value)
      ? Number(idx) in value
      : false;
  return (
    isErrorCondition(result, "invalid-index")
      ? false
      : result
  ) as IsValidIndex<TContainer,TIndex>;
};

