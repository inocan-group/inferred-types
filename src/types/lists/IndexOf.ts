import {  IfNull, IsScalar } from "../boolean-logic";
import { Narrowable } from "../literals/Narrowable";

/**
 * **IndexOf**<TValue, TIdx>
 * 
 * A type utility which _dereferences_ a property/index item on an array
 * or object.
 * 
 * **Note:** if `TIdx` is passed in as `null` then this will act as an identity
 * function and return `TValue`.
 * 
 * **Related:** `Get`
 */
export type IndexOf<
  TValue extends Narrowable | readonly Narrowable[],
  TIdx extends string | number | null
> = IfNull<
  TIdx,
  // return "as is"
  TValue,
  // dereference where valid index
  IsScalar<TValue> extends false
    ? TIdx extends keyof TValue
      ? TValue[TIdx]
      : never
    : never
>;
