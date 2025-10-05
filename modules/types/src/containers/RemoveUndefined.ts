import type {
    Container,
    Dictionary,
    EmptyObject,
    IsUndefined,
    NumericKeys,
    ObjectKey,
    RemoveIndexKeys,
    Tuple,
    UnionToTuple,
} from "inferred-types/types";

type _Keys<T extends object> = UnionToTuple<keyof RemoveIndexKeys<T>> extends
readonly ObjectKey[]
    ? UnionToTuple<keyof RemoveIndexKeys<T>>
    : never;

type Process<
    T extends Container,
    TKeys extends readonly PropertyKey[],
    TResults extends Container = T extends readonly unknown[] ? [] : EmptyObject,
> = TKeys extends [infer Head extends PropertyKey, ...infer Rest extends readonly PropertyKey[]]

    ? Head extends keyof T
        ? IsUndefined<T[Head]> extends true
            ? Process<T, Rest, TResults>
            : Process<
                T,
                Rest,
                Head extends keyof T
                    ? TResults extends readonly unknown[]
                        ? [...TResults, T[Head]]
                        : TResults extends Dictionary
                            ? TResults & Record<Head, T[Head]>
                            : never
                    : never
            >
        : never
    : TResults;

/**
 * **RemoveUndefined**`<T>`
 *
 * Removes all the elements from `T` which are typed as _undefined_.
 */
export type RemoveUndefined<
    T extends Container,
> = Process<
    T,
    T extends Tuple ? NumericKeys<T> : _Keys<T>
>;
