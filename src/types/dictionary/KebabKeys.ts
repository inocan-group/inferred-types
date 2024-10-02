import { Dictionary, EmptyObject, ObjectKey } from "../base-types";
import { AfterFirst, First } from "../lists";
import { ExpandDictionary } from "../literals/ExpandRecursively";
import { KebabCase } from "../string-literals";
import { UnionMutate } from "../type-conversion";
import { Keys } from "./Keys";
import { MakeKeysOptional } from "./MakeKeysOptional";
import { OptionalKeys } from "./OptionalKeys";


type Process<
  TObj extends Dictionary,
  TKeys extends readonly (ObjectKey & keyof TObj)[],
  TResult extends Dictionary = EmptyObject
> = [] extends TKeys
? ExpandDictionary<TResult>
: Process<
    TObj,
    AfterFirst<TKeys>,
    First<TKeys> extends string
    ? Record<KebabCase<First<TKeys>>, TObj[First<TKeys>]> & TResult
    : Record<First<TKeys>, TObj[First<TKeys>]> & TResult
  >;

/**
 * Converts an object's keys to the **kebab-case** equivalent
 * while keeping the values the same.
 */
export type KebabKeys<
  T extends Dictionary
> = MakeKeysOptional<
  // make all keys Kebab case and required
  Process<T, Keys<T>>,
  // make optional props optional again
  OptionalKeys<T> extends string
    ? UnionMutate<OptionalKeys<T>, "KebabCase"> extends string
      ? UnionMutate<OptionalKeys<T>, "KebabCase">
      : ""
    : ""
>


