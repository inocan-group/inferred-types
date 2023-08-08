import { AnyObject, Concat, Container, ErrorCondition, IfFalse, IsValidKey, ToString, Tuple } from "src/types";

type Err<
  TContainer extends Container,
  TKey extends PropertyKey
> = 
TContainer extends Tuple ? TKey extends string | symbol
    ? ErrorCondition<
        "invalid-key-type", 
        Concat<["An array can only have numeric keys and we found the key: '", ToString<TKey>, "'."]>,
        "IfValidKey",
        { container: TContainer; key: TKey }
      >
    : ErrorCondition<
        "key-does-not-exist", 
        Concat<["An index of ", ToString<TKey>, " is beyond the length of the array!"]>,
        "IfValidKey",
        { container: TContainer; key: TKey }
      >
: TContainer extends AnyObject ? TKey extends number
    ? ErrorCondition<
        "invalid-key-type", 
        "",
        "IfValidKey",
        { container: TContainer; key: TKey }
      >
    : ErrorCondition<
        "key-does-not-exist", 
        Concat<["An attempt to index an object with '", ToString<TKey>, "' is not a valid key on the object!"]>,
        "IfValidKey",
        { container: TContainer; key: TKey }
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
> = IsValidKey<TContainer, TKey> extends true 
  ? IF 
  : IfFalse<
      IsValidKey<TContainer, TKey>, 
      ELSE, 
      MAYBE
    >;
