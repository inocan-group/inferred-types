import { IsEmptyContainer } from "./IsEmptyContainer";

import { Container } from "src/types/index";

/**
 * **NonEmptyContainer**`<T>`
 * 
 * Boolean utility which tests whether a container has keys
 * (aka, is not "empty")
 * 
 * **Related:** `EmptyContainer`
 */
export type IsNonEmptyContainer<
  T extends Container
> = IsEmptyContainer<T> extends true ? false : true;
