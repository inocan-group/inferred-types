import { 
  IfNull, 
  IsNegativeNumber, 
  Abs, 
  Decrement, 
  Reverse,  
  ErrorCondition, 
  Concat, 
  ToString, 
  IfValidKey, 
  KV,
  ObjectKey,
} from "src/types/index";

type HandleArr<
TValue extends readonly unknown[],
TIdx extends PropertyKey
> = TIdx extends number
? IsNegativeNumber<TIdx> extends true
  ? TIdx extends number 
    ? HandleArr< // negative indexing
        Reverse<TValue>, Decrement<Abs<TIdx>>
      >
    : never
  : IfValidKey<TValue,Exclude<TIdx, null>>
: ErrorCondition<
    "invalid-index", 
    Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
    { container: TValue; key: TIdx; library: "IndexOf" }
  >

type HandleObj<
TValue extends KV,
TIdx extends PropertyKey
> = TIdx extends keyof TValue
? TValue[TIdx]
: ErrorCondition<
  "invalid-index", 
  Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
  { container: TValue; key: TIdx; library: "IndexOf" }
>;


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
    ? TIdx extends number
      ? HandleArr<TValue,TIdx>
      : never
    : TValue extends KV
      ? TIdx extends ObjectKey
        ? HandleObj<TValue,TIdx>
        : never
      : never
>;
