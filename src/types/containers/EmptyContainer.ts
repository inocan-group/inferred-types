import { Container, Keys } from "src/types/index";

/**
 * **EmptyContainer**`<T>`
 * 
 * Boolean utility which tests whether a container is "empty"
 * (meaning it has no keys).
 * 
 * **Related:** `NonEmptyContainer`
 */
export type EmptyContainer<
  T extends Container
> = Keys<T>["length"] extends 0 ? true : false;
