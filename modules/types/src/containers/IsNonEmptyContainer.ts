import type { Container } from "inferred-types/types";

import type { IsEmptyContainer } from "./IsEmptyContainer";

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
