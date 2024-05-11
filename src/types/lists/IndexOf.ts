import { 
  IfNull, 
  IsNegativeNumber, 
  Abs, 
  Decrement, 
  Reverse,  
  ErrorCondition, 
  Concat, 
  ToString, 
  KV,
  ObjectKey,
  Tuple,
  Container,
  If,
  AsString,

  IsValidIndex,
  DescribeType,
  AsPropertyKey,
} from "src/types/index";


type IsKey<
  TValue extends Container,
  TIdx extends PropertyKey
> = If<
  IsValidIndex<TValue, TIdx>, 
    true,
    false
  >;



type NegativeIndex<
  TValue extends readonly unknown[],
  TIdx extends number
> = Reverse<TValue> extends Tuple
? Decrement<Abs<TIdx>> extends number
  ? If<
      IsValidIndex<Reverse<TValue>, Decrement<Abs<TIdx>>>,
      Reverse<TValue>[Decrement<Abs<TIdx>>],
      ErrorCondition<
        "invalid-index",
        `Use of a negative index [${AsString<TIdx>}] was unsuccessful in matching a valid index`,
        { 
          container: TValue; 
          key: TIdx; 
          library: "IndexOf"; 
          context: {
            revIndex: Decrement<Abs<TIdx>>;
            revContainer: Reverse<TValue>;
          };
        }
      >
    >
  : never
: never;


type HandleArr<
  TValue extends readonly unknown[],
  TIdx extends PropertyKey
> = TIdx extends number
? IsNegativeNumber<TIdx> extends true
  ? NegativeIndex<TValue,TIdx>
  : If<
      IsKey<TValue,TIdx>,
      TValue[TIdx],
      ErrorCondition<
        "invalid-index", 
        Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
        { container: TValue; key: TIdx; library: "IndexOf" }
      >
    >
  : never;

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
  TIdx extends PropertyKey | null
> = IfNull<
  TIdx,
  // return "as is"
  TValue,
  // dereference where valid index
  TValue extends readonly unknown[]
    ? If<
        IsValidIndex<TValue, AsPropertyKey<TIdx>>,
        HandleArr<TValue, AsPropertyKey<TIdx>>,
        ErrorCondition<
        "invalid-index",
          `Call to IndexOf<${DescribeType<TValue>},${AsString<TIdx>}> is not allowed as an tuple based container must receive either null or numeric index value.`,
          { library: "IndexOf"; container: TValue; key: TIdx }
        >
      >
    : TValue extends KV
      ? TIdx extends ObjectKey
        ? HandleObj<TValue,TIdx>
        : ErrorCondition<
            "invalid-index",
            `Call to IndexOf<${DescribeType<TValue>},${AsString<TIdx>}> is not allowed as an object based container must receive either null, a string, or a symbol index value.`,
            { library: "IndexOf"; container: TValue; key: TIdx }
          >
      : ErrorCondition<
          "invalid-index",
          `IndexOf<${ToString<TValue>},${ToString<TIdx>}> was called but the a non-null value was used to index a non-container which will never work!`,
          { library: "IndexOf"; container: TValue; key: TIdx }
        >
>;
