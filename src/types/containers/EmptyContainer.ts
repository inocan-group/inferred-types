import { Container,  EmptyObject,  KV,  Keys } from "src/types/index";

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
> = T extends KV 
  ? T extends EmptyObject
    ? true
    : Keys<T>["length"] extends 0
      ? true
      : false
  : Keys<T>["length"] extends 0
  ? true
  : false;
