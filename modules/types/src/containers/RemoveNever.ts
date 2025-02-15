import type {
  AfterFirst,
  Container,
  Dictionary,
  EmptyObject,
  First,
  IfNever,
  NumericKeys,
  ObjectKey,
  RemoveIndexKeys,
  UnionToTuple,
} from "inferred-types/types";

type _Keys<T extends object> = UnionToTuple<keyof RemoveIndexKeys<T>> extends
readonly ObjectKey[]
  ? UnionToTuple<keyof RemoveIndexKeys<T>>
  : never;

type ProcessObj<
  T extends Container,
  TKeys extends readonly PropertyKey[],
  TResults extends Dictionary = EmptyObject,
> = [] extends TKeys
  ? TResults
  : First<TKeys> extends keyof T
    ? IfNever<
      T[First<TKeys>],
      ProcessObj<T, AfterFirst<TKeys>, TResults>,
      ProcessObj<
        T,
        AfterFirst<TKeys>,
        First<TKeys> extends keyof T
          ? TResults extends readonly unknown[]
            ? [...TResults, T[First<TKeys>]]
            : TResults extends Dictionary
              ? TResults & Record<First<TKeys>, T[First<TKeys>]>
              : never
          : never
      >
    >
    : never;

type ProcessTuple<
  T extends Container,
  TKeys extends readonly number[],
  TResults extends readonly unknown[] = [],
> = [] extends TKeys
  ? TResults
  : First<TKeys> extends keyof T
    ? IfNever<
      T[First<TKeys>],
      ProcessTuple<T, AfterFirst<TKeys>, TResults>,
      ProcessTuple<
        T,
        AfterFirst<TKeys>,
        First<TKeys> extends keyof T
          ? [...TResults, T[First<TKeys>]]
          : never
      >
    >
    : never;

/**
 * **RemoveNever**`<T>`
 *
 * Removes all of the elements from `T` which are typed as _never_.
 */
export type RemoveNever<
  T extends Container,
> = T extends readonly unknown[]
  ? ProcessTuple<T, NumericKeys<T>>
  : T extends Dictionary
    ? ProcessObj<T, _Keys<T>>
    : never;
