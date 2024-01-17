import { Container, Keys } from "src/types/index";

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
> = Keys<T>["length"] extends 0 ? true : false;
