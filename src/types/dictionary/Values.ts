import { Container, Dictionary, ObjectKey, Tuple, TypedFunction } from "../base-types";
import { AfterFirst, First } from "../lists";
import { Keys } from "./Keys";


type Process<
  TKeys extends readonly ObjectKey[],
  TObj extends Record<ObjectKey, unknown>,
  TResult extends readonly unknown[] = []
> = [] extends TKeys
? TResult
: Process<
    AfterFirst<TKeys>,
    TObj,
    [
      ...TResult,
      First<TKeys> extends keyof TObj
        ? TObj[First<TKeys>]
        : never
    ]
  >


/**
 * **Values**`<T>`
 *
 * Produces a tuple of all the _values_ of a container.
 * - for **objects** this would translate to the key values
 * - for **tuples** this is just a _proxy_ of the type
 * - for _wide_ types like `string[]`
 */
export type Values<
  T extends Container
> = T extends Tuple
? T
: T extends Dictionary
  ? Process<
      Keys<T> extends readonly ObjectKey[]
        ? Keys<T>
        : never,
      T
    >
  : T extends TypedFunction
    ? [T]

  : [];

