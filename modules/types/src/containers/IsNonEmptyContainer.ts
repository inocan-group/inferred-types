import type { Container, IsEmptyContainer } from "inferred-types/types";

/**
 * **NonEmptyContainer**`<T>`
 *
 * Boolean utility which tests whether a container has keys
 * (aka, is not "empty")
 *
 * **Related:** `EmptyContainer`
 */
export type IsNonEmptyContainer<
    T extends Container,
> = IsEmptyContainer<T> extends true ? false : true;
