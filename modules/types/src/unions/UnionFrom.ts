import type { Container, Err, GetEach, IsDictionary, IsNull, Values } from "inferred-types/types";

/**
 * **UnionFrom**`<T,[U]>`
 *
 * Creates a union type from the potential _values_ of a container.
 *
 * - you may optionally specify the `U` generic which represents the
 * "offset" to use.
 *    - In cases where it set it will expect the root container's _values_ to be containers
 *    themselves and the union will _offset_ by the index provided in `O`.
 */
export type UnionFrom<
    T extends Container,
    U extends null | string = null
> = T extends readonly unknown[]
    ? IsNull<U> extends true
        ? T[number]
        : GetEach<T, U> extends readonly unknown[]
            ? GetEach<T, U>[number]
            : never
    : IsDictionary<T> extends true
        ? IsNull<U> extends true
            ? Values<T> extends readonly unknown[]
                ? Values<T>[number]
                : never
            : Err<
                `invalid-offset`,
                `The UnionFrom<T,U> received an 'offset' value in the U generic. This feature is intended for tuples not objects!`,
                { container: T, offset: U}
            >
        : never;
