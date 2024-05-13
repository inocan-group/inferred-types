import { 
  AnyObject, 
  AsString, 
  Concat, 
  Container, 
  IfFalse, 
  IsValidIndex, 
  Throw, 
  Tuple 
} from "src/types/index";

type Err<
  TContainer extends Container,
  TKey extends PropertyKey
> = 
TContainer extends Tuple ? TKey extends string | symbol
    ? Throw<
        "invalid-key-type", 
        Concat<["An array can only have numeric keys and we found the key: '", AsString<TKey>, "'."]>,
        "IfValidKey",
        { container: TContainer; key: TKey; library: "inferred-types" }
      >
    : Throw<
        "key-does-not-exist", 
        Concat<["An index of ", AsString<TKey>, " is beyond the length of the array!"]>,
        "IfValidKey",
        { container: TContainer; key: TKey; library: "inferred-types" }
      >
: TContainer extends AnyObject ? TKey extends number
    ? Throw<
        "invalid-key-type", 
        `Received a numeric key for an object based container!`,
        "IfValidKey",
        { container: TContainer; key: TKey; library: "inferred-types" }
      >
    : Throw<
        "key-does-not-exist", 
        Concat<["An attempt to index an object with '", AsString<TKey>, "' is not a valid key on the object!"]>,
        "IfValidKey",
        { container: TContainer; key: TKey; library: "inferred-types" }
      >
: never;

/**
 * **IfValidKey**`<TContainer,TKey,[IF],[ELSE],[MAYBE]>`
 * 
 * Branching utility based on whether `TKey` is a valid key for the 
 * container `TContainer`.
 * 
 * - `MAYBE` is by default the union of `IF` and `ELSE` and is branched to
 * if the container or key is not a literal type.
 * - `IF` type -- when not explicitly set -- will return the indexed value
 * - `ELSE` type --when not explicitly set -- will provide a reasonable set of `ErrorCondition`'s
 */
export type IfValidKey<
  TContainer extends Container,
  TKey extends PropertyKey,
  IF = TKey extends keyof TContainer ? TContainer[TKey] : never,
  ELSE = Err<TContainer,TKey>,
  MAYBE = IF | ELSE
> = IsValidIndex<TContainer, TKey> extends true 
  ? IF 
  : IfFalse<
      IsValidIndex<TContainer, TKey>, 
      ELSE, 
      MAYBE
    >;
