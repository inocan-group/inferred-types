import type {
    IsUnionArray,
    Length,
    Narrowable,
    UnionArrayToTuple,
    UnionToTuple,
} from "inferred-types/types";
import { asArray } from "inferred-types/runtime";

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
>(...values: T) {
    const arr = (
        values.length === 1
            ? values[0]
            : values
    ) as Length<T> extends 1
        ? T[0] extends readonly unknown[]
            ? T[0] extends infer Arr
                ? IsUnionArray<Arr> extends true
                    ? UnionArrayToTuple<Arr>
                    : UnionToTuple<Arr>
                : T[0]
            : T[0]
        : T;

    return asArray(arr);
}
