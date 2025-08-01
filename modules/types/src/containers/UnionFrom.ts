import type { Container, IsDictionary, Values } from "inferred-types/types";

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
    ? T[number]
    : IsDictionary<T> extends true
        ? Values<T>[number]
        : never;
