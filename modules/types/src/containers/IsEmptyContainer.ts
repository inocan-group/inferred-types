import { Container,    ExplicitlyEmptyObject,  Dictionary,  Keys } from "inferred-types/types";

/**
 * **EmptyContainer**`<T>`
 *
 * Boolean utility which tests whether a container is "empty"
 * (meaning it has no keys).
 *
 * **Related:** `NonEmptyContainer`
 */
export type IsEmptyContainer<
  T extends Container
> = T extends Dictionary
  ? T extends ExplicitlyEmptyObject
    ? true
    : Keys<T>["length"] extends 0
      ? true
      : false
  : Keys<T>["length"] extends 0
  ? true
  : false;
