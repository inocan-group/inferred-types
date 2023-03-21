import { AnyObject, IfNull, IsNegativeNumber, Abs, Decrement, Reverse,  ErrorCondition, Concat, ToString} from "src/types";
import { IfValidKey } from "../boolean-logic/branching/IfValidKey";

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
  TValue,
  TIdx extends PropertyKey | null
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
        : IfValidKey<TValue,Exclude<TIdx, null>>
          
    : TValue extends AnyObject
      ? TIdx extends keyof TValue
        ? TValue[TIdx]
        : never
      : ErrorCondition<
          "invalid-index", 
          Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
          "IndexOf",
          { container: TValue; key: TIdx }
        >
>;
