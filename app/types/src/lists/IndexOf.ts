import {
  IsNull,
  IsNegativeNumber,
  Abs,
  Decrement,
  Reverse,
  ToString,
  Dictionary,
  ObjectKey,
  If,
  AsString,
  IsValidIndex,
  AsPropertyKey,
  Throw,
  ErrorCondition,
  Concat
} from "src/types/index";
import { Constant } from "inferred-types";

type Override<
  TValue,
  TOverride
> = TOverride extends Constant<"no-override">
? TValue
: TValue extends ErrorCondition<"invalid-index">
  ? TOverride
  : TValue;

type NegativeIndex<
  TValue extends readonly unknown[],
  TIdx extends number
> = Decrement<Abs<TIdx>> extends number
  ? If<
      IsValidIndex<TValue, Decrement<Abs<TIdx>>>,
      TValue[Decrement<Abs<TIdx>>],
      Throw<
        "invalid-index",
        `Use of a negative index [${AsString<TIdx>}] was unsuccessful in matching a valid index`,
        "IndexOf",
        {
          container: TValue;
          key: TIdx;
          context: {
            revIndex: Decrement<Abs<TIdx>>;
            revContainer: Reverse<TValue>;
          };
        }
      >
    >
  : never;


type HandleArr<
  TValue extends readonly unknown[],
  TIdx extends PropertyKey
> = TIdx extends number
? IsNegativeNumber<TIdx> extends true
  ? NegativeIndex<Reverse<TValue>,TIdx>
  : If<
      IsValidIndex<TValue,TIdx>,
      TValue[TIdx],
      Throw<
        "invalid-index",
        Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
        "IndexOf",
        { container: TValue; key: TIdx; library: "inferred-types" }
      >
    >
: Throw<
    "invalid-index",
    `IndexOf<Tuple,${AsString<TIdx>}> failed because a tuple container must use numeric indexes!`,
    "IndexOf",
    { container: TValue; key: TIdx; library: "inferred-types" }
  >;

type HandleObj<
TValue extends Dictionary,
TIdx extends PropertyKey
> = TIdx extends keyof TValue
? TValue[TIdx]
: Throw<
  "invalid-index",
  Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
  "IndexOf",
  { container: TValue; key: TIdx; library: "inferred-types" }
>;

type Process<
TValue,
TIdx extends PropertyKey | null
> = If<
IsNull<TIdx>,
// return "as is"
TValue,
// dereference where valid index
TValue extends readonly unknown[]
  ? If<
      IsValidIndex<TValue, AsPropertyKey<TIdx>>,
      HandleArr<TValue, AsPropertyKey<TIdx>>,
      Throw<
      "invalid-index",
        `Call to IndexOf<DescribeType<TValue>,${AsString<TIdx>}> is not allowed as an tuple based container must receive either null or numeric index value.`,
        "IndexOf",
        { library: "inferred-types"; container: TValue; key: TIdx }
      >
    >
  : TValue extends Dictionary
    ? TIdx extends ObjectKey
      ? HandleObj<TValue,TIdx>
      : Throw<
          "invalid-index",
          `Call to IndexOf<DescribeType<TValue>,${AsString<TIdx>}> is not allowed as an object based container must receive either null, a string, or a symbol index value.`,
          "IndexOf",
          {library: "inferred-types"; container: TValue; key: TIdx }
        >
    : Throw<
        "invalid-index",
        `IndexOf<ToString<TValue>},${AsString<TIdx>}> was called but the a non-null value was used to index a non-container which will never work!`,
        "IndexOf",
        { library: "inferred-types"; container: TValue; key: TIdx }
      >
>;



/**
 * **IndexOf**<TValue, TIdx, [TOverride]>
 *
 * A type utility which _dereferences_ a property/index item on an array
 * or object.
 *
 * - if `TIdx` is passed in as `null` then this will act as an identity
 * function and return `TValue`.
 * - if `TIdx` is a negative number it will index in reverse for tuple based
 * containers
 *
 * **Related:** `Get`, `IsValidIndex`
 *
 * **Errors:** produces an `ErrorCondition<"invalid-index">` when an a bad index value
 * is passed in for the given container
 */
export type IndexOf<
  TValue,
  TIdx extends PropertyKey | null,
  TOverride = Constant<"no-override">
> = TIdx extends null
? TValue
: Override<
    Process<TValue,TIdx>,
    TOverride
  >
