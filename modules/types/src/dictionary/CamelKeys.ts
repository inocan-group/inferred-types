import type {
    AfterFirst,
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

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars */

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
            ? (
      Record<
          CamelCase<First<TKeys>>,
          TObj[First<TKeys>] extends Dictionary
              ? CamelKeys<TObj[First<TKeys>]>
              : TObj[First<TKeys>]
      >
      & TResult
            )
            : Record<First<TKeys>, TObj[First<TKeys>]> & TResult
    >;

type Process<T extends Dictionary,
> = CamelCase<OptionalKeysTuple<T>> extends infer _CC extends readonly ObjectKey[]
    ? Convert<T, As<Keys<T>, readonly (ObjectKey & keyof T)[]>>
    : never;

/**
 * Converts an object's keys to the **camelCase** equivalent
 * while keeping the values the same.
 */
export type CamelKeys<
    T extends Dictionary,
> = Process<Required<T>> extends infer CamelDict extends Dictionary
    ? OptionalKeysTuple<T> extends infer OptKeys extends readonly ObjectKey[]
        ? {
            [K in keyof OptKeys]: OptKeys[K] extends string
                ? CamelCase<OptKeys[K]>
                : OptKeys[K]
        } extends infer OptKeys extends readonly ObjectKey[]
            ? MakeKeysOptional<
                CamelDict,
                OptKeys
            >
            : never
        : never
    : never;
