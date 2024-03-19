import { EmptyContainer } from "./EmptyContainer";

import { Container } from "src/types/index";

/**
 * **NonEmptyContainer**`<T>`
 * 
 * Boolean utility which tests whether a container has keys
 * (aka, is not "empty")
 * 
 * **Related:** `EmptyContainer`
 */
export type NonEmptyContainer<
  T extends Container
> = EmptyContainer<T> extends true ? false : true;
