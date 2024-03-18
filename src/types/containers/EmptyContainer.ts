import { Container, HasIndex } from "src/types/index";

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
> = HasIndex<T, false> extends false
? false
: true
