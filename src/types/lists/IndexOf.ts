import { AnyObject, DoesExtend, IfNull, IfOr } from "../boolean-logic";
import { Narrowable } from "../Narrowable";

/**
 * **IndexOf**<TValue, TIdx>
 * 
 * A type utility which _dereferences_ a property/index item on an array
 * or object.
 * 
 * **Note:** if `TIdx` is passed in as `null` then this will act as an identity
 * function and return `TValue`.
 */
export type IndexOf<
  TValue extends Narrowable | readonly any[],
  TIdx extends string | number | null
> = IfNull<
  TIdx,
  TValue,
  IfOr<
    [DoesExtend<TValue, AnyObject>, DoesExtend<TValue, readonly any[]>],
    TIdx extends keyof TValue
      ? TValue[TIdx]
      : never,
    never
  >
>;
