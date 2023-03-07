import { AnyObject, Scalar } from "../base-types";
import { Indexable } from "../base-types/Indexable";
import {  IfNull, IsNegativeNumber } from "../boolean-logic";
import { Abs, Decrement } from "../numeric-literals";
import { Reverse } from "./Reverse";

/**
 * **IndexOf**<TValue, TIdx>
 * 
 * A type utility which _dereferences_ a property/index item on an array
 * or object.
 * 
 * - if `TIdx` is passed in as `null` then this will act as an identity
 * function and return `TValue`.
 * - if `TIdx` is a negative number it will index in reverse
 * 
 * **Related:** `Get`
 */
export type IndexOf<
  TValue extends Indexable | Scalar,
  TIdx extends string | number | null
> = IfNull<
  TIdx,
  // return "as is"
  TValue,
  // dereference where valid index
  TValue extends readonly unknown[]
      ? IsNegativeNumber<TIdx> extends true
        ? IndexOf< // negative indexing
            Reverse<TValue & readonly unknown[]>, Decrement<Abs<TIdx & number>>
          >
        : TIdx extends keyof TValue
          ? TValue[TIdx]
          : never
    : TValue extends AnyObject
      ? TIdx extends keyof TValue
        ? TValue[TIdx]
        : never
      : never
>;
