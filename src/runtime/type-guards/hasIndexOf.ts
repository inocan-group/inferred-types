
import { Container } from "src/types/index";
import { isObject } from "./isObject";


/**
 * **hasIndexOf**(value, idx) => boolean
 * 
 * A type guard which determines whether container passed in has
 * an explicit index.
 */
export const hasIndexOf = <
  TContainer extends Container,
  TIndex extends PropertyKey
>(value: TContainer, idx: TIndex): value is TContainer & Record<TIndex, unknown> => {
  return (isObject(value) || Array.isArray(value)) && idx in value;
};
