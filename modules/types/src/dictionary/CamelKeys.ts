import type {
  AfterFirst,
  AnyObject,
  As,
  CamelCase,
  Dictionary,
  EmptyObject,
  ExpandDictionary,
  First,
  Keys,
  MakeKeysOptional,
  ObjectKey,
  OptionalKeysTuple,
} from "inferred-types/types";

type Convert<
  TObj extends Dictionary,
  TKeys extends readonly (ObjectKey & keyof TObj)[],
  TResult extends Dictionary = EmptyObject,
> = [] extends TKeys
  ? ExpandDictionary<TResult>
  : Convert<
    TObj,
    AfterFirst<TKeys>,
    First<TKeys> extends string
    ? Record<
        CamelCase<First<TKeys>>,
        TObj[First<TKeys>] extends Dictionary
          ? CamelKeys<TObj[First<TKeys>]>
          : TObj[First<TKeys>]
      > & TResult
      : Record<First<TKeys>, TObj[First<TKeys>]> & TResult
  >;

type Process<T extends Dictionary,
> = MakeKeysOptional<
  Convert<T, As<Keys<T>, readonly (ObjectKey & keyof T)[]>>,
  As<CamelCase<OptionalKeysTuple<T>>, readonly ObjectKey[]>
>;

/**
 * Converts an object's keys to the **camelCase** equivalent
 * while keeping the values the same.
 */
export type CamelKeys<
  T extends AnyObject,
> = Process<T>;
