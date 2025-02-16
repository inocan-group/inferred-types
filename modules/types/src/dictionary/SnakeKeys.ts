import type {
  AfterFirst,
  As,
  Dictionary,
  EmptyObject,
  ExpandDictionary,
  First,
  Keys,
  MakeKeysOptional,
  ObjectKey,
  OptionalKeysTuple,
  SnakeCase,
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
        SnakeCase<First<TKeys>>,
        TObj[First<TKeys>] extends Dictionary
          ? SnakeKeys<TObj[First<TKeys>]>
          : TObj[First<TKeys>]
      > & TResult
      : Record<First<TKeys>, TObj[First<TKeys>]> & TResult
  >;

type Process<T extends Dictionary,
> = MakeKeysOptional<
  Convert<T, As<Keys<T>, readonly (ObjectKey & keyof T)[]>>,
  As<SnakeCase<OptionalKeysTuple<T>>, readonly ObjectKey[]>
>;

/**
 * Converts an object's keys to the **kebab-case** equivalent
 * while keeping the values the same.
 */
export type SnakeKeys<
  T extends Dictionary,
> = Process<T>;
