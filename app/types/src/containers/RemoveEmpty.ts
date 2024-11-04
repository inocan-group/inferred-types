import { Marked } from "@inferred-types/constants";

import {
  As,
  Container,
  Dictionary,
  EmptyObject,
  Tuple,
  IsEmptyString,
  IsNever,
  IsNull,
  IsUndefined,
  Or,
  IsEmptyContainer,
  RemoveMarked,
  Keys,
  AfterFirst, First
} from "@inferred-types/types";


type IsEmpty<T> = Or<[
  IsNull<T>,
  T extends Container ? IsEmptyContainer<T> : false,
  IsEmptyString<T>,
  IsUndefined<T>,
  IsNever<T>,
]> extends true ? true : false;


type ProcessTup<
  T extends Tuple,
  Result extends Tuple =[]
> = [] extends T
? Result
: ProcessTup<
    AfterFirst<T>,
    [
      ...Result,
      IsEmpty<First<T>> extends true ? Marked : First<T>
    ]
  >;

type ProcessObj<
    TObj extends Dictionary,
    TKeys extends readonly (keyof TObj)[],
    TResult extends Dictionary = EmptyObject
> = [] extends TKeys
? TResult
: ProcessObj<
    TObj,
    AfterFirst<TKeys>,
    IsEmpty<First<TKeys>> extends true
      ? TResult & Record<First<TKeys>, TObj[First<TKeys>]>
      : TResult
  >



/**
 * **RemoveEmpty**
 *
 * A _container_ utility looks at all immediate keys of the
 * container and removes all which are "empty". Being empty means:
 *
 * - is either `null`, `undefined`, or `never`
 * - has an _empty string literal_ of `""`
 * - is an empty container
 *
 * For any value `T` which is not a container nor a union type, the value
 * is just passed through.
 */
export type RemoveEmpty<T> = T extends Tuple
? As<RemoveMarked<ProcessTup<T>>, readonly unknown[]>
: T extends Dictionary
? As<RemoveMarked<ProcessObj<T, Keys<T>>>, Dictionary>
: T;


