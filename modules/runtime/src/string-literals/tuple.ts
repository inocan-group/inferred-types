import type {
    AsArray,
    IsUnionArray,
    Length,
    Narrowable,
    UnionArrayToTuple,
    UnionToTuple,
} from "inferred-types/types";
import { asArray } from "inferred-types/runtime";

type TupleValue<T extends readonly unknown[]> = Length<T> extends 1
    ? T[0] extends readonly unknown[]
        ? T[0] extends infer Arr
            ? IsUnionArray<Arr> extends true
                ? UnionArrayToTuple<Arr>
                : UnionToTuple<Arr>
            : T[0]
        : T[0]
    : T;

/**
 * **tuple**(value)
 *
 * Creates a discrete tuple.
 * ```ts
 * // [1,2,3]
 * const t1 = tuple(1,2,3);
 * const t2 = tuple([1,2,3]);
 * ```
 */
export function tuple<
    N extends Narrowable,
    K extends PropertyKey,
    T extends readonly (Record<K, N> | N)[],
>(...values: T): AsArray<TupleValue<T>> {
    const arr = (
        values.length === 1
            ? values[0]
            : values
    ) as TupleValue<T>;

    return asArray(arr);
}
