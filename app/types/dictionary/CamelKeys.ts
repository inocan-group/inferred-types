import { Dictionary, EmptyObject, ObjectKey } from "../base-types";
import { AfterFirst, First } from "../lists";
import { ExpandDictionary } from "../literals/ExpandRecursively";
import { CamelCase } from "../string-literals";
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
    ? Record<CamelCase<First<TKeys>>, TObj[First<TKeys>]> & TResult
    : Record<First<TKeys>, TObj[First<TKeys>]> & TResult
  >;

/**
 * Converts an object's keys to the **camelCase** equivalent
 * while keeping the values the same.
 */
export type CamelKeys<
  T extends Dictionary
> = MakeKeysOptional<
  // make all keys camel case and required
  Process<T, Keys<T>>,
  // make optional props optional again
  OptionalKeys<T> extends string
    ? UnionMutate<OptionalKeys<T>, "CamelCase"> extends string
      ? UnionMutate<OptionalKeys<T>, "CamelCase">
      : ""
    : ""
>


